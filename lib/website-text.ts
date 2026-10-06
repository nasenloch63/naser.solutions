import { translations } from './base-translations'
import { paymentServiceTranslation } from './payment-services-copy'
import { profileCopy } from './profile-copy'
import { uiCopy } from './ui-copy'
import { siteCopy } from './site-copy'
import type { Language } from './language'

export function websiteText(language: Language, key: string): string {
  const text = paymentServiceTranslation(language, key) || profileCopy[language][key] || (uiCopy[language] as Record<string, string>)[key] || (siteCopy[language] as Record<string, string>)[key] || (translations[language] as Record<string, string>)[key]
  return text || (language === 'de' ? key : websiteText('de', key))
}
