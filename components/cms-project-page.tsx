"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Code2, LayoutDashboard } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalModalProvider } from "@/components/legal-modal-provider"
import { useLanguage } from "@/components/language-provider"
import { cmsProjectCopy } from "@/lib/cms-project-copy"

export function CMSProjectPage() {
  const { language } = useLanguage()
  const copy = cmsProjectCopy[language]

  return (
    <LegalModalProvider>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 sm:pt-36">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Link href="/#projekte" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {copy.back}
          </Link>
          <header className="border-b border-border py-10 sm:py-14">
            <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Naser Solutions · {copy.status}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold break-words">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>
          </header>
          <section className="grid gap-6 border-b border-border py-10 sm:grid-cols-[1fr_2fr]" aria-labelledby="open-source">
            <h2 id="open-source" className="flex items-start gap-3 text-xl font-semibold">
              <Code2 className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />{copy.openTitle}
            </h2>
            <div className="space-y-5 leading-relaxed text-muted-foreground">
              <p>{copy.openBody}</p>
              <a href="https://opensource.org/osd" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-foreground">
                Open Source Initiative <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </section>
          <section className="grid gap-6 border-b border-border py-10 sm:grid-cols-[1fr_2fr]" aria-labelledby="cms">
            <h2 id="cms" className="text-xl font-semibold">{copy.cmsTitle}</h2>
            <p className="leading-relaxed text-muted-foreground">{copy.cmsBody}</p>
          </section>
          <section className="grid gap-6 border-b border-border py-10 sm:grid-cols-[1fr_2fr]" aria-labelledby="edits">
            <h2 id="edits" className="text-xl font-semibold">{copy.editTitle}</h2>
            <ul className="space-y-4">
              {copy.edits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
          </section>
          <section className="py-10 sm:py-14">
            <p className="max-w-3xl leading-relaxed text-muted-foreground">{copy.scope}</p>
            <Link href="/#kontakt" className="mt-6 inline-flex items-center gap-3 font-medium underline underline-offset-4">
              {copy.contact}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </LegalModalProvider>
  )
}
