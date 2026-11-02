"use client"

import { useEffect, useRef, useState, type MouseEvent, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Moon, Sun, Instagram, ArrowUpRight } from "lucide-react"
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

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)")
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false) }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

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
          <Link href="/" aria-label="Naser Solutions" className="flex items-center gap-2 min-w-0">
            <div className="relative h-9 w-9 sm:h-14 sm:w-14 flex-shrink-0">
              {/* Light mode logo */}
              <Image
                src="/images/logo-invertable.png"
                alt="Logo von Naser Solutions"
                fill
                className="object-contain dark:hidden"
                priority
              />
              {/* Dark mode logo - using direct URL */}
              <Image
                src="/images/inverted-20logo-20png.png"
                alt="Logo von Naser Solutions"
                fill
                className="hidden object-contain dark:block"
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
            <button ref={menuButtonRef} className="relative inline-flex size-11 items-center justify-center rounded-full border border-border/60 bg-background/50 transition-[background-color,transform] duration-200 hover:bg-secondary active:scale-90 motion-reduce:transition-none" aria-label={t("ui.menu")} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(open => !open)}>
              <Menu aria-hidden="true" className={`absolute size-5 transition-[opacity,transform] duration-300 motion-reduce:transition-none ${isOpen ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
              <X aria-hidden="true" className={`absolute size-5 transition-[opacity,transform] duration-300 motion-reduce:transition-none ${isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
            </button>
          </div>
        </div>

        {/* Keep mounted so closing animates too; inert removes hidden links from keyboard navigation. */}
        <div className="absolute inset-x-4 top-[calc(100%+0.75rem)] sm:inset-x-6 lg:inset-x-8 xl:hidden">
          <div id="mobile-navigation" data-open={isOpen} aria-hidden={!isOpen} inert={!isOpen} className="mobile-menu-shell ms-auto max-w-lg">
            <div className="min-h-0 overflow-hidden rounded-3xl border border-border/80 bg-background shadow-2xl shadow-black/15 backdrop-blur-2xl">
              <div className="max-h-[calc(100dvh-7.5rem)] overflow-y-auto overscroll-contain p-3 sm:p-4">
                <div className="flex flex-col gap-1">
                  {[
                    { href: "/#leistungen", label: t("nav.services"), section: true },
                    { href: "/#projekte", label: t("nav.projects"), section: true },
                    { href: "/ueber-uns", label: t("nav.about"), section: false },
                    { href: "/links", label: "Links", section: false },
                  ].map((item, index) => (
                    <Link key={item.href} href={item.href} style={{ "--menu-order": index } as CSSProperties} className="mobile-nav-item group flex min-h-14 items-center justify-between gap-4 rounded-2xl px-4 py-3 text-lg font-medium text-foreground hover:bg-secondary active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-[-2px]" onClick={item.section ? handleSectionNavigation : () => setIsOpen(false)}>
                      {item.label}<ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl-flip motion-reduce:transition-none" aria-hidden="true" />
                    </Link>
                  ))}
                  <a href="https://instagram.com/naser.solutions" target="_blank" rel="noopener noreferrer" style={{ "--menu-order": 4 } as CSSProperties} className="mobile-nav-item mt-2 flex min-h-12 items-center gap-3 rounded-2xl px-4 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground" onClick={() => setIsOpen(false)}>
                    <Instagram className="size-4" aria-hidden="true" /><span>@naser.solutions</span>
                  </a>
                  <div className="mobile-nav-item mt-3 border-t border-border/60 pt-4" style={{ "--menu-order": 5 } as CSSProperties}>
                    <Button asChild className="h-auto min-h-12 w-full rounded-2xl px-5 py-3 whitespace-normal active:scale-[0.98] transition-transform motion-reduce:transition-none">
                      <Link href="/#kontakt" onClick={handleSectionNavigation}>{t("nav.contact")}<ArrowUpRight className="ms-2 size-4 rtl-flip" aria-hidden="true" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
