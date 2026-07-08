import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Naser Solutions - Die Zukunft deiner digitalen Präsenz",
  description:
    "Innovative Webagentur gegründet 2026. Wir entwickeln zukunftsweisende Websites, Apps und digitale Erlebnisse für visionäre Unternehmen.",
  keywords: ["Webagentur", "Kassel", "Webdesign", "App Entwicklung", "Innovation", "Digital", "2026"],
  generator: "v0.app",
  metadataBase: new URL("https://www.naser.solutions"),
  openGraph: {
    title: "Naser Solutions - Die Zukunft deiner digitalen Präsenz",
    description:
      "Innovative Webagentur gegründet 2026. Wir entwickeln zukunftsweisende Websites, Apps und digitale Erlebnisse für visionäre Unternehmen.",
    url: "https://www.naser.solutions",
    type: "website",
    siteName: "Naser Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naser Solutions - Web Agency",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naser Solutions - Die Zukunft deiner digitalen Präsenz",
    description:
      "Innovative Webagentur gegründet 2026. Wir entwickeln zukunftsweisende Websites, Apps und digitale Erlebnisse für visionäre Unternehmen.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
