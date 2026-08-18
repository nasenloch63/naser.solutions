'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type FeedbackState = { message: string; success: boolean }

export async function saveClientFeedback(
  _state: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const projectId = formData.get('projectId')
  const feedback = formData.get('feedback')

  if ((typeof projectId !== 'string' && typeof projectId !== 'number') || typeof feedback !== 'string') {
    return { success: false, message: 'Die Eingabe konnte nicht verarbeitet werden.' }
  }

  const cleanFeedback = feedback.trim()
  if (cleanFeedback.length > 5000) {
    return { success: false, message: 'Das Feedback darf maximal 5.000 Zeichen enthalten.' }
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user || user.collection !== 'users' || user.role !== 'client') {
    return { success: false, message: 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.' }
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
    return { success: true, message: 'Ihre Änderungswünsche wurden sicher gespeichert.' }
  } catch {
    return { success: false, message: 'Das Feedback konnte nicht gespeichert werden.' }
  }
}
