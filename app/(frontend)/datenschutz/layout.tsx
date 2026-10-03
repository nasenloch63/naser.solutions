import type { ReactNode } from 'react'
import { publicPageMetadata } from '@/lib/seo'

export const metadata = publicPageMetadata('/datenschutz')

export default function DatenschutzLayout({ children }: { children: ReactNode }) {
  return children
}
