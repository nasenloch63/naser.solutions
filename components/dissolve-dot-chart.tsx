"use client"

import { useEffect, useRef, useState } from "react"
import { DissolveSegmented } from "@/components/dissolve-segmented"

export type TelemetryMode = "memory" | "stack"
export type StackLayerId = "TensorRT" | "cuDNN" | "CUDA" | "JetPack"

interface BarSpec {
  label: string
  metric: string
  level: number
}

interface StackLayerSpec {
  id: StackLayerId
  metric: string
  detail: string
  bandwidth: number // 0..1 visual stratum width
}

const MEMORY_BARS: BarSpec[] = [
  { label: "LLM", metric: "18 GB", level: 0.88 },
  { label: "CUDA", metric: "512 Cores", level: 0.78 },
  { label: "Tensor", metric: "64 Cores", level: 0.94 },
  { label: "TRT", metric: "INT8 / FP16", level: 0.84 },
  { label: "cuDNN", metric: "Native", level: 0.72 },
  { label: "Local", metric: "0 Cloud", level: 0.96 },
]

// Ordered top (inference) -> bottom (OS/hardware) for architectural layer clarity
export const STACK_LAYERS: StackLayerSpec[] = [
  { id: "TensorRT", metric: "FP16 / INT8", detail: "Optimized Inference", bandwidth: 0.96 },
  { id: "cuDNN", metric: "Neural Ops", detail: "Deep NN Kernels", bandwidth: 0.86 },
  { id: "CUDA", metric: "512 Cores", detail: "Volta GPU Parallel", bandwidth: 0.92 },
  { id: "JetPack", metric: "L4T Native", detail: "Isolated Local OS", bandwidth: 0.8 },
]

interface DissolveDotChartProps {
  memorySubtitle: string
  mode?: TelemetryMode
  onModeChange?: (mode: TelemetryMode) => void
  activeLayer?: StackLayerId
  onActiveLayerChange?: (layer: StackLayerId) => void
}

