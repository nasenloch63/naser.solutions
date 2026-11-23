"use client"

import { ArrowUpRight, Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import Link from "@/components/site-link"
import { useLanguage } from "@/components/language-provider"
import { ContactForm } from "@/components/contact-form"
import { CopyButton } from "@/components/copy-button"

export function ContactSection({ showForm = true }: { showForm?: boolean }) {
  const { t } = useLanguage()
  return (
    <section id="kontakt" className="pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
        <div className="min-w-0">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance mb-5">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty mb-6">
            {t("contact.description")}
          </p>
          {!showForm && (
            <Link
              href="/#anfrage"
              className="studio-link inline-flex min-h-11 items-center gap-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {t("hero.cta")}
              <ArrowUpRight className="size-4 rtl-flip" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="space-y-6 min-w-0">
          <div className="grid gap-3.5 text-base">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/70 px-4 py-2 backdrop-blur-md transition-colors hover:border-foreground/35">
              <a href="mailto:info@naser-solutions.de" className="flex min-h-11 min-w-0 items-center gap-3 break-all font-medium">
                <Mail className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />info@naser-solutions.de
              </a>
              <CopyButton value="info@naser-solutions.de" label="info@naser-solutions.de" />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/70 px-4 py-2 backdrop-blur-md transition-colors hover:border-foreground/35">
              <a href="tel:+4915560729886" className="flex min-h-11 min-w-0 items-center gap-3 font-medium tabular-nums">
                <Phone className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" /><bdi>+49 15560 729886</bdi>
              </a>
              <CopyButton value="+4915560729886" label="+49 15560 729886" />
            </div>
            <p className="flex min-h-11 items-center gap-3 px-4 text-muted-foreground">
              <MapPin className="size-5 shrink-0" aria-hidden="true" />{t("contact.city")}
            </p>
            <a
              href="https://wa.me/4915560729886"
              target="_blank"
              rel="noopener noreferrer"
              className="studio-link ms-4 inline-flex min-h-11 w-fit items-center gap-3 font-medium"
            >
              <MessageCircle className="size-5 shrink-0" aria-hidden="true" />{t("contact.whatsapp")}
            </a>
          </div>

          {showForm && (
            <div className="glass-surface rounded-3xl border border-border/75 bg-card/75 p-5 backdrop-blur-xl sm:p-7 dark:bg-secondary/30">
              <h3 className="font-display text-xl font-semibold mb-4">{t("contact.form.title")}</h3>
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
