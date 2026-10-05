export const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024
export const MAX_ATTACHMENTS_PER_SUBMISSION = 5
export const MAX_PROJECT_ATTACHMENTS = 20
export const attachmentTypes = {
  'image/jpeg': ['jpg', 'jpeg'], 'image/png': ['png'], 'image/webp': ['webp'], 'image/gif': ['gif'],
  'application/pdf': ['pdf'], 'video/mp4': ['mp4'], 'video/webm': ['webm'],
} as const
export const ATTACHMENT_ACCEPT = Object.values(attachmentTypes).flat().map(extension => `.${extension}`).join(',')
export type AttachmentError = 'attachmentTooLarge' | 'attachmentInvalidType' | 'attachmentTooMany' | 'attachmentUploadError'
export type SubmittedAttachment = { pathname: string; name: string }
export type PortalAttachment = { id: string; name: string; size: number; mimeType: string; downloadUrl: string }

export function attachmentContentType(name: string): keyof typeof attachmentTypes | undefined {
  const extension = name.toLowerCase().split('.').pop()
  return (Object.entries(attachmentTypes).find(([, extensions]) => (extensions as readonly string[]).includes(extension ?? ''))?.[0]) as keyof typeof attachmentTypes | undefined
}

export function validateAttachment(file: { name: string; size: number; type: string }): AttachmentError | null {
  const type = attachmentContentType(file.name)
  if (!type || file.name.length > 200 || (file.type && file.type !== type)) return 'attachmentInvalidType'
  if (!Number.isSafeInteger(file.size) || file.size <= 0 || file.size > MAX_ATTACHMENT_BYTES) return 'attachmentTooLarge'
  return null
}

export function attachmentPath(projectId: string, id: string, name: string) {
  const safeName = name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120)
  return `client-feedback/${projectId}/${id}/${safeName}`
}

export function ownsAttachmentPath(pathname: unknown, projectId: string): pathname is string {
  return typeof pathname === 'string' && /^[1-9]\d*$/.test(projectId) &&
    new RegExp(`^client-feedback/${projectId}/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/[a-zA-Z0-9._-]{1,120}$`).test(pathname) &&
    Boolean(attachmentContentType(pathname))
}

export function parseSubmittedAttachments(value: FormDataEntryValue | null): SubmittedAttachment[] {
  if (value === null || value === '') return []
  if (typeof value !== 'string' || value.length > 4000) throw new Error('Invalid attachments')
  const parsed: unknown = JSON.parse(value)
  if (!Array.isArray(parsed) || parsed.length > MAX_ATTACHMENTS_PER_SUBMISSION) throw new Error('Too many attachments')
  if (parsed.some(item => !item || typeof item.pathname !== 'string' || typeof item.name !== 'string' || item.name.length < 1 || item.name.length > 200)) throw new Error('Invalid attachments')
  if (new Set(parsed.map(item => item.pathname)).size !== parsed.length) throw new Error('Duplicate attachments')
  return parsed
}

export function formatAttachmentSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.ceil(bytes / 1024))} KB`
}
