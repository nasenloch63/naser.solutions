"use client"

import { Globe, TrendingUp, Palette, Workflow, Megaphone, Wrench, Wallet, CreditCard, ReceiptText } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"
import { servicePricingCopy } from "@/lib/service-pricing-copy"

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { language, t } = useLanguage()
  const pricing = servicePricingCopy[language]
  const priceExamples = [
    { title: pricing.entry, prefix: pricing.from, amount: "200–400 €" },
    { title: pricing.integrations, prefix: pricing.upTo, amount: "2.000 €" },
    { title: pricing.app, prefix: pricing.upTo, amount: "5.000 €" },
  ]

  const services = [
    { icon: Globe, titleKey: "services.web.title", descriptionKey: "services.web.description" },
    { icon: Workflow, titleKey: "services.integrations.title", descriptionKey: "services.integrations.description" },
    { icon: TrendingUp, titleKey: "services.seo.title", descriptionKey: "services.seo.description" },
    { icon: Megaphone, titleKey: "services.social.title", descriptionKey: "services.social.description" },
    { icon: Palette, titleKey: "services.design.title", descriptionKey: "services.design.description" },
    { icon: Wrench, titleKey: "services.care.title", descriptionKey: "services.care.description" },
    { icon: Wallet, titleKey: "services.cryptoPayments.title", descriptionKey: "services.cryptoPayments.description" },
    { icon: CreditCard, titleKey: "services.sumup.title", descriptionKey: "services.sumup.description" },
  ]

  return (
    <section id="leistungen" className="pt-12 pb-16 sm:pb-24 lg:pt-16 lg:pb-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-3xl mb-10 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="text-muted-foreground text-lg mb-4 tracking-wide uppercase">{t("services.label")}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t("services.title")}
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">{t("services.description")}</p>
        </div>

        <div className="mb-10 sm:mb-16 rounded-2xl border border-primary/20 bg-background p-5 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">{pricing.title}</h3>
          <p className="mt-3 max-w-3xl text-base text-muted-foreground leading-relaxed">{pricing.description}</p>
          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            {priceExamples.map((example) => (
              <div key={example.title} className="min-w-0 rounded-xl bg-secondary/50 p-5">
                <dt className="text-base font-medium text-foreground">{example.title}</dt>
                <dd className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-sm text-muted-foreground">{example.prefix}</span>
                  <span dir="ltr" className="text-3xl font-semibold tracking-tight text-foreground whitespace-nowrap">{example.amount}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 flex items-start gap-2 text-base font-medium text-foreground">
            <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            {pricing.invoice}
          </p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pricing.note}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`min-w-0 bg-background p-5 sm:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-700 group hover:shadow-lg hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(service.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
