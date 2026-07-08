"use client"

import { Globe, Smartphone, TrendingUp, Palette, Store, Megaphone, Sparkles } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { t } = useLanguage()

  const services = [
    {
      icon: Globe,
      titleKey: "services.web.title",
      descriptionKey: "services.web.description",
    },
    {
      icon: Smartphone,
      titleKey: "services.influencer.title",
      descriptionKey: "services.influencer.description",
    },
    {
      icon: Store,
      titleKey: "services.supermarket.title",
      descriptionKey: "services.supermarket.description",
    },
    {
      icon: Megaphone,
      titleKey: "services.social.title",
      descriptionKey: "services.social.description",
    },
    {
      icon: Palette,
      titleKey: "services.design.title",
      descriptionKey: "services.design.description",
    },
    {
      icon: TrendingUp,
      titleKey: "services.seo.title",
      descriptionKey: "services.seo.description",
    },
    {
      icon: Sparkles,
      titleKey: "services.ai.title",
      descriptionKey: "services.ai.description",
    },
  ]

  return (
    <section id="leistungen" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-3xl mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="text-muted-foreground text-lg mb-4 tracking-wide uppercase">{t("services.label")}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{t("services.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-background p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-700 group hover:shadow-lg hover:-translate-y-1 ${
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
