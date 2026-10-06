import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug') || 'home'
  const collection = url.searchParams.get('collection') || 'pages'

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || !['admin', 'editor'].includes(user.role) || !['pages', 'projects'].includes(collection)) return new Response('Bitte zuerst im CMS als Administrator oder Redakteur anmelden.', { status: 401 })
  if (collection === 'projects') {
    (await draftMode()).enable()
    redirect('/projekte')
  }
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
  const path = slug === 'home' ? '/' : `/${slug}`
  if (path.startsWith('//') || path.includes('\\')) return new Response('Ungültiger Pfad', { status: 400 })
  redirect(path)
}
