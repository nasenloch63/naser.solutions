import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/cms'
import type { Media } from '@/payload-types'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `https://www.naser-solutions.de/blog/${post.slug}` },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const image = typeof post.featuredImage === 'object' && post.featuredImage ? (post.featuredImage as Media) : null

  return (
    <main className="min-h-screen pt-20">
      <article>
        <header className="border-b border-border py-16 md:py-24">
          <div className="mx-auto flex max-w-4xl flex-col gap-7 px-6 lg:px-8">
            <Link href="/blog" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück zum Journal
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden="true" />{new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(new Date(post.publishedAt))}</span>
              <span>Von {post.author}</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">{post.title}</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
          </div>
        </header>

        {image?.url && (
          <div className="mx-auto max-w-6xl px-6 pt-12 lg:px-8">
            <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-border bg-muted">
              <Image src={image.url} alt={image.alt || post.title} fill priority className="object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-foreground prose-headings:font-display prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 dark:prose-invert">
            <RichText data={post.content} />
          </div>
        </div>
      </article>
    </main>
  )
}
