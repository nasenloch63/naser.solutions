"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function AboutSection() {
  // The stacked mobile content can be much taller than the viewport.
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0 })
  const { t } = useLanguage()

  const [worldBefore, worldAfter] = t("about.world").split("{ritzi}")
  const benefitKeys = ["about.benefit1", "about.benefit2", "about.benefit3", "about.benefit4"]

  return (
    <section id="ueber-uns" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-[1.25fr_1fr] gap-8 sm:gap-12 lg:gap-16 items-start transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div>
            <p className="text-muted-foreground text-lg mb-4 tracking-wide uppercase">{t("about.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {t("about.title")}
            </h2>
            <p
              className="text-base text-muted-foreground leading-relaxed mb-5"
              dangerouslySetInnerHTML={{
                __html: t("about.description").replace("<strong>", '<strong class="text-foreground">'),
              }}
            />
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed mb-8">
              <p>{t("about.family")}</p>
              <p>{t("about.training")}</p>
              <p>{t("about.swiss")} <a href="https://www.instagram.com/webdigital.cloud/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">@webdigital.cloud</a>.</p>
              <p><a href="https://oxince.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">oxince.com</a> {t("about.mentor")}</p>
              <h3 className="text-xl font-semibold text-foreground pt-2">{t("about.networkTitle")}</h3>
              <p>{t("about.network")}</p>
              <p>{worldBefore} <a href="https://ritzi.digital/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">ritzi.digital</a>{worldAfter}</p>
              <details className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm backdrop-blur-xl">
                <summary className="cursor-pointer rounded font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{t("about.backgroundTitle")}</summary>
                <div className="space-y-4 pt-4">
                  <p>{t("about.school")}</p>
                  <p>{t("about.bundeswehr")}</p>
                  <p>{t("about.community")}</p>
                </div>
              </details>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              {benefitKeys.map((key, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{t(key)}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="min-h-11 h-auto gap-2 bg-transparent">
                <Link href="https://instagram.com/nasenloch638" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  @nasenloch638
                </Link>
              </Button>
              <Button asChild variant="outline" className="min-h-11 h-auto gap-2 bg-transparent">
                <Link href="https://naser-solutions.de/links" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5" />
                  Links
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-3 shadow-lg">
              <div className="relative aspect-[532/709] overflow-hidden rounded-xl">
                <Image
                  src="/images/yasin-adam-aissani-2026.jpg"
                  alt="Yasin Adam Aissani, Naser Solutions"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="relative mt-4 bg-background dark:bg-card p-5 rounded-lg shadow-lg border border-border">
              <p className="font-semibold text-foreground text-lg">Yasin Adam Aissani</p>
              <p className="text-muted-foreground">{t("about.role")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
