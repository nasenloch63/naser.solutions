import assert from 'node:assert/strict'
import { test } from 'node:test'
import { attachmentCopy } from '../lib/attachment-copy'
import { supportedLanguages } from '../lib/language'
import { MAX_ATTACHMENT_BYTES, attachmentPath, ownsAttachmentPath, parseSubmittedAttachments, validateAttachment } from '../lib/feedback-attachments'
import { ClientProjects } from '../cms/collections'
import type { ArrayField } from 'payload'

const uuid = '89af3388-86a1-4138-93bd-d5825f62c6de'

test('attachments allow supported files and enforce size, MIME and extension limits', () => {
  for (const [name, type] of [['screen.PNG', 'image/png'], ['reference.pdf', 'application/pdf'], ['demo.mp4', 'video/mp4'], ['design.webp', 'image/webp']]) assert.equal(validateAttachment({ name, type, size: 100 }), null)
  assert.equal(validateAttachment({ name: 'screenshot.png', type: '', size: MAX_ATTACHMENT_BYTES }), null)
  assert.equal(validateAttachment({ name: 'file.png', type: 'image/png', size: MAX_ATTACHMENT_BYTES + 1 }), 'attachmentTooLarge')
  assert.equal(validateAttachment({ name: 'file.png', type: 'image/png', size: 0 }), 'attachmentTooLarge')
  for (const name of ['page.html', 'icon.svg', 'tool.exe', 'fake.png.exe']) assert.equal(validateAttachment({ name, type: '', size: 10 }), 'attachmentInvalidType')
  assert.equal(validateAttachment({ name: 'fake.png', type: 'text/html', size: 100 }), 'attachmentInvalidType')
})

test('attachment paths are scoped to one project and cannot traverse directories or use arbitrary URLs', () => {
  const pathname = attachmentPath('1', uuid, 'Referenz Entwurf.png')
  assert.ok(ownsAttachmentPath(pathname, '1'))
  assert.equal(ownsAttachmentPath(pathname, '2'), false)
  for (const path of ['https://example.com/private.png', `client-feedback/1/${uuid}/../other.png`, `client-feedback/1/${uuid}/%2e%2e.png`, `client-feedback/1/${uuid}/screenshot.svg`]) assert.equal(ownsAttachmentPath(path, '1'), false)
  assert.equal(ownsAttachmentPath(pathname, '1/../2'), false)
})

test('submission metadata rejects malformed, excessive and duplicated files', () => {
  const file = { pathname: attachmentPath('1', uuid, 'file.png'), name: 'file.png' }
  assert.deepEqual(parseSubmittedAttachments(JSON.stringify([file])), [file])
  assert.deepEqual(parseSubmittedAttachments(null), [])
  for (const value of ['invalid-json', '{}', JSON.stringify([file, file]), JSON.stringify(Array(6).fill(file)), JSON.stringify([{ ...file, name: 123 }])]) assert.throws(() => parseSubmittedAttachments(value))
})

test('customers cannot forge attachment metadata through the collection API', async () => {
  const field = ClientProjects.fields.find((field): field is ArrayField => field.type === 'array' && field.name === 'feedbackAttachments')!
  const clientRequest = { req: { user: { id: 2, role: 'client' } } } as never
  const adminRequest = { req: { user: { id: 1, role: 'admin' } } } as never
  assert.equal(await field.access?.update?.(clientRequest), false)
  assert.equal(await field.access?.update?.(adminRequest), true)
  assert.deepEqual(await ClientProjects.access?.read?.(clientRequest), { client: { equals: 2 } })
})

test('attachment controls and errors are translated in every portal language', () => {
  for (const language of supportedLanguages) {
    assert.deepEqual(Object.keys(attachmentCopy[language]).sort(), Object.keys(attachmentCopy.en).sort())
    assert.ok(Object.values(attachmentCopy[language]).every(value => value.trim().length > 0))
  }
})
