import Link from 'next/link'

export function PreviewBanner() {
  return <aside className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-primary/30 bg-background/95 px-4 py-3 text-sm shadow-xl backdrop-blur-xl" aria-label="CMS-Vorschau">
    <strong>Entwurfs-Vorschau</strong><span>Änderungen sind noch nicht veröffentlicht.</span>
    <Link className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground" href="/preview/exit">Vorschau beenden</Link>
  </aside>
}
