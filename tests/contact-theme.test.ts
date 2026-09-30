import assert from 'node:assert/strict'
import { test, mock } from 'node:test'
import { runInNewContext } from 'node:vm'
import nodemailer, { type SendMailOptions } from 'nodemailer'
import { POST } from '../app/api/contact/route'
import { scheduledTheme, themeInitScript } from '../lib/theme'
import { siteCopy } from '../lib/site-copy'
import { profileCopy } from '../lib/profile-copy'

test('scheduled theme follows the local 10:00 and 18:00 boundaries', () => {
  for (let hour = 0; hour < 24; hour++) {
    assert.equal(scheduledTheme(hour), hour >= 10 && hour < 18 ? 'light' : 'dark')
  }
})

test('before-paint theme respects saved choice and tolerates blocked storage', () => {
  for (const hour of [9, 10, 17, 18]) {
    for (const saved of [null, 'invalid', 'dark', 'light', 'blocked']) {
      let dark = false
      const style = { colorScheme: '' }
      runInNewContext(themeInitScript, {
        Date: class { getHours() { return hour } },
        localStorage: { getItem() { if (saved === 'blocked') throw new Error(); return saved } },
        document: { documentElement: { style, classList: { toggle(_: string, value: boolean) { dark = value } } } },
      })
      const expected = saved === 'dark' || saved === 'light' ? saved : scheduledTheme(hour)
      assert.equal(dark, expected === 'dark')
      assert.equal(style.colorScheme, expected)
    }
  }
})

test('all twelve locales contain every updated copy key', () => {
  assert.equal(Object.keys(siteCopy).length, 12)
  assert.equal(Object.keys(profileCopy).length, 12)
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
