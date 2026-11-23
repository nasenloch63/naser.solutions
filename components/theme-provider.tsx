"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { applyTheme, nextThemeBoundary, parseThemeOverride, scheduledTheme, THEME_OVERRIDE_KEY, type Theme, type ThemeOverride } from "@/lib/theme"

interface ThemeContextType {
  theme: Theme
  toggleTheme: (event?: React.MouseEvent<HTMLElement>) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
})

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const preference = useRef<ThemeOverride | null>(null)

  useEffect(() => {
    let timeout: number
    function syncTheme() {
      const now = new Date()
      try {
        preference.current = parseThemeOverride(sessionStorage.getItem(THEME_OVERRIDE_KEY), now)
      } catch {}
      if (preference.current && preference.current.expiresAt <= now.getTime()) preference.current = null
      const next = preference.current?.theme ?? scheduledTheme(now.getHours())
      setTheme(next)
      applyTheme(next)
      window.clearTimeout(timeout)
      const boundary = Math.min(nextThemeBoundary(now).getTime(), preference.current?.expiresAt ?? Infinity)
      timeout = window.setTimeout(syncTheme, boundary - now.getTime())
    }
    syncTheme()
    window.addEventListener("focus", syncTheme)
    document.addEventListener("visibilitychange", syncTheme)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener("focus", syncTheme)
      document.removeEventListener("visibilitychange", syncTheme)
    }
  }, [])

  const toggleTheme = (event?: React.MouseEvent<HTMLElement>) => {
    const newTheme: Theme = theme === "light" ? "dark" : "light"
    const override: ThemeOverride = { theme: newTheme, expiresAt: nextThemeBoundary(new Date()).getTime() }
    preference.current = override
    try { sessionStorage.setItem(THEME_OVERRIDE_KEY, JSON.stringify(override)) } catch {}

    const doc = document as ViewTransitionDocument
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!doc.startViewTransition || reducedMotion) {
      setTheme(newTheme)
      applyTheme(newTheme)
      return
    }

    // Compute exact origin coordinates from the clicked toggle button
    let x = window.innerWidth * 0.85
    let y = 40
    if (event?.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    } else if (event && (event.clientX || event.clientY)) {
      x = event.clientX
      y = event.clientY
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
      applyTheme(newTheme)
    })

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 620,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        )
      })
      .catch(() => {})
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
