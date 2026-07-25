import type { Metadata } from 'next'
import { BlogList } from '@/components/blog-list'
import { getBlogPosts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Einblicke & Referenzen | Naser Solutions',
  description: 'Digitale Projekte, Partner und Einblicke aus Webdesign, Entwicklung und Markenstrategie bei Naser Solutions.',
  alternates: { canonical: 'https://www.naser-solutions.de/blog' },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen pt-20">
      <section className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Journal</span>
          <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Projekte, Partner und digitale Perspektiven.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Einblicke in ausgewählte Arbeiten, digitale Strategien und die Menschen hinter starken Marken.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length ? <BlogList posts={posts} /> : <p className="text-muted-foreground">Noch keine Beiträge veröffentlicht.</p>}
        </div>
      </section>
    </main>
  )
}
