import config from '@payload-config'
import { getPayload } from 'payload'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { MAX_ATTACHMENT_BYTES, MAX_PROJECT_ATTACHMENTS, ownsAttachmentPath, validateAttachment, attachmentContentType } from '@/lib/feedback-attachments'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json() as HandleUploadBody
    const result = await handleUpload({
      body, request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Authenticate before issuing any upload capability; the project ID is untrusted.
        const origin = request.headers.get('origin')
        if (!origin || origin !== new URL(request.url).origin) throw new Error('Invalid origin')
        const payload = await getPayload({ config })
        const { user } = await payload.auth({ headers: request.headers })
        if (!user || user.collection !== 'users' || user.role !== 'client') throw new Error('Not authorized')
        const metadata = JSON.parse(clientPayload ?? '{}') as { projectId: string; name: string; size: number; type: string }
        if (!ownsAttachmentPath(pathname, metadata.projectId) || typeof metadata.name !== 'string' || metadata.name.length > 200 || validateAttachment(metadata) || attachmentContentType(pathname) !== attachmentContentType(metadata.name)) throw new Error('Invalid attachment')
        const project = await payload.findByID({ collection: 'client-projects', id: metadata.projectId, overrideAccess: false, user, depth: 0 })
        if ((project.feedbackAttachments?.length ?? 0) >= MAX_PROJECT_ATTACHMENTS) throw new Error('Attachment limit reached')
        return {
          allowedContentTypes: [attachmentContentType(metadata.name)!],
          maximumSizeInBytes: MAX_ATTACHMENT_BYTES,
          validUntil: Date.now() + 15 * 60 * 1000,
          addRandomSuffix: false, allowOverwrite: false,
        }
      },
      onUploadCompleted: async () => {
        // Files are only attached to a change request after the customer submits it.
      },
    })
    return Response.json(result)
  } catch {
    return Response.json({ error: 'Attachment upload was not authorized or could not be prepared.' }, { status: 400 })
  }
}
