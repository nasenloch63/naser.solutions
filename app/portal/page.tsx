import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ArrowUpRight, CircleCheck, Globe2 } from 'lucide-react'
import { PortalLoginForm } from '@/components/portal-login-form'
import { FeedbackForm, LogoutButton } from '@/components/portal-controls'

const statusLabels: Record<string, string> = {
  preparation: 'In Vorbereitung',
  active: 'In Bearbeitung',
  live: 'Veröffentlicht',
  paused: 'Pausiert',
}

function domainUrl(domain: string) {
  return `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
}

export default async function PortalPage() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) return <PortalLoginForm />
  if (user.collection !== 'users') return <PortalLoginForm />
  if (user.role === 'admin' || user.role === 'editor') redirect('/admin')
  if (user.role !== 'client') return <PortalLoginForm />

  const projects = await payload.find({
    collection: 'client-projects',
    overrideAccess: false,
    user,
    depth: 0,
    limit: 20,
    sort: 'name',
  })

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a className="font-display text-lg font-semibold tracking-tight" href="https://www.naser.solutions">Naser Solutions</a>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="flex flex-col gap-3">
          <p className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">Ihr Kundenbereich</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Willkommen, {user.name}</h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">Hier finden Sie den aktuellen Stand und die wichtigsten Informationen zu Ihrem Projekt.</p>
        </section>

        {projects.docs.length === 0 ? (
          <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">Noch kein Projekt zugeordnet</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Sobald Ihr Projekt freigeschaltet wurde, erscheint es automatisch an dieser Stelle.</p>
          </section>
        ) : (
          <div className="flex flex-col gap-6">
            {projects.docs.map((project) => (
              <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" key={project.id}>
                <div className="flex flex-col gap-6 p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-muted-foreground">Ihr Projekt</p>
                      <h2 className="font-display text-2xl font-semibold tracking-tight text-balance">{project.name}</h2>
                    </div>
                    <div className="flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
                      <CircleCheck className="size-4" aria-hidden="true" />
                      {statusLabels[project.status] ?? project.status}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
                        <Globe2 className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Domain</p>
                        <p className="font-mono text-sm font-medium">{project.domain}</p>
                      </div>
                    </div>
                    <a className="flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90" href={domainUrl(project.domain)} rel="noopener noreferrer" target="_blank">
                      Website öffnen
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="border-t border-border bg-muted/40 p-6 sm:p-8">
                  <FeedbackForm initialFeedback={project.clientFeedback ?? ''} projectId={String(project.id)} />
                </div>
              </article>
            ))}
          </div>
        )}

        <footer className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          Benötigen Sie direkte Unterstützung? Kontaktieren Sie Ihr Team bei Naser Solutions.
        </footer>
      </div>
    </main>
  )
}
