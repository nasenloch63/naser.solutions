import type { ReactNode } from 'react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Links | Naser Solutions',
  description: 'Offizielle Links und Kontaktkanäle von Naser Solutions.',
  path: '/links',
  noIndex: true,
})

export default function LinksLayout({ children }: { children: ReactNode }) {
  return children
}
