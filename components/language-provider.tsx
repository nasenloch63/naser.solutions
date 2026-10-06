"use client"

import { profileCopy } from "@/lib/profile-copy"

import { createContext, useContext, useRef, useState, useEffect, type ReactNode } from "react"
import { siteCopy } from "@/lib/site-copy"
import { uiCopy } from "@/lib/ui-copy"
import { paymentServiceTranslation } from "@/lib/payment-services-copy"

import { LANGUAGE_OVERRIDE_KEY, resolveLanguage, type Language } from "@/lib/language"
export type { Language } from "@/lib/language"

export const languages = [
  { code: "de" as const, name: "Deutsch", flag: "🇩🇪", dir: "ltr" as const },
  { code: "en" as const, name: "English", flag: "🇬🇧", dir: "ltr" as const },
  { code: "ru" as const, name: "Русский", flag: "🇷🇺", dir: "ltr" as const },
  { code: "tr" as const, name: "Türkçe", flag: "🇹🇷", dir: "ltr" as const },
  { code: "ar" as const, name: "العربية", flag: "🇸🇦", dir: "rtl" as const },
  { code: "zh" as const, name: "中文", flag: "🇨🇳", dir: "ltr" as const },
  { code: "ja" as const, name: "日本語", flag: "🇯🇵", dir: "ltr" as const },
  { code: "th" as const, name: "ไทย", flag: "🇹🇭", dir: "ltr" as const },
  { code: "hi" as const, name: "हिन्दी", flag: "🇮🇳", dir: "ltr" as const },
  { code: "fr" as const, name: "Français", flag: "🇫🇷", dir: "ltr" as const },
  { code: "es" as const, name: "Español", flag: "🇪🇸", dir: "ltr" as const },
  { code: "it" as const, name: "Italiano", flag: "🇮🇹", dir: "ltr" as const },
  { code: "pt" as const, name: "Português", flag: "🇵🇹", dir: "ltr" as const },
  { code: "uk" as const, name: "Українська", flag: "🇺🇦", dir: "ltr" as const },
  { code: "el" as const, name: "Ελληνικά", flag: "🇬🇷", dir: "ltr" as const },
  { code: "sq" as const, name: "Shqip", flag: "🇦🇱", dir: "ltr" as const },
]

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
  isRTL: boolean
}


import { translations } from "@/lib/base-translations"


const translateGerman = (key: string): string =>
  paymentServiceTranslation('de', key) || profileCopy.de[key] || (uiCopy.de as Record<string, string>)[key] || (siteCopy.de as Record<string, string>)[key] || (translations.de as Record<string, string>)[key] || key

const defaultContextValue: LanguageContextType = {
  language: "de",
  setLanguage: () => {},
  t: translateGerman,
  dir: "ltr",
  isRTL: false,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children, initialLanguage = "de" }: { children: ReactNode; initialLanguage?: Language }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const [mounted, setMounted] = useState(false)
  const preference = useRef<Language | null>(null)

  const currentLang = languages.find((l) => l.code === language) || languages[0]
  const dir = currentLang.dir
  const isRTL = dir === "rtl"

  useEffect(() => {
    function syncLanguage() {
      let stored: unknown = preference.current
      try { stored = sessionStorage.getItem(LANGUAGE_OVERRIDE_KEY) } catch {}
      setLanguageState(resolveLanguage([...navigator.languages, navigator.language], stored))
      setMounted(true)
    }

    syncLanguage()
    window.addEventListener("languagechange", syncLanguage)
    return () => window.removeEventListener("languagechange", syncLanguage)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language === "de" ? "de-DE" : language
      document.documentElement.dir = dir
    }
  }, [language, dir, mounted])

  const setLanguage = (lang: Language) => {
    preference.current = lang
    setLanguageState(lang)
    try { sessionStorage.setItem(LANGUAGE_OVERRIDE_KEY, lang) } catch {}
  }

  const t = (key: string): string => {
    const currentTranslations = translations[language] as Record<string, string>
    return paymentServiceTranslation(language, key) || profileCopy[language][key] || (uiCopy[language] as Record<string, string>)[key] || (siteCopy[language] as Record<string, string>)[key] || currentTranslations[key] || translateGerman(key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    return defaultContextValue
  }
  return context
}
