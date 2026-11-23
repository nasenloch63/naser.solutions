"use client"

import { useState } from "react"
import Link from "@/components/site-link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { localAiCopy } from "@/lib/local-ai-copy"
import { DissolveDotChart, type StackLayerId, type TelemetryMode } from "@/components/dissolve-dot-chart"

interface ToolItem {
  name: string
  description: string
  hoverColorClass: string
  logo: React.ReactNode
}

const tools: ToolItem[] = [
  {
    name: "OpenAI",
    description: "AI Models",
    hoverColorClass: "group-hover:text-foreground",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    description: "Design",
    hoverColorClass: "group-hover:text-[#F24E1E]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
      </svg>
    ),
  },
  {
    name: "Canva",
    description: "Graphics",
    hoverColorClass: "group-hover:text-[#00C4CC]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.14 16.18c-.68.34-1.51.53-2.49.53-2.1 0-3.65-1.12-4.24-2.77-.17-.47-.26-.99-.26-1.54 0-2.12 1.35-4.2 3.66-4.2 1.1 0 1.92.42 2.42 1.11.41.57.6 1.27.6 2.02 0 .51-.07.99-.2 1.4-.28.9-.82 1.6-1.52 2.05-.58.37-1.24.55-1.95.55-.62 0-1.1-.16-1.43-.47-.27-.26-.4-.6-.4-.99 0-.21.03-.42.1-.62.13-.4.42-.86.86-1.2.41-.31.93-.51 1.5-.51.36 0 .65.08.87.24.18.13.29.31.29.54 0 .18-.06.36-.18.54-.11.16-.27.3-.47.4-.15.08-.31.12-.47.12-.1 0-.18-.02-.25-.06-.05-.03-.08-.08-.08-.15 0-.04.02-.09.05-.14.04-.06.1-.13.17-.18.05-.04.08-.08.08-.12 0-.06-.05-.1-.14-.1-.2 0-.45.12-.64.32-.18.19-.29.44-.29.72 0 .31.11.56.32.74.23.2.54.3.93.3.5 0 .96-.14 1.36-.42.44-.3.77-.74.95-1.3.1-.3.15-.62.15-.95 0-.54-.14-1.01-.42-1.4-.32-.45-.82-.68-1.48-.68-1.6 0-2.77 1.46-2.77 3.32 0 .41.06.8.18 1.16.43 1.23 1.6 2.07 3.2 2.07.75 0 1.4-.14 1.95-.41.15-.07.25-.11.3-.11.1 0 .15.06.15.17 0 .13-.1.28-.3.42z" />
      </svg>
    ),
  },
  {
    name: "Visual Studio Code",
    description: "Code Editor",
    hoverColorClass: "group-hover:text-[#007ACC]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
        />
      </svg>
    ),
  },
  {
    name: "Vercel",
    description: "Deployment",
    hoverColorClass: "group-hover:text-foreground",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
  {
    name: "Kiro",
    description: "AI Development",
    hoverColorClass: "group-hover:text-[#993FF5]",
    logo: (
      <svg viewBox="0 0 256 256" className="size-9" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M195.9 107.8c-2.84-27.64-18.85-62.98-60.73-64.4h-3.09c-29.9 0-52.18 21.88-56.84 52.31-2.68 9.26-2.46 20.79-4.86 35.12-2.48 14.9-7.38 20.23-10.77 28.96-1.88 5.11-1.19 17.58 10.84 18.65 6.63.59 14.92-2.78 15.03-3.96-2.25 4.59-5.08 12.84-4.78 19.82.6 11.64 8.71 17.78 21.25 17.78 14.07 0 24.1-8.4 30.32-12.14 3.01 7.78 6.93 12.14 14.41 12.14 13.02 0 27.47-13.13 33.84-23.58 11.19-19.55 18.26-42.4 16.17-71.32-.08-2.87-.35-6.08-.79-9.38Zm-60.8-17.25c-7.28-.54-7.85 8.36-7.85 14.05 0 6.08 1.6 13.14 7.96 13.14 6.6 0 8.92-8.08 8.92-13.14 0-5.56-1.59-14.05-9.03-14.05Zm29.3 0c-7.27-.54-8.66 7.59-8.66 14.05 0 5.82 1.51 13.14 8.07 13.14 7.38 0 8.83-9.57 8.83-13.14 0-5.89-2.01-14.05-8.24-14.05Z"
        />
      </svg>
    ),
  },
  {
    name: "Blender",
    description: "3D & Animation",
    hoverColorClass: "group-hover:text-[#F5792A]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.42 3.42 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.4 3.4 0 0 1-2.374.938 3.4 3.4 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.4 7.4 0 0 0 1.593 2.757 8.2 8.2 0 0 0 2.787 2.001 8.95 8.95 0 0 0 3.66.76 9 9 0 0 0 3.657-.772 8.3 8.3 0 0 0 2.785-2.01 7.4 7.4 0 0 0 1.592-2.762 7 7 0 0 0 .25-3.074 7.1 7.1 0 0 0-1.016-2.779 7.8 7.8 0 0 0-1.852-2.043h.002L13.566 2.55l-.02-.015c-.492-.378-1.319-.376-1.86.002-.547.382-.609 1.015-.123 1.415l-.001.001 3.126 2.543-9.53.01h-.013c-.788.001-1.545.518-1.695 1.172-.154.665.38 1.217 1.2 1.22V8.9l4.83-.01-8.62 6.617-.034.025c-.813.622-1.075 1.658-.563 2.313.52.667 1.625.668 2.447.004L7.414 14s-.069.52-.063.831zm12.09 1.741c-.97.988-2.326 1.548-3.795 1.55-1.47.004-2.827-.552-3.797-1.538a4.5 4.5 0 0 1-1.036-1.622 4.28 4.28 0 0 1 .282-3.519 4.7 4.7 0 0 1 1.153-1.371c.942-.768 2.141-1.183 3.396-1.185 1.256-.002 2.455.41 3.398 1.175.48.391.87.854 1.152 1.367a4.3 4.3 0 0 1 .522 1.706 4.2 4.2 0 0 1-.239 1.811 4.5 4.5 0 0 1-1.035 1.626" />
      </svg>
    ),
  },
  {
    name: "n8n",
    description: "Workflow Automation",
    hoverColorClass: "group-hover:text-[#EA4B71]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="3.2" cy="12" r="2.1" />
        <circle cx="9.6" cy="12" r="2.1" />
        <circle cx="15.2" cy="12" r="2.1" />
        <circle cx="20.6" cy="7.2" r="2.1" />
        <circle cx="20.6" cy="16.8" r="2.1" />
        <path d="M5.3 12h2.2M11.7 12h1.4M16.9 10.7c.9-.9 1.1-2.2 1.9-2.8M16.9 13.3c.9.9 1.1 2.2 1.9 2.8" />
      </svg>
    ),
  },
  {
    name: "Bitbucket",
    description: "Git Repositories",
    hoverColorClass: "group-hover:text-[#2684FF]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M.778 1.211c-.424-.006-.772.334-.778.758 0 .045.002.09.01.134l3.263 19.811c.084.499.515.867 1.022.872H19.95c.382.004.708-.271.77-.646l3.27-20.03c.068-.418-.216-.813-.635-.881-.045-.008-.089-.011-.133-.01H.778zm14.465 14.79H8.757l-1.32-7.944h9.09l-1.324 7.944Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    description: "Code & Collaboration",
    hoverColorClass: "group-hover:text-foreground",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Anthropic",
    description: "Claude Code & Claude Design",
    hoverColorClass: "group-hover:text-[#D97757]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.37-3.553h7.005l1.369 3.553h3.744L10.536 3.541Zm-.371 10.223L8.616 7.82l2.291 5.945Z" />
      </svg>
    ),
  },
  {
    name: "NVIDIA",
    description: "JetPack · CUDA · TensorRT",
    hoverColorClass: "group-hover:text-[#76B900]",
    logo: (
      <svg viewBox="0 0 24 24" className="size-9" fill="currentColor">
        <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" />
      </svg>
    ),
  },
]

