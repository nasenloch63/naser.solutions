'use client'

import { useField } from '@payloadcms/ui'
import { ExternalLink } from 'lucide-react'

export function AttachmentDownloadField({ path }: { path: string }) {
  const { value } = useField<string>({ path })
  if (!value?.startsWith('/portal/attachments/')) return null
  return <a href={value} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 0' }}>Datei herunterladen <ExternalLink size={16} aria-hidden="true" /></a>
}
