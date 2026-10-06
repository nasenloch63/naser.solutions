"use client"

import Image from "next/image"
import { useState, useMemo, useCallback } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"
import { ExternalLink, ArrowUpRight, Clock, Grid3x3, List, Filter, Globe, Play, Instagram } from "lucide-react"
import { cmsProjectCopy } from "@/lib/cms-project-copy"
import { hazeChillProjectCopy } from "@/lib/haze-chill-project-copy"
import { localizedText, selectPortfolio, type PortfolioProject, type PortfolioSection } from "@/lib/portfolio"
import { projectImageCopy } from "@/lib/project-image-copy"

type ProjectCategory = "showcase" | "web" | "design" | "gastro" | "social" | "ecommerce" | "nonprofit"




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
  const { t, language } = useLanguage()
  const cached = thumbnailCache.get(url)
  const sources = getThumbnailSources(url)

  const [attemptIndex, setAttemptIndex] = useState(0)
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    cached ? cached.status : "loading"
  )
  const [src, setSrc] = useState<string>(cached ? cached.src : sources[0])

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.target as HTMLImageElement
      if (img.naturalWidth < 10 || img.naturalHeight < 10) {
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
      setStatus("loaded")
      thumbnailCache.set(url, { src, status: "loaded" })
    },
    [attemptIndex, sources, src, url]
  )

  const handleError = useCallback(() => {
    const next = attemptIndex + 1
    if (next < sources.length) {
      setAttemptIndex(next)
      setSrc(sources[next])
    } else {
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
          alt={`${projectImageCopy[language].website}: ${title}`}
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
          <p className="text-sm text-zinc-500">{t("ui.preview")}</p>
        </div>
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
    </div>
  )
}

function StaticThumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 bg-zinc-900">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 608px, (min-width: 768px) 50vw, 100vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
    </div>
  )
}

function LogoThumbnail({ logo, title }: { logo: string; title: string }) {
  const { language } = useLanguage()
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo || "/placeholder.svg"}
        alt={`${projectImageCopy[language].logo}: ${title}`}
        loading="lazy"
        className="max-h-[70%] max-w-[60%] object-contain transition-transform duration-700 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  )
}

type ViewMode = "grid" | "list"
type CategoryFilter = "all" | ProjectCategory

export function ProjectsSection({ projects, section }: { projects: PortfolioProject[]; section?: PortfolioSection }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { t, language } = useLanguage()
  const cmsCopy = cmsProjectCopy[language]
  const hazeCopy = hazeChillProjectCopy[language]
  const imageCopy = projectImageCopy[language]
  const projectTitle = (project: PortfolioProject) => localizedText(project.title, language)
  const projectDescription = (project: PortfolioProject) => localizedText(project.description, language)
  const selectedProjects = useMemo(() => selectPortfolio(projects, section?.selection), [projects, section?.selection])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all")

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return selectedProjects
    return selectedProjects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory, selectedProjects])

  const categoryOptions: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: t("ui.all") },
    { value: "web", label: "Web" },
    { value: "design", label: "Design" },
    { value: "showcase", label: "Showcase" },
    { value: "gastro", label: hazeCopy.gastro },
    { value: "social", label: hazeCopy.social },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "nonprofit", label: "Non-Profit" },
  ]
  const categories = categoryOptions.filter((category) => category.value === "all" || selectedProjects.some((project) => project.category === category.value))

  return (
    <section id="projekte" className="py-16 sm:py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-3xl mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{section ? localizedText(section.eyebrow, language) : t("projects.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {section ? localizedText(section.heading, language) : t("projects.title")}
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">{section ? localizedText(section.description, language) : t("projects.description")}</p>
        </div>

        {/* Filter and View Controls */}
        <div
          className={`mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap gap-2">
            {(section?.showFilters === false ? [] : categories).map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                aria-pressed={selectedCategory === category.value}
                className={`min-h-11 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
              className={`inline-flex size-11 items-center justify-center rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={t("ui.grid")}
              aria-pressed={viewMode === "grid"}
            >
              <Grid3x3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`inline-flex size-11 items-center justify-center rounded transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={t("ui.list")}
              aria-pressed={viewMode === "list"}
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
          {filteredProjects.length} {t(filteredProjects.length === 1 ? "ui.project" : "ui.projects")}
        </div>

        <div className={`grid gap-5 sm:gap-8 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
          {filteredProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target={project.url.startsWith("/") ? undefined : "_blank"}
              rel={project.url.startsWith("/") ? undefined : "noopener noreferrer"}
              className={`group relative bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl cursor-pointer ${
                viewMode === "grid" ? "hover:-translate-y-2" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              aria-label={projectTitle(project)}
            >
              {/* Thumbnail */}
              <div className={`${viewMode === "grid" ? "aspect-video" : "aspect-video sm:aspect-[3/1]"} relative overflow-hidden`}>
                {project.image && !project.containImage ? (
                  <StaticThumbnail src={project.image!} alt={localizedText(project.alt, language) || `${project.category === "social" ? imageCopy.social : imageCopy.website}: ${projectTitle(project)}`} />
                ) : project.image ? (
                  <LogoThumbnail logo={project.image!} title={projectTitle(project)} />
                ) : (
                  <ProjectThumbnail url={project.url} title={projectTitle(project)} />
                )}
              </div>

              {/* Content */}
              <div className={`p-5 sm:p-6 ${viewMode === "list" ? "sm:flex sm:items-center sm:gap-6" : ""}`}>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={localizedText(tag, language)}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                      >
                        {localizedText(tag, language)}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {projectTitle(project)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{projectDescription(project)}</p>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center gap-2 text-primary font-medium">
                  <span>{project.url === "/CMS" ? cmsCopy.status : t(project.category === "social" ? "ui.instagram" : "ui.website")}</span>
                  {project.url === "/CMS" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : project.category === "social" ? (
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
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("ui.empty")}</h3>
            <p className="text-muted-foreground">{t("ui.retry")}</p>
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
