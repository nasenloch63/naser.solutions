import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'
import { feedbackAttachmentSchemaSQL } from '../cms/feedback-attachment-schema'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(feedbackAttachmentSchemaSQL))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "payload"."client_projects_feedback_attachments";`)
}
