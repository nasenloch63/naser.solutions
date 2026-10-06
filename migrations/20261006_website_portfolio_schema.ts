import { sql, type MigrateUpArgs, type MigrateDownArgs } from '@payloadcms/db-postgres'
import { portfolioSchemaSQL, portfolioLocaleTypes, portfolioNewLocales } from '../cms/portfolio-schema'

export async function up({ db }: MigrateUpArgs) {
  for (const type of portfolioLocaleTypes) for (const locale of portfolioNewLocales) await db.execute(sql.raw(`ALTER TYPE "payload"."${type}" ADD VALUE IF NOT EXISTS '${locale}'`))
  await db.execute(sql.raw(portfolioSchemaSQL))
}
export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error('Portfolio media and translations must be preserved. Restore a database backup for a full rollback.')
}
