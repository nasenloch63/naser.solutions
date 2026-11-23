"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

export interface StackCardItem {
  id: string
  title: string
  description: string
  url: string
  image?: string
  containImage?: boolean
  tags: string[]
  ctaLabel: string
}

export function DissolveCardStack({ items }: { items: StackCardItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [leavingDir, setLeavingDir] = useState<-1 | 0 | 1>(0)
  const startXRef = useRef(0)
  const movedRef = useRef(false)

  const count = items.length
  if (count === 0) return null

  function advance(dir: -1 | 1) {
    if (count <= 1) return
    setLeavingDir(dir)
    window.setTimeout(() => {
      setActiveIndex((prev) => (prev + (dir === 1 ? 1 : count - 1)) % count)
      setLeavingDir(0)
      setDragX(0)
    }, 210)
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("a, button")) return
    setIsDragging(true)
    movedRef.current = false
    startXRef.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return
    const dx = e.clientX - startXRef.current
    if (Math.abs(dx) > 6) movedRef.current = true
    setDragX(dx)
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return
    setIsDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    if (Math.abs(dragX) > 72) {
      advance(dragX > 0 ? 1 : -1)
    } else {
      setDragX(0)
    }
  }

  // Render up to 4 stacked layers from back to front
  const visibleLayers = Math.min(4, count)
  const orderedIndices: number[] = []
  for (let offset = visibleLayers - 1; offset >= 0; offset--) {
    orderedIndices.push((activeIndex + offset) % count)
  }

  return (
    <div className="relative flex flex-col gap-5">
      <div className="relative mx-auto h-[370px] w-full max-w-[540px] sm:h-[400px]">
        {orderedIndices.map((idx) => {
          const offset = (idx - activeIndex + count) % count
          const item = items[idx]
          const isFront = offset === 0

          const baseScale = 1 - offset * 0.048
          const baseY = -offset * 14
          const baseOpacity = isFront ? 1 : Math.max(0.38, 1 - offset * 0.22)

          const translateX = isFront
            ? leavingDir !== 0
              ? leavingDir * 240
              : dragX
            : 0
          const rotateDeg = isFront
            ? leavingDir !== 0
              ? leavingDir * 11
              : dragX * 0.045
            : 0
          const opacity = isFront && leavingDir !== 0 ? 0 : baseOpacity

          return (
            <div
              key={item.id}
              onPointerDown={isFront ? onPointerDown : undefined}
              onPointerMove={isFront ? onPointerMove : undefined}
              onPointerUp={isFront ? onPointerUp : undefined}
              onPointerCancel={isFront ? onPointerUp : undefined}
              onClick={
                !isFront
                  ? () => setActiveIndex(idx)
                  : undefined
              }
              style={{
                zIndex: visibleLayers - offset,
                transform: `translate3d(${translateX}px, ${baseY}px, 0) scale(${baseScale}) rotate(${rotateDeg}deg)`,
                opacity,
                transition:
                  isFront && isDragging
                    ? "none"
                    : "transform 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
              }}
              className={`glass-surface absolute inset-x-0 bottom-0 h-[332px] overflow-hidden rounded-3xl border border-border/85 bg-card shadow-[0_24px_60px_-28px_rgba(0,0,0,0.42)] sm:h-[362px] ${
                isFront
                  ? "cursor-grab select-none active:cursor-grabbing"
                  : "cursor-pointer"
              }`}
            >
              <div className="relative h-[56%] w-full overflow-hidden bg-zinc-900">
                {item.image ? (
                  item.containImage ? (
                    <div className="flex size-full items-center justify-center bg-zinc-100 p-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        draggable={false}
                        className="max-h-[72%] max-w-[65%] object-contain"
                      />
                    </div>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 540px, 95vw"
                      className="object-cover object-top"
                    />
                  )
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <a
                  href={item.url}
                  target={item.url.startsWith("/") ? undefined : "_blank"}
                  rel={item.url.startsWith("/") ? undefined : "noopener noreferrer"}
                  aria-label={item.title}
                  className="absolute end-3.5 top-3.5 inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <ArrowUpRight className="size-4 rtl-flip" aria-hidden="true" />
                </a>
              </div>

              <div className="flex h-[44%] flex-col justify-between p-4 sm:p-5">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="truncate font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs font-medium">
                  <a
                    href={item.url}
                    target={item.url.startsWith("/") ? undefined : "_blank"}
                    rel={item.url.startsWith("/") ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-1.5 text-foreground hover:opacity-80"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowUpRight className="size-3.5 rtl-flip" aria-hidden="true" />
                  </a>
                  <span className="tabular-nums text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tactile deck controls */}
      <div className="mx-auto flex w-full max-w-[540px] items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={item.title}
              className={`h-1.5 cursor-pointer rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === activeIndex ? "w-7 bg-foreground" : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous project"
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-[background-color,transform] duration-200 hover:bg-secondary active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft className="size-4 rtl-flip" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next project"
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-[background-color,transform] duration-200 hover:bg-secondary active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowRight className="size-4 rtl-flip" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
