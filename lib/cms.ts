import config from '@payload-config'
import { cache } from 'react'
import { getPayload } from 'payload'
import type { Page, Project, SiteSetting } from '@/payload-types'
import { isLocalPreview, previewHome } from '@/lib/local-preview'
import { previewPortfolio, previewPortfolioSection } from './portfolio-preview-data'
import type { PortfolioProject, PortfolioSection } from './portfolio'

export const getCMS = cache(() => getPayload({ config }))

export const getPageBySlug = cache(async (slug: string, draft = false): Promise<Page | null> => {
  if (isLocalPreview) return slug === 'home' ? previewHome : null
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

export const getPublishedPages = cache(async (): Promise<Page[]> => {
  if (isLocalPreview) return [previewHome]
  const payload = await getCMS()
  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 100,
    sort: 'slug',
    where: { _status: { equals: 'published' } },
  })

  return result.docs
})

export const getProjects = cache(async (draft = false): Promise<Project[]> => {
  if (isLocalPreview) return []
  const payload = await getCMS()
  const result = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    sort: 'order',
    draft,
    overrideAccess: true,
    where: { and: [{ showInPortfolio: { not_equals: false } }, ...(draft ? [] : [{ _status: { equals: 'published' } }])] },
  })

  return result.docs
})

export const getPortfolio = cache(async (draft = false): Promise<PortfolioProject[]> => {
  if (isLocalPreview) return previewPortfolio
  const result = await (await getCMS()).find({ collection: 'projects', locale: 'all', depth: 1, limit: 1000, sort: 'order', draft, overrideAccess: true, where: { and: [{ showInPortfolio: { not_equals: false } }, ...(draft ? [] : [{ _status: { equals: 'published' } }])] } })
  return result.docs.map(project => {
    const image = typeof project.thumbnail === 'object' ? project.thumbnail : null
    return { id: project.id, title: project.title, description: project.description, url: project.url, category: project.category, tags: project.tags?.map(tag => tag.label) || [], order: project.order, image: image?.url, alt: image?.alt, containImage: project.containImage }
  })
})

export const getPortfolioSection = cache(async (draft = false): Promise<PortfolioSection | undefined> => {
  if (isLocalPreview) return previewPortfolioSection
  const result = await (await getCMS()).find({ collection: 'pages', locale: 'all', depth: 0, draft, overrideAccess: true, limit: 1, where: { and: [{ slug: { equals: 'home' } }, ...(draft ? [] : [{ _status: { equals: 'published' } }])] } })
  return result.docs[0]?.layout.find(block => block.blockType === 'projects') as PortfolioSection | undefined
})

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getCMS()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})
