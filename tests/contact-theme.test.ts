import assert from 'node:assert/strict'
import { test, mock } from 'node:test'
import { runInNewContext } from 'node:vm'
import nodemailer, { type SendMailOptions } from 'nodemailer'
import { POST } from '../app/api/contact/route'
import { nextThemeBoundary, parseThemeOverride, scheduledTheme, themeInitScript } from '../lib/theme'
import { deviceLanguage, requestLanguage, resolveLanguage, supportedLanguages } from '../lib/language'
import { siteCopy } from '../lib/site-copy'
import { profileCopy } from '../lib/profile-copy'

test('scheduled theme follows the local 10:00 and 18:00 boundaries', () => {
  for (let hour = 0; hour < 24; hour++) {
    assert.equal(scheduledTheme(hour), hour >= 10 && hour < 18 ? 'light' : 'dark')
  }
})

test('before-paint theme uses local time, ignores legacy storage, and expires manual overrides', () => {
  for (const [hour, minute, second] of [[9, 59, 59], [10, 0, 0], [17, 59, 59], [18, 0, 0], [0, 0, 0]]) {
    const now = new Date(2026, 9, 3, hour, minute, second)
    for (const saved of [null, 'invalid', 'dark', 'light', 'blocked', 'expired', 'invalid-theme']) {
      const raw = saved === 'dark' || saved === 'light'
        ? JSON.stringify({ theme: saved, expiresAt: nextThemeBoundary(now).getTime() })
        : saved === 'expired' ? JSON.stringify({ theme: 'light', expiresAt: now.getTime() })
        : saved === 'invalid-theme' ? JSON.stringify({ theme: 'invalid', expiresAt: now.getTime() + 1000 }) : saved
      let dark = false
      const style = { colorScheme: '' }
      let chromeColor = ''
      runInNewContext(themeInitScript, {
        Date: class extends Date { constructor() { super(now) } },
        localStorage: { getItem() { throw new Error('Legacy preferences must not be read') } },
        sessionStorage: { getItem(key: string) { assert.equal(key, 'themeOverride'); if (saved === 'blocked') throw new Error(); return raw } },
        document: {
          documentElement: { style, classList: { toggle(_: string, value: boolean) { dark = value } } },
          querySelector() { return { setAttribute(_: string, value: string) { chromeColor = value } } },
        },
      })
      const expected = saved === 'dark' || saved === 'light' ? saved : scheduledTheme(hour)
      assert.equal(dark, expected === 'dark')
      assert.equal(style.colorScheme, expected)
      assert.equal(chromeColor, expected === 'dark' ? '#0a0a0a' : '#fcfcfc')
    }
  }
})

test('manual theme choices expire at the next local 10:00 or 18:00 boundary', () => {
  for (const hour of [0, 9, 10, 17, 18, 23]) {
    const now = new Date(2026, 9, 3, hour, 30)
    const next = nextThemeBoundary(now)
    assert.ok(next.getTime() > now.getTime())
    assert.equal(next.getHours(), hour >= 10 && hour < 18 ? 18 : 10)
    assert.equal(next.getDate(), hour >= 18 ? 4 : 3)
    const raw = JSON.stringify({ theme: 'dark', expiresAt: next.getTime() })
    assert.equal(parseThemeOverride(raw, now)?.theme, 'dark')
    assert.equal(parseThemeOverride(raw, next), null)
  }
  for (const raw of [null, '{', '[]', '"dark"', '{"theme":"dark","expiresAt":"tomorrow"}']) {
    assert.equal(parseThemeOverride(raw, new Date()), null)
  }
})

