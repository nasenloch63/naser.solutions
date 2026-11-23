import path from 'node:path'
import { getPayload } from 'payload'
import { Pool } from 'pg'
import config from '../payload.config'
import { hazeChillKarteCopy, hazeChillKarteProject } from '../lib/haze-chill-karte-project'
import { supportedLanguages } from '../lib/language'
import { localizedText } from '../lib/portfolio'
import { isCmsQuotaExceeded } from '../lib/cms-quota'

// Moves AWD Shop and Spendenseite Al Salam to the demo grid and adds the highlighted Haze & Chill QRcode_expo / CustomOS project.
const checkpoint = '20261123_move_demos_and_add_haze_chill_karte'
const slug = 'haze-chill-karte'

export async function syncDemoAndCustomOS() {
  if (process.env.VERCEL_ENV !== 'production') return
  if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) throw new Error('CMS database and media storage are required for portfolio updates.')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 15000, max: 1 })
  const connection = await pool.connect().catch(async (error: unknown) => {
    await pool.end()
    if (!isCmsQuotaExceeded(error)) throw error
    console.warn('Postgres quota exceeded; postponing demo/CustomOS portfolio sync before any writes.')
    return null
  })
  if (!connection) return
  try {
    await connection.query("SELECT pg_advisory_lock(hashtext('naser-website-portfolio-import'))")
    if ((await connection.query('SELECT id FROM payload.payload_kv WHERE key = $1', [checkpoint])).rows.length) {
      console.info('Demo/CustomOS portfolio sync already completed; preserving CMS edits.')
      return
    }
    const payload = await getPayload({ config })

    // Hide AWD Shop and Spendenseite Al Salam from the main live references grid (now showcased in the demo grid).
    const demoRecords = await payload.find({
      collection: 'projects',
      draft: true,
      depth: 0,
      limit: 10,
      where: {
        or: [
          { slug: { in: ['awd-shop', 'al-salam'] } },
          { url: { in: ['https://v0-luxury-street-chic-website.vercel.app/', 'https://v0-luxury-street-chic-website.vercel.app', 'https://v0-donation-website-for-al-salam.vercel.app/', 'https://v0-donation-website-for-al-salam.vercel.app'] } },
        ],
      },
    })
    for (const demo of demoRecords.docs) {
      if (demo.showInPortfolio !== false) {
        await payload.update({ collection: 'projects', id: demo.id, data: { showInPortfolio: false, _status: demo._status } })
      }
    }

    // Import Haze & Chill QRcode_expo / CustomOS highlighted project.
    const existing = await payload.find({
      collection: 'projects',
      draft: true,
      depth: 0,
      limit: 1,
      where: {
        or: [
          { slug: { equals: slug } },
          { url: { in: [hazeChillKarteProject.url, 'https://haze-chill-karte.vercel.app', 'https://karte.haze-chill.com', 'https://karte.haze-chill.com/'] } },
        ],
      },
    })
    let project = existing.docs[0]
    if (!project) {
      const imagePath = hazeChillKarteProject.image!
      const foundMedia = await payload.find({ collection: 'media', depth: 0, limit: 1, where: { sourcePath: { equals: imagePath } } })
      const media = foundMedia.docs[0] || await payload.create({
        collection: 'media',
        data: { alt: String(hazeChillKarteProject.alt), sourcePath: imagePath },
        filePath: path.join(process.cwd(), 'public', imagePath),
      })
      const first = await payload.find({ collection: 'projects', depth: 0, limit: 1, sort: 'order' })
      project = await payload.create({
        collection: 'projects',
        locale: 'de',
        data: {
          slug,
          title: hazeChillKarteCopy.de.title,
          description: hazeChillKarteCopy.de.description,
          url: hazeChillKarteProject.url,
          category: 'gastro',
          thumbnail: media.id,
          containImage: false,
          tags: hazeChillKarteProject.tags.map(label => ({ label: String(label) })),
          order: (first.docs[0]?.order ?? 0) - 1,
          featured: true,
          showInPortfolio: true,
          projectStatus: 'live',
          _status: 'published',
        },
      })
    }
    const all = await payload.findByID({ collection: 'projects', id: project.id, locale: 'all', fallbackLocale: false, depth: 0 })
    for (const locale of supportedLanguages.filter(language => language !== 'de')) {
      const title = typeof all.title === 'object' ? all.title?.[locale] : undefined
      const description = typeof all.description === 'object' ? all.description?.[locale] : undefined
      if (!title || !description) {
        await payload.update({
          collection: 'projects',
          id: project.id,
          locale,
          data: {
            ...(!title ? { title: hazeChillKarteCopy[locale].title } : {}),
            ...(!description ? { description: hazeChillKarteCopy[locale].description } : {}),
            tags: all.tags?.map((tag, index) => ({ id: tag.id, label: localizedText(tag.label, locale) || String(hazeChillKarteProject.tags[index]) })),
            _status: project._status,
          },
        })
      }
    }
    await connection.query('INSERT INTO payload.payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO NOTHING', [
      checkpoint,
      JSON.stringify({ completedAt: new Date().toISOString(), projectId: project.id, hiddenDemos: demoRecords.docs.length }),
    ])
    console.info('Demo grid moves and Haze & Chill QRcode_expo / CustomOS import completed.')
  } finally {
    await connection.query("SELECT pg_advisory_unlock(hashtext('naser-website-portfolio-import'))")
    connection.release()
    await pool.end()
  }
}
