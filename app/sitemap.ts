import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/cms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://www.naser-solutions.de',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.naser-solutions.de/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.naser-solutions.de/impressum',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.naser-solutions.de/datenschutz',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.naser-solutions.de/agb',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.naser-solutions.de/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
