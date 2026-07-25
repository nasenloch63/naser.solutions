import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const drafts = await draftMode()
  drafts.disable()

  const url = new URL(request.url)
  redirect(url.searchParams.get('redirect') || '/')
}
