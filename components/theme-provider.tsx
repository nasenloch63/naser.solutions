"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { applyTheme, nextThemeBoundary, parseThemeOverride, scheduledTheme, THEME_OVERRIDE_KEY, type Theme, type ThemeOverride } from "@/lib/theme"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
})

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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    const override: ThemeOverride = { theme: newTheme, expiresAt: nextThemeBoundary(new Date()).getTime() }
    setTheme(newTheme)
    preference.current = override
    try { sessionStorage.setItem(THEME_OVERRIDE_KEY, JSON.stringify(override)) } catch {}
    applyTheme(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
