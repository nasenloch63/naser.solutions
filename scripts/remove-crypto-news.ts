import { getPayload } from 'payload'
import { Pool } from 'pg'
import config from '../payload.config'
import { isCmsQuotaExceeded } from '../lib/cms-quota'

// A separate checkpoint removes the Crypto News Portal reference once without overwriting other CMS edits.
const checkpoint = '20261119_remove_crypto_news_reference'
const legacySlug = 'crypto-news'
const legacyUrl = 'https://v0-crypto-news-website-peach.vercel.app/'
const legacyMediaPath = '/projects/crypto-news.jpg'

export async function removeCryptoNews() {
  if (process.env.VERCEL_ENV !== 'production') return
  if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) return
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 15000, max: 1 })
  const connection = await pool.connect().catch(async (error: unknown) => {
    await pool.end()
    if (!isCmsQuotaExceeded(error)) throw error
    console.warn('Postgres quota exceeded; postponing Crypto News Portal cleanup before any writes.')
    return null
  })
  if (!connection) return
  try {
    await connection.query("SELECT pg_advisory_lock(hashtext('naser-website-portfolio-import'))")
    if ((await connection.query('SELECT id FROM payload.payload_kv WHERE key = $1', [checkpoint])).rows.length) {
      return
    }
    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'projects',
      draft: true,
      depth: 0,
      limit: 10,
      where: { or: [{ slug: { equals: legacySlug } }, { url: { equals: legacyUrl } }] },
    })
    for (const project of existing.docs) {
      await payload.delete({ collection: 'projects', id: project.id })
    }
    const legacyMedia = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 10,
      where: { sourcePath: { equals: legacyMediaPath } },
    })
    for (const media of legacyMedia.docs) {
      await payload.delete({ collection: 'media', id: media.id }).catch(() => undefined)
    }
    await connection.query('INSERT INTO payload.payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO NOTHING', [
      checkpoint,
      JSON.stringify({ completedAt: new Date().toISOString(), deletedProjects: existing.docs.length }),
    ])
    console.info('Crypto News Portal reference removed from CMS.')
  } finally {
    await connection.query("SELECT pg_advisory_unlock(hashtext('naser-website-portfolio-import'))")
    connection.release()
    await pool.end()
  }
}
