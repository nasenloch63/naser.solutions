import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Payload } from 'payload'
import { extractJWT } from '../node_modules/payload/dist/auth/extractJWT.js'
import { cmsOrigins } from '../lib/cms-origins'

function cookieToken(origin: string, serverURL = 'https://www.naser.solutions') {
  const payload = { config: { cookiePrefix: 'payload', csrf: cmsOrigins(serverURL), auth: { jwtOrder: ['cookie'] } } } as unknown as Payload
  return extractJWT({ payload, headers: new Headers({ origin, cookie: 'payload-token=test-masteradmin-session' }) })
}

test('Payload cookie authentication recognizes admin saves from both Naser domains', () => {
  for (const origin of ['https://www.naser.solutions', 'https://naser.solutions', 'https://www.naser-solutions.de', 'https://naser-solutions.de']) {
    assert.equal(cookieToken(origin), 'test-masteradmin-session', origin)
  }
})

test('cookie authentication still rejects unrelated origins, lookalike domains and unconfigured ports', () => {
  for (const origin of ['https://attacker.example', 'https://www.naser-solutions.de.attacker.example', 'http://www.naser-solutions.de', 'https://www.naser-solutions.de:8443', 'null']) {
    assert.equal(cookieToken(origin), null, origin)
  }
})

test('the configured preview or local server is normalized without accepting other preview hosts', () => {
  assert.equal(cookieToken('http://localhost:3002', 'http://localhost:3002/'), 'test-masteradmin-session')
  assert.equal(cookieToken('https://this-project.vercel.app', 'https://this-project.vercel.app/'), 'test-masteradmin-session')
  assert.equal(cookieToken('https://another-project.vercel.app', 'https://this-project.vercel.app/'), null)
  const origins = cmsOrigins('https://www.naser-solutions.de/')
  assert.equal(new Set(origins).size, origins.length)
  assert.throws(() => cmsOrigins('file:///tmp/cms'))
})
