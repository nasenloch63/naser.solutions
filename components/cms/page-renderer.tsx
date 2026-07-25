'use client'

import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { ArrowRight, Code2, Globe2, Palette, Rocket, ShieldCheck, Sparkles } from 'lucide-react'
import type { Page, Project } from '@/payload-types'
import { ContactSection } from '@/components/contact-section'
import { cn } from '@/lib/utils'

const iconMap = { Code2, Globe: Globe2, Globe2, Palette, Rocket, ShieldCheck, Sparkles }

const sectionThemes = {
  default: 'bg-background text-foreground',
  dark: 'bg-foreground text-background',
  light: 'bg-secondary text-secondary-foreground',
  accent: 'bg-primary text-primary-foreground',
}

const spacing = {
  compact: 'py-12 md:py-16',
  normal: 'py-20 md:py-28',
  large: 'py-28 md:py-36',
}

function sectionClass(settings?: { theme?: string | null; spacing?: string | null }) {
  return cn(
    sectionThemes[(settings?.theme ?? 'default') as keyof typeof sectionThemes],
    spacing[(settings?.spacing ?? 'normal') as keyof typeof spacing],
  )
}

function ActionLink({ action }: { action: { label: string; url: string; style?: string | null; newTab?: boolean | null } }) {
  return (
    <Link
      href={action.url}
      target={action.newTab ? '_blank' : undefined}
      rel={action.newTab ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-transform hover:-translate-y-0.5',
        action.style === 'secondary' && 'border border-current bg-transparent',
        action.style === 'link' && 'px-0 underline underline-offset-4',
        (!action.style || action.style === 'primary') && 'bg-primary text-primary-foreground',
      )}
    >
      {action.label}
      <ArrowRight className="size-4 rtl-flip" aria-hidden="true" />
    </Link>
  )
}

