import type { ReactNode } from 'react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'AGB | Naser Solutions',
  description: 'Allgemeine Geschäftsbedingungen für digitale Dienstleistungen von Naser Solutions.',
  path: '/agb',
})

export default function AgbLayout({ children }: { children: ReactNode }) {
  return children
}