export function DissolveDotChart({
  memorySubtitle,
  mode: controlledMode,
  onModeChange,
  activeLayer: controlledLayer,
  onActiveLayerChange,
}: DissolveDotChartProps) {
  const [internalMode, setInternalMode] = useState<TelemetryMode>("memory")
  const [internalLayer, setInternalLayer] = useState<StackLayerId>("TensorRT")
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number>(2)

  const mode = controlledMode ?? internalMode
  const activeLayer = controlledLayer ?? internalLayer

  function setMode(next: TelemetryMode) {
    if (onModeChange) onModeChange(next)
    else setInternalMode(next)
  }

  function setActiveLayer(next: StackLayerId) {
    if (onActiveLayerChange) onActiveLayerChange(next)
    else setInternalLayer(next)
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modeRef = useRef<TelemetryMode>(mode)
  const barHoverRef = useRef<number>(hoveredBarIdx)
  const layerRef = useRef<StackLayerId>(activeLayer)
  const barLevelsRef = useRef<number[]>(MEMORY_BARS.map((b) => b.level))

  modeRef.current = mode
  barHoverRef.current = hoveredBarIdx
  layerRef.current = activeLayer

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let width = 0
    let height = 0
    let visible = true
    let rafId = 0

    function resize() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    function drawMemoryBars(now: number, dark: boolean) {
      const bars = MEMORY_BARS
      const barCount = bars.length
      const activeIdx = barHoverRef.current
      const t = now * 0.002
      const current = barLevelsRef.current

      for (let b = 0; b < barCount; b++) {
        const target = bars[b].level
        current[b] = reducedMotion.matches ? target : current[b] + (target - current[b]) * 0.16
      }

      const padX = 12
      const padTop = 14
      const padBottom = 8
      const chartW = width - padX * 2
      const chartH = height - padTop - padBottom
      const slotW = chartW / barCount
      const barW = Math.min(44, slotW * 0.64)

      const dotStep = 6.5
      const rows = Math.max(8, Math.floor(chartH / dotStep))
      const colsPerBar = Math.max(4, Math.floor(barW / dotStep))

      for (let b = 0; b < barCount; b++) {
        const cx = padX + slotW * (b + 0.5)
        const left = cx - ((colsPerBar - 1) * dotStep) * 0.5
        const activeRows = Math.round(current[b] * rows)
        const isHot = b === activeIdx

        for (let r = 0; r < rows; r++) {
          const y = height - padBottom - r * dotStep - 3
          const filled = r < activeRows
          for (let c = 0; c < colsPerBar; c++) {
            let x = left + c * dotStep
            let dy = 0
            if (!reducedMotion.matches && isHot && filled) {
              const topRatio = r / Math.max(1, activeRows)
              if (topRatio > 0.62) {
                const energy = (topRatio - 0.62) / 0.38
                const angle = t * 1.6 + c * 1.9 + r * 0.9
                x += Math.cos(angle) * energy * 3.1
                dy = Math.sin(angle * 1.15) * energy * 2.5 - energy * 2.2
              }
            }

            if (filled) {
              const verticalGrad = r / Math.max(1, activeRows)
              const radius = isHot ? 1.85 : 1.45
              ctx!.fillStyle = isHot
                ? dark
                  ? `rgba(255, 255, 255, ${(0.45 + verticalGrad * 0.55).toFixed(2)})`
                  : `rgba(10, 10, 12, ${(0.5 + verticalGrad * 0.5).toFixed(2)})`
                : dark
                  ? `rgba(248, 248, 248, ${(0.16 + verticalGrad * 0.24).toFixed(2)})`
                  : `rgba(12, 12, 14, ${(0.14 + verticalGrad * 0.22).toFixed(2)})`
              ctx!.beginPath()
              ctx!.arc(x, y + dy, radius, 0, Math.PI * 2)
              ctx!.fill()
            } else {
              ctx!.fillStyle = dark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.05)"
              ctx!.beginPath()
              ctx!.arc(x, y, 1.0, 0, Math.PI * 2)
              ctx!.fill()
            }
          }
        }
      }
    }

    function drawComputeStrata(now: number, dark: boolean) {
      const layerCount = STACK_LAYERS.length
      const padX = 10
      const padY = 10
      const gapY = 10
      const usableW = width - padX * 2
      const usableH = height - padY * 2 - gapY * (layerCount - 1)
      const bandH = usableH / layerCount
      const dotStep = 6.5
      const cols = Math.max(18, Math.floor(usableW / dotStep))
      const rowsPerBand = Math.max(3, Math.floor(bandH / dotStep))
      const t = now * 0.0024

      for (let l = 0; l < layerCount; l++) {
        const layer = STACK_LAYERS[l]
        const isActive = layer.id === layerRef.current
        const bandTop = padY + l * (bandH + gapY)
        const activeCols = Math.round(cols * layer.bandwidth)

        for (let r = 0; r < rowsPerBand; r++) {
          const y = bandTop + r * dotStep + (bandH - (rowsPerBand - 1) * dotStep) * 0.5
          for (let c = 0; c < cols; c++) {
            let x = padX + c * dotStep + 3
            let dy = 0
            const filled = c < activeCols

            if (filled) {
              const normX = c / Math.max(1, activeCols)
              // Traveling compute signal pulse streaming across active stratum
              const wavePos = ((t * 0.55 + l * 0.22) % 1.35) - 0.15
              const pulse = Math.max(0, 1 - Math.abs(normX - wavePos) * 5.2)

              if (!reducedMotion.matches && isActive && normX > 0.78) {
                // Subtle Dissolve grain dispersion at the leading right edge of active compute stratum
                const edgeEnergy = (normX - 0.78) / 0.22
                const phase = t * 1.5 + c * 0.9 + r * 2.1
                x += edgeEnergy * 4.5 + Math.cos(phase) * edgeEnergy * 2.4
                dy = Math.sin(phase * 1.2) * edgeEnergy * 2.4
              }

              const radius = isActive ? 1.55 + pulse * 0.85 : 1.25 + pulse * 0.35
              const alpha = isActive
                ? Math.min(1, 0.38 + normX * 0.32 + pulse * 0.5)
                : 0.13 + normX * 0.1 + pulse * 0.14

              ctx!.fillStyle = dark
                ? `rgba(255, 255, 255, ${alpha.toFixed(2)})`
                : `rgba(10, 10, 12, ${alpha.toFixed(2)})`
              ctx!.beginPath()
              ctx!.arc(x, y + dy, radius, 0, Math.PI * 2)
              ctx!.fill()
            } else {
              ctx!.fillStyle = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.045)"
              ctx!.beginPath()
              ctx!.arc(x, y, 0.95, 0, Math.PI * 2)
              ctx!.fill()
            }
          }
        }
      }
    }

    function draw(now: number) {
      if (!ctx || width <= 0 || height <= 0) return
      ctx.clearRect(0, 0, width, height)
      const dark = document.documentElement.classList.contains("dark")
      if (modeRef.current === "memory") {
        drawMemoryBars(now, dark)
      } else {
        drawComputeStrata(now, dark)
      }
    }

    function loop(now: number) {
      draw(now)
      if (!reducedMotion.matches && visible) {
        rafId = window.requestAnimationFrame(loop)
      } else {
        rafId = 0
      }
    }

    function kick() {
      if (rafId) window.cancelAnimationFrame(rafId)
      rafId = 0
      if (reducedMotion.matches) draw(0)
      else if (visible) rafId = window.requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
        kick()
      },
      { threshold: 0.05 },
    )
    io.observe(canvas)

    const mo = new MutationObserver(() => draw(performance.now()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    kick()

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  const activeBar = MEMORY_BARS[hoveredBarIdx] ?? MEMORY_BARS[0]
  const activeLayerSpec = STACK_LAYERS.find((l) => l.id === activeLayer) ?? STACK_LAYERS[0]

  return (
    <div className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-secondary/35 p-5 backdrop-blur-md sm:p-6">
      {/* Header metric + Dissolve sliding SegmentedControl */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-semibold tracking-tight tabular-nums text-foreground sm:text-5xl" dir="ltr">
            {mode === "memory" ? "32 GB" : "32 TOPS"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {mode === "memory" ? memorySubtitle : "JetPack · CUDA · TensorRT · cuDNN"}
          </p>
        </div>
        <DissolveSegmented<TelemetryMode>
          compact
          ariaLabel="NVIDIA Jetson Telemetry Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "memory", label: "32 GB" },
            { value: "stack", label: "Stack" },
          ]}
        />
      </div>

      {/* Floating active inspection pill */}
      <div className="mt-5 flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-3 py-1 font-medium text-foreground shadow-xs backdrop-blur-md">
          <span className="tabular-nums font-semibold">
            {mode === "memory" ? activeBar.metric : activeLayerSpec.id}
          </span>
          <span className="text-muted-foreground">
            {mode === "memory" ? activeBar.label : `${activeLayerSpec.metric} · ${activeLayerSpec.detail}`}
          </span>
        </span>
        <span className="hidden tabular-nums text-muted-foreground sm:inline">Jetson AGX Xavier</span>
      </div>

      {/* Interactive dot-matrix canvas (vertical bars in 32 GB mode, horizontal compute strata in Stack mode) */}
      <div className="relative mt-3 h-36 w-full sm:h-40">
        <canvas ref={canvasRef} aria-hidden="true" className="size-full" />
        {mode === "memory" ? (
          <div
            className="absolute inset-0 grid"
            style={{ gridTemplateColumns: `repeat(${MEMORY_BARS.length}, minmax(0, 1fr))` }}
          >
            {MEMORY_BARS.map((bar, i) => (
              <button
                key={bar.label}
                type="button"
                onMouseEnter={() => setHoveredBarIdx(i)}
                onFocus={() => setHoveredBarIdx(i)}
                onClick={() => setHoveredBarIdx(i)}
                aria-label={`${bar.label}: ${bar.metric}`}
                className="h-full w-full cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2"
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 grid grid-rows-4 gap-2.5 py-2.5">
            {STACK_LAYERS.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onMouseEnter={() => setActiveLayer(layer.id)}
                onFocus={() => setActiveLayer(layer.id)}
                onClick={() => setActiveLayer(layer.id)}
                aria-label={`${layer.id}: ${layer.metric} — ${layer.detail}`}
                className="h-full w-full cursor-pointer rounded-md bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2"
              />
            ))}
          </div>
        )}
      </div>

      {/* Mode-specific interactive bottom legend */}
      {mode === "memory" ? (
        <div
          className="mt-2 grid text-center text-[11px] font-medium"
          style={{ gridTemplateColumns: `repeat(${MEMORY_BARS.length}, minmax(0, 1fr))` }}
        >
          {MEMORY_BARS.map((bar, i) => (
            <button
              key={bar.label}
              type="button"
              onClick={() => setHoveredBarIdx(i)}
              className={`cursor-pointer py-1 transition-colors ${
                i === hoveredBarIdx ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {bar.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {STACK_LAYERS.map((layer) => {
            const selected = layer.id === activeLayer
            return (
              <button
                key={layer.id}
                type="button"
                onMouseEnter={() => setActiveLayer(layer.id)}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2 text-start transition-[border-color,background-color,transform] duration-200 active:scale-[0.98] ${
                  selected
                    ? "border-foreground/55 bg-background text-foreground"
                    : "border-border/75 bg-background/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                <span className="text-xs font-semibold">{layer.id}</span>
                <span className="truncate text-[11px] tabular-nums opacity-75">{layer.metric}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
