"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useLegalModal } from "@/components/legal-modal-provider"

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
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Naser Solutions. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
