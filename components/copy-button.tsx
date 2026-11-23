"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import { dispatchDissolveToast } from "@/components/dissolve-toast"

interface CopyButtonProps {
  value: string
  label: string
  copiedLabel?: string
}

export function CopyButton({ value, label, copiedLabel = "OK" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }

    setCopied(true)
    dispatchDissolveToast(label)
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `${label}: ${copiedLabel}` : label}
      title={copied ? copiedLabel : label}
      className={`relative inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color,color,transform] duration-200 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        copied
          ? "border-foreground/50 bg-foreground text-background"
          : "border-border/80 bg-background/60 text-muted-foreground hover:border-foreground/40 hover:bg-secondary hover:text-foreground"
      }`}
    >
      <Copy
        aria-hidden="true"
        className={`absolute size-3.5 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
      />
      <Check
        aria-hidden="true"
        className={`absolute size-3.5 stroke-[2.5] transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  )
}
