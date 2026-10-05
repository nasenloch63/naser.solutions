import config from '@payload-config'
import { createLocalReq, getPayload, logoutOperation } from 'payload'
import { generateExpiredPayloadCookie } from 'payload/shared'
import { isSameOriginRequest } from '@/lib/portal-session'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: request.headers })
    if (user?.collection === 'users') {
      const req = await createLocalReq({ user, req: { headers: request.headers } }, payload)
      await logoutOperation({ collection: payload.collections.users, req })
    }
    // Expire stale or legacy customer CMS cookies too; leave the independent portal cookie intact.
    return Response.json({ success: true }, { headers: {
      'Cache-Control': 'no-store',
      'Set-Cookie': generateExpiredPayloadCookie({ collectionAuthConfig: payload.collections.users.config.auth, cookiePrefix: payload.config.cookiePrefix }),
    } })
  } catch {
    return Response.json({ error: 'Could not sign out. Please try again.' }, { status: 503 })
  }
}
