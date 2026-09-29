"use client"

import Link from "next/link"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ContactForm } from "@/components/contact-form"

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section id="start" className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-5">{t("hero.eyebrow")}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] font-display mb-6">Naser Solutions<span className="block mt-3 text-2xl md:text-3xl font-medium text-muted-foreground leading-tight">{t("hero.title1")}</span></h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">{t("hero.description")}</p>
          <div className="flex flex-wrap gap-x-7 gap-y-4 mb-10">
            <Link href="#anfrage" className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">{t("hero.cta")}<ArrowDownRight className="size-4 rtl-flip" aria-hidden="true" /></Link>
            <Link href="#projekte" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">{t("hero.refBtn")}<ArrowRight className="size-4 rtl-flip" aria-hidden="true" /></Link>
          </div>
          <div className="border-t border-border pt-5 space-y-2 text-sm text-muted-foreground">
            <p className="text-foreground font-medium">{t("hero.trust")}</p>
            <p>{t("hero.regions")}</p>
          </div>
        </div>
        <div id="anfrage" className="min-w-0 scroll-mt-28 lg:border-s border-border lg:ps-8">
          <h2 className="text-xl font-semibold mb-2">{t("contact.form.title")}</h2>
          <p className="text-sm text-muted-foreground mb-5">{t("contact.form.intro")}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
