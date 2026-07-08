"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Moon, Sun, Instagram, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher, LanguageSwitcherCompact } from "@/components/language-switcher"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl backdrop-saturate-150 border-b border-border/50 shadow-sm supports-[backdrop-filter]:bg-background/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 md:h-14 md:w-14 flex-shrink-0">
              {/* Light mode logo */}
              <Image
                src="/images/logo-invertable.png"
                alt="Naser Solutions - Web Agency"
                fill
                className="object-contain transition-opacity duration-500 dark:opacity-0 opacity-100"
                priority
              />
              {/* Dark mode logo - using direct URL */}
              <Image
                src="/images/inverted-20logo-20png.png"
                alt="Naser Solutions - Web Agency"
                fill
                className="object-contain transition-opacity duration-500 opacity-0 dark:opacity-100"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">Naser Solutions</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Webagency
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#leistungen" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.services")}
            </Link>
            <Link href="#projekte" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.projects")}
            </Link>
            <Link href="#ueber-uns" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/links" className="text-muted-foreground hover:text-foreground transition-colors">
              Links
            </Link>
            <a
              href="https://instagram.com/naser.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram @naser.solutions"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm">@naser.solutions</span>
            </a>
            <Link href="/zahlung">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-border text-muted-foreground hover:bg-secondary hover:text-foreground bg-transparent"
              >
                <Wallet className="h-4 w-4" />
                <span>{t("nav.cryptoPayment")}</span>
              </Button>
            </Link>
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
            <Link href="#kontakt">
              <Button>{t("nav.contact")}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/zahlung">
              <button
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                aria-label={t("nav.cryptoPayment")}
              >
                <Wallet className="h-5 w-5" />
              </button>
            </Link>
            <a
              href="https://instagram.com/naser.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Instagram @naser.solutions"
            >
              <Instagram className="h-5 w-5 text-foreground" />
            </a>
            <LanguageSwitcherCompact />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              <Link
                href="#leistungen"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.services")}
              </Link>
              <Link
                href="#projekte"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.projects")}
              </Link>
              <Link
                href="#ueber-uns"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/links"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Links
              </Link>
              <a
                href="https://instagram.com/naser.solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Instagram className="h-5 w-5" />
                <span>@naser.solutions</span>
              </a>
              <Link
                href="/zahlung"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Wallet className="h-5 w-5" />
                <span>{t("nav.cryptoPayment")}</span>
              </Link>
              <Link href="#kontakt" onClick={() => setIsOpen(false)}>
                <Button className="w-full">{t("nav.contact")}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
