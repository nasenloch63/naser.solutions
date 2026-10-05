import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '../globals.css'
import { publicPageMetadata } from '@/lib/seo'
import { headers } from 'next/headers'
import { requestLanguage } from '@/lib/language'
import { LanguageProvider } from '@/components/language-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  ...publicPageMetadata('/portal'),
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'light dark',
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const initialLanguage = requestLanguage((await headers()).get('accept-language'))
  return (
    <html className="bg-background" lang={initialLanguage === 'de' ? 'de-DE' : initialLanguage} dir={initialLanguage === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
      </body>
    </html>
  )
}
