import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Page } from '../payload-types'
import { buildMetadata, metadataForPage, publicPageMetadata, SHARE_PAGES, SITE_URL, socialImageUrl } from '../lib/seo'
import { isSectionSlug, sectionSlugs } from '../lib/section-pages'

test('shareable pages use the original logo preview, with a separate portrait preview for about', () => {
  const images = new Set<string>()
  for (const [path, page] of Object.entries(SHARE_PAGES)) {
    const metadata = publicPageMetadata(path)
    const og = metadata.openGraph as { title: string; description: string; url: string; images: { url: string; width: number; height: number; type: string; alt: string }[] }
    const twitter = metadata.twitter as { title: string; description: string; images: { url: string; alt: string }[] }
    assert.equal(metadata.alternates?.canonical, new URL(path, SITE_URL).href)
    assert.equal(og.url, metadata.alternates?.canonical)
    assert.equal(og.title, page.title)
    assert.equal(twitter.title, page.title)
    assert.equal(og.description, page.description)
    assert.equal(twitter.description, page.description)
    assert.equal(og.images[0].url, socialImageUrl(path))
    assert.equal(twitter.images[0].url, og.images[0].url)
    assert.equal(og.images[0].width, 1200)
    assert.equal(og.images[0].height, 630)
    assert.equal(og.images[0].type, 'image/png')
    assert.equal(og.images[0].alt, page.title)
    assert.equal(twitter.images[0].alt, page.title)
    images.add(og.images[0].url)
  }
  assert.equal(images.size, 2)
  assert.notEqual(socialImageUrl('/ueber-uns'), socialImageUrl('/'))
  assert.equal(socialImageUrl('/leistungen'), socialImageUrl('/'))
  assert.ok(socialImageUrl('/').endsWith('?v=3'))
  assert.equal(SITE_URL, 'https://www.naser-solutions.de')
})

test('CMS pages use the brand preview even with an uploaded SEO image and preserve no-index settings', () => {
  const page: Page = { id: 1, title: 'Beispielprojekt', slug: 'projekte/beispiel', layout: [], createdAt: '2026-10-03', updatedAt: '2026-10-03' }
  const defaultMetadata = metadataForPage(page)
  assert.equal((defaultMetadata.openGraph as { images: { url: string }[] }).images[0].url, socialImageUrl('/projekte/beispiel'))
  page.seo = {
    title: 'Individueller Titel', description: 'Individuelle Beschreibung', noIndex: true,
    image: { id: 1, alt: 'Projektvorschau', url: '/uploads/custom.jpg', width: 1600, height: 900, mimeType: 'image/jpeg', createdAt: '2026-10-03', updatedAt: '2026-10-03' },
  }
  const metadata = metadataForPage(page)
  const image = (metadata.openGraph as { images: { url: string; width: number; height: number; alt: string; type: string }[] }).images[0]
  assert.equal(image.url, socialImageUrl('/'))
  assert.equal(image.width, 1200)
  assert.equal(image.height, 630)
  assert.equal(image.alt, 'Individueller Titel')
  assert.equal(image.type, 'image/png')
  assert.equal((metadata.robots as { index: boolean }).index, false)
})

test('section links have real shareable pages while unknown sections remain CMS routes', () => {
  for (const slug of sectionSlugs) {
    assert.ok(isSectionSlug(slug))
    assert.ok(SHARE_PAGES[`/${slug}`])
  }
  assert.equal(isSectionSlug('unknown'), false)
  assert.equal(isSectionSlug('projekte/beispiel'), false)
  const metadata = buildMetadata({ title: 'Test', description: 'Test', path: '/new-page' })
  assert.equal((metadata.openGraph as { images: { url: string }[] }).images[0].url, socialImageUrl('/new-page'))
})
