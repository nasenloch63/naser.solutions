import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: Props) =>
  generatePageMetadata({ config, params, searchParams })

export default function AdminPage({ params, searchParams }: Props) {
  return RootPage({ config, importMap, params, searchParams })
}
