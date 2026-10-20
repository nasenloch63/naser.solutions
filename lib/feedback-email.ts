import nodemailer from 'nodemailer'
import { get } from '@vercel/blob'
import { ownsAttachmentPath, validateAttachment } from './feedback-attachments'

// Leave room for base64 encoding and mail headers (15 MiB becomes about 21 MiB).
export const MAX_EMAIL_ATTACHMENT_BYTES = 15 * 1024 * 1024

type FeedbackAttachment = {
  id: string
  name: string
  blobPath: string
  mimeType: string
  size: number
}

type EmailAttachment = { id: string; filename: string; contentType: string; content: Buffer }

export type FeedbackNotification = {
  projectId: string | number
  projectName: string
  customerName: string
  customerEmail: string
  feedback: string
  attachments: FeedbackAttachment[]
}

export function feedbackEmail(data: FeedbackNotification, attached: EmailAttachment[] = []) {
  const subjectName = data.projectName.replace(/[\r\n]/g, ' ').slice(0, 150)
  const projectId = encodeURIComponent(String(data.projectId))
  return {
    from: 'info@naser-solutions.de',
    to: 'info@naser-solutions.de',
    subject: `Neuer Änderungswunsch: ${subjectName}`,
    disableFileAccess: true,
    disableUrlAccess: true,
    attachments: attached.map(({ filename, contentType, content }) => ({ filename, contentType, content })),
    text: [
      `Projekt: ${data.projectName}`,
      `Kunde: ${data.customerName}`,
      `E-Mail: ${data.customerEmail}`,
      '', 'Änderungswunsch:', data.feedback || '(Nur Anhänge eingereicht)',
      '', `Neue Anhänge: ${data.attachments.length}`,
      ...data.attachments.flatMap(file => [
        `- ${file.name} (${attached.some(item => item.id === file.id) ? 'als E-Mail-Anhang beigefügt' : 'Download im CMS'})`,
        `  https://www.naser-solutions.de/portal/attachments/${projectId}/${encodeURIComponent(file.id)}`,
      ]),
      ...(attached.length < data.attachments.length ? [
        '', 'Nicht beigefügte Dateien überschreiten zusammen das E-Mail-Limit von 15 MB oder konnten nicht geladen werden.',
        'Diese Dateien bitte über die geschützten Downloadlinks öffnen (CMS-Anmeldung erforderlich).',
      ] : []),
      '', 'Änderungswunsch und geschützte Anhänge im CMS öffnen:',
      `https://www.naser-solutions.de/admin/collections/client-projects/${projectId}`,
    ].join('\n'),
  }
}

async function attachmentBuffer(stream: ReadableStream<Uint8Array>, expectedSize: number, signal: AbortSignal) {
  const reader = stream.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  const cancel = () => { void reader.cancel().catch(() => {}) }
  signal.addEventListener('abort', cancel, { once: true })
  try {
    signal.throwIfAborted()
    while (true) {
      const { done, value } = await reader.read()
      signal.throwIfAborted()
      if (done) break
      size += value.byteLength
      if (size > expectedSize) throw new Error('Attachment size mismatch')
      chunks.push(value)
    }
    if (size !== expectedSize) throw new Error('Attachment size mismatch')
    return Buffer.concat(chunks, size)
  } finally {
    signal.removeEventListener('abort', cancel)
    await reader.cancel().catch(() => {})
    reader.releaseLock()
  }
}

export async function prepareFeedbackEmail(data: FeedbackNotification, readBlob: typeof get = get) {
  const attached: EmailAttachment[] = []
  let remaining = MAX_EMAIL_ATTACHMENT_BYTES
  // One deadline for all downloads; a storage outage must not prevent the notification.
  const signal = AbortSignal.timeout(15000)
  for (const file of data.attachments) {
    if (signal.aborted || file.size > remaining || !ownsAttachmentPath(file.blobPath, String(data.projectId)) ||
      validateAttachment({ name: file.name, type: file.mimeType, size: file.size })) continue
    try {
      const result = await readBlob(file.blobPath, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN, abortSignal: signal })
      if (result?.statusCode !== 200) continue
      if (result.blob.pathname !== file.blobPath || result.blob.size !== file.size || result.blob.contentType !== file.mimeType) {
        await result.stream.cancel()
        continue
      }
      const content = await attachmentBuffer(result.stream, file.size, signal)
      attached.push({ id: file.id, filename: file.name, contentType: file.mimeType, content })
      remaining -= content.length
    } catch {
      // Keep other files and the saved request deliverable even if one download fails.
    }
  }
  return feedbackEmail(data, attached)
}

export async function sendFeedbackNotification(data: FeedbackNotification) {
  const password = process.env.STRATO_SMTP_PASSWORD
  if (!password) throw new Error('SMTP configuration unavailable')
  const mail = await prepareFeedbackEmail(data)
  const transport = nodemailer.createTransport({
    host: 'smtp.strato.de', port: 465, secure: true,
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    auth: { user: 'info@naser-solutions.de', pass: password },
  })
  try {
    const result = await transport.sendMail(mail)
    if (!result.accepted?.length) throw new Error('SMTP did not accept notification')
  } finally {
    transport.close()
  }
}
