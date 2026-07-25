import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Footer, Media, Navigation, Pages, Projects, SiteSettings, Users } from './cms/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '– Naser Solutions CMS',
      description: 'Inhalte und Seiten von Naser Solutions verwalten',
    },
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobil', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, Projects],
  globals: [Navigation, Footer, SiteSettings],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    localesSuffix: '_cms_locales',
  }),
  editor: lexicalEditor(),
  localization: {
    locales: [
      { label: 'Deutsch', code: 'de' },
      { label: 'English', code: 'en' },
      { label: 'Français', code: 'fr' },
      { label: 'Português', code: 'pt' },
      { label: 'Español', code: 'es' },
      { label: 'Türkçe', code: 'tr' },
      { label: 'Shqip', code: 'sq' },
      { label: 'Русский', code: 'ru' },
      { label: 'Ελληνικά', code: 'el' },
      { label: 'العربية', code: 'ar' },
      { label: '中文', code: 'zh' },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  cors: [serverURL].filter(Boolean),
  csrf: [serverURL].filter(Boolean),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: { prefix: 'cms/media' } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      access: 'public',
      addRandomSuffix: true,
      clientUploads: true,
    }),
  ],
  sharp: sharp as unknown as Parameters<typeof buildConfig>[0]['sharp'],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
