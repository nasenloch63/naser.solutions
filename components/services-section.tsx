"use client"

import Link from "next/link"
import { ArrowUpRight, Globe, Target, AppWindow, Workflow, Server, HeartHandshake, Plus, ReceiptText, CreditCard } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { serviceCatalog } from "@/lib/service-catalog"
import { servicePricingCopy } from "@/lib/service-pricing-copy"
import { nfcCardsCopy } from "@/lib/nfc-cards-copy"

const icons = [Globe, Target, AppWindow, Workflow, Server, HeartHandshake]

export function ServicesSection() {
  const { language, t } = useLanguage()
  const pricing = servicePricingCopy[language]
  const nfc = nfcCardsCopy[language]
  const priceExamples = [
    { title: pricing.entry, amount: "100–500 €" },
    { title: pricing.integrations, amount: "500–2.000 €" },
    { title: pricing.app, amount: "1.000–10.000 €" },
  ]

  return (
    <section id="leistungen" aria-labelledby="services-title" className="scroll-mt-20 bg-secondary/40 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 sm:mb-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span aria-hidden="true" className="h-px w-8 bg-current" />{t("services.label")}
            </p>
            <h2 id="services-title" className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("services.title")}
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t("services.description")}</p>
            <Link href="/kontakt" className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-foreground text-sm font-semibold transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
              {t("hero.cta")}<ArrowUpRight className="size-4 rtl-flip" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceCatalog[language].map((group, index) => {
            const Icon = icons[index]
            const featured = index === 1
            return (
              <article key={index} className={`relative min-w-0 overflow-hidden rounded-2xl border p-6 sm:p-8 ${featured ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}>
                <div className="mb-8 flex items-center justify-between">
                  <span className={`flex size-11 items-center justify-center rounded-full border ${featured ? "border-background/25" : "border-border"}`}>
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span aria-hidden="true" className={`font-mono text-xs ${featured ? "text-background/60" : "text-muted-foreground"}`}>0{index + 1}</span>
                </div>
                <h3 className="mb-5 font-display text-2xl font-semibold leading-tight tracking-tight wrap-anywhere">{group.title}</h3>
                <ul className={`divide-y ${featured ? "divide-background/15" : "divide-border"}`}>
                  {group.items.map(item => (
                    <li key={item} className={`flex gap-3 py-3 text-sm leading-relaxed ${featured ? "text-background/85" : "text-muted-foreground"}`}>
                      <span aria-hidden="true" className={`mt-2 size-1 shrink-0 rounded-full ${featured ? "bg-background/60" : "bg-foreground/40"}`} />
                      <span className="min-w-0 wrap-anywhere">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(["cryptoPayments", "sumup"] as const).map(service => (
            <details key={service} className="group rounded-2xl border border-border bg-background px-6 sm:px-8">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                {t(`services.${service}.title`)}
                <Plus className="size-4 shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
              </summary>
              <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{t(`services.${service}.description`)}</p>
            </details>
          ))}
        </div>

        <div id="nfc-cards" className="mt-4 grid scroll-mt-24 gap-6 rounded-2xl border border-border bg-background p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <h3 className="flex items-center gap-3 font-display text-xl font-semibold">
              <CreditCard className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />{nfc.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{nfc.description}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="min-w-0 rounded-xl bg-secondary/50 p-4 sm:p-5">
              <dt className="text-sm font-medium">{nfc.single}</dt>
              <dd className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-xs text-muted-foreground">{pricing.from}</span>
                <span dir="ltr" className="font-display text-2xl font-semibold whitespace-nowrap">20 €</span>
              </dd>
            </div>
            <div className="min-w-0 rounded-xl border border-border bg-secondary/50 p-4 sm:p-5">
              <dt className="text-sm font-medium">{nfc.bundle}</dt>
              <dd className="mt-3">
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span dir="ltr" className="font-display text-2xl font-semibold whitespace-nowrap">10 €</span>
                  <span className="text-xs text-muted-foreground">{nfc.perCard}</span>
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{nfc.bundleTotal}</span>
              </dd>
            </div>
          </dl>
        </div>

        <nav lang="de-DE" dir="ltr" aria-label="Leistungen in Kassel" className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground sm:text-sm">
          {[
            ["/webagentur-kassel", "Webagentur Kassel"],
            ["/digital-marketing-kassel", "Digital Marketing Kassel"],
            ["/anwendungsentwicklung-kassel", "Anwendungsentwicklung Kassel"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 transition-colors hover:text-foreground">
              {label}<ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <div className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-12">
          <div className="mb-7 grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
            <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{pricing.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{pricing.description}</p>
          </div>
          <dl className="grid gap-4 md:grid-cols-3">
            {priceExamples.map((example, index) => (
              <div key={example.title} className="flex min-w-0 flex-col rounded-2xl border border-border bg-background p-6 sm:p-8 md:p-5 lg:p-7">
                <dt className="flex flex-1 items-start gap-3 text-sm font-medium leading-relaxed">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-xs text-muted-foreground">0{index + 1}</span>{example.title}
                </dt>
                <dd dir="ltr" className="mt-8 font-display text-3xl md:text-xl lg:text-2xl xl:text-3xl font-semibold tracking-tight whitespace-nowrap">{example.amount}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-start gap-2 text-sm font-medium">
                <ReceiptText className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{pricing.invoice}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{pricing.note}</p>
            </div>
            <Link href="/kontakt" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4">
              {t("hero.cta")}<ArrowUpRight className="size-4 rtl-flip" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
