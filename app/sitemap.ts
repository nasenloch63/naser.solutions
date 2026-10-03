import type { MetadataRoute } from 'next'
import { getPublishedPages } from '@/lib/cms'
import { absoluteUrl, pagePath, SHARE_PAGES } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPublishedPages()
  const cmsEntries: MetadataRoute.Sitemap = pages
    .filter((page) => !page.seo?.noIndex)
    .map((page) => ({
      url: absoluteUrl(pagePath(page.slug)),
      lastModified: new Date(page.updatedAt),
      changeFrequency: page.slug === 'home' ? 'weekly' : 'monthly',
      priority: page.slug === 'home' ? 1 : 0.7,
    }))

  const cmsUrls = new Set(cmsEntries.map((entry) => entry.url))
  const staticEntries: MetadataRoute.Sitemap = Object.entries(SHARE_PAGES)
    .filter(([path, page]) => path !== '/' && !page.noIndex && !cmsUrls.has(absoluteUrl(path)))
    .map(([path]) => ({
      url: absoluteUrl(path),
      changeFrequency: 'yearly' as const,
      priority: ['/impressum', '/datenschutz', '/agb'].includes(path) ? 0.3 : 0.7,
    }))

  return [...cmsEntries, ...staticEntries]
}
