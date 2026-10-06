export const portfolioSchemaSQL = `
  ALTER TABLE "payload"."media" ADD COLUMN IF NOT EXISTS "source_path" varchar;
  CREATE UNIQUE INDEX IF NOT EXISTS "media_source_path_idx" ON "payload"."media" ("source_path");
  ALTER TABLE "payload"."projects" ADD COLUMN IF NOT EXISTS "contain_image" boolean DEFAULT false;
  ALTER TABLE "payload"."_projects_v" ADD COLUMN IF NOT EXISTS "version_contain_image" boolean DEFAULT false;
  ALTER TABLE "payload"."projects" ADD COLUMN IF NOT EXISTS "show_in_portfolio" boolean DEFAULT true;
  ALTER TABLE "payload"."_projects_v" ADD COLUMN IF NOT EXISTS "version_show_in_portfolio" boolean DEFAULT true;
`
export const portfolioLocaleTypes = ['_locales', 'enum__pages_v_published_locale', 'enum__projects_v_published_locale'] as const
export const portfolioNewLocales = ['ja', 'th', 'hi', 'uk', 'it'] as const
