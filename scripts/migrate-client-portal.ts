import { Pool } from 'pg'
import { clientPortalSchemaSQL } from '../cms/client-portal-schema'

async function migrate() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.info('Client portal migration: skipped outside the production build.')
    return
  }

  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 15000, max: 1 })
  const connection = await pool.connect()
  try {
    await connection.query('BEGIN')
    await connection.query("SET LOCAL lock_timeout = '10s'; SET LOCAL statement_timeout = '20s'")
    await connection.query("SELECT pg_advisory_xact_lock(hashtext('naser-client-portal-schema'))")
    await connection.query(clientPortalSchemaSQL)
    const columns = await connection.query<{ column_name: string }>(
      "SELECT column_name FROM information_schema.columns WHERE table_schema = 'payload' AND table_name = 'client_projects'",
    )
    const required = ['id', 'name', 'domain', 'client_id', 'status', 'notes', 'client_feedback', 'updated_at', 'created_at']
    if (required.some(name => !columns.rows.some(column => column.column_name === name))) {
      throw new Error('The existing client_projects table has an incompatible schema.')
    }
    await connection.query(`
      INSERT INTO "payload"."payload_migrations" ("name", "batch")
      SELECT $1, COALESCE(MAX("batch") FILTER (WHERE "batch" > 0), 0) + 1
      FROM "payload"."payload_migrations"
      HAVING NOT EXISTS (SELECT 1 FROM "payload"."payload_migrations" WHERE "name" = $1)
    `, ['20260818_113300_add_client_portal'])
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
