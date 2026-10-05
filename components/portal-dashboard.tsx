'use client'

import { ArrowUpRight, CircleCheck, Globe2 } from 'lucide-react'
import { FeedbackForm, LogoutButton } from '@/components/portal-controls'
import { PortalLanguageSwitcher, usePortalCopy } from '@/components/portal-language-switcher'
import { portalStatusKeys } from '@/lib/portal-copy'

export type PortalProject = {
  id: string
  name: string
  domain: string
  status: keyof typeof portalStatusKeys
  clientFeedback: string
}

function domainUrl(domain: string) {
  return `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
}

export function PortalDashboard({ name, projects }: { name: string; projects: PortalProject[] }) {
  const copy = usePortalCopy()

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a className="font-display text-lg font-semibold tracking-tight" href="https://www.naser.solutions">Naser Solutions</a>
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
            <PortalLanguageSwitcher />
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="flex flex-col gap-3">
          <p className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">{copy.area}</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{copy.welcome}, <bdi>{name}</bdi></h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">{copy.description}</p>
        </section>
        {projects.length === 0 ? (
          <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">{copy.emptyTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.emptyDescription}</p>
          </section>
        ) : (
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" key={project.id}>
                <div className="flex flex-col gap-6 p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-col gap-2">
                      <p className="text-sm font-medium text-muted-foreground">{copy.project}</p>
                      <h2 className="font-display break-words text-2xl font-semibold tracking-tight text-balance"><bdi>{project.name}</bdi></h2>
                    </div>
                    <div className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
                      <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
                      {copy[portalStatusKeys[project.status]]}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground"><Globe2 className="size-5" aria-hidden="true" /></div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{copy.domain}</p>
                        <p className="break-all font-mono text-sm font-medium" dir="ltr">{project.domain}</p>
                      </div>
                    </div>
                    <a className="flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90" href={domainUrl(project.domain)} rel="noopener noreferrer" target="_blank">
                      {copy.openWebsite}<ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="border-t border-border bg-muted/40 p-6 sm:p-8">
                  <FeedbackForm initialFeedback={project.clientFeedback} projectId={project.id} />
                </div>
              </article>
            ))}
          </div>
        )}
        <footer className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">{copy.support}</footer>
      </div>
    </main>
  )
}
