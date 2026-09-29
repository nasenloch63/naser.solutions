export type Theme = "light" | "dark"

export function scheduledTheme(hour: number): Theme {
  return hour >= 18 || hour < 10 ? "dark" : "light"
}

// Runs before paint so the scheduled default does not flash the wrong theme.
export const themeInitScript = `(() => { let saved; try { saved = localStorage.getItem('theme'); } catch {} const hour = new Date().getHours(); const theme = saved === 'dark' || saved === 'light' ? saved : (hour >= 18 || hour < 10 ? 'dark' : 'light'); document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.style.colorScheme = theme; })();`
