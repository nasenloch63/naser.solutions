"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import { useLanguage, languages, type Language } from "@/components/language-provider"

function LanguageFlag({ language }: { language: Language }) {
  return (
    <span
      style={{ backgroundImage: `url('/flags/${language}.png')` }}
      className="h-5 w-5 shrink-0 bg-contain bg-center bg-no-repeat"
      aria-hidden="true"
    />
  )
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleSelect = (langCode: Language) => {
    triggerRef.current?.focus()
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-2 backdrop-blur-md transition-[background-color,border-color,transform] duration-200 hover:border-foreground/35 hover:bg-secondary active:scale-95"
        aria-label={t("language.select")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 text-foreground" />
        <LanguageFlag language={currentLang.code} />
        <span className="hidden text-sm font-medium uppercase text-foreground sm:inline">{language}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Keep mounted for crisp spring enter/exit animation */}
      <div
        data-open={isOpen}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="lang-dropdown-panel absolute end-0 top-full z-50 mt-2.5 min-w-[200px] overflow-hidden rounded-2xl border border-border/80 bg-popover/92 shadow-2xl shadow-black/20 backdrop-blur-2xl"
        role="listbox"
        aria-label={t("language.select")}
      >
        <div className="max-h-[320px] overflow-y-auto overscroll-contain p-1.5">
          {languages.map((lang) => {
            const selected = language === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-[background-color,transform] duration-150 active:scale-[0.98] ${
                  selected ? "bg-secondary font-semibold" : "hover:bg-secondary/70"
                }`}
                role="option"
                aria-selected={selected}
              >
                <LanguageFlag language={lang.code} />
                <span className="flex-1 text-sm text-foreground">{lang.name}</span>
                {selected && <Check className="h-4 w-4 text-primary" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Compact version for mobile
export function LanguageSwitcherCompact() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleSelect = (langCode: Language) => {
    triggerRef.current?.focus()
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-border/80 bg-background/60 px-2.5 backdrop-blur-md transition-[background-color,border-color,transform] duration-200 hover:bg-secondary active:scale-95"
        aria-label={t("language.select")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <LanguageFlag language={currentLang.code} />
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        data-open={isOpen}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="lang-dropdown-panel absolute top-full z-50 mt-2.5 min-w-[180px] overflow-hidden rounded-2xl border border-border/80 bg-popover/92 shadow-2xl shadow-black/20 backdrop-blur-2xl"
        style={{ insetInlineEnd: 0 }}
        role="listbox"
        aria-label={t("language.select")}
      >
        <div className="max-h-[min(280px,calc(100dvh-7rem))] overflow-y-auto overscroll-contain p-1.5">
          {languages.map((lang) => {
            const selected = language === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-start transition-[background-color,transform] duration-150 active:scale-[0.98] ${
                  selected ? "bg-secondary font-semibold" : "hover:bg-secondary/70"
                }`}
                role="option"
                aria-selected={selected}
              >
                <LanguageFlag language={lang.code} />
                <span className="flex-1 text-sm text-foreground">{lang.name}</span>
                {selected && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
