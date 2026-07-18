"use client"

import { useState, useMemo, useCallback } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"
import { ExternalLink, Clock, Grid3x3, List, Filter, Globe, Play, Instagram } from "lucide-react"

interface Project {
  titleKey: string
  descriptionKey: string
  url: string
  tags: string[]
  category: string
  type?: "website" | "social"
  platform?: "instagram"
  logo?: string
}

const projects: Project[] = [
  {
    titleKey: "projects.hazechill.title",
    descriptionKey: "projects.hazechill.description",
    url: "https://www.instagram.com/haze_and_chill_cafe/",
    tags: ["Design", "Social Media", "Instagram"],
    category: "design",
    type: "social",
    platform: "instagram",
    logo: "/images/haze-and-chill-cafe-logo.jpg",
  },
  {
    titleKey: "projects.reel.title",
    descriptionKey: "projects.reel.description",
    url: "https://www.instagram.com/reel/DYug1AZoD9L/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    tags: ["Instagram", "Reel", "Content Editing", "Social Media"],
    category: "social",
    type: "social",
    platform: "instagram",
  },
  {
    titleKey: "projects.studio.title",
    descriptionKey: "projects.studio.description",
    url: "https://www.glace14.com/",
    tags: ["Design", "Studio", "Portfolio"],
    category: "design",
    type: "website",
  },
  {
    titleKey: "projects.porsche.title",
    descriptionKey: "projects.porsche.description",
    url: "https://aa-performance.net/",
    tags: ["Automotive", "Performance", "Autohaus"],
    category: "showcase",
    type: "website",
  },
  {
    titleKey: "projects.crypto.title",
    descriptionKey: "projects.crypto.description",
    url: "https://v0-crypto-news-website-peach.vercel.app/",
    tags: ["Next.js", "Crypto", "News"],
    category: "web",
    type: "website",
  },
  {
    titleKey: "projects.joesgarage.title",
    descriptionKey: "projects.joesgarage.description",
    url: "https://www.joes-garage.net",
    tags: ["Rock Bar", "Webdesign", "Events"],
    category: "gastro",
    type: "website",
  },
  {
    titleKey: "projects.luxury.title",
    descriptionKey: "projects.luxury.description",
    url: "https://v0-luxury-street-chic-website.vercel.app/",
    tags: ["Fashion", "E-Commerce", "AWD"],
    category: "ecommerce",
    type: "website",
  },
  {
    titleKey: "projects.donation.title",
    descriptionKey: "projects.donation.description",
    url: "https://v0-donation-website-for-al-salam.vercel.app/",
    tags: ["Charity", "Donation", "Website"],
    category: "nonprofit",
    type: "website",
  },
]

// Module-level cache: persists across re-renders and filter changes
const thumbnailCache = new Map<string, { src: string; status: "loaded" | "error" }>()

function getThumbnailSources(url: string): string[] {
  return [
    `/api/generate-thumbnail?url=${encodeURIComponent(url)}`,
    `https://image.thum.io/get/width/1200/crop/630/noanimate/${url}`,
    `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=630`,
  ]
}

