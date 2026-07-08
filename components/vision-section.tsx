"use client"

import { Rocket, Target, Lightbulb, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function VisionSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const { t } = useLanguage()

  const pillars = [
    {
      icon: Rocket,
      titleKey: "vision.innovation.title",
      descriptionKey: "vision.innovation.description",
    },
    {
      icon: Target,
      titleKey: "vision.results.title",
      descriptionKey: "vision.results.description",
    },
    {
      icon: Lightbulb,
      titleKey: "vision.creative.title",
      descriptionKey: "vision.creative.description",
    },
    {
      icon: Users,
      titleKey: "vision.partnership.title",
      descriptionKey: "vision.partnership.description",
    },
  ]

  return (
    <section id="vision" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-3xl mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="text-muted-foreground text-lg mb-4 tracking-wide uppercase">{t("vision.label")}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance mb-6">
            {t("vision.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{t("vision.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`bg-background p-8 rounded-2xl border border-border transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t(pillar.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(pillar.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