test('default language follows device preference order and regional language tags', () => {
  for (const language of supportedLanguages) {
    assert.equal(deviceLanguage([`${language.toUpperCase()}-XX`]), language)
  }
  assert.equal(deviceLanguage(['de-DE', 'ar-SA']), 'de')
  assert.equal(deviceLanguage(['en-US', 'de-DE']), 'en')
  assert.equal(deviceLanguage(['nl-NL', 'fr-CH', 'de-DE']), 'fr')
  assert.equal(deviceLanguage(['pt_BR']), 'pt')
  assert.equal(deviceLanguage(['zh-Hant-TW']), 'zh')
  assert.equal(deviceLanguage(['ko-KR']), 'de')
  assert.equal(deviceLanguage([]), 'de')
  assert.equal(resolveLanguage(['de-DE'], 'ar'), 'ar')
  assert.equal(resolveLanguage(['en-US'], 'invalid'), 'en')
  assert.equal(resolveLanguage(['de-DE'], null), 'de')
  assert.equal(requestLanguage('de-DE,de;q=0.9,ar;q=0.8'), 'de')
  assert.equal(requestLanguage('de;q=0.2,en-US;q=0.9'), 'en')
  assert.equal(requestLanguage('ar;q=0,fr-CH;q=0.8'), 'fr')
  assert.equal(requestLanguage('ja-JP,en;q=0.5'), 'ja')
  assert.equal(requestLanguage(null), 'de')
})

test('all supported locales contain every updated copy key', () => {
  assert.deepEqual(Object.keys(siteCopy).sort(), [...supportedLanguages].sort())
  assert.deepEqual(Object.keys(profileCopy).sort(), [...supportedLanguages].sort())
  for (const [language, copy] of Object.entries(profileCopy)) {
    assert.deepEqual(Object.keys(copy).sort(), Object.keys(profileCopy.de).sort(), language)
    assert.ok(Object.values(copy).every(value => value.trim().length > 0), language)
    assert.ok(copy['about.world'].includes('{ritzi}'), language)
  }
  for (const [language, copy] of Object.entries(siteCopy)) {
    assert.deepEqual(Object.keys(copy).sort(), Object.keys(siteCopy.de).sort(), language)
    assert.ok(Object.values(copy).every(value => value.trim().length > 0))
  }
})

test('contact validation and SMTP delivery with a mocked transport only', async () => {
  const savedPassword = process.env.STRATO_SMTP_PASSWORD
  const sent: SendMailOptions[] = []
  let closed = 0
  let fail = false
  const transportMock = mock.method(nodemailer, 'createTransport', () => ({
    async sendMail(data: SendMailOptions) {
      if (fail) throw new Error('Simulated SMTP failure')
      sent.push(data)
      return { accepted: ['info@naser-solutions.de'] }
    },
    close() { closed++ },
  }))
  const valid = { name: 'Preview Test', email: 'test@example.com', phone: '', message: 'Local automated test.' }
  const request = (body: unknown) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  try {
    process.env.STRATO_SMTP_PASSWORD = 'mock-only'
    for (const body of [null, [], {}, { ...valid, name: ' ' }, { ...valid, name: 'a'.repeat(121) }, { ...valid, email: 'invalid' }, { ...valid, message: ' ' }, { ...valid, message: 'a'.repeat(5001) }, { ...valid, phone: '1'.repeat(61) }]) {
      assert.equal((await POST(request(body))).status, 400)
    }
    assert.equal((await POST(new Request('http://localhost/api/contact', { method: 'POST', body: '{' }))).status, 400)
    assert.equal((await POST(request({ ...valid, website: 'spam' }))).status, 200)
    assert.equal(transportMock.mock.callCount(), 0)
    delete process.env.STRATO_SMTP_PASSWORD
    assert.equal((await POST(request(valid))).status, 500)
    assert.equal(transportMock.mock.callCount(), 0)
    process.env.STRATO_SMTP_PASSWORD = 'mock-only'
    const response = await POST(request({ ...valid, email: ' TEST@example.com ' }))
    assert.equal(response.status, 200)
    assert.equal((await response.json()).success, true)
    assert.equal(sent.length, 1)
    assert.equal(sent[0].replyTo, 'test@example.com')
    assert.equal(sent[0].to, 'info@naser-solutions.de')
    assert.equal(closed, 1)
    fail = true
    assert.equal((await POST(request(valid))).status, 500)
    assert.equal(closed, 2)
  } finally {
    transportMock.mock.restore()
    if (savedPassword === undefined) delete process.env.STRATO_SMTP_PASSWORD
    else process.env.STRATO_SMTP_PASSWORD = savedPassword
  }
})
