import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')
  const slug = url.searchParams.get('slug') || 'home'
  const collection = url.searchParams.get('collection') || 'pages'

  if (secret !== process.env.PAYLOAD_PREVIEW_SECRET || collection !== 'pages') {
    return new Response('Ungültige Vorschau-Anfrage', { status: 401 })
  }

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    draft: true,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  })

  if (!result.docs[0]) return new Response('Seite nicht gefunden', { status: 404 })

  const drafts = await draftMode()
  drafts.enable()
  redirect(slug === 'home' ? '/' : `/${slug}`)
}
