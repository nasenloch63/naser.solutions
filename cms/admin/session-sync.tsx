'use client'

import { useAuth, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, type ReactNode } from 'react'
import { ADMIN_SESSION_SIGNAL, adminSessionIdentity, adminSessionNavigation, announceAdminSessionChange } from '@/lib/admin-session'

export function AdminSessionSync({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { config } = useConfig()
  const pathname = usePathname()
  const identity = adminSessionIdentity(user)
  const previousServerIdentity = useRef<string | null | undefined>(undefined)
  const { admin: adminRoute, api: apiRoute } = config.routes
  const userSlug = config.admin.user
  const routes = config.admin.routes
  const publicPaths = ['createFirstUser', 'forgot', 'inactivity', 'login', 'logout', 'reset', 'unauthorized'].map(key => `${adminRoute}${routes[key as keyof typeof routes]}`)
  const publicPathsKey = publicPaths.join('|')
  const loginPath = `${adminRoute}${routes.login}`

  useEffect(() => {
    let disposed = false
    let pending = false
    const controller = new AbortController()
    async function checkSession(announce: boolean) {
      if (pending || disposed) return
      pending = true
      try {
        const response = await fetch(`${apiRoute}/${userSlug}/me`, { credentials: 'same-origin', cache: 'no-store', signal: controller.signal })
        if (!response.ok && response.status !== 401) return
        const actual = response.ok ? (await response.json()).user : null
        if (disposed) return
        const serverIdentity = adminSessionIdentity(actual)
        if (announce && previousServerIdentity.current !== serverIdentity) announceAdminSessionChange()
        previousServerIdentity.current = serverIdentity
        const navigation = adminSessionNavigation(user, actual, pathname, publicPathsKey.split('|'), loginPath)
        if (navigation === 'login') {
          window.location.replace(`${loginPath}?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`)
        } else if (navigation === 'reload') {
          window.location.reload()
        }
      } catch {
        // A network failure is not evidence of logout. Recheck when the tab regains focus.
      } finally { pending = false }
    }
    const onFocus = () => { void checkSession(false) }
    const onVisibility = () => { if (document.visibilityState === 'visible') void checkSession(false) }
    const onStorage = (event: StorageEvent) => { if (event.key === ADMIN_SESSION_SIGNAL) void checkSession(false) }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('storage', onStorage)
    void checkSession(true)
    return () => {
      disposed = true
      controller.abort()
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('storage', onStorage)
    }
  }, [pathname, identity, apiRoute, userSlug, publicPathsKey, loginPath])

  return children
}
