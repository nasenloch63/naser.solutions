'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { FeedbackMessage } from '@/lib/portal-copy'
import { randomUUID } from 'node:crypto'
import { head } from '@vercel/blob'
import { getPortalUser } from '@/lib/portal-session'
import { MAX_PROJECT_ATTACHMENTS, ownsAttachmentPath, parseSubmittedAttachments, validateAttachment } from '@/lib/feedback-attachments'

export type FeedbackState = { message: FeedbackMessage | ''; success: boolean }

export async function saveClientFeedback(
  _state: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const projectId = formData.get('projectId')
  const feedback = formData.get('feedback')

  if ((typeof projectId !== 'string' && typeof projectId !== 'number') || typeof feedback !== 'string') {
    return { success: false, message: 'invalidFeedback' }
  }

  const cleanFeedback = feedback.trim()
  if (cleanFeedback.length > 5000) {
    return { success: false, message: 'feedbackTooLong' }
  }

  const payload = await getPayload({ config })
  const user = await getPortalUser(payload, await headers())

  if (!user || user.collection !== 'users' || user.role !== 'client') {
    return { success: false, message: 'sessionExpired' }
  }

  try {
    const submitted = parseSubmittedAttachments(formData.get('attachmentPaths'))
    // Verify project ownership before inspecting storage or using trusted field writes.
    const project = await payload.findByID({ collection: 'client-projects', id: projectId, overrideAccess: false, user, depth: 0 })
    const existing = project.feedbackAttachments ?? []
    const fresh = submitted.filter(file => !existing.some(saved => saved.blobPath === file.pathname))
    if (existing.length + fresh.length > MAX_PROJECT_ATTACHMENTS) return { success: false, message: 'attachmentTooMany' }
    const attachments = []
    for (const file of fresh) {
      if (!ownsAttachmentPath(file.pathname, String(projectId))) return { success: false, message: 'attachmentUploadError' }
      const blob = await head(file.pathname, { token: process.env.BLOB_READ_WRITE_TOKEN })
      if (blob.pathname !== file.pathname || !new URL(blob.url).hostname.endsWith('.private.blob.vercel-storage.com') || validateAttachment({ name: file.name, size: blob.size, type: blob.contentType })) return { success: false, message: 'attachmentUploadError' }
      const id = randomUUID()
      attachments.push({ id, name: file.name, blobPath: file.pathname, mimeType: blob.contentType, size: blob.size, requestNote: cleanFeedback, submittedAt: new Date().toISOString(), downloadUrl: `/portal/attachments/${project.id}/${id}` })
    }
    await payload.update({
      collection: 'client-projects',
      id: projectId,
      data: { clientFeedback: cleanFeedback, ...(attachments.length ? { feedbackAttachments: [...existing, ...attachments] } : {}) },
      // The ownership check above and storage metadata validation authorize this narrow write.
      // Clients cannot directly edit attachment metadata through the collection API.
      overrideAccess: true,
      user,
    })
    revalidatePath('/portal')
    return { success: true, message: 'saved' }
  } catch {
    return { success: false, message: 'saveError' }
  }
}
