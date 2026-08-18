'use client'

import { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Send } from 'lucide-react'
import { saveClientFeedback, type FeedbackState } from '@/app/portal/actions'

const initialState: FeedbackState = { message: '', success: false }

export function FeedbackForm({ projectId, initialFeedback }: { projectId: string; initialFeedback: string }) {
  const [state, action, isPending] = useActionState(saveClientFeedback, initialState)

  return (
    <form action={action} className="flex flex-col gap-4">
      <input name="projectId" type="hidden" value={projectId} />
      <label className="flex flex-col gap-2 text-sm font-medium" htmlFor={`feedback-${projectId}`}>
        Feedback / Änderungswünsche
        <textarea
          className="min-h-32 resize-y rounded-md border border-input bg-background p-3 text-base leading-6 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          defaultValue={initialFeedback}
          id={`feedback-${projectId}`}
          maxLength={5000}
          name="feedback"
          placeholder="Welche Anpassungen wünschen Sie sich?"
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${state.success ? 'text-foreground' : 'text-destructive'}`} aria-live="polite">{state.message}</p>
        <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60" disabled={isPending} type="submit">
          <Send className="size-4" aria-hidden="true" />
          {isPending ? 'Wird gespeichert …' : 'Feedback speichern'}
        </button>
      </div>
    </form>
  )
}

export function LogoutButton() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function logout() {
    setIsPending(true)
    await fetch('/api/users/logout', { method: 'POST', credentials: 'same-origin' })
    router.refresh()
  }

  return (
    <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-60" disabled={isPending} onClick={logout} type="button">
      <LogOut className="size-4" aria-hidden="true" />
      {isPending ? 'Abmeldung …' : 'Abmelden'}
    </button>
  )
}
