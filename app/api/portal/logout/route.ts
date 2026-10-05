import config from '@payload-config'
import { createLocalReq, getPayload, logoutOperation } from 'payload'
import { NextResponse } from 'next/server'
import { PORTAL_SESSION_COOKIE, getPortalUser, isSameOriginRequest, portalCookieOptions } from '@/lib/portal-session'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const payload = await getPayload({ config })
  const { user: legacyUser } = await payload.auth({ headers: request.headers })
  const user = await getPortalUser(payload, request.headers)
  if (user) {
    const req = await createLocalReq({ user, req: { headers: request.headers } }, payload)
    await logoutOperation({ collection: payload.collections.users, req })
  }
  const response = NextResponse.json({ success: true })
  response.headers.set('Cache-Control', 'no-store')
  response.cookies.set(PORTAL_SESSION_COOKIE, '', portalCookieOptions(new Date(0)))
  // Clear a legacy customer cookie only. Never sign the CMS staff account out.
  if (legacyUser?.collection === 'users' && legacyUser.role === 'client') {
    response.cookies.set(`${payload.config.cookiePrefix}-token`, '', portalCookieOptions(new Date(0)))
  }
  return response
}
