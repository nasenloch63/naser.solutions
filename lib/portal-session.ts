import type { Payload } from 'payload'

export const PORTAL_SESSION_COOKIE = 'naser-portal-token'

export function portalAuthenticationHeaders(source: Headers): Headers {
  const cookie = source.get('cookie')?.split(';').map(value => value.trim()).find(value => value.startsWith(`${PORTAL_SESSION_COOKIE}=`))
  if (!cookie) return source
  const headers = new Headers(source)
  // Resolve the portal session independently of the CMS cookie or Authorization header.
  headers.delete('cookie')
  headers.set('authorization', `JWT ${cookie.slice(PORTAL_SESSION_COOKIE.length + 1)}`)
  return headers
}

export async function getPortalUser(payload: Pick<Payload, 'auth'>, headers: Headers) {
  const { user } = await payload.auth({ headers: portalAuthenticationHeaders(headers) })
  // Existing customer sessions still work; a CMS account cannot become a portal session.
  return user?.collection === 'users' && user.role === 'client' ? user : null
}

export function isSameOriginRequest(request: Request) {
  return request.headers.get('origin') === new URL(request.url).origin
}

export function portalCookieOptions(expires: Date) {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', expires }
}
