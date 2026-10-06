import type { Metadata } from 'next'
import { staffPreviewEnabled } from '@/lib/cms-preview'
import { PreviewBanner } from '@/components/cms/preview-banner'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/footer'
import { LegalModalProvider } from '@/components/legal-modal-provider'
import { Navbar } from '@/components/navbar'
import { PageRenderer } from '@/components/cms/page-renderer'
import { SectionPage } from '@/components/section-page'
import { isSectionSlug } from '@/lib/section-pages'
import { getPageBySlug, getProjects, getPortfolio, getPortfolioSection } from '@/lib/cms'
import { paymentServicesCopy } from '@/lib/payment-services-copy'
import { profileCopy } from '@/lib/profile-copy'
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
  absoluteUrl,
  jsonLd,
  metadataForPage,
  pagePath,
  publicPageMetadata,
  richTextToPlainText,
} from '@/lib/seo'

type Props = { params: Promise<{ slug?: string[] }> }

function toSlug(parts?: string[]) {
  return parts?.join('/') || 'home'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pageSlug = toSlug(slug)
  const preview = await staffPreviewEnabled()
  if (isSectionSlug(pageSlug)) return { ...publicPageMetadata(`/${pageSlug}`), ...(preview ? { robots: { index: false, follow: false } } : {}) }
  const page = await getPageBySlug(pageSlug)
  if (!page) return {}

  return { ...metadataForPage(page), ...(preview ? { robots: { index: false, follow: false } } : {}) }
}

export default async function CMSPage({ params }: Props) {
  const [{ slug }, preview] = await Promise.all([params, staffPreviewEnabled()])
  const pageSlug = toSlug(slug)
  if (isSectionSlug(pageSlug)) {
    const [portfolio, section] = pageSlug === 'projekte' ? await Promise.all([getPortfolio(preview), getPortfolioSection(preview)]) : [[], undefined]
    return <>{preview && <PreviewBanner />}<SectionPage slug={pageSlug} portfolio={portfolio} portfolioSection={section} /></>
  }
  const page = await getPageBySlug(pageSlug, preview)
  if (!page) notFound()

  const [projects, portfolio, portfolioSection] = page.layout.some((block) => block.blockType === 'projects') ? await Promise.all([getProjects(preview), getPortfolio(preview), getPortfolioSection(preview)]) : [[], [], undefined]
  const canonical = absoluteUrl(pagePath(page.slug))
  const isHome = page.slug === 'home'
  const faqBlocks = page.layout.filter((block) => block.blockType === 'faq')
  const services = [
    ...(['web', 'integrations', 'seo', 'social', 'design', 'care'] as const).map(service => [
      profileCopy.de[`services.${service}.title`],
      profileCopy.de[`services.${service}.description`],
    ]),
    [paymentServicesCopy.de['services.cryptoPayments.title'], paymentServicesCopy.de['services.cryptoPayments.description']],
    [paymentServicesCopy.de['services.sumup.title'], paymentServicesCopy.de['services.sumup.description']],
  ]
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: isHome ? SITE_NAME : page.title,
      description: isHome ? DEFAULT_DESCRIPTION : page.seo?.description || undefined,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'de-DE',
    },
  ]

  if (isHome) {
    graph.push(
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.png') },
        image: SOCIAL_IMAGE,
        description: DEFAULT_DESCRIPTION,
        email: BUSINESS_EMAIL,
        telephone: BUSINESS_PHONE,
        founder: { '@type': 'Person', name: 'Yasin Adam Aissani' },
        areaServed: { '@type': 'City', name: 'Kassel' },
        sameAs: ['https://instagram.com/naser.solutions', 'https://www.facebook.com/profile.php?id=61588221712388'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'de-DE',
      },
      ...services.map(([name, description], index) => ({
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-${index + 1}`,
        name,
        description,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Kassel' },
      })),
    )
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: page.title, item: canonical },
      ],
    })
  }

  const faqItems = faqBlocks.flatMap((block) => block.items || [])
  if (faqItems.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: richTextToPlainText(item.answer) },
      })),
    })
  }

  return (
    <LegalModalProvider>
      {preview && <PreviewBanner />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ '@context': 'https://schema.org', '@graph': graph }) }} />
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <PageRenderer initialPage={page} projects={projects} portfolio={portfolio} portfolioSection={portfolioSection} />
        <Footer />
      </main>
    </LegalModalProvider>
  )
}
