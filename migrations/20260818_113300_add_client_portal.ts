import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "payload"."enum_users_role" ADD VALUE IF NOT EXISTS 'client';
    CREATE TYPE "payload"."enum_client_projects_status" AS ENUM('preparation', 'active', 'live', 'paused');
    CREATE TABLE "payload"."client_projects" (
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
    ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "client_projects_id" integer;
    ALTER TABLE "payload"."client_projects" ADD CONSTRAINT "client_projects_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "payload"."users"("id") ON DELETE restrict ON UPDATE no action;
    ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_client_projects_fk" FOREIGN KEY ("client_projects_id") REFERENCES "payload"."client_projects"("id") ON DELETE cascade ON UPDATE no action;
    CREATE UNIQUE INDEX "client_projects_domain_idx" ON "payload"."client_projects" USING btree ("domain");
    CREATE INDEX "client_projects_client_idx" ON "payload"."client_projects" USING btree ("client_id");
    CREATE INDEX "client_projects_updated_at_idx" ON "payload"."client_projects" USING btree ("updated_at");
    CREATE INDEX "client_projects_created_at_idx" ON "payload"."client_projects" USING btree ("created_at");
    CREATE INDEX "payload_locked_documents_rels_client_projects_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("client_projects_id");
  `)
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
