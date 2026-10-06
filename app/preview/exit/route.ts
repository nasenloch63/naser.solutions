import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const drafts = await draftMode()
  drafts.disable()

  const url = new URL(request.url)
  const path = url.searchParams.get('redirect') || '/'
  redirect(path.startsWith('/') && !path.startsWith('//') && !path.includes('\\') ? path : '/')
}
