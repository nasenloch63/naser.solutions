"use client"

import Link from "next/link"
import { ArrowUpRight, Box, Code2, Cpu, Github, GitBranch, Sparkles, Workflow } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { localAiCopy } from "@/lib/local-ai-copy"

const tools = [
  {
    name: "OpenAI",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
    description: "AI Models",
  },
  {
    name: "Figma",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
      </svg>
    ),
    description: "Design",
  },
  {
    name: "Canva",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.14 16.18c-.68.34-1.51.53-2.49.53-2.1 0-3.65-1.12-4.24-2.77-.17-.47-.26-.99-.26-1.54 0-2.12 1.35-4.2 3.66-4.2 1.1 0 1.92.42 2.42 1.11.41.57.6 1.27.6 2.02 0 .51-.07.99-.2 1.4-.28.9-.82 1.6-1.52 2.05-.58.37-1.24.55-1.95.55-.62 0-1.1-.16-1.43-.47-.27-.26-.4-.6-.4-.99 0-.21.03-.42.1-.62.13-.4.42-.86.86-1.2.41-.31.93-.51 1.5-.51.36 0 .65.08.87.24.18.13.29.31.29.54 0 .18-.06.36-.18.54-.11.16-.27.3-.47.4-.15.08-.31.12-.47.12-.1 0-.18-.02-.25-.06-.05-.03-.08-.08-.08-.15 0-.04.02-.09.05-.14.04-.06.1-.13.17-.18.05-.04.08-.08.08-.12 0-.06-.05-.1-.14-.1-.2 0-.45.12-.64.32-.18.19-.29.44-.29.72 0 .31.11.56.32.74.23.2.54.3.93.3.5 0 .96-.14 1.36-.42.44-.3.77-.74.95-1.3.1-.3.15-.62.15-.95 0-.54-.14-1.01-.42-1.4-.32-.45-.82-.68-1.48-.68-1.6 0-2.77 1.46-2.77 3.32 0 .41.06.8.18 1.16.43 1.23 1.6 2.07 3.2 2.07.75 0 1.4-.14 1.95-.41.15-.07.25-.11.3-.11.1 0 .15.06.15.17 0 .13-.1.28-.3.42z" />
      </svg>
    ),
    description: "Graphics",
  },
  {
    name: "Visual Studio Code",
    logo: <Code2 className="size-10" strokeWidth={1.5} />,
    description: "Code Editor",
  },
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
    description: "Deployment",
  },
  {
    name: "Kiro",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description: "AI Development",
  },
  { name: "Blender", logo: <Box className="size-10" strokeWidth={1.5} />, description: "3D & Animation" },
  { name: "n8n", logo: <Workflow className="size-10" strokeWidth={1.5} />, description: "Workflow Automation" },
  { name: "Bitbucket", logo: <GitBranch className="size-10" strokeWidth={1.5} />, description: "Git Repositories" },
  { name: "GitHub", logo: <Github className="size-10" strokeWidth={1.5} />, description: "Code & Collaboration" },
  { name: "Anthropic", logo: <Sparkles className="size-10" strokeWidth={1.5} />, description: "Claude Code & Claude Design" },
  { name: "NVIDIA", logo: <Cpu className="size-10" strokeWidth={1.5} />, description: "JetPack · CUDA · TensorRT" },
]

export function StatsSection() {
  const { t, language } = useLanguage()
  const ai = localAiCopy[language]

  return (
    <section id="tools" aria-labelledby="tools-title" className="py-16 lg:py-24 border-t border-border bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            {t("tools.badge")}
          </span>
          <h2 id="tools-title" className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            {t("tools.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("tools.description")}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {tools.map(tool => (
            <li key={tool.name} className="group flex min-h-44 min-w-0 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-background p-4 text-center transition-colors duration-200 hover:border-foreground/40 sm:p-6">
              <div aria-hidden="true" className="text-foreground/70 transition-colors duration-200 group-hover:text-foreground">
                {tool.logo}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground sm:text-base">{tool.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{tool.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div id="local-ai" className="mt-8 grid scroll-mt-24 gap-8 rounded-3xl border border-border bg-background p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:p-10">
          <div className="min-w-0">
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <Cpu className="size-4 shrink-0" aria-hidden="true" /> NVIDIA Jetson AGX Xavier
            </p>
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">{ai.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{ai.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{ai.customers}</p>
            <Link href="/kontakt" className="studio-link mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
              {ai.cta}<ArrowUpRight className="size-4 shrink-0 rtl-flip" aria-hidden="true" />
            </Link>
          </div>
          <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
            <p className="font-display text-5xl font-medium tracking-tight text-foreground" dir="ltr">32 GB</p>
            <p className="mt-2 text-sm text-muted-foreground">{ai.memory}</p>
            <div className="my-6 h-px bg-border" />
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">NVIDIA Software</p>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="NVIDIA Software">
              {["JetPack", "CUDA", "TensorRT", "cuDNN"].map(name => (
                <span key={name} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
