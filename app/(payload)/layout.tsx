import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import { Inter, Space_Grotesk } from 'next/font/google'
import { importMap } from './admin/importMap'
import './admin/naser-admin.css'

const inter = Inter({ subsets: ['latin'], variable: '--naser-font-body' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--naser-font-display' })

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{ className: `naser-admin ${inter.variable} ${spaceGrotesk.variable}` }}
    >
      {children}
    </RootLayout>
  )
}
