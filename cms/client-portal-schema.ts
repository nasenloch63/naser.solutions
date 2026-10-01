// Additive and repeatable so an existing development database can be upgraded safely.
export const clientPortalSchemaSQL = `
ALTER TYPE "payload"."enum_users_role" ADD VALUE IF NOT EXISTS 'client';
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'payload' AND t.typname = 'enum_client_projects_status') THEN
    CREATE TYPE "payload"."enum_client_projects_status" AS ENUM('preparation', 'active', 'live', 'paused');
  END IF;
END $$;
CREATE TABLE IF NOT EXISTS "payload"."client_projects" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "domain" varchar NOT NULL,
  "client_id" integer NOT NULL,
  "status" "payload"."enum_client_projects_status" DEFAULT 'active' NOT NULL,
  "notes" varchar,
  "client_feedback" varchar,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "client_projects_id" integer;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'client_projects_client_id_users_id_fk'
    AND conrelid = 'payload.client_projects'::regclass) THEN
    ALTER TABLE "payload"."client_projects" ADD CONSTRAINT "client_projects_client_id_users_id_fk"
      FOREIGN KEY ("client_id") REFERENCES "payload"."users"("id") ON DELETE restrict ON UPDATE no action;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_client_projects_fk'
    AND conrelid = 'payload.payload_locked_documents_rels'::regclass) THEN
    ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_client_projects_fk"
      FOREIGN KEY ("client_projects_id") REFERENCES "payload"."client_projects"("id") ON DELETE cascade ON UPDATE no action;
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "client_projects_domain_idx" ON "payload"."client_projects" USING btree ("domain");
CREATE INDEX IF NOT EXISTS "client_projects_client_idx" ON "payload"."client_projects" USING btree ("client_id");
CREATE INDEX IF NOT EXISTS "client_projects_updated_at_idx" ON "payload"."client_projects" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "client_projects_created_at_idx" ON "payload"."client_projects" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_client_projects_id_idx"
  ON "payload"."payload_locked_documents_rels" USING btree ("client_projects_id");
`
