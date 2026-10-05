import config from '@payload-config'
import { getPayload } from 'payload'
import { get } from '@vercel/blob'
import { ownsAttachmentPath } from '@/lib/feedback-attachments'

export const runtime = 'nodejs'

export async function GET(request: Request, { params }: { params: Promise<{ projectId: string; attachmentId: string }> }) {
  const { projectId, attachmentId } = await params
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || user.collection !== 'users') return new Response('Not authorized', { status: 401 })
  try {
    const project = await payload.findByID({ collection: 'client-projects', id: projectId, overrideAccess: false, user, depth: 0 })
    const attachment = project.feedbackAttachments?.find(file => file.id === attachmentId)
    if (!attachment || !ownsAttachmentPath(attachment.blobPath, projectId)) return new Response('Not found', { status: 404 })
    const result = await get(attachment.blobPath, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN })
    if (result?.statusCode !== 200) return new Response('Not found', { status: 404 })
    return new Response(result.stream, {
      headers: {
        'Content-Type': attachment.mimeType,
        'Content-Disposition': `attachment; filename="attachment"; filename*=UTF-8''${encodeURIComponent(attachment.name)}`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; sandbox",
      },
    })
  } catch {
    // Do not disclose whether an attachment belongs to another customer.
    return new Response('Not found', { status: 404 })
  }
}
