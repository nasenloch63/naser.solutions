export const feedbackAttachmentSchemaSQL = `
CREATE TABLE IF NOT EXISTS "payload"."client_projects_feedback_attachments" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "mime_type" varchar NOT NULL,
  "size" numeric NOT NULL,
  "request_note" varchar,
  "submitted_at" timestamp(3) with time zone NOT NULL,
  "blob_path" varchar NOT NULL,
  "download_url" varchar NOT NULL
);
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'client_projects_feedback_attachments_parent_fk'
    AND conrelid = 'payload.client_projects_feedback_attachments'::regclass) THEN
    ALTER TABLE "payload"."client_projects_feedback_attachments" ADD CONSTRAINT "client_projects_feedback_attachments_parent_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "payload"."client_projects"("id") ON DELETE cascade ON UPDATE no action;
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS "client_projects_feedback_attachments_order_idx" ON "payload"."client_projects_feedback_attachments" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "client_projects_feedback_attachments_parent_id_idx" ON "payload"."client_projects_feedback_attachments" USING btree ("_parent_id");
`
