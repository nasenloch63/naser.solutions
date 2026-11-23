'use client'

import { AboutSection } from '@/components/about-section'
import { CertificatesSection } from '@/components/certificates-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { LegalModalProvider } from '@/components/legal-modal-provider'
import { Navbar } from '@/components/navbar'
import { ProjectsSection } from '@/components/projects-section'
import { ServicesSection } from '@/components/services-section'
import { useLanguage } from '@/components/language-provider'
import Link from '@/components/site-link'
import { certificatesSlug, type SectionSlug } from '@/lib/section-pages'
import { cn } from '@/lib/utils'
import type { PortfolioProject, PortfolioSection } from '@/lib/portfolio'

const sections = {
  'ueber-uns': { Component: AboutSection, title: 'nav.about' },
  [certificatesSlug]: { Component: CertificatesSection, title: null },
  leistungen: { Component: ServicesSection, title: 'nav.services' },
  projekte: { Component: ProjectsSection, title: 'nav.projects' },
  kontakt: { Component: ContactSection, title: 'nav.contact' },
}

export function SectionPage({ slug, portfolio = [], portfolioSection }: { slug: SectionSlug; portfolio?: PortfolioProject[]; portfolioSection?: PortfolioSection }) {
  const { t } = useLanguage()
  const { Component, title } = sections[slug]
  const aboutTabs = [
    { slug: 'ueber-uns', label: t('nav.about') },
    { slug: certificatesSlug, label: 'Zertifikate', lang: 'de' },
  ]

  return (
    <LegalModalProvider>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        {(slug === 'ueber-uns' || slug === certificatesSlug) && (
          <nav aria-label={t('nav.about')} className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap gap-2 border-b border-border">
              {aboutTabs.map(tab => (
                <li key={tab.slug}>
                  <Link
                    href={`/${tab.slug}`}
                    lang={tab.lang}
                    aria-current={slug === tab.slug ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-11 items-center border-b-2 px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                      slug === tab.slug ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {title && <h1 className="sr-only">{t(title)}</h1>}
        <Component projects={portfolio} section={portfolioSection} />
      </main>
      <Footer />
    </LegalModalProvider>
  )
}
