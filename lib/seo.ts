import type { Metadata } from 'next'
import type { Page } from '@/payload-types'

export const SITE_URL = 'https://www.naser-solutions.de'
export const SITE_NAME = 'Naser Solutions'
export const DEFAULT_TITLE = 'Webdesign, Webentwicklung & SEO in Kassel | Naser Solutions'
export const DEFAULT_DESCRIPTION =
  'Naser Solutions ist eine Digitalagentur aus Kassel für Webdesign, Webentwicklung, SEO, Social Media, Branding und digitale Lösungen.'
export const SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`
export const BUSINESS_EMAIL = 'info@naser-solutions.de'
export const BUSINESS_PHONE = '+49 15560 729886'

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  return new URL(path.startsWith('/') ? path : `/${path}`, SITE_URL).toString()
}

export function pagePath(slug: string) {
  return slug === 'home' ? '/' : `/${slug}`
}

export function buildMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
  image = SOCIAL_IMAGE,
}: {
  title: string
  description: string
  path?: string
  noIndex?: boolean
  image?: string
}): Metadata {
  const canonical = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: SITE_NAME,
      url: canonical,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${SITE_NAME} – Digitalagentur aus Kassel` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [imageUrl] },
  }
}

export function metadataForPage(page: Page): Metadata {
  const isHome = page.slug === 'home'
  const title = isHome ? DEFAULT_TITLE : page.seo?.title || `${page.title} | ${SITE_NAME}`
  const description = isHome ? DEFAULT_DESCRIPTION : page.seo?.description || `${page.title}: Informationen und digitale Leistungen von Naser Solutions aus Kassel.`
  const cmsImage = typeof page.seo?.image === 'object' ? page.seo.image?.url : null

  return buildMetadata({
    title,
    description,
    path: pagePath(page.slug),
    noIndex: Boolean(page.seo?.noIndex),
    image: cmsImage || SOCIAL_IMAGE,
  })
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function richTextToPlainText(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  if (Array.isArray(value)) return value.map(richTextToPlainText).filter(Boolean).join(' ')
  const node = value as Record<string, unknown>
  const ownText = typeof node.text === 'string' ? node.text : ''
  const childText = Object.entries(node)
    .filter(([key]) => key !== 'text')
    .map(([, child]) => richTextToPlainText(child))
    .filter(Boolean)
    .join(' ')
  return `${ownText} ${childText}`.replace(/\s+/g, ' ').trim()
}
