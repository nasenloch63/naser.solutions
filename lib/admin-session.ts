export const ADMIN_SESSION_SIGNAL = 'naser-cms-session-changed'
type SessionUser = { id?: number | string; collection?: unknown; role?: unknown } | null | undefined

export function adminSessionIdentity(user: SessionUser) {
  return user?.id !== undefined ? `${user.collection}:${user.id}:${user.role}` : null
}

export function adminSessionNavigation(current: SessionUser, actual: SessionUser, pathname: string, publicPaths: string[], loginPath: string): 'login' | 'reload' | null {
  const isStaff = actual?.collection === 'users' && (actual.role === 'admin' || actual.role === 'editor')
  if (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
    return pathname === loginPath && isStaff && !current ? 'reload' : null
  }
  if (!isStaff) return 'login'
  return adminSessionIdentity(current) === adminSessionIdentity(actual) ? null : 'reload'
}

export function announceAdminSessionChange() {
  try { window.localStorage.setItem(ADMIN_SESSION_SIGNAL, `${Date.now()}-${Math.random()}`) } catch { /* Focus checks still work when storage is disabled. */ }
}
