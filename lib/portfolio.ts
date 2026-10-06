import type { Language } from './language'

export type LocalizedText = string | Partial<Record<Language, string>> | null | undefined
export interface PortfolioProject {
  id: number | string
  title: LocalizedText
  description: LocalizedText
  url: string
  category: string
  tags: LocalizedText[]
  image?: string | null
  alt?: LocalizedText
  containImage?: boolean | null
  order?: number | null
}
export interface PortfolioSection {
  id?: string | null
  eyebrow?: LocalizedText
  heading: LocalizedText
  description?: LocalizedText
  selection?: (number | string | { id: number | string })[] | null
  showFilters?: boolean | null
}
export function localizedText(value: LocalizedText, language: Language): string {
  return typeof value === 'string' ? value : value?.[language] || value?.de || ''
}
export function selectPortfolio(projects: PortfolioProject[], selection?: PortfolioSection['selection']) {
  const ids = selection?.length ? new Set(selection.map(item => String(typeof item === 'object' ? item.id : item))) : null
  return projects.filter(project => !ids || ids.has(String(project.id))).sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.id).localeCompare(String(b.id), undefined, { numeric: true }))
}
