"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const { t } = useLanguage()

  const benefitKeys = ["about.benefit1", "about.benefit2", "about.benefit3", "about.benefit4"]

  return (
    <section id="ueber-uns" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div>
            <p className="text-muted-foreground text-lg mb-4 tracking-wide uppercase">{t("about.label")}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 text-balance">
              {t("about.title")}
            </h2>
            <p
              className="text-xl text-muted-foreground leading-relaxed mb-8"
              dangerouslySetInnerHTML={{
                __html: t("about.description").replace("<strong>", '<strong class="text-foreground">'),
              }}
            />
            <ul className="space-y-4 mb-8">
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
              <Link href="https://instagram.com/nasenloch638" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Instagram className="h-5 w-5" />
                  @nasenloch638
                </Button>
              </Link>
              <Link href="https://beacons.ai/yasinadamaissani" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ExternalLink className="h-5 w-5" />
                  Linktree
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-square">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/whatsapp-20bild-202025-12-12-20um-2022.jpg"
                  alt="Yasin Adam Aissani - Direktor Naser Solutions"
                  fill
                  className="object-cover dark:[clip-path:circle(47%_at_50%_50%)]"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background dark:bg-card p-6 rounded-xl shadow-lg border border-border">
              <p className="font-semibold text-foreground text-lg">Yasin Adam Aissani</p>
              <p className="text-muted-foreground">{t("about.role")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
