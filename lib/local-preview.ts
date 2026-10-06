import type { Page } from '@/payload-types'

// Explicit opt-in for a local checkout without access to the production CMS.
export const isLocalPreview = process.env.LOCAL_CMS_PREVIEW === '1' && !process.env.VERCEL

export const previewHome: Page = {
  id: -1,
  title: 'Naser Solutions',
  slug: 'home',
  _status: 'published',
  createdAt: '2026-09-29T00:00:00.000Z',
  updatedAt: '2026-09-29T00:00:00.000Z',
  layout: [
    { blockType: 'hero', heading: 'Naser Solutions' },
    { blockType: 'projects', heading: 'Projekte' },
    { blockType: 'featureGrid', heading: 'Leistungen', items: [] },
    { blockType: 'stats', items: [] },
    { blockType: 'cta', heading: 'Vision' },
    { blockType: 'contact', heading: 'Kontakt', recipientEmail: 'info@naser-solutions.de' },
  ],
}
