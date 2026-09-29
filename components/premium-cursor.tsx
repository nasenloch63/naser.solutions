"use client"

import { useEffect, useRef } from "react"

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "label",
  '[role="button"]',
  '[tabindex]:not([tabindex="-1"])',
].join(",")

export function PremiumCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (!finePointer.matches || reducedMotion.matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    document.body.classList.add("premium-cursor-enabled")

    let frame = 0
    let hasPosition = false
    let targetX = 0
    let targetY = 0
    let ringX = 0
    let ringY = 0

    const render = () => {
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY

      if (!hasPosition) {
        ringX = targetX
        ringY = targetY
        hasPosition = true
      }

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      ring.classList.add("is-visible")
      dot.classList.add("is-visible")
    }

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target
      const isInteractive = target instanceof Element && Boolean(target.closest(interactiveSelector))
      ring.classList.toggle("is-hovering", isInteractive)
      dot.classList.toggle("is-hovering", isInteractive)
    }

    const handlePointerDown = () => ring.classList.add("is-pressed")
    const handlePointerUp = () => ring.classList.remove("is-pressed")
    const handlePointerLeave = () => {
      ring.classList.remove("is-visible")
      dot.classList.remove("is-visible")
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerover", handlePointerOver, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    document.documentElement.addEventListener("mouseleave", handlePointerLeave)
    frame = window.requestAnimationFrame(render)

    return () => {
      document.body.classList.remove("premium-cursor-enabled")
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerover", handlePointerOver)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="premium-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="premium-cursor-dot" aria-hidden="true" />
    </>
  )
}
