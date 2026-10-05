export const supportedLanguages = ["de", "en", "fr", "ar", "th", "hi", "tr", "sq", "ru", "es", "it", "uk", "el", "pt", "zh", "ja"] as const
export type Language = typeof supportedLanguages[number]

export const LANGUAGE_OVERRIDE_KEY = "languageOverride"

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && supportedLanguages.includes(value as Language)
}

export function deviceLanguage(locales: readonly string[]): Language {
  for (const locale of locales) {
    const base = locale.trim().toLowerCase().split(/[-_]/)[0]
    if (isLanguage(base)) return base
  }
  return "de"
}

export function resolveLanguage(locales: readonly string[], override: unknown): Language {
  return isLanguage(override) ? override : deviceLanguage(locales)
}

export function requestLanguage(header: string | null): Language {
  const preferences = (header ?? "").split(",").map((entry) => {
    const [locale, ...parameters] = entry.trim().split(";")
    const weight = parameters.find(parameter => parameter.trim().startsWith("q="))
    return { locale, quality: weight ? Number(weight.trim().slice(2)) : 1 }
  }).filter(({ quality }) => Number.isFinite(quality) && quality > 0 && quality <= 1)
  preferences.sort((a, b) => b.quality - a.quality)
  return deviceLanguage(preferences.map(({ locale }) => locale))
}
