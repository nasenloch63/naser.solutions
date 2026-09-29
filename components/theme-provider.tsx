"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { scheduledTheme, type Theme } from "@/lib/theme"

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
  const preference = useRef<Theme | null>(null)

  useEffect(() => {
    function syncTheme() {
      try {
        const saved = localStorage.getItem("theme")
        preference.current = saved === "light" || saved === "dark" ? saved : null
      } catch {}
      const next = preference.current ?? scheduledTheme(new Date().getHours())
      setTheme(next)
      document.documentElement.classList.toggle("dark", next === "dark")
      document.documentElement.style.colorScheme = next
    }
    syncTheme()
    const interval = window.setInterval(syncTheme, 1000)
    window.addEventListener("storage", syncTheme)
    document.addEventListener("visibilitychange", syncTheme)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener("storage", syncTheme)
      document.removeEventListener("visibilitychange", syncTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    preference.current = newTheme
    try { localStorage.setItem("theme", newTheme) } catch {}
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    document.documentElement.style.colorScheme = newTheme
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
