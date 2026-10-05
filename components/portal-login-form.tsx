'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { PortalLanguageSwitcher, usePortalCopy } from '@/components/portal-language-switcher'

export function PortalLoginForm() {
  const router = useRouter()
  const [error, setError] = useState<'invalidLogin' | 'networkError' | ''>('')
  const [isPending, setIsPending] = useState(false)
  const copy = usePortalCopy()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsPending(true)

    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/portal/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
      })

      if (!response.ok) {
        setError('invalidLogin')
        setIsPending(false)
        return
      }

      router.refresh()
    } catch {
      setError('networkError')
      setIsPending(false)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm md:p-8" aria-labelledby="portal-login-title">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><LockKeyhole className="size-5" aria-hidden="true" /></div>
            <PortalLanguageSwitcher />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">Naser Solutions</p>
            <h1 id="portal-login-title" className="font-display text-3xl font-semibold tracking-tight text-balance">{copy.portal}</h1>
            <p className="text-sm leading-6 text-muted-foreground">{copy.loginDescription}</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="email">
              {copy.email}
              <input className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20" id="email" name="email" type="email" autoComplete="email" dir="ltr" required />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="password">
              {copy.password}
              <input className="h-11 rounded-md border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20" id="password" name="password" type="password" autoComplete="current-password" required />
            </label>
            {error ? <p className="text-sm text-destructive" role="alert">{copy[error]}</p> : null}
            <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60" disabled={isPending} type="submit">
              {isPending ? copy.loggingIn : copy.login}
              {!isPending ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
            </button>
          </form>
          <p className="text-xs leading-5 text-muted-foreground">{copy.restricted}</p>
        </div>
      </section>
    </main>
  )
}
