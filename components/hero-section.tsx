"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, FolderOpen } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 })
  const { t, isRTL } = useLanguage()

  return (
    <section className="min-h-screen flex items-center overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Text Content */}
          <div
            ref={ref}
            className={`flex flex-col transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Small headline */}
            <p
              className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6 transition-all duration-700 delay-100"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(8px)", transitionDelay: "150ms" }}
            >
              {t("hero.eyebrow")}
            </p>

            {/* Main headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 text-balance font-display"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.8s ease, transform 0.8s ease", transitionDelay: "250ms" }}
            >
              {t("hero.title1")}
              <span className="block mt-1 text-muted-foreground/60">{t("hero.title2")}</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.8s ease, transform 0.8s ease", transitionDelay: "350ms" }}
            >
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col gap-3 mb-12"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.8s ease, transform 0.8s ease", transitionDelay: "450ms" }}
            >
              {/* Row 1: Projekt starten + Kostenloses Erstgespräch */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#kontakt">
                  <Button size="lg" className="group w-full sm:w-auto px-7 py-6 text-base font-semibold">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#kontakt">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-7 py-6 text-base font-medium bg-transparent">
                    {t("hero.cta2")}
                  </Button>
                </Link>
              </div>

              {/* Row 2: Referenzprojekte — full width, below the primary CTAs */}
              <Link href="#projekte" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto gap-2 px-7 py-6 text-base font-semibold bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FolderOpen className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {t("hero.refBtn")}
                </Button>
              </Link>
            </div>

            {/* Trust line */}
            <div
              className="border-t border-border/60 pt-8 flex flex-col gap-3"
              style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease", transitionDelay: "600ms" }}
            >
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                {t("hero.trust")}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("hero.languages")}
              </p>
              <p className="text-xs text-muted-foreground/60">
                {t("hero.regions")}
              </p>
            </div>
          </div>

          {/* Right: Animated Logo */}
          <div
            className={`hidden lg:flex flex-col items-center justify-center relative transition-all duration-1200 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Logo container */}
            <div className="relative w-[520px] h-[520px]">
              {/* Glow ring */}
              <div className="absolute inset-8 rounded-full border border-border/30 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-16 rounded-full border border-border/20 animate-[spin_20s_linear_infinite_reverse]" />

              {/* Light mode logo */}
              <Image
                src="/images/logo-invertable.png"
                alt="Naser Solutions"
                fill
                className="object-contain transition-opacity duration-500 opacity-[0.10] dark:opacity-0 drop-shadow-2xl"
                aria-hidden="true"
                priority
              />
              {/* Dark mode logo */}
              <Image
                src="/images/inverted-20logo-20png.png"
                alt="Naser Solutions"
                fill
                className="object-contain transition-opacity duration-500 opacity-0 dark:opacity-[0.15] drop-shadow-2xl"
                aria-hidden="true"
                priority
              />
            </div>

            {/* Background glow blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  )
}
