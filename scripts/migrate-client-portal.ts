import { Pool } from 'pg'
import { clientPortalSchemaSQL } from '../cms/client-portal-schema'
import { feedbackAttachmentSchemaSQL } from '../cms/feedback-attachment-schema'
import { portfolioSchemaSQL, portfolioLocaleTypes, portfolioNewLocales } from '../cms/portfolio-schema'

async function migrate() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.info('Client portal migration: skipped outside the production build.')
    return
  }

  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 15000, max: 1 })
  const connection = await pool.connect()
  try {
    // PostgreSQL enum additions must commit before the newly added locales are used.
    for (const type of portfolioLocaleTypes) for (const locale of portfolioNewLocales) await connection.query(`ALTER TYPE "payload"."${type}" ADD VALUE IF NOT EXISTS '${locale}'`)
    await connection.query('BEGIN')
    await connection.query("SET LOCAL lock_timeout = '10s'; SET LOCAL statement_timeout = '20s'")
    await connection.query("SELECT pg_advisory_xact_lock(hashtext('naser-client-portal-schema'))")
    await connection.query(clientPortalSchemaSQL)
    await connection.query(feedbackAttachmentSchemaSQL)
    await connection.query(portfolioSchemaSQL)
    const columns = await connection.query<{ column_name: string }>(
      "SELECT column_name FROM information_schema.columns WHERE table_schema = 'payload' AND table_name = 'client_projects'",
    )
    const required = ['id', 'name', 'domain', 'client_id', 'status', 'notes', 'client_feedback', 'updated_at', 'created_at']
    if (required.some(name => !columns.rows.some(column => column.column_name === name))) {
      throw new Error('The existing client_projects table has an incompatible schema.')
    }
    const attachmentColumns = await connection.query<{ column_name: string }>(
      "SELECT column_name FROM information_schema.columns WHERE table_schema = 'payload' AND table_name = 'client_projects_feedback_attachments'",
    )
    if (['_order', '_parent_id', 'id', 'name', 'mime_type', 'size', 'request_note', 'submitted_at', 'blob_path', 'download_url'].some(name => !attachmentColumns.rows.some(column => column.column_name === name))) throw new Error('The feedback attachment table has an incompatible schema.')
    for (const name of ['20260818_113300_add_client_portal', '20261005_160000_add_feedback_attachments', '20261006_website_portfolio_schema']) await connection.query(`
      INSERT INTO "payload"."payload_migrations" ("name", "batch")
      SELECT $1::varchar, COALESCE(MAX("batch") FILTER (WHERE "batch" > 0), 0) + 1
      FROM "payload"."payload_migrations"
      HAVING NOT EXISTS (SELECT 1 FROM "payload"."payload_migrations" WHERE "name" = $1::varchar)
    `, [name])
    await connection.query('COMMIT')
  } catch (error) {
    await connection.query('ROLLBACK')
    throw error
  } finally {
    connection.release()
    await pool.end()
  }
  console.info('Client portal database migration completed.')
}

try {
  await migrate()
  process.exit(0)
} catch (error) {
  console.error('Client portal database migration failed:', error)
  process.exit(1)
}
