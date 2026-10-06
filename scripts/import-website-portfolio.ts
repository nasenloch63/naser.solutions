import path from 'node:path'
import { getPayload } from 'payload'
import { Pool } from 'pg'
import config from '../payload.config'
import { portfolioDefaults } from '../lib/portfolio-defaults'
import { previewPortfolio } from '../lib/portfolio-preview-data'
import { supportedLanguages } from '../lib/language'
import { localizedText } from '../lib/portfolio'
import { websiteText } from '../lib/website-text'

const checkpoint = '20261006_import_website_portfolio'
const slugs = ['naser-cms', 'haze-chill-website', 'haze-chill-content', 'studio-glace', 'joes-garage', 'crypto-news', 'awd-shop', 'al-salam']
const assets = [
  ['/images/logo-invertable.png', 'Naser Solutions Logo'],
  ['/images/inverted-20logo-20png.png', 'Naser Solutions Logo – helle Variante'],
  ['/images/yasin-adam-aissani-2026.jpg', 'Yasin Adam Aissani – Porträt'],
  ['/projects/haze-chill-website.jpg', 'Haze & Chill – Website'],
  ['/projects/haze-chill-instagram.png', 'Haze & Chill – Instagram Reel'],
  ['/documents/cw-yasin-2026.pdf', 'Lebenslauf Yasin Adam Aissani 2026'],
  ['/documents/frankenlandschule-zeugnis.jpeg', 'Zeugnis der Frankenlandschule'],
  ['/documents/mittlere-reife-woerth.jpeg', 'Zeugnis Mittlere Reife Wörth'],
  ...slugs.slice(3).map(slug => [`/projects/${slug}.${slug === 'joes-garage' ? 'svg' : 'jpg'}`, `${slug === 'studio-glace' ? 'Studio Glacé' : slug === 'joes-garage' ? 'Joe’s Garage' : slug === 'crypto-news' ? 'Crypto News' : slug === 'awd-shop' ? 'AWD Shop' : 'Al Salam'} – Website`]),
]

async function run() {
  if (process.env.VERCEL_ENV !== 'production') { console.info('Portfolio import: skipped outside production.'); return }
  if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) throw new Error('CMS database and media storage are required for portfolio import.')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 })
  const connection = await pool.connect()
  try {
    await connection.query("SELECT pg_advisory_lock(hashtext('naser-website-portfolio-import'))")
    if ((await connection.query('SELECT id FROM payload.payload_kv WHERE key = $1', [checkpoint])).rows.length) { console.info('Portfolio already imported; preserving CMS edits.'); return }
    const payload = await getPayload({ config })
    const mediaIDs = new Map<string, number>()
    for (const [sourcePath, alt] of assets) {
      const existing = await payload.find({ collection: 'media', depth: 0, limit: 1, where: { sourcePath: { equals: sourcePath } } })
      const media = existing.docs[0] || await payload.create({ collection: 'media', data: { alt, sourcePath }, filePath: path.join(process.cwd(), 'public', sourcePath) })
      mediaIDs.set(sourcePath, media.id)
    }
    for (let index = 0; index < portfolioDefaults.length; index++) {
      const defaults = portfolioDefaults[index]
      const copy = previewPortfolio[index]
      const existing = await payload.find({ collection: 'projects', draft: true, depth: 0, limit: 1, where: { slug: { equals: slugs[index] } } })
      // Partial retries retain existing fields and only fill missing translations.
      const project = existing.docs[0] || await payload.create({ collection: 'projects', data: {
        slug: slugs[index], title: localizedText(copy.title, 'de'), description: localizedText(copy.description, 'de'), url: defaults.url,
        category: defaults.category as 'web', order: index + 1, projectStatus: 'live', _status: 'published',
        thumbnail: mediaIDs.get(defaults.logo || defaults.previewImage || ''), containImage: Boolean(defaults.logo),
        tags: defaults.tags.map(label => ({ label })),
      } })
      const all = await payload.findByID({ collection: 'projects', id: project.id, locale: 'all', fallbackLocale: false, depth: 0 })
      for (const locale of supportedLanguages.filter(language => language !== 'de')) {
        const title = typeof all.title === 'object' ? all.title?.[locale] : undefined
        const description = typeof all.description === 'object' ? all.description?.[locale] : undefined
        if (!title || !description) await payload.update({ collection: 'projects', id: project.id, locale, data: {
          ...(!title ? { title: localizedText(copy.title, locale) } : {}),
          ...(!description ? { description: localizedText(copy.description, locale) } : {}),
          tags: all.tags?.map((tag, index) => ({ id: tag.id, label: localizedText(tag.label, locale) || defaults.tags[index] })),
          _status: 'published',
        } })
      }
    }

    // Retain the three original demo records as unpublished history, rather than deleting them.
    for (const [slug, title] of [['naser-solutions', 'Naser Solutions'], ['digitale-markenwelt', 'Digitale Markenwelt'], ['ecommerce-experience', 'E-Commerce Experience']]) {
      const found = await payload.find({ collection: 'projects', depth: 0, limit: 1, where: { slug: { equals: slug } } })
      if (found.docs[0]?.title === title) await payload.update({ collection: 'projects', id: found.docs[0].id, data: { _status: 'draft', showInPortfolio: false } })
    }

    const home = (await payload.find({ collection: 'pages', depth: 0, limit: 1, where: { and: [{ slug: { equals: 'home' } }, { _status: { equals: 'published' } }] } })).docs[0]
    if (!home) throw new Error('Published homepage is missing; portfolio import stopped.')
    // Preserve the previously visible Hero → Projects order, then let future CMS edits control it.
    const layout = [...home.layout.filter(block => block.blockType === 'hero'), ...home.layout.filter(block => block.blockType === 'projects'), ...home.layout.filter(block => !['hero', 'projects'].includes(block.blockType))]
    for (const locale of supportedLanguages) {
      const localizedHome = await payload.findByID({ collection: 'pages', id: home.id, locale, depth: 0 })
      const translatedLayout = layout.map(block => {
        const translatedBlock = localizedHome.layout.find(item => item.id === block.id) || block
        return translatedBlock.blockType === 'projects' ? { ...translatedBlock, eyebrow: websiteText(locale, 'projects.badge'), heading: websiteText(locale, 'projects.title'), description: websiteText(locale, 'projects.description'), selection: [] } : translatedBlock
      })
      await payload.update({ collection: 'pages', id: home.id, locale, data: { title: localizedHome.title || home.title, layout: translatedLayout, _status: 'published' } })
    }
    await connection.query('INSERT INTO payload.payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO NOTHING', [checkpoint, JSON.stringify({ completedAt: new Date().toISOString() })])
    console.info('Website media and eight portfolio projects imported successfully.')
  } finally {
    await connection.query("SELECT pg_advisory_unlock(hashtext('naser-website-portfolio-import'))")
    connection.release()
    await pool.end()
  }
}
try { await run(); process.exit(0) } catch (error) { console.error('Portfolio import failed:', error); process.exit(1) }
