'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { FeedbackMessage } from '@/lib/portal-copy'

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
  const { user } = await payload.auth({ headers: await headers() })

  if (!user || user.collection !== 'users' || user.role !== 'client') {
    return { success: false, message: 'sessionExpired' }
  }

  try {
    await payload.update({
      collection: 'client-projects',
      id: projectId,
      data: { clientFeedback: cleanFeedback },
      overrideAccess: false,
      user,
    })
    revalidatePath('/portal')
    return { success: true, message: 'saved' }
  } catch {
    return { success: false, message: 'saveError' }
  }
}
