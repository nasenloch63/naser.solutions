"use client"

import { useRef, useState } from "react"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import Link from "@/components/site-link"
import { useLanguage } from "@/components/language-provider"
import { ContactForm } from "@/components/contact-form"
import { NaserLogo3D } from "@/components/naser-logo-3d"

export function HeroSection() {
  const { t } = useLanguage()
  const [logoHovered, setLogoHovered] = useState(false)
  const pointer = useRef({ x: 0, y: 0 })

  function handleLeftPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1
    const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1
    pointer.current = { x, y }
  }

  return (
    <section
      id="start"
      className="studio-hero relative isolate overflow-hidden pt-24 pb-10 sm:pt-28 lg:pt-28 lg:pb-14"
    >
      {/* Subtle 3D Naser Solutions logo sculpture layered softly in the background where the orbit circles were */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-10 -z-10 h-[32rem] w-[32rem] sm:-start-20 sm:top-8 sm:h-[40rem] sm:w-[40rem] lg:-start-12 lg:top-6 lg:h-[44rem] lg:w-[44rem]"
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, black 42%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 42%, transparent 78%)",
        }}
      >
        <NaserLogo3D
          hoverActive={logoHovered}
          pointer={pointer}
          className={`size-full ${
            logoHovered
              ? "opacity-35 dark:opacity-45"
              : "opacity-20 dark:opacity-30"
          }`}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:px-8">
        <div
          className="hero-enter min-w-0"
          onPointerEnter={event => setLogoHovered(event.pointerType !== "touch")}
          onPointerLeave={() => {
            setLogoHovered(false)
            pointer.current = { x: 0, y: 0 }
          }}
          onPointerMove={handleLeftPointerMove}
        >
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-balance md:text-5xl lg:text-6xl mb-5">
            Naser Solutions{" "}
            <span className="mt-3 block text-2xl font-medium leading-tight text-muted-foreground md:text-3xl">
              {t("hero.title1")}
            </span>
          </h1>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {t("hero.description")}
          </p>
          <div className="mb-8 flex flex-wrap gap-x-7 gap-y-4">
            <Link
              href="/#anfrage"
              className="studio-link inline-flex min-h-11 items-center gap-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {t("hero.cta")}
              <ArrowDownRight className="size-4 rtl-flip" aria-hidden="true" />
            </Link>
            <Link
              href="/#projekte"
              className="studio-link inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {t("hero.refBtn")}
              <ArrowRight className="size-4 rtl-flip" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-1.5 border-t border-border pt-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{t("hero.trust")}</p>
            <p>{t("hero.regions")}</p>
          </div>
        </div>

        <div
          id="anfrage"
          className="hero-enter-delay glass-surface min-w-0 scroll-mt-28 rounded-3xl border border-border/75 bg-card/75 p-5 shadow-[0_18px_56px_-28px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-7 dark:bg-secondary/35"
        >
          <div className="mb-5 flex items-center gap-4">
            <div aria-hidden="true" className="relative size-12 shrink-0 sm:size-16">
              <span
                className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-80 dark:hidden"
                style={{ backgroundImage: "url('/images/logo-invertable.png')" }}
              />
              <span
                className="absolute inset-0 hidden bg-contain bg-center bg-no-repeat opacity-90 dark:block"
                style={{ backgroundImage: "url('/images/inverted-20logo-20png.png')" }}
              />
            </div>
            <div className="min-w-0">
              <h2 className="mb-1 font-display text-xl font-semibold leading-snug tracking-tight text-balance">
                {t("contact.form.title")}
              </h2>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {t("contact.form.intro")}
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
