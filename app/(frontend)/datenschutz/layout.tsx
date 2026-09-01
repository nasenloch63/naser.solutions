import type { ReactNode } from 'react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Datenschutz | Naser Solutions',
  description: 'Informationen zum Datenschutz bei Naser Solutions und zur Verarbeitung personenbezogener Daten.',
  path: '/datenschutz',
})

export default function DatenschutzLayout({ children }: { children: ReactNode }) {
  return children
}
