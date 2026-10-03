export const sectionSlugs = ['ueber-uns', 'leistungen', 'projekte', 'kontakt'] as const
export type SectionSlug = typeof sectionSlugs[number]

export function isSectionSlug(slug: string): slug is SectionSlug {
  return sectionSlugs.includes(slug as SectionSlug)
}
