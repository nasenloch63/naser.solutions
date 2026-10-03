import type { ReactNode } from 'react'
import { publicPageMetadata } from '@/lib/seo'

export const metadata = publicPageMetadata('/impressum')

export default function ImpressumLayout({ children }: { children: ReactNode }) {
  return children
}
