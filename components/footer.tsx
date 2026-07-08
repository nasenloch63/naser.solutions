"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useLegalModal } from "@/components/legal-modal-provider"

const BitcoinIconSmall = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" />
  </svg>
)

const SolanaIconSmall = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 397.7 311.7" className={className} fill="currentColor">
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
    <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
    <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
  </svg>
)

const MoneroIconSmall = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <circle cx="128" cy="128" r="128" />
  </svg>
)

export function Footer() {
  const { t } = useLanguage()
  const { openModal } = useLegalModal()

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              {/* Light mode logo */}
              <Image
                src="/images/logo-invertable.png"
                alt="Naser Solutions Logo"
                fill
                className="object-contain transition-opacity duration-500 dark:opacity-0 opacity-100"
              />
              {/* Dark mode logo - using direct URL */}
              <Image
                src="/images/inverted-20logo-20png.png"
                alt="Naser Solutions Logo"
                fill
                className="object-contain transition-opacity duration-500 opacity-0 dark:opacity-100"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground leading-tight">Naser Solutions</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Web Agency</span>
            </div>
          </Link>

          <Link
            href="/zahlung"
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            <div className="flex items-center gap-1">
              <BitcoinIconSmall className="w-4 h-4 text-orange-500" />
              <SolanaIconSmall className="w-4 h-4 text-emerald-400" />
              <MoneroIconSmall className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs text-zinc-400">{t("footer.cryptoAccepted")}</span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/naser.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://beacons.ai/yasinadamaissani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Linktree"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <button
              onClick={() => openModal("imprint")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.imprint")}
            </button>
            <button
              onClick={() => openModal("privacy")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.privacy")}
            </button>
            <button
              onClick={() => openModal("terms")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.agb")}
            </button>
            <Link href="/zahlung" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.payment")}
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Naser Solutions. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
