import type { MetadataRoute } from 'next'
import { getPublishedPages } from '@/lib/cms'
import { absoluteUrl, pagePath } from '@/lib/seo'

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
  const staticEntries: MetadataRoute.Sitemap = [
    ['/impressum', 0.3],
    ['/datenschutz', 0.3],
    ['/agb', 0.3],
  ]
    .filter(([path]) => !cmsUrls.has(absoluteUrl(String(path))))
    .map(([path, priority]) => ({
      url: absoluteUrl(String(path)),
      changeFrequency: 'yearly' as const,
      priority: Number(priority),
    }))

  return [...cmsEntries, ...staticEntries]
}
