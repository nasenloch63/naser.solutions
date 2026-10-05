'use client'

import { useTranslation } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'
import { announceAdminSessionChange } from '@/lib/admin-session'

export function AdminLogout() {
  const { i18n } = useTranslation()
  const de = i18n.language === 'de'
  const [failed, setFailed] = useState(false)
  const [pending, setPending] = useState(true)
  const signOut = useCallback(async () => {
    setPending(true)
    setFailed(false)
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin', cache: 'no-store' })
      if (!response.ok) throw new Error('Logout failed')
      announceAdminSessionChange()
      // A full navigation discards stale in-memory authentication and cached admin pages.
      window.location.replace('/admin/login')
    } catch { setFailed(true); setPending(false) }
  }, [])
  useEffect(() => { void signOut() }, [signOut])
  return <main style={{ display: 'grid', placeContent: 'center', minHeight: '100svh', padding: 24 }}>
    <section style={{ maxWidth: 420 }}>
      <p className="ns-admin-welcome__eyebrow">NASER SOLUTIONS · CMS</p>
      <h1>{de ? 'Abmelden' : 'Signing out'}</h1>
      <p role={failed ? 'alert' : 'status'}>{failed ? (de ? 'Abmelden fehlgeschlagen. Bitte erneut versuchen.' : 'Could not sign out. Please try again.') : (de ? 'Ihre Sitzung wird beendet …' : 'Ending your session …')}</p>
      {failed ? <button className="btn btn--style-primary btn--size-medium" type="button" disabled={pending} onClick={signOut}>{de ? 'Erneut versuchen' : 'Try again'}</button> : null}
    </section>
  </main>
}
