import type { Metadata } from 'next'
import type { Page } from '@/payload-types'

export const SITE_URL = 'https://www.naser-solutions.de'
export const SITE_NAME = 'Naser Solutions'
export const DEFAULT_TITLE = 'Webdesign & Webentwicklung in Kassel | Naser Solutions'
export const DEFAULT_DESCRIPTION =
  'Webdesign & Webentwicklung in Kassel: individuelle Websites, SEO & GEO und passende Integrationen. Naser Solutions begleitet dein Projekt persönlich.'
export function socialImageUrl(path = '/') {
  return `${SITE_URL}/og${path === '/ueber-uns' ? '/ueber-uns' : ''}?v=3`
}
export const SOCIAL_IMAGE = socialImageUrl()
export const BUSINESS_EMAIL = 'info@naser-solutions.de'
export const BUSINESS_PHONE = '+49 15560 729886'

export const SHARE_PAGES: Record<string, { title: string; description: string; headline: string; label: string; noIndex?: boolean }> = {
  '/': { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, headline: 'Webdesign. Entwicklung. Persönlich.', label: 'WEBAGENTUR · KASSEL' },
  '/ueber-uns': { title: 'Über mich – Yasin Adam Aissani | Naser Solutions', description: 'Lerne Yasin Adam Aissani kennen: den Menschen hinter Naser Solutions, seinen Weg in die Webentwicklung und sein persönliches Netzwerk.', headline: 'Der Mensch hinter Naser Solutions.', label: 'YASIN ADAM AISSANI' },
  '/leistungen': { title: 'Leistungen für deinen digitalen Auftritt | Naser Solutions', description: 'Webdesign & Webentwicklung, SEO & GEO, Social Media, Cinematic Reels und Automatisierung: Entdecke die Leistungen von Naser Solutions aus Kassel.', headline: 'Dein digitaler Auftritt. Durchdacht umgesetzt.', label: 'UNSERE LEISTUNGEN' },
  '/projekte': { title: 'Projekte & Referenzen | Naser Solutions', description: 'Entdecke Webdesign-Projekte, digitale Markenauftritte und Arbeiten von Naser Solutions.', headline: 'Ideen werden zu digitalen Erlebnissen.', label: 'PROJEKTE & REFERENZEN' },
  '/kontakt': { title: 'Kontakt & Projektanfrage | Naser Solutions', description: 'Sprich mit Yasin Adam Aissani über deine Website-Idee. Persönlicher Kontakt zu Naser Solutions per E-Mail, Telefon oder WhatsApp.', headline: 'Lass uns über dein Projekt sprechen.', label: 'PERSÖNLICHER KONTAKT' },
  '/CMS': { title: 'CMS & Kunden-Dashboard | Naser Solutions', description: 'Naser Solutions entwickelt ein CMS-Dashboard, mit dem Kunden kleine Website-Änderungen selbst vornehmen können. Einblicke in das Open-Source-Projekt.', headline: 'Deine Website. Selbst im Griff.', label: 'CMS & KUNDEN-DASHBOARD' },
  '/links': { title: 'Links | Naser Solutions', description: 'Offizielle Links, Social-Media-Profile und Kontaktkanäle von Naser Solutions.', headline: 'Alle Links. Ein Kontakt.', label: 'NASER SOLUTIONS · LINKS', noIndex: true },
  '/impressum': { title: 'Impressum | Naser Solutions', description: 'Anbieterkennzeichnung und Kontaktinformationen von Naser Solutions.', headline: 'Impressum & Kontaktinformationen.', label: 'RECHTLICHE INFORMATIONEN' },
  '/datenschutz': { title: 'Datenschutz | Naser Solutions', description: 'Informationen zum Datenschutz bei Naser Solutions und zur Verarbeitung personenbezogener Daten.', headline: 'Deine Daten. Transparent erklärt.', label: 'DATENSCHUTZ' },
  '/agb': { title: 'AGB | Naser Solutions', description: 'Allgemeine Geschäftsbedingungen für digitale Dienstleistungen von Naser Solutions.', headline: 'Klare Regeln für die Zusammenarbeit.', label: 'ALLGEMEINE GESCHÄFTSBEDINGUNGEN' },
  '/portal': { title: 'Kundenportal | Naser Solutions', description: 'Geschützter Kundenbereich von Naser Solutions.', headline: 'Dein Projekt. Alles im Blick.', label: 'KUNDENPORTAL', noIndex: true },
}

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
  image,
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt = title,
  imageType = 'image/png',
}: {
  title: string
  description: string
  path?: string
  noIndex?: boolean
  image?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  imageType?: string
}): Metadata {
  const canonical = absoluteUrl(path)
  const imageUrl = absoluteUrl(image || socialImageUrl(path))

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
      images: [{ url: imageUrl, secureUrl: imageUrl, width: imageWidth, height: imageHeight, alt: imageAlt, type: imageType }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: imageUrl, alt: imageAlt }] },
  }
}

export function publicPageMetadata(path: string): Metadata {
  const page = SHARE_PAGES[path]
  return buildMetadata({ ...page, path })
}

export function metadataForPage(page: Page): Metadata {
  const isHome = page.slug === 'home'
  const title = isHome ? DEFAULT_TITLE : page.seo?.title || `${page.title} | ${SITE_NAME}`
  const description = isHome ? DEFAULT_DESCRIPTION : page.seo?.description || `${page.title}: Informationen und digitale Leistungen von Naser Solutions aus Kassel.`
  return buildMetadata({
    title,
    description,
    path: pagePath(page.slug),
    noIndex: Boolean(page.seo?.noIndex),
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