function ProjectThumbnail({ url, title }: { url: string; title: string }) {
  const cached = thumbnailCache.get(url)
  const sources = getThumbnailSources(url)

  const [attemptIndex, setAttemptIndex] = useState(0)
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    cached ? cached.status : "loading"
  )
  const [src, setSrc] = useState<string>(cached ? cached.src : sources[0])

  console.log("[v0] Thumbnail render:", { url: url.substring(0, 40), attemptIndex, status })

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.target as HTMLImageElement
      console.log("[v0] onLoad:", { url: url.substring(0, 40), attemptIndex, w: img.naturalWidth, h: img.naturalHeight })
      if (img.naturalWidth < 10 || img.naturalHeight < 10) {
        console.log("[v0] Image too small, trying next")
        const next = attemptIndex + 1
        if (next < sources.length) {
          setAttemptIndex(next)
          setSrc(sources[next])
        } else {
          setStatus("error")
          thumbnailCache.set(url, { src, status: "error" })
        }
        return
      }
      console.log("[v0] Thumbnail SUCCESS:", url.substring(0, 40))
      setStatus("loaded")
      thumbnailCache.set(url, { src, status: "loaded" })
    },
    [attemptIndex, sources, src, url]
  )

  const handleError = useCallback(() => {
    console.log("[v0] onError:", { url: url.substring(0, 40), attemptIndex, src: src.substring(0, 50) })
    const next = attemptIndex + 1
    if (next < sources.length) {
      console.log("[v0] Trying next source:", sources[next].substring(0, 50))
      setAttemptIndex(next)
      setSrc(sources[next])
    } else {
      console.log("[v0] ALL FAILED:", url.substring(0, 40))
      setStatus("error")
      thumbnailCache.set(url, { src, status: "error" })
    }
  }, [attemptIndex, sources, src, url])

  return (
    <div className="absolute inset-0 bg-zinc-900">
      {status !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={title}
          loading="lazy"
          className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {/* Loading skeleton */}
      {status === "loading" && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700/50 to-zinc-800 animate-pulse" />
      )}
      {/* Error fallback */}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-900">
          <Globe className="h-10 w-10 text-zinc-600" />
          <p className="text-sm text-zinc-500">Vorschau nicht verfügbar</p>
        </div>
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
    </div>
  )
}

function LogoThumbnail({ logo, title }: { logo: string; title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo || "/placeholder.svg"}
        alt={title}
        loading="lazy"
        className="max-h-[70%] max-w-[60%] object-contain transition-transform duration-700 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  )
}

type ViewMode = "grid" | "list"
type CategoryFilter = "all" | "web" | "design" | "showcase" | "ecommerce" | "nonprofit"

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { t } = useLanguage()
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all")

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "Alle" },
    { value: "web", label: "Web" },
    { value: "design", label: "Design" },
    { value: "showcase", label: "Showcase" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "nonprofit", label: "Non-Profit" },
  ]

  return (
    <section id="projekte" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-3xl mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("projects.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t("projects.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{t("projects.description")}</p>
        </div>

        {/* Filter and View Controls */}
        <div
          className={`mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 bg-background rounded-lg p-1 border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Grid View"
            >
              <Grid3x3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List View"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={`mb-6 text-sm text-muted-foreground transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filteredProjects.length} {filteredProjects.length === 1 ? "Projekt" : "Projekte"}
        </div>

        <div className={`grid gap-8 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
          {filteredProjects.map((project, index) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl cursor-pointer ${
                viewMode === "grid" ? "hover:-translate-y-2" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              aria-label={`${t(project.titleKey)} - Website besuchen`}
            >
              {/* Thumbnail */}
              <div className={`${viewMode === "grid" ? "aspect-video" : "sm:aspect-[3/1]"} relative overflow-hidden`}>
                {project.logo ? (
                  <LogoThumbnail logo={project.logo} title={t(project.titleKey)} />
                ) : (
                  <ProjectThumbnail url={project.url} title={t(project.titleKey)} />
                )}
              </div>

              {/* Content */}
              <div className={`p-6 ${viewMode === "list" ? "sm:flex sm:items-center sm:gap-6" : ""}`}>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{t(project.descriptionKey)}</p>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center gap-2 text-primary font-medium">
                  <span>{project.type === "social" ? "Auf Instagram ansehen" : "Website besuchen"}</span>
                  {project.type === "social" ? (
                    <Instagram className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  ) : (
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Keine Projekte gefunden</h3>
            <p className="text-muted-foreground">Versuchen Sie, einen anderen Filter auszuwählen</p>
          </div>
        )}

        <div
          className={`mt-12 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground mb-4">{t("projects.moreComingSoon")}</p>
        </div>
      </div>
    </section>
  )
}
