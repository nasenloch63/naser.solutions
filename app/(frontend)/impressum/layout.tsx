import type { ReactNode } from 'react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Impressum | Naser Solutions',
  description: 'Anbieterkennzeichnung und Kontaktinformationen von Naser Solutions.',
  path: '/impressum',
})

export default function ImpressumLayout({ children }: { children: ReactNode }) {
  return children
}
