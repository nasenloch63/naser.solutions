import path from 'node:path'
import { getPayload } from 'payload'
import { Pool } from 'pg'
import config from '../payload.config'
import { kasselUnitedCopy, kasselUnitedProject } from '../lib/kassel-united-project'
import { supportedLanguages } from '../lib/language'
import { localizedText } from '../lib/portfolio'

// A separate checkpoint keeps the original portfolio import and later CMS edits intact.
const checkpoint = '20261102_add_kassel_united_reference'
const slug = 'kassel-united'

export async function importKasselUnited() {
  if (process.env.VERCEL_ENV !== 'production') return
  if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) throw new Error('CMS database and media storage are required for the Kassel United reference.')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 })
  const connection = await pool.connect()
  try {
    await connection.query("SELECT pg_advisory_lock(hashtext('naser-website-portfolio-import'))")
    if ((await connection.query('SELECT id FROM payload.payload_kv WHERE key = $1', [checkpoint])).rows.length) {
      console.info('Kassel United already imported; preserving CMS edits.')
      return
    }
    const payload = await getPayload({ config })
    const existing = await payload.find({ collection: 'projects', draft: true, depth: 0, limit: 1, where: { or: [{ slug: { equals: slug } }, { url: { in: [kasselUnitedProject.url, 'https://kassel-united.de', 'https://kassel-united.de/', 'https://www.kassel-united.de'] } }] } })
    let project = existing.docs[0]
    if (!project) {
      const imagePath = kasselUnitedProject.image!
      const foundMedia = await payload.find({ collection: 'media', depth: 0, limit: 1, where: { sourcePath: { equals: imagePath } } })
      const media = foundMedia.docs[0] || await payload.create({ collection: 'media', data: { alt: String(kasselUnitedProject.alt), sourcePath: imagePath }, filePath: path.join(process.cwd(), 'public', imagePath) })
      const first = await payload.find({ collection: 'projects', depth: 0, limit: 1, sort: 'order' })
      project = await payload.create({ collection: 'projects', locale: 'de', data: {
        slug, title: kasselUnitedCopy.de.title, description: kasselUnitedCopy.de.description,
        url: kasselUnitedProject.url, category: 'web', thumbnail: media.id, containImage: false,
        tags: kasselUnitedProject.tags.map(label => ({ label: String(label) })),
        order: (first.docs[0]?.order ?? 0) - 1, showInPortfolio: true, projectStatus: 'live', _status: 'published',
      } })
    }
    // On partial retries, fill missing translations without overwriting edited fields.
    const all = await payload.findByID({ collection: 'projects', id: project.id, locale: 'all', fallbackLocale: false, depth: 0 })
    for (const locale of supportedLanguages.filter(language => language !== 'de')) {
      const title = typeof all.title === 'object' ? all.title?.[locale] : undefined
      const description = typeof all.description === 'object' ? all.description?.[locale] : undefined
      if (!title || !description) await payload.update({ collection: 'projects', id: project.id, locale, data: {
        ...(!title ? { title: kasselUnitedCopy[locale].title } : {}),
        ...(!description ? { description: kasselUnitedCopy[locale].description } : {}),
        tags: all.tags?.map((tag, index) => ({ id: tag.id, label: localizedText(tag.label, locale) || String(kasselUnitedProject.tags[index]) })),
        _status: project._status,
      } })
    }
    await connection.query('INSERT INTO payload.payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO NOTHING', [checkpoint, JSON.stringify({ completedAt: new Date().toISOString(), projectId: project.id })])
    console.info('Kassel United reference imported successfully.')
  } finally {
    await connection.query("SELECT pg_advisory_unlock(hashtext('naser-website-portfolio-import'))")
    connection.release()
    await pool.end()
  }
}
