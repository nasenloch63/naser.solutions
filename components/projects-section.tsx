"use client"

import Image from "next/image"
import { useState, useMemo, useCallback } from "react"
import { useLanguage } from "@/components/language-provider"
import { ExternalLink, ArrowUpRight, Grid3x3, List, Filter, Globe, Instagram } from "lucide-react"
import { cmsProjectCopy } from "@/lib/cms-project-copy"
import { demoPartnerProjects, demoPartnerSectionCopy } from "@/lib/demo-partner-projects"
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
  const { t, language } = useLanguage()
  const cmsCopy = cmsProjectCopy[language]
  const demoPartnerCopy = demoPartnerSectionCopy[language]
  const hazeCopy = hazeChillProjectCopy[language]
  const imageCopy = projectImageCopy[language]
  const isInstagramProject = (project: PortfolioProject) => /^https?:\/\/(?:www\.)?instagram\.com(?:\/|$)/i.test(project.url)
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
    <section id="projekte" aria-labelledby="projects-title" className="relative bg-secondary/30 py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <h2 id="projects-title" className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground mb-6 text-balance sm:text-5xl lg:text-7xl">
              {section ? localizedText(section.heading, language) : t("projects.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{section ? localizedText(section.description, language) : t("projects.description")}</p>
          </div>
        </div>

        {/* Filter and View Controls */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-y border-border py-4 sm:flex-row sm:items-center">
          <div className="work-filters flex w-full min-w-0 gap-2 overflow-x-auto pb-1 sm:flex-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {(section?.showFilters === false ? [] : categories).map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                aria-pressed={selectedCategory === category.value}
                className={`min-h-11 shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 ${
                  selectedCategory === category.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 self-end gap-2 bg-background rounded-lg p-1 border border-border sm:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex size-11 items-center justify-center rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
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
              className={`inline-flex size-11 items-center justify-center rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
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

        <div aria-live="polite" aria-atomic="true" className="mb-6 text-sm text-muted-foreground">
          {filteredProjects.length} {t(filteredProjects.length === 1 ? "ui.project" : "ui.projects")}
        </div>

        <div className={`grid gap-5 sm:gap-8 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card group relative rounded-3xl border border-border bg-background overflow-hidden"
            >
              <a
                href={project.url}
                target={project.url.startsWith("/") ? undefined : "_blank"}
                rel={project.url.startsWith("/") ? undefined : "noopener noreferrer"}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:-outline-offset-2"
                aria-label={projectTitle(project)}
              />
              {/* Thumbnail */}
              <div className={`${viewMode === "grid" ? "aspect-video" : "aspect-video sm:aspect-[3/1]"} relative overflow-hidden`}>
                {project.image && !project.containImage ? (
                  <StaticThumbnail src={project.image!} alt={localizedText(project.alt, language) || `${project.category === "social" ? imageCopy.social : imageCopy.website}: ${projectTitle(project)}`} />
                ) : project.image ? (
                  <LogoThumbnail logo={project.image!} title={projectTitle(project)} />
                ) : (
                  <ProjectThumbnail url={project.url} title={projectTitle(project)} />
                )}
                <span aria-hidden="true" className="project-card-arrow absolute end-4 top-4 flex size-11 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground backdrop-blur-md">
                  <ArrowUpRight className="size-5 rtl-flip" />
                </span>
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
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground mb-2 sm:text-2xl">
                    {projectTitle(project)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{projectDescription(project)}</p>
                </div>

                <div className={`mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 shrink-0 text-sm ${viewMode === "list" ? "sm:mt-0 sm:flex-col sm:items-end" : ""}`}>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>{project.url === "/CMS" ? cmsCopy.status : t(isInstagramProject(project) ? "ui.instagram" : "ui.website")}</span>
                    {project.url === "/CMS" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : isInstagramProject(project) ? (
                      <Instagram className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    ) : (
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                  {project.partner && (
                    <a
                      href={project.partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span>{demoPartnerCopy.collaborationLabel} {project.partner.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("ui.empty")}</h3>
            <p className="text-muted-foreground">{t("ui.retry")}</p>
          </div>
        )}

        {/* Active Demo Sites & Partner Agencies */}
        <div id="demo-sites" className="mt-14 border-t border-border pt-12 sm:mt-16 sm:pt-14 scroll-mt-24">
          <div className="mb-8 sm:mb-10 max-w-3xl">
            <h3 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-foreground mb-4 text-balance sm:text-4xl lg:text-5xl">
              {demoPartnerCopy.heading}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {demoPartnerCopy.description}
            </p>
          </div>

          <div className={`grid gap-5 sm:gap-8 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
            {demoPartnerProjects.map((item) => {
              const title = localizedText(item.title, language)
              const description = localizedText(item.description, language)
              const badge = localizedText(item.badge, language)
              return (
                <article
                  key={item.id}
                  className="project-card group relative rounded-3xl border border-border bg-background overflow-hidden"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:-outline-offset-2"
                    aria-label={title}
                  />
                  <div className={`${viewMode === "grid" ? "aspect-video" : "aspect-video sm:aspect-[3/1]"} relative overflow-hidden`}>
                    <StaticThumbnail src={item.image} alt={item.alt} />
                    {badge && (
                      <span className="absolute start-4 top-4 inline-flex items-center rounded-full border border-border/50 bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                        {badge}
                      </span>
                    )}
                    <span aria-hidden="true" className="project-card-arrow absolute end-4 top-4 flex size-11 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground backdrop-blur-md">
                      <ArrowUpRight className="size-5 rtl-flip" />
                    </span>
                  </div>

                  <div className={`p-5 sm:p-6 ${viewMode === "list" ? "sm:flex sm:items-center sm:gap-6" : ""}`}>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-display text-xl font-semibold tracking-tight text-foreground mb-2 sm:text-2xl">
                        {title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
                    </div>

                    <div className={`mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 shrink-0 text-sm ${viewMode === "list" ? "sm:mt-0 sm:flex-col sm:items-end" : ""}`}>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>{t("ui.website")}</span>
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                      {item.partner && (
                        <a
                          href={item.partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-20 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          <span>{demoPartnerCopy.collaborationLabel} {item.partner.name}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-muted-foreground mb-4">{t("projects.moreComingSoon")}</p>
        </div>
      </div>
    </section>
  )
}
