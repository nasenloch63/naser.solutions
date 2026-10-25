import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LegalModalProvider } from '@/components/legal-modal-provider'
import { localServices, type LocalService } from '@/lib/local-services'
import { jsonLd } from '@/lib/seo'
import { serviceSchema } from '@/lib/service-schema'

export function LocalServicePage({ service }: { service: LocalService }) {
  return (
    <LegalModalProvider>
      <Navbar />
      <main lang="de-DE" dir="ltr" className="min-h-screen bg-background pt-28 text-foreground sm:pt-36">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema(service)) }} />
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <nav aria-label="Brotkrumennavigation" className="mb-10 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <Link href="/" className="underline underline-offset-4">Startseite</Link><span aria-hidden="true">/</span>
            <Link href="/leistungen" className="underline underline-offset-4">Leistungen</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{service.heading}</span>
          </nav>
          <p className="mb-5 text-sm font-medium uppercase tracking-wider text-muted-foreground">{service.label}</p>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-balance wrap-anywhere hyphens-auto sm:text-5xl lg:text-6xl">{service.heading}</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{service.intro}</p>
          <Link href="/kontakt" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">Projekt besprechen <ArrowRight className="size-4" aria-hidden="true" /></Link>
          <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-2">
            {service.sections.map(section => <section key={section.heading}><h2 className="mb-4 font-display text-2xl font-semibold text-balance">{section.heading}</h2><p className="leading-relaxed text-muted-foreground">{section.text}</p></section>)}
          </div>
          <section className="my-14 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
            <h2 className="mb-4 font-display text-2xl font-semibold">{service.reference.heading}</h2>
            <p className="mb-5 leading-relaxed text-muted-foreground">{service.reference.text}</p>
            <Link href={service.reference.href} className="inline-flex min-h-11 items-center gap-2 font-medium underline underline-offset-4">{service.reference.link} <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </section>
          <section aria-labelledby="service-questions">
            <h2 id="service-questions" className="mb-6 font-display text-3xl font-semibold">Häufige Fragen</h2>
            <div className="space-y-4">{service.faqs.map(faq => <details key={faq.question} className="rounded-xl border border-border p-5"><summary className="cursor-pointer rounded font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{faq.question}</summary><p className="mt-4 leading-relaxed text-muted-foreground">{faq.answer}</p></details>)}</div>
          </section>
          <nav aria-label="Weitere Leistungen in Kassel" className="mt-14 border-t border-border pt-8">
            <h2 className="mb-4 text-xl font-semibold">Weitere Leistungen in Kassel</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3">{localServices.filter(item => item.slug !== service.slug).map(item => <Link key={item.slug} href={`/${item.slug}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{item.heading}</Link>)}</div>
            <Link href="/kontakt" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground">Kontakt zu Naser Solutions <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </nav>
        </div>
      </main>
      <Footer />
    </LegalModalProvider>
  )
}
