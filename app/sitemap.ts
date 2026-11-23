import type { MetadataRoute } from 'next'
import { getPublishedPages } from '@/lib/cms'
import { absoluteUrl, pagePath, SHARE_PAGES } from '@/lib/seo'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = new Map<string, MetadataRoute.Sitemap[number]>()
  for (const [path, page] of Object.entries(SHARE_PAGES)) {
    if (!page.noIndex) entries.set(path, { url: absoluteUrl(path) })
  }

  for (const page of await getPublishedPages()) {
    const path = pagePath(page.slug)
    if (path !== '/' && Object.hasOwn(SHARE_PAGES, path)) continue
    if (page.seo?.noIndex) {
      entries.delete(path)
    } else {
      entries.set(path, { url: absoluteUrl(path), lastModified: page.updatedAt })
    }
  }

  return [...entries.values()]
}
