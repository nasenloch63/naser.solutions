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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const fadeTimer = useRef<number | undefined>(undefined)
  const activeTransition = useRef<ViewTransition | null>(null)
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
      window.clearTimeout(fadeTimer.current)
      document.documentElement.removeAttribute("data-theme-fade")
      window.removeEventListener("focus", syncTheme)
      document.removeEventListener("visibilitychange", syncTheme)
    }
  }, [])

  const toggleTheme = (event?: React.MouseEvent<HTMLElement>) => {
    const newTheme: Theme = (preference.current?.theme ?? theme) === "light" ? "dark" : "light"
    const override: ThemeOverride = { theme: newTheme, expiresAt: nextThemeBoundary(new Date()).getTime() }
    preference.current = override
    try { sessionStorage.setItem(THEME_OVERRIDE_KEY, JSON.stringify(override)) } catch {}

    const root = document.documentElement
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const commit = () => {
      flushSync(() => setTheme(newTheme))
      applyTheme(newTheme)
    }

    activeTransition.current?.skipTransition()
    if (reduced || !document.startViewTransition) {
      root.toggleAttribute("data-theme-fade", !reduced)
      window.clearTimeout(fadeTimer.current)
      if (!reduced) fadeTimer.current = window.setTimeout(() => root.removeAttribute("data-theme-fade"), 350)
      commit()
      return
    }

    const rect = event?.currentTarget.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    root.style.setProperty("--reveal-x", x + "px")
    root.style.setProperty("--reveal-y", y + "px")
    root.style.setProperty("--reveal-radius", Math.ceil(radius) + "px")
    root.setAttribute("data-theme-reveal", "")
    const transition = document.startViewTransition(commit)
    activeTransition.current = transition
    void transition.ready.catch(() => {}) // A second click can skip the outgoing reveal.
    void transition.finished.then(() => {
      if (activeTransition.current === transition) {
        activeTransition.current = null
        root.removeAttribute("data-theme-reveal")
      }
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
