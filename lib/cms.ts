import config from '@payload-config'
import { cache } from 'react'
import { getPayload } from 'payload'
import type { BlogPost, Page, Project, SiteSetting } from '@/payload-types'

export const getCMS = cache(() => getPayload({ config }))

export const getPageBySlug = cache(async (slug: string, draft = false): Promise<Page | null> => {
  const payload = await getCMS()
  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] ?? null
})

export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await getCMS()
  const result = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    sort: 'order',
    where: { _status: { equals: 'published' } },
  })

  return result.docs
})

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const payload = await getCMS()
  const result = await payload.find({
    collection: 'blog-posts',
    depth: 2,
    limit: 100,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })

  return result.docs
})

export const getBlogPostBySlug = cache(async (slug: string, draft = false): Promise<BlogPost | null> => {
  const payload = await getCMS()
  const result = await payload.find({
    collection: 'blog-posts',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] ?? null
})

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getCMS()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})
