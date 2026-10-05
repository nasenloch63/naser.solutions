'use client'

import { ChevronDown, Globe } from 'lucide-react'
import { languages, useLanguage } from '@/components/language-provider'
import { isLanguage } from '@/lib/language'
import { portalCopy } from '@/lib/portal-copy'
import { attachmentCopy } from '@/lib/attachment-copy'

export function usePortalCopy() {
  const { language } = useLanguage()
  return { ...portalCopy[language], ...attachmentCopy[language] }
}

export function PortalLanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <label className="relative inline-flex max-w-full items-center">
      <span className="sr-only">{portalCopy[language].selectLanguage}</span>
      <Globe className="pointer-events-none absolute start-3 size-4 text-muted-foreground" aria-hidden="true" />
      <select
        className="min-h-11 max-w-full cursor-pointer appearance-none rounded-lg border border-border bg-background ps-9 pe-8 text-sm font-medium text-foreground outline-none transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={language}
        onChange={(event) => { if (isLanguage(event.target.value)) setLanguage(event.target.value) }}
      >
        {languages.map((option) => <option key={option.code} value={option.code} lang={option.code}>{option.name}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-3 text-muted-foreground" aria-hidden="true" />
    </label>
  )
}
