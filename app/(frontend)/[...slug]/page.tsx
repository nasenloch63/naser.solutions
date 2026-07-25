import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/footer'
import { LegalModalProvider } from '@/components/legal-modal-provider'
import { Navbar } from '@/components/navbar'
import { PageRenderer } from '@/components/cms/page-renderer'
import { getPageBySlug, getProjects } from '@/lib/cms'

type Props = { params: Promise<{ slug?: string[] }> }

function toSlug(parts?: string[]) {
  return parts?.join('/') || 'home'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(toSlug(slug))
  if (!page) return {}

  const image = typeof page.seo?.image === 'object' ? page.seo.image : null
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || undefined,
    openGraph: image?.url ? { images: [{ url: image.url, alt: image.alt }] } : undefined,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function CMSPage({ params }: Props) {
  const [{ slug }, draft] = await Promise.all([params, draftMode()])
  const page = await getPageBySlug(toSlug(slug), draft.isEnabled)
  if (!page) notFound()

  const projects = page.layout.some((block) => block.blockType === 'projects') ? await getProjects() : []

  return (
    <LegalModalProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <PageRenderer initialPage={page} projects={projects} />
        <Footer />
      </main>
    </LegalModalProvider>
  )
}
