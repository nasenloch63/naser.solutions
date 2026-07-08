"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Instagram,
  Mail,
  MessageCircle,
  Music,
  Youtube,
  ExternalLink,
  Globe,
  Send,
  Facebook,
  Music2,
  Gamepad2,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { AnimatedTradingBackground } from "@/components/animated-trading-background"

// Editable links configuration
const LINK_CATEGORIES = [
  {
    category: "Social Media",
    icon: null,
    links: [
      {
        title: "YouTube",
        subtitle: "@nasenloch638",
        url: "https://www.youtube.com/@nasenloch638",
        icon: Youtube,
        color: "from-red-500 to-red-700",
      },
      {
        title: "Instagram",
        subtitle: "@nasenloch638",
        url: "https://www.instagram.com/nasenloch638",
        icon: Instagram,
        color: "from-pink-500 to-purple-500",
      },
      {
        title: "TikTok",
        subtitle: "@nasenloch63",
        url: "https://www.tiktok.com/@nasenloch63",
        icon: Music,
        color: "from-black to-gray-800",
      },
      {
        title: "X (Twitter)",
        subtitle: "@nasenloch63",
        url: "https://x.com/nasenloch63",
        icon: Globe,
        color: "from-black to-gray-800",
      },
      {
        title: "Spotify",
        subtitle: "Musik Playlist",
        url: "https://open.spotify.com/user/31ijpdr5jovc2fuk76bznc2zjl5a?si=b971272af9ce4a3f",
        icon: Music2,
        color: "from-green-500 to-emerald-600",
      },
      {
        title: "Twitch",
        subtitle: "@nasenloch63",
        url: "https://www.twitch.tv/nasenloch63",
        icon: Gamepad2,
        color: "from-purple-600 to-purple-800",
      },
      {
        title: "Facebook (Personal)",
        subtitle: "Yasin Aissani",
        url: "https://www.facebook.com/yasin.aissani/",
        icon: Facebook,
        color: "from-blue-600 to-blue-800",
      },
      {
        title: "Facebook (Naser Solutions)",
        subtitle: "Agentur Seite",
        url: "https://www.facebook.com/profile.php?id=61588221712388",
        icon: Facebook,
        color: "from-blue-500 to-blue-700",
      },
    ],
  },
  {
    category: "Kontakt & Community",
    links: [
      {
        title: "Telegram",
        subtitle: "@nasenloch638",
        url: "https://t.me/nasenloch638",
        icon: Send,
        color: "from-cyan-500 to-blue-600",
      },
      {
        title: "Telegram (Team)",
        subtitle: "@teamnase",
        url: "https://t.me/teamnase",
        icon: Send,
        color: "from-cyan-500 to-blue-600",
      },
      {
        title: "WhatsApp",
        subtitle: "+49 155 6072 9886",
        url: "https://api.whatsapp.com/send/?phone=4915560729886&text&type=phone_number&app_absent=0",
        icon: MessageCircle,
        color: "from-green-500 to-green-700",
      },
      {
        title: "Discord",
        subtitle: "Team Server",
        url: "https://discord.com/invite/5F4znm5wKw",
        icon: ExternalLink,
        color: "from-indigo-600 to-purple-700",
      },
    ],
  },
  {
    category: "Projekte",
    links: [
      {
        title: "Naser Solutions",
        subtitle: "Meine Agentur",
        url: "https://naser.solutions",
        icon: Globe,
        color: "from-purple-500 to-pink-500",
      },
      {
        title: "Portfolio",
        subtitle: "Meine Arbeiten",
        url: "https://naser.solutions#projekte",
        icon: ExternalLink,
        color: "from-indigo-500 to-purple-500",
      },
    ],
  },
]

export default function LinksPage() {
  const [animatedIndices, setAnimatedIndices] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Stagger animation for link cards
    let allLinks = 0
    LINK_CATEGORIES.forEach((cat) => {
      allLinks += cat.links.length
    })

    const animationInterval = setInterval(() => {
      setAnimatedIndices((prev) => {
        if (prev.length < allLinks) {
          return [...prev, prev.length]
        }
        clearInterval(animationInterval)
        return prev
      })
    }, 80)

    return () => clearInterval(animationInterval)
  }, [])

  if (!mounted) return null

  let linkIndex = 0

  return (
    <div className="dark relative min-h-screen pt-28 pb-16 text-foreground">
      <AnimatedTradingBackground />
      <div className="relative flex justify-center px-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 px-3 py-2 rounded-lg bg-card/80 hover:bg-secondary/90 backdrop-blur-md border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Link>

          {/* Header */}
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="mb-6">
              <div className="relative h-24 w-24 mx-auto rounded-full overflow-hidden ring-2 ring-primary/20">
                <Image
                  src="/images/logo-invertable.png"
                  alt="Yasin Adam Aissani"
                  fill
                  className="object-cover dark:hidden"
                  priority
                />
                <Image
                  src="/images/inverted-20logo-20png.png"
                  alt="Yasin Adam Aissani"
                  fill
                  className="object-cover hidden dark:block"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Yasin Adam Aissani
            </h1>
            <p className="text-muted-foreground">
              CEO & Founder | Naser Solutions
            </p>
          </div>

          {/* Links */}
          <div className="space-y-8">
            {LINK_CATEGORIES.map((categoryGroup, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-2">
                  {categoryGroup.category}
                </h2>
                <div className="space-y-3">
                  {categoryGroup.links.map((link, linkIndexInCat) => {
                    const currentIndex = linkIndex++
                    const isAnimated = animatedIndices.includes(currentIndex)

                    return (
                      <a
                        key={`${catIndex}-${linkIndexInCat}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex items-center gap-4 p-4 rounded-xl
                          bg-card/80 hover:bg-secondary/90 backdrop-blur-md border border-border/50
                          transition-all duration-300 ease-out
                          hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40
                          ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                          transform
                        `}
                        style={{
                          transitionDelay: isAnimated ? "0ms" : "undefined",
                        }}
                      >
                        {/* Icon Container */}
                        <div
                          className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${link.color}`}
                        >
                          <link.icon className="h-6 w-6" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-1">
                            {link.title}
                          </h3>
                          {link.subtitle && (
                            <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                              {link.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Arrow */}
                        <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border/30">
            <p className="text-xs md:text-sm text-muted-foreground">
              © 2026 Yasin Adam Aissani • Naser Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
