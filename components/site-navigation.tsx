"use client"

import { createContext, useCallback, useContext, useLayoutEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"

const NavigationContext = createContext<((destination: URL) => void) | null>(null)

export function scrollToDestination(hash: string, behavior: ScrollBehavior) {
  let target: HTMLElement | null = null
  if (hash) {
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))) } catch { /* Invalid anchors fall back to the top. */ }
  }
  if (target) target.scrollIntoView({ behavior, block: "start" })
  else window.scrollTo({ top: 0, left: 0, behavior })
}

export function useSiteNavigation() {
  return useContext(NavigationContext)
}

export function SiteNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const pending = useRef<URL | null>(null)
  const prepareNavigation = useCallback((destination: URL) => { pending.current = destination }, [])

  useLayoutEffect(() => {
    const destination = pending.current
    if (!destination || destination.pathname !== pathname) return
    pending.current = null
    const expectedUrl = `${destination.pathname}${destination.search}${destination.hash}`
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== expectedUrl) {
      // A cached route may carry an earlier anchor. Keep the URL aligned with the clicked link.
      window.history.replaceState(null, "", expectedUrl)
    }
    // Position the new page before it fades in. Back/forward retains Next.js scroll restoration.
    scrollToDestination(destination.hash, "instant")
  }, [pathname])

  return (
    <NavigationContext.Provider value={prepareNavigation}>
      <div key={pathname} className="site-page-enter">{children}</div>
    </NavigationContext.Provider>
  )
}
