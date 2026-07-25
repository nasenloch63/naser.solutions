import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import type { BlogPost, Media } from '@/payload-types'

function getImage(post: BlogPost) {
  return typeof post.featuredImage === 'object' && post.featuredImage ? (post.featuredImage as Media) : null
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => {
        const image = getImage(post)
        return (
          <article key={post.id} className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
            {image?.url ? (
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={image.url}
                  alt={image.alt || post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/9] items-end bg-secondary p-6">
                <span className="font-display text-5xl font-bold text-muted-foreground/40">{post.title.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
            <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(new Date(post.publishedAt))}
                </span>
                {post.tags?.slice(0, 2).map((tag) => (
                  <span key={tag.id ?? tag.label} className="rounded-full border border-border px-3 py-1">{tag.label}</span>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <h2 className="font-display text-2xl font-semibold leading-tight text-balance md:text-3xl">{post.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p>
              </div>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline">
                Beitrag lesen <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}
