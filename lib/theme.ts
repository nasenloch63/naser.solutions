export type Theme = "light" | "dark"

export const THEME_OVERRIDE_KEY = "themeOverride"
export interface ThemeOverride {
  theme: Theme
  expiresAt: number
}

export function scheduledTheme(hour: number): Theme {
  return hour >= 18 || hour < 10 ? "dark" : "light"
}

export function nextThemeBoundary(now: Date): Date {
  const next = new Date(now)
  const hour = now.getHours()
  if (hour >= 18) next.setDate(next.getDate() + 1)
  next.setHours(hour >= 10 && hour < 18 ? 18 : 10, 0, 0, 0)
  return next
}

export function parseThemeOverride(raw: string | null, now: Date): ThemeOverride | null {
  try {
    const value = raw ? JSON.parse(raw) : null
    if ((value?.theme === "light" || value?.theme === "dark") &&
      typeof value.expiresAt === "number" && Number.isFinite(value.expiresAt) && value.expiresAt > now.getTime()) {
      return { theme: value.theme, expiresAt: value.expiresAt }
    }
  } catch {}
  return null
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#fcfcfc")
}

// Runs before paint so the scheduled default does not flash the wrong theme.
export const themeInitScript = `(() => { const now = new Date(); const hour = now.getHours(); let theme = hour >= 18 || hour < 10 ? 'dark' : 'light'; try { const saved = JSON.parse(sessionStorage.getItem('${THEME_OVERRIDE_KEY}')); if ((saved?.theme === 'dark' || saved?.theme === 'light') && typeof saved.expiresAt === 'number' && Number.isFinite(saved.expiresAt) && saved.expiresAt > now.getTime()) theme = saved.theme; } catch {} document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.style.colorScheme = theme; document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fcfcfc'); })();`
