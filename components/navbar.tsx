"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Moon, Sun, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher, LanguageSwitcherCompact } from "@/components/language-switcher"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  function handleSectionNavigation(event: MouseEvent<HTMLAnchorElement>) {
    setIsOpen(false)

    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (window.location.pathname !== "/") return

    const hash = event.currentTarget.hash
    const section = document.getElementById(hash.slice(1))
    if (!section) return

    event.preventDefault()
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", `/${hash}`)
    }

    // Scroll after the mobile menu closes, including repeat clicks on the current hash.
    requestAnimationFrame(() => section.scrollIntoView({ block: "start" }))
  }

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl backdrop-saturate-150 border-b border-border/50 shadow-sm supports-[backdrop-filter]:bg-background/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="relative h-9 w-9 sm:h-14 sm:w-14 flex-shrink-0">
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
              <span className="text-sm sm:text-xl font-bold text-foreground">Naser Solutions</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Webagency
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-5">
            <Link href="/#leistungen" onClick={handleSectionNavigation} className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.services")}
            </Link>
            <Link href="/#projekte" onClick={handleSectionNavigation} className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.projects")}
            </Link>
            <Link href="/ueber-uns" className="text-muted-foreground hover:text-foreground transition-colors">
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
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              aria-label={t("ui.theme")} title={t("ui.theme")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
            <Button asChild><Link href="/#kontakt" onClick={handleSectionNavigation}>{t("nav.contact")}</Link></Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-1 shrink-0">
            <a
              href="https://instagram.com/naser.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex size-11 items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              aria-label="Instagram @naser.solutions"
            >
              <Instagram className="h-5 w-5 text-foreground" />
            </a>
            <LanguageSwitcherCompact />
            <button
              onClick={toggleTheme}
              className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              aria-label={t("ui.theme")} title={t("ui.theme")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
            <button ref={menuButtonRef} className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-secondary transition-colors" aria-label={t("ui.menu")} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-navigation" className="xl:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain py-4 border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              <Link
                href="/#leistungen"
                className="flex min-h-11 items-center rounded-xl px-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={handleSectionNavigation}
              >
                {t("nav.services")}
              </Link>
              <Link
                href="/#projekte"
                className="flex min-h-11 items-center rounded-xl px-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={handleSectionNavigation}
              >
                {t("nav.projects")}
              </Link>
              <Link
                href="/ueber-uns"
                className="flex min-h-11 items-center rounded-xl px-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/links"
                className="flex min-h-11 items-center rounded-xl px-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Links
              </Link>
              <a
                href="https://instagram.com/naser.solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Instagram className="h-5 w-5" />
                <span>@naser.solutions</span>
              </a>
              <Button asChild className="w-full min-h-11 h-auto whitespace-normal">
                <Link href="/#kontakt" onClick={handleSectionNavigation}>{t("nav.contact")}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
