"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "@/components/site-link"
import { Check, Instagram, ExternalLink, Plus, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function AboutSection() {
  // The stacked mobile content can be much taller than the viewport.
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0 })
  const { t } = useLanguage()
  const [backgroundOpen, setBackgroundOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const [worldBefore, worldAfter] = t("about.world").split("{ritzi}")
  const benefitKeys = ["about.benefit1", "about.benefit2", "about.benefit3", "about.benefit4"]

  useEffect(() => {
    if (!lightboxOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [lightboxOpen])

  return (
    <section id="ueber-uns" className="pt-10 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-[1.25fr_1fr] gap-8 sm:gap-12 lg:gap-16 items-start transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 text-balance">
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

              {/* Smooth animated "Mehr über meinen Weg" architectural accordion */}
              <div className="glass-surface overflow-hidden rounded-2xl border border-border bg-card/55 shadow-sm backdrop-blur-xl">
                <button
                  type="button"
                  id="about-background-trigger"
                  aria-expanded={backgroundOpen}
                  aria-controls="about-background-panel"
                  onClick={() => setBackgroundOpen((open) => !open)}
                  className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start font-semibold text-foreground transition-colors duration-200 hover:bg-secondary/35 focus-visible:outline-2 focus-visible:-outline-offset-2 active:bg-secondary/55 motion-reduce:transition-none"
                >
                  <span>{t("about.backgroundTitle")}</span>
                  <Plus
                    aria-hidden="true"
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                      backgroundOpen ? "rotate-45 text-foreground" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  id="about-background-panel"
                  role="region"
                  aria-labelledby="about-background-trigger"
                  aria-hidden={!backgroundOpen}
                  inert={!backgroundOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    backgroundOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="space-y-4 border-t border-border/60 px-5 py-5">
                      <p>{t("about.school")}</p>

                      {/* Dezent groß framed graduation newspaper clipping — opens crisp lightbox on click */}
                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        aria-label="Zeitungsartikel Abschluss Mittelschule Wörth 2017 vergrößern"
                        className="group relative block w-full max-w-[340px] cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-background/70 p-1.5 shadow-sm transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        <div className="relative aspect-[935/1024] w-full overflow-hidden rounded-xl bg-secondary/40">
                          <Image
                            src="/images/yasin-abschluss-woerth-2017.jpg"
                            alt="Zeitungsartikel Abschluss M10 Mittelschule Wörth 2017 — Yasin Aissani"
                            fill
                            sizes="(min-width: 640px) 340px, 85vw"
                            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute end-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-md transition-transform duration-200 group-hover:scale-105"
                          >
                            <Maximize2 className="size-3.5" />
                          </span>
                        </div>
                      </button>

                      <p>{t("about.bundeswehr")}</p>
                      <p>{t("about.community")}</p>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Frosted glass lightbox for full-resolution reading of the graduation clipping */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Zeitungsartikel Abschluss Mittelschule Wörth 2017"
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-surface relative max-h-[90dvh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/90 p-2 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Schließen"
              className="absolute end-4 top-4 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-transform duration-200 hover:bg-white hover:text-black active:scale-90"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <div className="relative aspect-[935/1024] max-h-[85dvh] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/yasin-abschluss-woerth-2017.jpg"
                alt="Zeitungsartikel Abschluss M10 Mittelschule Wörth 2017 — Yasin Aissani"
                fill
                sizes="(min-width: 768px) 672px, 95vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
