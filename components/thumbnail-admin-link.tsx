'use client'

import Link from 'next/link'
import { Settings } from 'lucide-react'

export function ThumbnailAdminLink() {
  return (
    <Link
      href="/admin/thumbnails"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      title="Thumbnail und Favicon verwalten"
    >
      <Settings className="h-4 w-4" />
      <span className="hidden sm:inline">Thumbnails</span>
    </Link>
  )
}
