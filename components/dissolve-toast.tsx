"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

const TOAST_EVENT = "naser:dissolve-toast"

export function dispatchDissolveToast(message: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }))
}

interface Grain {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  delay: number
  color: string
}

export function DissolveToastHost() {
  const [message, setMessage] = useState<string | null>(null)
  const [phase, setPhase] = useState<"hidden" | "visible" | "dust">("hidden")
  const pillRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  function clearTimers() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }

  function triggerDustDismiss() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pill = pillRef.current
    const canvas = canvasRef.current

    if (reduced || !pill || !canvas) {
      setPhase("hidden")
      setMessage(null)
      return
    }

    const rect = pill.getBoundingClientRect()
    const pad = 48
    const w = Math.ceil(rect.width + pad * 2)
    const h = Math.ceil(rect.height + pad * 2)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setPhase("hidden")
      setMessage(null)
      return
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const dark = document.documentElement.classList.contains("dark")
    const grains: Grain[] = []
    const step = 4
    const innerW = rect.width
    const innerH = rect.height
    const radius = innerH / 2

    // Sample grains across the rounded pill silhouette (well under 6,000 cap)
    for (let gy = 0; gy < innerH; gy += step) {
      for (let gx = 0; gx < innerW; gx += step) {
        // Rounded pill clip check
        const clampedX = Math.max(radius, Math.min(innerW - radius, gx))
        const dist = Math.hypot(gx - clampedX, gy - radius)
        if (dist > radius) continue

        const isBorder = dist > radius - 3 || gy < 3 || gy > innerH - 3
        const normX = gx / Math.max(1, innerW)
        grains.push({
          x: pad + gx,
          y: pad + gy,
          vx: 14 + Math.random() * 44 + normX * 26,
          vy: -10 - Math.random() * 42,
          size: isBorder ? 2.2 : 1.7 + Math.random() * 0.9,
          alpha: isBorder ? 0.9 : 0.65,
          delay: normX * 0.24 + Math.random() * 0.08,
          color: dark
            ? isBorder
              ? "255,255,255"
              : "212,212,216"
            : isBorder
              ? "12,12,14"
              : "63,63,70",
        })
      }
    }

    setPhase("dust")
    const start = performance.now()
    const duration = 760

    function frame(now: number) {
      const elapsed = (now - start) / 1000
      ctx!.clearRect(0, 0, w, h)
      let alive = 0

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i]
        const localT = Math.max(0, elapsed - g.delay)
        const life = localT / (duration / 1000)
        if (life >= 1) continue
        alive++

        const ease = 1 - Math.pow(1 - life, 2.2)
        const px = g.x + g.vx * ease
        const py = g.y + g.vy * ease + life * life * 12
        const a = g.alpha * (1 - life)

        ctx!.fillStyle = `rgba(${g.color}, ${a.toFixed(3)})`
        ctx!.fillRect(px, py, g.size, g.size)
      }

      if (alive > 0 && elapsed < 1.2) {
        rafRef.current = window.requestAnimationFrame(frame)
      } else {
        rafRef.current = 0
        setPhase("hidden")
        setMessage(null)
      }
    }

    rafRef.current = window.requestAnimationFrame(frame)
  }

  useEffect(() => {
    function onToast(e: Event) {
      const detail = (e as CustomEvent<string>).detail
      if (!detail) return
      clearTimers()
      setMessage(detail)
      setPhase("visible")
      timerRef.current = window.setTimeout(() => {
        triggerDustDismiss()
      }, 2100)
    }

    window.addEventListener(TOAST_EVENT, onToast)
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast)
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === "hidden" || !message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <div className="relative flex items-center justify-center">
        <button
          ref={pillRef}
          type="button"
          onClick={() => {
            clearTimers()
            triggerDustDismiss()
          }}
          className={`glass-surface pointer-events-auto inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border/90 bg-background/92 px-4 py-2 text-sm font-medium text-foreground shadow-2xl shadow-black/25 backdrop-blur-xl transition-opacity duration-150 ${
            phase === "dust" ? "pointer-events-none opacity-0" : "opacity-100 animate-in fade-in slide-in-from-bottom-3 duration-200"
          }`}
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background">
            <Check className="size-3 stroke-[3]" aria-hidden="true" />
          </span>
          <span>{message}</span>
        </button>

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            phase === "dust" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  )
}
