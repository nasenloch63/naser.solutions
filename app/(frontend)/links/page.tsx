"use client"

import Image from "next/image"
import {
  ArrowUpRight, Facebook, Gamepad2, Globe, Instagram, Mail,
  MessageCircle, Music, Music2, Send, Youtube, type LucideIcon,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { LegalModalProvider } from "@/components/legal-modal-provider"
import { useLanguage } from "@/components/language-provider"
import { linksCopy } from "@/lib/links-copy"
import { BUSINESS_EMAIL } from "@/lib/seo"

type ProfileLink = { title: string; subtitle: string; url: string; icon: LucideIcon }

function LinkCard({ title, subtitle, url, icon: Icon }: ProfileLink) {
  const isEmail = url.startsWith("mailto:")
  return (
    <a
      href={url}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="group flex min-h-24 items-center gap-4 rounded-2xl border border-border/70 bg-background/50 p-4 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-foreground/25 hover:bg-background/80 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-safe:hover:-translate-y-0.5 sm:p-5"
    >
      <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-secondary/60 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block break-words font-semibold leading-snug">{title}</span>
        <span className="mt-1 block break-words text-sm leading-relaxed text-muted-foreground"><bdi>{subtitle}</bdi></span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
    </a>
  )
}

const panelClass = "rounded-3xl border border-border/70 bg-card/65 p-5 shadow-[0_12px_48px_-32px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-7 dark:bg-secondary/25"

export default function LinksPage() {
  const { language, t } = useLanguage()
  const copy = linksCopy[language]
  const social: ProfileLink[] = [
    { title: "Instagram", subtitle: "@nasenloch638", url: "https://www.instagram.com/nasenloch638", icon: Instagram },
    { title: "YouTube", subtitle: "@nasenloch638", url: "https://www.youtube.com/@nasenloch638", icon: Youtube },
    { title: "TikTok", subtitle: "@nasenloch63", url: "https://www.tiktok.com/@nasenloch63", icon: Music },
    { title: "X (Twitter)", subtitle: "@nasenloch63", url: "https://x.com/nasenloch63", icon: Globe },
    { title: "Spotify", subtitle: copy.playlist, url: "https://open.spotify.com/user/31ijpdr5jovc2fuk76bznc2zjl5a?si=b971272af9ce4a3f", icon: Music2 },
    { title: "Twitch", subtitle: "@nasenloch63", url: "https://www.twitch.tv/nasenloch63", icon: Gamepad2 },
    { title: "Facebook", subtitle: copy.personal, url: "https://www.facebook.com/yasin.aissani/", icon: Facebook },
    { title: "Facebook", subtitle: "Naser Solutions", url: "https://www.facebook.com/profile.php?id=61588221712388", icon: Facebook },
  ]
  const community: ProfileLink[] = [
    { title: "WhatsApp", subtitle: "+49 155 6072 9886", url: "https://api.whatsapp.com/send/?phone=4915560729886&text&type=phone_number&app_absent=0", icon: MessageCircle },
    { title: "E-Mail", subtitle: BUSINESS_EMAIL, url: "mailto:" + BUSINESS_EMAIL, icon: Mail },
    { title: "Telegram", subtitle: "@nasenloch638", url: "https://t.me/nasenloch638", icon: Send },
    { title: "Telegram · Team", subtitle: "@teamnase", url: "https://t.me/teamnase", icon: Send },
    { title: "Discord", subtitle: copy.team, url: "https://discord.com/invite/5F4znm5wKw", icon: Gamepad2 },
  ]

  return (
    <LegalModalProvider>
      <Navbar />
      <main className="relative isolate min-h-screen overflow-hidden bg-background pb-16 pt-28 text-foreground sm:pb-24 sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(ellipse_at_top_right,var(--secondary),transparent_65%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <header className="py-2 sm:py-5">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Naser Solutions / Links</p>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">{copy.headline}</h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">{copy.intro}</p>
              <div className="mt-7 flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary">
                  <Image src="/images/yasin-adam-aissani-2026.jpg" alt="Yasin Adam Aissani, Naser Solutions" fill sizes="64px" priority className="object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold"><bdi>Yasin Adam Aissani</bdi></p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy.founder}</p>
                </div>
              </div>
            </header>

            <section aria-labelledby="website-links-title" className={panelClass}>
              <div className="mb-6 flex items-start gap-4">
                <span aria-hidden="true" className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60"><Globe className="size-5" /></span>
                <div>
                  <h2 id="website-links-title" className="font-display text-xl font-semibold sm:text-2xl">{copy.projects}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.projectsIntro}</p>
                </div>
              </div>
              <div className="grid gap-3">
                <LinkCard title="Naser Solutions" subtitle={t("services.web.title")} url="https://naser.solutions" icon={Globe} />
                <LinkCard title="Portfolio" subtitle={copy.work} url="https://naser.solutions#projekte" icon={ArrowUpRight} />
              </div>
            </section>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:mt-12 lg:grid-cols-[1fr_1.35fr]">
            <section aria-labelledby="community-links-title" className={panelClass}>
              <h2 id="community-links-title" className="mb-6 font-display text-xl font-semibold sm:text-2xl">{copy.community}</h2>
              <div className="grid gap-3">
                {community.map(link => <LinkCard key={link.url} {...link} />)}
              </div>
            </section>
            <section aria-labelledby="social-links-title" className={panelClass}>
              <h2 id="social-links-title" className="mb-6 font-display text-xl font-semibold sm:text-2xl">{copy.social}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {social.map(link => <LinkCard key={link.url} {...link} />)}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </LegalModalProvider>
  )
}
