import type { ReactNode } from 'react'
import { publicPageMetadata } from '@/lib/seo'

export const metadata = publicPageMetadata('/links')

export default function LinksLayout({ children }: { children: ReactNode }) {
  return children
}
