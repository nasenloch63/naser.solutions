"use client"

import Image from "next/image"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ContactForm } from "@/components/contact-form"

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section id="start" className="relative overflow-hidden pt-28 sm:pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-12 lg:gap-20 items-center">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-5">{t("hero.eyebrow")}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] font-display mb-6">Naser Solutions<span className="block mt-3 text-2xl md:text-3xl font-medium text-muted-foreground leading-tight">{t("hero.title1")}</span></h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">{t("hero.description")}</p>
          <div className="flex flex-wrap gap-x-7 gap-y-4 mb-10">
            <a href="#anfrage" className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">{t("hero.cta")}<ArrowDownRight className="size-4 rtl-flip" aria-hidden="true" /></a>
            <a href="#projekte" className="inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-foreground">{t("hero.refBtn")}<ArrowRight className="size-4 rtl-flip" aria-hidden="true" /></a>
          </div>
          <div className="border-t border-border pt-5 space-y-2 text-sm text-muted-foreground">
            <p className="text-foreground font-medium">{t("hero.trust")}</p>
            <p>{t("hero.regions")}</p>
          </div>
        </div>
        <div id="anfrage" className="min-w-0 scroll-mt-28 rounded-3xl border border-border/70 bg-card/70 p-4 shadow-[0_12px_48px_-24px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8 dark:bg-secondary/30">
          <div className="mb-6 flex items-center gap-4 sm:gap-5">
            <div aria-hidden="true" className="relative size-14 shrink-0 sm:size-24">
              <Image src="/images/logo-invertable.png" alt="" fill sizes="(min-width: 640px) 96px, 56px" className="object-contain opacity-80 dark:hidden" />
              <Image src="/images/inverted-20logo-20png.png" alt="" fill sizes="(min-width: 640px) 96px, 56px" className="hidden object-contain opacity-90 dark:block" />
            </div>
            <div className="min-w-0">
              <h2 className="mb-2 text-xl font-semibold leading-snug">{t("contact.form.title")}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{t("contact.form.intro")}</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
