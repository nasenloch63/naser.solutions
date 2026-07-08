"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import { useLanguage, languages, type Language } from "@/components/language-provider"

export function LanguageSwitcher() {
  const { language, setLanguage, t, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors border border-border"
        aria-label={t("language.select")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 text-foreground" />
        <span className="text-sm font-medium text-foreground">{currentLang.flag}</span>
        <span className="text-sm font-medium text-foreground uppercase hidden sm:inline">{language}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu - Updated positioning for 6 languages with RTL support */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 min-w-[180px] bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 ${
            isRTL ? "start-0" : "end-0"
          }`}
          style={{ insetInlineEnd: isRTL ? "auto" : "0", insetInlineStart: isRTL ? "0" : "auto" }}
          role="listbox"
          aria-label={t("language.select")}
        >
          <div className="max-h-[320px] overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-start hover:bg-secondary transition-colors ${
                  language === lang.code ? "bg-secondary" : ""
                }`}
                role="option"
                aria-selected={language === lang.code}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1 text-sm font-medium text-foreground">{lang.name}</span>
                {language === lang.code && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Compact version for mobile
export function LanguageSwitcherCompact() {
  const { language, setLanguage, t, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-secondary transition-colors border border-border"
        aria-label={t("language.select")}
        aria-expanded={isOpen}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 min-w-[160px] bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50`}
          style={{ insetInlineEnd: isRTL ? "auto" : "0", insetInlineStart: isRTL ? "0" : "auto" }}
          role="listbox"
        >
          <div className="max-h-[280px] overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-start hover:bg-secondary transition-colors ${
                  language === lang.code ? "bg-secondary" : ""
                }`}
                role="option"
                aria-selected={language === lang.code}
              >
                <span>{lang.flag}</span>
                <span className="flex-1 text-sm text-foreground">{lang.name}</span>
                {language === lang.code && <Check className="h-3 w-3 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
