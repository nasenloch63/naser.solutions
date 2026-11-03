import { test } from 'node:test'
import assert from 'node:assert/strict'
import nodemailer from 'nodemailer'
import type { get, GetBlobResult } from '@vercel/blob'
import { attachmentPath } from '../lib/feedback-attachments'
import { feedbackEmail, prepareFeedbackEmail, MAX_EMAIL_ATTACHMENT_BYTES, type FeedbackNotification } from '../lib/feedback-email'

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6X8AAAAASUVORK5CYII=', 'base64')
const file = {
  id: '89af3388-86a1-4138-93bd-d5825f62c6de', name: 'logo.png', size: png.length, mimeType: 'image/png',
  blobPath: attachmentPath('2', '89af3388-86a1-4138-93bd-d5825f62c6de', 'logo.png'),
}
const notification: FeedbackNotification = {
  projectId: 2, projectName: 'Joe’s Garage', customerName: 'Sladi', customerEmail: 'customer@example.com',
  feedback: 'Bitte das Logo ändern.', attachments: [file],
}

function blobResult(attachment = file, content = png): Extract<GetBlobResult, { statusCode: 200 }> {
  return {
    statusCode: 200, headers: new Headers(), stream: new Response(content).body!,
    blob: {
      pathname: attachment.blobPath, size: attachment.size, contentType: attachment.mimeType,
      url: 'https://example.private.blob.vercel-storage.com/private-file', downloadUrl: '',
      contentDisposition: 'attachment', cacheControl: '', uploadedAt: new Date(), etag: 'test',
    },
  }
}

test('feedback notification goes only to owner and links protected attachments through CMS', () => {
  const mail = feedbackEmail({ ...notification, projectName: 'Joe’s Garage\r\nInjected' })
  assert.equal(mail.to, 'info@naser-solutions.de')
  assert.equal(mail.from, mail.to)
  assert.doesNotMatch(mail.subject, /[\r\n]/)
  assert.match(mail.text, /Bitte das Logo ändern/)
  assert.match(mail.text, /logo.png/)
  assert.match(mail.text, /https:\/\/www.naser-solutions.de\/admin\/collections\/client-projects\/2/)
  assert.doesNotMatch(mail.text, /blobPath|private\.blob/)
})

test('private image bytes are included as a real MIME attachment with their original filename and type', async () => {
  const mail = await prepareFeedbackEmail(notification, async (pathname, options) => {
    assert.equal(pathname, file.blobPath)
    assert.equal(options.access, 'private')
    assert.ok(options.abortSignal instanceof AbortSignal)
    return blobResult()
  })
  assert.deepEqual(mail.attachments, [{ filename: 'logo.png', contentType: 'image/png', content: png }])
  assert.match(mail.text, /als E-Mail-Anhang beigefügt/)
  assert.doesNotMatch(mail.text, /konnten nicht geladen werden/)
  const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' })
  const result = await transport.sendMail(mail)
  const mime = result.message.toString()
  assert.match(mime, /Content-Type: image\/png; name=logo.png/)
  assert.match(mime, /Content-Disposition: attachment; filename=logo.png/)
  assert.match(mime, /Content-Transfer-Encoding: base64/)
  assert.ok(mime.replace(/\s/g, '').includes(png.toString('base64')))
  assert.doesNotMatch(mime, /private\.blob|client-feedback\//)
})

test('oversized files keep a protected download link and do not block smaller attachments', async () => {
  const large = { ...file, id: 'large', size: MAX_EMAIL_ATTACHMENT_BYTES + 1 }
  let downloads = 0
  const mail = await prepareFeedbackEmail({ ...notification, attachments: [large, file] }, async () => {
    downloads++
    return blobResult()
  })
  assert.equal(downloads, 1)
  assert.equal(mail.attachments.length, 1)
  assert.match(mail.text, /E-Mail-Limit von 15 MB/)
  assert.match(mail.text, /portal\/attachments\/2\/large/)
  assert.match(mail.text, /CMS-Anmeldung erforderlich/)
})

test('the attachment budget applies to the whole message including multiple files', async () => {
  const content = Buffer.alloc(MAX_EMAIL_ATTACHMENT_BYTES / 2)
  const first = { ...file, id: 'first', size: content.length }
  const second = { ...first, id: 'second' }
  let downloads = 0
  const mail = await prepareFeedbackEmail({ ...notification, attachments: [first, second, file] }, async () => {
    downloads++
    return blobResult(first, content)
  })
  assert.equal(downloads, 2)
  assert.equal(mail.attachments.reduce((total, item) => total + item.content.length, 0), MAX_EMAIL_ATTACHMENT_BYTES)
  assert.match(mail.text, /logo.png \(Download im CMS\)/)
})

test('a missing or unavailable blob never suppresses the feedback notification or remaining files', async () => {
  for (const readBlob of [async () => null, async () => { throw new Error('Storage unavailable') }] satisfies (typeof get)[]) {
    const mail = await prepareFeedbackEmail(notification, readBlob)
    assert.equal(mail.attachments.length, 0)
    assert.equal(mail.to, 'info@naser-solutions.de')
    assert.match(mail.text, /Bitte das Logo ändern/)
    assert.match(mail.text, /konnten nicht geladen werden/)
    assert.ok(mail.text.includes(`/portal/attachments/2/${file.id}`))
  }
  let downloads = 0
  const mail = await prepareFeedbackEmail({ ...notification, attachments: [{ ...file, id: 'missing' }, file] }, async () => ++downloads === 1 ? null : blobResult())
  assert.equal(mail.attachments.length, 1)
})

test('another project, arbitrary URLs and unsupported file types cannot be read for email', async () => {
  let downloads = 0
  const attachments = [
    { ...file, blobPath: attachmentPath('3', file.id, file.name) },
    { ...file, blobPath: 'https://example.com/file.png' },
    { ...file, mimeType: 'text/html' },
  ]
  const mail = await prepareFeedbackEmail({ ...notification, attachments }, async () => { downloads++; return blobResult() })
  assert.equal(downloads, 0)
  assert.equal(mail.attachments.length, 0)
  assert.equal(mail.disableFileAccess, true)
  assert.equal(mail.disableUrlAccess, true)
})

test('mismatched metadata, truncated, excessive or broken file streams fall back to links', async () => {
  for (const result of [
    blobResult({ ...file, mimeType: 'text/html' }),
    blobResult({ ...file, blobPath: attachmentPath('3', file.id, file.name) }),
    blobResult(file, png.subarray(1)),
    blobResult(file, Buffer.concat([png, png])),
    { ...blobResult(), stream: new ReadableStream<Uint8Array>({ start(controller) { controller.error(new Error('Read failed')) } }) },
  ]) {
    const mail = await prepareFeedbackEmail(notification, async () => result)
    assert.equal(mail.attachments.length, 0)
    assert.match(mail.text, /Download im CMS/)
  }
})

test('text-only feedback sends without touching private storage', async () => {
  const mail = await prepareFeedbackEmail({ ...notification, attachments: [] }, async () => { throw new Error('Must not read storage') })
  assert.deepEqual(mail.attachments, [])
  assert.match(mail.text, /Neue Anhänge: 0/)
  assert.doesNotMatch(mail.text, /E-Mail-Limit/)
})