function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const image = typeof project.thumbnail === 'object' ? project.thumbnail : null
        return (
          <article key={project.id} className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
            {image?.url && (
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image src={image.url} alt={image.alt} fill className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            )}
            <div className="flex flex-col gap-4 p-6">
              {project.category && <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{project.category}</p>}
              <h3 className="font-display text-2xl font-semibold text-balance">{project.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{project.description}</p>
              <Link href={project.url} className="inline-flex items-center gap-2 font-medium">Projekt ansehen <ArrowRight className="size-4 rtl-flip" /></Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export function PageRenderer({ initialPage, projects = [] }: { initialPage: Page; projects?: Project[] }) {
  const { data: page } = useLivePreview<Page>({
    initialData: initialPage,
    serverURL: typeof window === 'undefined' ? '' : window.location.origin,
    depth: 2,
  })

  return (
    <>
      {page.layout.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`
        const anchor = block.settings?.anchor || undefined

        if (block.blockType === 'hero') {
          const image = typeof block.image === 'object' ? block.image : null
          return (
            <section key={key} id={anchor} className={cn(sectionClass(block.settings), 'overflow-hidden pt-32')}>
              <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
                <div className="flex flex-col items-start gap-6">
                  {block.eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">{block.eyebrow}</p>}
                  <h1 className="font-display text-5xl font-bold tracking-tight text-balance md:text-7xl">{block.heading} {block.highlight && <span className="text-muted-foreground">{block.highlight}</span>}</h1>
                  {block.description && <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{block.description}</p>}
                  {block.actions?.length ? <div className="flex flex-wrap gap-4">{block.actions.map((action) => <ActionLink key={action.id ?? action.url} action={action} />)}</div> : null}
                </div>
                {image?.url && <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary"><Image src={image.url} alt={image.alt} fill priority={index === 0} className="object-cover" /></div>}
              </div>
            </section>
          )
        }

        if (block.blockType === 'content') {
          const width = block.width === 'narrow' ? 'max-w-3xl' : block.width === 'wide' ? 'max-w-7xl' : 'max-w-5xl'
          return <section key={key} id={anchor} className={sectionClass(block.settings)}><div className={cn('mx-auto px-6 lg:px-8', width)}>{block.eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">{block.eyebrow}</p>}{block.heading && <h2 className="mb-8 font-display text-4xl font-bold text-balance md:text-6xl">{block.heading}</h2>}<RichText data={block.content} className="cms-richtext" /></div></section>
        }

        if (block.blockType === 'media') {
          const media = typeof block.media === 'object' ? block.media : null
          return media?.url ? <section key={key} id={anchor} className={sectionClass(block.settings)}><figure className={cn('mx-auto px-6 lg:px-8', block.fullWidth ? 'max-w-none' : 'max-w-7xl')}><div className="relative aspect-video overflow-hidden rounded-3xl bg-secondary"><Image src={media.url} alt={media.alt} fill className="object-cover" /></div>{block.caption && <figcaption className="mt-4 text-sm text-muted-foreground">{block.caption}</figcaption>}</figure></section> : null
        }

        if (block.blockType === 'featureGrid') {
          return <section key={key} id={anchor} className={sectionClass(block.settings)}><div className="mx-auto max-w-7xl px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">{block.eyebrow}</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-bold text-balance md:text-6xl">{block.heading}</h2>{block.description && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{block.description}</p>}<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{block.items?.map((item) => { const Icon = iconMap[(item.icon ?? 'Sparkles') as keyof typeof iconMap] ?? Sparkles; const card = <div className="flex h-full flex-col gap-4 rounded-2xl border border-current/10 bg-card p-6 text-card-foreground"><Icon className="size-7" aria-hidden="true" /><h3 className="font-display text-2xl font-semibold">{item.title}</h3>{item.description && <p className="leading-relaxed text-muted-foreground">{item.description}</p>}</div>; return item.link ? <Link key={item.id ?? item.title} href={item.link}>{card}</Link> : <div key={item.id ?? item.title}>{card}</div> })}</div></div></section>
        }

        if (block.blockType === 'projects') {
          const selected = block.selection?.map((item) => typeof item === 'object' ? item : projects.find((project) => project.id === item)).filter(Boolean) as Project[] | undefined
          return <section key={key} id={anchor} className={sectionClass(block.settings)}><div className="mx-auto max-w-7xl px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">{block.eyebrow}</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-bold text-balance md:text-6xl">{block.heading}</h2>{block.description && <p className="mt-6 mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground">{block.description}</p>}<ProjectCards projects={selected?.length ? selected : projects} /></div></section>
        }

        if (block.blockType === 'stats') {
          return <section key={key} id={anchor} className={sectionClass(block.settings)}><div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">{block.items?.map((item) => <div key={item.id ?? item.label} className="flex flex-col gap-2 border-t border-current/20 pt-6"><strong className="font-display text-4xl md:text-5xl">{item.value}</strong><span className="font-medium">{item.label}</span>{item.description && <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>}</div>)}</div></section>
        }

        if (block.blockType === 'faq') {
          return <section key={key} id={anchor} className={sectionClass(block.settings)}><div className="mx-auto max-w-4xl px-6 lg:px-8"><h2 className="mb-10 font-display text-4xl font-bold text-balance md:text-6xl">{block.heading}</h2><div className="flex flex-col gap-4">{block.items?.map((item) => <details key={item.id ?? item.question} className="rounded-2xl border border-border bg-card p-6 text-card-foreground"><summary className="cursor-pointer font-display text-xl font-semibold">{item.question}</summary><RichText data={item.answer} className="cms-richtext mt-4" /></details>)}</div></div></section>
        }

        if (block.blockType === 'cta') {
          return <section key={key} id={anchor} className={sectionClass(block.settings)}><div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center lg:px-8"><h2 className="font-display text-4xl font-bold text-balance md:text-6xl">{block.heading}</h2>{block.description && <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{block.description}</p>}{block.actions?.length ? <div className="flex flex-wrap justify-center gap-4">{block.actions.map((action) => <ActionLink key={action.id ?? action.url} action={action} />)}</div> : null}</div></section>
        }

        if (block.blockType === 'contact') return <div key={key} id={anchor}><ContactSection /></div>

        return null
      })}
    </>
  )
}
