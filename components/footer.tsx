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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
          <Link href="/" aria-label="Naser Solutions" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              {/* Light mode logo */}
              <Image
                src="/images/logo-invertable.png"
                alt="Logo von Naser Solutions"
                fill
                className="object-contain dark:hidden"
              />
              {/* Dark mode logo - using direct URL */}
              <Image
                src="/images/inverted-20logo-20png.png"
                alt="Logo von Naser Solutions"
                fill
                className="hidden object-contain dark:block"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground leading-tight">Naser Solutions</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Web Agency</span>
            </div>
          </Link>

          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 max-w-full">
            <a
              href="https://instagram.com/naser.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://naser-solutions.de/links"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Links"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <button
              onClick={() => openModal("imprint")}
              className="min-h-11 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.imprint")}
            </button>
            <button
              onClick={() => openModal("privacy")}
              className="min-h-11 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.privacy")}
            </button>
            <button
              onClick={() => openModal("terms")}
              className="min-h-11 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.agb")}
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Naser Solutions. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
