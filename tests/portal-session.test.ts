import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Payload } from 'payload'
import { PORTAL_SESSION_COOKIE, getPortalUser, isSameOriginRequest, portalAuthenticationHeaders, portalCookieOptions } from '../lib/portal-session'

function authenticationFixture() {
  const users = { customer: { id: 2, collection: 'users', role: 'client' }, admin: { id: 1, collection: 'users', role: 'admin' } }
  return { auth: async ({ headers }: { headers: Headers }) => {
    const token = headers.get('authorization')?.replace('JWT ', '') ?? headers.get('cookie')?.match(/payload-token=(\w+)/)?.[1]
    return { user: users[token as keyof typeof users] ?? null }
  } } as unknown as Pick<Payload, 'auth'>
}

test('portal and CMS identities remain independent in the same browser', async () => {
  const payload = authenticationFixture()
  const headers = new Headers({ cookie: `payload-token=admin; ${PORTAL_SESSION_COOKIE}=customer`, authorization: 'JWT admin' })
  assert.equal((await payload.auth({ headers })).user?.role, 'admin')
  assert.equal((await getPortalUser(payload, headers))?.id, 2)
  assert.equal(headers.get('cookie'), `payload-token=admin; ${PORTAL_SESSION_COOKIE}=customer`)
  const portalHeaders = portalAuthenticationHeaders(headers)
  assert.equal(portalHeaders.get('cookie'), null)
  assert.equal(portalHeaders.get('authorization'), 'JWT customer')
})

test('expired portal sessions cannot silently fall back to another signed-in account', async () => {
  const payload = authenticationFixture()
  assert.equal(await getPortalUser(payload, new Headers({ cookie: `${PORTAL_SESSION_COOKIE}=expired; payload-token=customer` })), null)
  assert.equal(await getPortalUser(payload, new Headers({ cookie: `${PORTAL_SESSION_COOKIE}=admin` })), null)
})

test('legacy customer sessions keep working without treating a masteradmin as a customer', async () => {
  const payload = authenticationFixture()
  assert.equal((await getPortalUser(payload, new Headers({ cookie: 'payload-token=customer' })))?.id, 2)
  assert.equal(await getPortalUser(payload, new Headers({ cookie: 'payload-token=admin' })), null)
  assert.equal(await getPortalUser(payload, new Headers()), null)
})

test('portal login and logout require a matching origin and use an HTTP-only expiring cookie', () => {
  for (const origin of ['https://evil.example', 'https://naser.solutions']) assert.equal(isSameOriginRequest(new Request('https://www.naser.solutions/api/portal/login', { headers: { origin } })), false)
  assert.equal(isSameOriginRequest(new Request('https://www.naser.solutions/api/portal/logout')), false)
  assert.ok(isSameOriginRequest(new Request('https://www.naser.solutions/api/portal/login', { headers: { origin: 'https://www.naser.solutions' } })))
  const expires = new Date('2026-10-05T18:00:00Z')
  assert.deepEqual(portalCookieOptions(expires), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', expires })
  assert.notEqual(PORTAL_SESSION_COOKIE, 'payload-token')
})
