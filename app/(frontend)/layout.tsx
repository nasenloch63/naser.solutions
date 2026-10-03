import type React from "react"
import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL, publicPageMetadata } from "@/lib/seo"
import "../globals.css"
import { themeInitScript } from "@/lib/theme"
import { requestLanguage } from "@/lib/language"

const _inter = Inter({ subsets: ["latin"] })
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...publicPageMetadata("/"),
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "any", type: "image/png" }],
    apple: "/favicon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#fcfcfc",
  colorScheme: "light dark",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialLanguage = requestLanguage((await headers()).get("accept-language"))
  return (
    <html className="bg-background" data-scroll-behavior="smooth" lang={initialLanguage === "de" ? "de-DE" : initialLanguage} dir={initialLanguage === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