export function StatsSection() {
  const { t, language } = useLanguage()
  const ai = localAiCopy[language]
  const [telemetryMode, setTelemetryMode] = useState<TelemetryMode>("memory")
  const [activeLayer, setActiveLayer] = useState<StackLayerId>("TensorRT")

  function focusStackLayer(layer: StackLayerId) {
    setTelemetryMode("stack")
    setActiveLayer(layer)
  }

  return (
    <section id="tools" aria-labelledby="tools-title" className="py-10 sm:py-12 lg:py-16 border-t border-border bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="tools-title" className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance text-foreground mb-4">
            {t("tools.title")}
          </h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            {t("tools.description")}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {tools.map(tool => (
            <li
              key={tool.name}
              className="group flex min-h-40 min-w-0 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-background p-4 text-center transition-[border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-foreground/35 sm:min-h-44 sm:p-6"
            >
              <div
                aria-hidden="true"
                className={`text-foreground/75 transition-[color,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${tool.hoverColorClass}`}
              >
                {tool.logo}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground sm:text-base">{tool.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{tool.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div
          id="local-ai"
          className="glass-surface relative mt-8 grid scroll-mt-24 gap-8 overflow-hidden rounded-3xl border border-border bg-background p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:p-10"
        >
          <div className="relative z-10 min-w-0">
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              {ai.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">{ai.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">{ai.customers}</p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="NVIDIA Software">
              {(["JetPack", "CUDA", "TensorRT", "cuDNN"] as const).map(name => {
                const highlighted = telemetryMode === "stack" && activeLayer === name
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => focusStackLayer(name)}
                    aria-pressed={highlighted}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-[border-color,background-color,color,transform] duration-200 active:scale-95 ${
                      highlighted
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/90 bg-secondary/45 text-foreground hover:border-foreground/45"
                    }`}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
            <Link href="/kontakt" className="studio-link mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
              {ai.cta}<ArrowUpRight className="size-4 shrink-0 rtl-flip" aria-hidden="true" />
            </Link>
          </div>
          <DissolveDotChart
            memorySubtitle={ai.memory}
            mode={telemetryMode}
            onModeChange={setTelemetryMode}
            activeLayer={activeLayer}
            onActiveLayerChange={setActiveLayer}
          />
        </div>
      </div>
    </section>
  )
}
