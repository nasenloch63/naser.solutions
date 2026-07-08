"use client"

import { useCounterAnimation } from "@/hooks/use-counter-animation"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  isVisible: boolean
}

export function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2000, isVisible }: AnimatedCounterProps) {
  const count = useCounterAnimation({ end: value, duration, isVisible })

  return (
    <span>
      {prefix}
      {count.toLocaleString("de-DE")}
      {suffix}
    </span>
  )
}
