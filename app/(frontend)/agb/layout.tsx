import type { ReactNode } from 'react'
import { publicPageMetadata } from '@/lib/seo'

export const metadata = publicPageMetadata('/agb')

export default function AgbLayout({ children }: { children: ReactNode }) {
  return children
}
