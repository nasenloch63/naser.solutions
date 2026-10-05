import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import { PORTAL_SESSION_COOKIE, isSameOriginRequest, portalCookieOptions } from '@/lib/portal-session'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  try {
    const { email, password } = await request.json()
    if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 512) throw new Error('Invalid login')
    const payload = await getPayload({ config })
    // Payload still verifies passwords, login limits and revocable sessions.
    const result = await payload.login({ collection: 'users', data: { email, password }, depth: 0, req: { headers: request.headers } })
    if (result.user?.role !== 'client' || !result.token || !result.exp) throw new Error('Invalid login')
    const response = NextResponse.json({ success: true })
    response.headers.set('Cache-Control', 'no-store')
    response.cookies.set(PORTAL_SESSION_COOKIE, result.token, portalCookieOptions(new Date(result.exp * 1000)))
    return response
  } catch {
    return NextResponse.json({ error: 'Invalid login' }, { status: 401 })
  }
}
