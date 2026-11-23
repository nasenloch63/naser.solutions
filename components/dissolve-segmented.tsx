"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

export interface SegmentedOption<T extends string> {
  value: T
  label: string
  icon?: React.ReactNode
}

interface DissolveSegmentedProps<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
  className?: string
  compact?: boolean
}

export function DissolveSegmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
  compact = false,
}: DissolveSegmentedProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  })

  function measure() {
    const active = buttonRefs.current[value]
    if (!active) return
    setIndicator({
      left: active.offsetLeft,
      width: active.offsetWidth,
      ready: true,
    })
  }

  useLayoutEffect(() => {
    measure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options.length])

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={ariaLabel}
      className={`relative inline-flex max-w-full items-center gap-0.5 rounded-full border border-border/80 bg-background/80 p-1 backdrop-blur-md ${
        compact ? "overflow-hidden" : "work-filters overflow-x-auto"
      } ${className}`}
    >
      {/* Spring-sliding active indicator pill (Dissolve SegmentedControl) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-primary shadow-sm transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.34,1.35,0.64,1)] motion-reduce:transition-none"
        style={{
          transform: `translate3d(${indicator.left}px, 0, 0)`,
          width: `${indicator.width}px`,
          opacity: indicator.ready ? 1 : 0,
        }}
      />
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            ref={(el) => {
              buttonRefs.current[opt.value] = el
            }}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 ${
              compact ? "min-h-9 px-3 text-xs" : "min-h-10 px-4 text-sm"
            } ${active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
