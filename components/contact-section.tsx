"use client"

import { ArrowUpRight, Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ContactForm } from "@/components/contact-form"

export function ContactSection({ showForm = true }: { showForm?: boolean }) {
  const { t } = useLanguage()
  return (
    <section id="kontakt" className="py-16 sm:py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-12">
        <div>
          <p className="text-sm text-muted-foreground mb-4">{t("contact.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">{t("contact.title")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t("contact.description")}</p>
          {!showForm && <a href="#anfrage" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 font-medium">{t("hero.cta")}<ArrowUpRight className="size-4 rtl-flip" aria-hidden="true" /></a>}
        </div>
        <div className="space-y-6 min-w-0">
          <div className="grid gap-5 text-base">
            <a href="mailto:info@naser-solutions.de" className="flex min-h-11 items-center gap-3 break-all"><Mail className="size-5 shrink-0" aria-hidden="true" />info@naser-solutions.de</a>
            <a href="tel:+4915560729886" className="flex min-h-11 items-center gap-3"><Phone className="size-5 shrink-0" aria-hidden="true" /><bdi>+49 15560 729886</bdi></a>
            <p className="flex items-center gap-3 text-muted-foreground"><MapPin className="size-5 shrink-0" aria-hidden="true" />{t("contact.city")}</p>
            <a href="https://wa.me/4915560729886" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4"><MessageCircle className="size-5 shrink-0" aria-hidden="true" />{t("contact.whatsapp")}</a>
          </div>
          {showForm && <><h3 className="text-xl font-semibold pt-5">{t("contact.form.title")}</h3><ContactForm /></>}
        </div>
      </div>
    </section>
  )
}
