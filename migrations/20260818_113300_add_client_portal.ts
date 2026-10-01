import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'
import { clientPortalSchemaSQL } from '../cms/client-portal-schema'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(clientPortalSchemaSQL))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_client_projects_fk";
    DROP INDEX IF EXISTS "payload"."payload_locked_documents_rels_client_projects_id_idx";
    ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN IF EXISTS "client_projects_id";
    DROP TABLE IF EXISTS "payload"."client_projects" CASCADE;
    DROP TYPE IF EXISTS "payload"."enum_client_projects_status";
  `)
}
