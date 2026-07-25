import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__blog_posts_v_published_locale" AS ENUM('de', 'en', 'fr', 'pt', 'es', 'tr', 'sq', 'ru', 'el', 'ar', 'zh');
  CREATE TABLE "payload"."blog_posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."blog_posts_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"featured_image_id" integer,
  	"author" varchar DEFAULT 'Yasin Adam Aissani',
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_blog_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."blog_posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_blog_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_blog_posts_v_version_tags_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_featured_image_id" integer,
  	"version_author" varchar DEFAULT 'Yasin Adam Aissani',
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__blog_posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_blog_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload"."pages_blocks_contact" ALTER COLUMN "recipient_email" SET DEFAULT 'info@naser-solutions.de';
  ALTER TABLE "payload"."_pages_v_blocks_contact" ALTER COLUMN "recipient_email" SET DEFAULT 'info@naser-solutions.de';
  ALTER TABLE "payload"."site_settings" ALTER COLUMN "contact_email" SET DEFAULT 'info@naser-solutions.de';
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "blog_posts_id" integer;
  ALTER TABLE "payload"."blog_posts_tags" ADD CONSTRAINT "blog_posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_posts_tags_locales" ADD CONSTRAINT "blog_posts_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog_posts_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blog_posts" ADD CONSTRAINT "blog_posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog_posts" ADD CONSTRAINT "blog_posts_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_posts_v_version_tags" ADD CONSTRAINT "_blog_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_posts_v_version_tags_locales" ADD CONSTRAINT "_blog_posts_v_version_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_posts_v_version_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_posts_tags_order_idx" ON "payload"."blog_posts_tags" USING btree ("_order");
  CREATE INDEX "blog_posts_tags_parent_id_idx" ON "payload"."blog_posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_posts_tags_locales_locale_parent_id_unique" ON "payload"."blog_posts_tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "payload"."blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_featured_image_idx" ON "payload"."blog_posts" USING btree ("featured_image_id");
  CREATE INDEX "blog_posts_seo_seo_image_idx" ON "payload"."blog_posts" USING btree ("seo_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "payload"."blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "payload"."blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "payload"."blog_posts" USING btree ("_status");
  CREATE UNIQUE INDEX "blog_posts_locales_locale_parent_id_unique" ON "payload"."blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_version_tags_order_idx" ON "payload"."_blog_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_tags_parent_id_idx" ON "payload"."_blog_posts_v_version_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_blog_posts_v_version_tags_locales_locale_parent_id_unique" ON "payload"."_blog_posts_v_version_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "payload"."_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "payload"."_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_blog_posts_v_version_version_featured_image_idx" ON "payload"."_blog_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blog_posts_v_version_seo_version_seo_image_idx" ON "payload"."_blog_posts_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "payload"."_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "payload"."_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "payload"."_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "payload"."_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "payload"."_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_snapshot_idx" ON "payload"."_blog_posts_v" USING btree ("snapshot");
  CREATE INDEX "_blog_posts_v_published_locale_idx" ON "payload"."_blog_posts_v" USING btree ("published_locale");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "payload"."_blog_posts_v" USING btree ("latest");
  CREATE INDEX "_blog_posts_v_autosave_idx" ON "payload"."_blog_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_blog_posts_v_locales_locale_parent_id_unique" ON "payload"."_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "payload"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("blog_posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."blog_posts_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."blog_posts_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."blog_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."blog_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_blog_posts_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_blog_posts_v_version_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_blog_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_blog_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."blog_posts_tags" CASCADE;
  DROP TABLE "payload"."blog_posts_tags_locales" CASCADE;
  DROP TABLE "payload"."blog_posts" CASCADE;
  DROP TABLE "payload"."blog_posts_locales" CASCADE;
  DROP TABLE "payload"."_blog_posts_v_version_tags" CASCADE;
  DROP TABLE "payload"."_blog_posts_v_version_tags_locales" CASCADE;
  DROP TABLE "payload"."_blog_posts_v" CASCADE;
  DROP TABLE "payload"."_blog_posts_v_locales" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_posts_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_blog_posts_id_idx";
  ALTER TABLE "payload"."pages_blocks_contact" ALTER COLUMN "recipient_email" SET DEFAULT 'info@naser.solutions';
  ALTER TABLE "payload"."_pages_v_blocks_contact" ALTER COLUMN "recipient_email" SET DEFAULT 'info@naser.solutions';
  ALTER TABLE "payload"."site_settings" ALTER COLUMN "contact_email" SET DEFAULT 'info@naser.solutions';
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "blog_posts_id";
  DROP TYPE "payload"."enum_blog_posts_status";
  DROP TYPE "payload"."enum__blog_posts_v_version_status";
  DROP TYPE "payload"."enum__blog_posts_v_published_locale";`)
}
