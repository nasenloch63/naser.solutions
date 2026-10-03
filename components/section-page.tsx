'use client'

import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { LegalModalProvider } from '@/components/legal-modal-provider'
import { Navbar } from '@/components/navbar'
import { ProjectsSection } from '@/components/projects-section'
import { ServicesSection } from '@/components/services-section'
import { useLanguage } from '@/components/language-provider'
import type { SectionSlug } from '@/lib/section-pages'

const sections = {
  'ueber-uns': { Component: AboutSection, title: 'nav.about' },
  leistungen: { Component: ServicesSection, title: 'nav.services' },
  projekte: { Component: ProjectsSection, title: 'nav.projects' },
  kontakt: { Component: ContactSection, title: 'nav.contact' },
}

export function SectionPage({ slug }: { slug: SectionSlug }) {
  const { t } = useLanguage()
  const { Component, title } = sections[slug]

  return (
    <LegalModalProvider>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        <h1 className="sr-only">{t(title)}</h1>
        <Component />
      </main>
      <Footer />
    </LegalModalProvider>
  )
}
