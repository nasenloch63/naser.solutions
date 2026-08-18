import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'Kundenportal | Naser Solutions',
  description: 'Geschützter Kundenbereich von Naser Solutions.',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'light dark',
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="bg-background" lang="de">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
