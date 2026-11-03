"use client"

import NextLink from "next/link"
import { type ComponentProps, type MouseEvent } from "react"
import { scrollToDestination, useSiteNavigation } from "@/components/site-navigation"

export default function SiteLink({ href, onClick, scroll, replace, ...props }: ComponentProps<typeof NextLink>) {
  const prepareNavigation = useSiteNavigation()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (!prepareNavigation || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.currentTarget
    if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return
    const destination = new URL(link.href)
    if (destination.origin !== window.location.origin) return

    const samePage = destination.pathname === window.location.pathname &&
      (destination.search === window.location.search || (destination.pathname === "/" && !destination.search))
    if (samePage) {
      if (destination.hash) {
        try { if (!document.getElementById(decodeURIComponent(destination.hash.slice(1)))) return } catch { return }
      }
      event.preventDefault()
      const nextUrl = `${destination.pathname}${destination.search}${destination.hash}`
      if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history[replace ? "replaceState" : "pushState"](null, "", nextUrl)
      }
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
      requestAnimationFrame(() => scrollToDestination(destination.hash, behavior))
    } else {
      prepareNavigation(destination)
    }
  }

  return <NextLink {...props} href={href} replace={replace} scroll={scroll ?? (prepareNavigation ? false : undefined)} onClick={handleClick} />
}
