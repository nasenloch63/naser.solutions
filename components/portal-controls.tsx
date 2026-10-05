'use client'

import { useActionState, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, FileText, LogOut, Paperclip, Send, X } from 'lucide-react'
import { upload } from '@vercel/blob/client'
import { saveClientFeedback, type FeedbackState } from '@/app/portal/actions'
import { usePortalCopy } from '@/components/portal-language-switcher'
import { ATTACHMENT_ACCEPT, MAX_ATTACHMENTS_PER_SUBMISSION, MAX_PROJECT_ATTACHMENTS, attachmentContentType, attachmentPath, formatAttachmentSize, validateAttachment, type AttachmentError, type PortalAttachment, type SubmittedAttachment } from '@/lib/feedback-attachments'

const initialState: FeedbackState = { message: '', success: false }

export function FeedbackForm({ projectId, initialFeedback, attachments }: { projectId: string; initialFeedback: string; attachments: PortalAttachment[] }) {
  const copy = usePortalCopy()
  const [feedback, setFeedback] = useState(initialFeedback)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<AttachmentError | ''>('')
  const [progress, setProgress] = useState<number | null>(null)
  const uploaded = useRef(new Map<File, SubmittedAttachment>())
  const [state, action, isPending] = useActionState(async (_previous: FeedbackState, formData: FormData): Promise<FeedbackState> => {
    setFileError('')
    try {
      const submitted: SubmittedAttachment[] = []
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        let saved = uploaded.current.get(file)
        if (!saved) {
          setProgress(Math.round(index / files.length * 100))
          const blob = await upload(attachmentPath(projectId, crypto.randomUUID(), file.name), file, {
            access: 'private', handleUploadUrl: '/api/portal/attachments/upload',
            contentType: attachmentContentType(file.name), multipart: file.size > 8 * 1024 * 1024,
            clientPayload: JSON.stringify({ projectId, name: file.name, size: file.size, type: attachmentContentType(file.name) }),
            onUploadProgress: ({ percentage }) => setProgress(Math.round((index + percentage / 100) / files.length * 100)),
          })
          saved = { pathname: blob.pathname, name: file.name }
          uploaded.current.set(file, saved)
        }
        submitted.push(saved)
      }
      setProgress(null)
      // Only metadata is sent through the Server Action; files go directly to private storage.
      formData.delete('attachments')
      formData.set('attachmentPaths', JSON.stringify(submitted))
      const result = await saveClientFeedback(_previous, formData)
      if (result.success) { setFiles([]); uploaded.current.clear() }
      return result
    } catch {
      return { message: files.length ? 'attachmentUploadError' : 'saveError', success: false }
    } finally { setProgress(null) }
  }, initialState)

  function selectFiles(selected: FileList | null) {
    if (!selected) return
    const next = [...files, ...Array.from(selected)].filter((file, index, all) => all.findIndex(other => other.name === file.name && other.size === file.size && other.lastModified === file.lastModified) === index)
    if (next.length > MAX_ATTACHMENTS_PER_SUBMISSION || attachments.length + next.length > MAX_PROJECT_ATTACHMENTS) { setFileError('attachmentTooMany'); return }
    const error = next.map(validateAttachment).find(Boolean)
    if (error) { setFileError(error); return }
    setFileError('')
    setFiles(next)
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <input name="projectId" type="hidden" value={projectId} />
      <label className="flex flex-col gap-2 text-sm font-medium" htmlFor={`feedback-${projectId}`}>
        {copy.feedback}
        <textarea
          className="min-h-32 resize-y rounded-md border border-input bg-background p-3 text-base leading-6 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          value={feedback}
          onChange={event => setFeedback(event.target.value)}
          disabled={isPending}
          id={`feedback-${projectId}`}
          maxLength={5000}
          name="feedback"
          placeholder={copy.feedbackPlaceholder}
        />
      </label>
      <div className="flex flex-col gap-3" role="group" aria-labelledby={`attachment-label-${projectId}`}>
        <p className="text-sm font-medium" id={`attachment-label-${projectId}`}>{copy.attachments}</p>
        <label className={`relative flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-secondary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${isPending ? 'pointer-events-none opacity-60' : ''}`}>
          <Paperclip className="size-4" aria-hidden="true" />{copy.chooseFiles}
          <input className="sr-only" type="file" multiple accept={ATTACHMENT_ACCEPT} aria-label={copy.attachments} aria-describedby={`attachment-help-${projectId}`} disabled={isPending || attachments.length >= MAX_PROJECT_ATTACHMENTS} name="attachments" onChange={event => { selectFiles(event.currentTarget.files); event.currentTarget.value = '' }} />
        </label>
        <p className="text-xs leading-5 text-muted-foreground" id={`attachment-help-${projectId}`}>{copy.attachmentHelp}</p>
        {files.length > 0 ? <ul className="flex flex-col gap-2">
          {files.map((file, index) => <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-background ps-3">
            <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0 flex-1 py-2"><p className="truncate text-sm"><bdi>{file.name}</bdi></p><p className="text-xs text-muted-foreground" dir="ltr">{formatAttachmentSize(file.size)}</p></div>
            <button className="flex size-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-50" type="button" disabled={isPending} aria-label={`${copy.removeFile}: ${file.name}`} onClick={() => { setFiles(current => current.filter((_, item) => item !== index)); setFileError('') }}><X className="size-4" aria-hidden="true" /></button>
          </li>)}
        </ul> : null}
        {fileError ? <p className="text-sm text-destructive" role="alert">{copy[fileError]}</p> : null}
        {progress !== null ? <div className="flex flex-col gap-2"><p className="text-sm text-muted-foreground" role="status">{copy.uploadingFiles} {progress}%</p><progress className="h-2 w-full accent-foreground" aria-label={copy.uploadingFiles} max={100} value={progress} /></div> : null}
      </div>
      {attachments.length > 0 ? <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{copy.submittedFiles}</p>
        <ul className="flex flex-col gap-2">{attachments.map(file => <li key={file.id}><a className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary" href={file.downloadUrl} target="_blank" rel="noopener noreferrer"><Paperclip className="size-4 shrink-0" aria-hidden="true" /><span className="min-w-0 flex-1 break-words"><bdi>{file.name}</bdi></span><span className="shrink-0 text-xs text-muted-foreground" dir="ltr">{formatAttachmentSize(file.size)}</span><ExternalLink className="size-4 shrink-0" aria-hidden="true" /></a></li>)}</ul>
      </div> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${state.success ? 'text-foreground' : 'text-destructive'}`} aria-live="polite">{state.message ? copy[state.message] : ''}</p>
        <button className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60" disabled={isPending} type="submit">
          <Send className="size-4" aria-hidden="true" />
          {isPending ? copy.saving : copy.save}
        </button>
      </div>
    </form>
  )
}

export function LogoutButton() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const copy = usePortalCopy()

  async function logout() {
    setIsPending(true)
    await fetch('/api/users/logout', { method: 'POST', credentials: 'same-origin' })
    router.refresh()
  }

  return (
    <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-60" disabled={isPending} onClick={logout} type="button">
      <LogOut className="size-4" aria-hidden="true" />
      {isPending ? copy.loggingOut : copy.logout}
    </button>
  )
}
