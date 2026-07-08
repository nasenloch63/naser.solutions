"use client"

import { useEffect, useRef, useState } from "react"

/* ------------------------------------------------------------------ */
/*  CONFIG — adjust look & feel here                                   */
/* ------------------------------------------------------------------ */
const CONFIG = {
  // Colors
  neon: "#39FF14", // primary neon green
  neonSoft: "#00FF7F", // secondary neon (glow)
  base: "#000000", // deepest background
  base2: "#0A0A0A", // slightly lifted background

  // Opacity levels (keep subtle so foreground text stays readable)
  candleOpacity: 0.2, // candlestick silhouette (0.15 - 0.25)
  scanlineOpacity: 0.06, // drifting scanlines
  particleOpacity: 0.35, // rising particles
  glowOpacity: 0.18, // radial glow behind profile
  gridOpacity: 0.05, // faint background grid

  // Animation speeds (seconds)
  scanlineSpeed: 14, // vertical scanline drift
  candleGrowSpeed: 22, // candlestick "market" cycle
  glowPulseSpeed: 6, // radial glow pulse

  // Particles
  particleCount: 40,
  particleSpeedMin: 18, // slowest particle (s to cross)
  particleSpeedMax: 38, // fastest particle

  // Parallax
  parallaxFactor: 0.25, // background moves at 0.25x scroll speed
}

/* ------------------------------------------------------------------ */
/*  Candlestick chart — deterministic pseudo-random for SSR safety     */
/* ------------------------------------------------------------------ */
type Candle = {
  x: number
  open: number
  close: number
  high: number
  low: number
  bullish: boolean
}

function CandlestickChart() {
  const W = 800
  const H = 400
  const COUNT = 26
  const step = W / COUNT
  const bodyW = step * 0.55

  // deterministic candles
  const candles: Candle[] = []
  let price = H * 0.78
  let seed = 20260701
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < COUNT; i++) {
    const drift = (rand() - 0.4) * (H * 0.07)
    const open = price
    const close = Math.max(H * 0.08, Math.min(H * 0.9, price - drift))
    const bullish = close <= open
    const wick = (rand() * H) / 14
    const high = Math.min(open, close) - wick
    const low = Math.max(open, close) + wick
    candles.push({ x: i * step + (step - bodyW) / 2, open, close, high, low, bullish })
    price = close
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMax slice"
      className="absolute bottom-0 right-0 h-[55vh] w-full max-w-[900px]"
      style={{ opacity: CONFIG.candleOpacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="candleFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={CONFIG.neon} stopOpacity="0" />
          <stop offset="60%" stopColor={CONFIG.neon} stopOpacity="0.6" />
          <stop offset="100%" stopColor={CONFIG.neon} stopOpacity="1" />
        </linearGradient>
      </defs>
      <g className="atb-candles">
        {candles.map((c, i) => {
          const bodyTop = Math.min(c.open, c.close)
          const bodyH = Math.max(4, Math.abs(c.close - c.open))
          const color = c.bullish ? CONFIG.neon : CONFIG.neonSoft
          const dim = c.bullish ? 1 : 0.45
          return (
            <g key={i} style={{ opacity: dim }}>
              {/* wick */}
              <line
                x1={c.x + bodyW / 2}
                y1={c.high}
                x2={c.x + bodyW / 2}
                y2={c.low}
                stroke={color}
                strokeWidth={1.5}
              />
              {/* body */}
              <rect
                x={c.x}
                y={bodyTop}
                width={bodyW}
                height={bodyH}
                fill={c.bullish ? color : "transparent"}
                stroke={color}
                strokeWidth={1.5}
                rx={1}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  HUD corner frames                                                  */
/* ------------------------------------------------------------------ */
function HudCorners() {
  const stroke = CONFIG.neon
  const common = "absolute h-24 w-24 md:h-32 md:w-32"
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* top-left */}
      <svg className={`${common} left-3 top-3`} viewBox="0 0 100 100" fill="none">
        <path d="M2 34 L2 14 L14 2 L40 2" stroke={stroke} strokeWidth="2" opacity="0.5" />
        <path d="M2 46 L2 40" stroke={stroke} strokeWidth="2" opacity="0.3" />
      </svg>
      {/* top-right */}
      <svg className={`${common} right-3 top-3 rotate-90`} viewBox="0 0 100 100" fill="none">
        <path d="M2 34 L2 14 L14 2 L40 2" stroke={stroke} strokeWidth="2" opacity="0.5" />
        <path d="M2 46 L2 40" stroke={stroke} strokeWidth="2" opacity="0.3" />
      </svg>
      {/* bottom-right */}
      <svg className={`${common} bottom-3 right-3 rotate-180`} viewBox="0 0 100 100" fill="none">
        <path d="M2 34 L2 14 L14 2 L40 2" stroke={stroke} strokeWidth="2" opacity="0.5" />
        <path d="M2 46 L2 40" stroke={stroke} strokeWidth="2" opacity="0.3" />
      </svg>
      {/* bottom-left */}
      <svg className={`${common} bottom-3 left-3 -rotate-90`} viewBox="0 0 100 100" fill="none">
        <path d="M2 34 L2 14 L14 2 L40 2" stroke={stroke} strokeWidth="2" opacity="0.5" />
        <path d="M2 46 L2 40" stroke={stroke} strokeWidth="2" opacity="0.3" />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Rising particles                                                   */
/* ------------------------------------------------------------------ */
function Particles() {
  const [particles, setParticles] = useState<
    { left: number; size: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    const arr = Array.from({ length: CONFIG.particleCount }).map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * -CONFIG.particleSpeedMax,
      duration:
        CONFIG.particleSpeedMin +
        Math.random() * (CONFIG.particleSpeedMax - CONFIG.particleSpeedMin),
    }))
    setParticles(arr)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="atb-particle absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: CONFIG.neon,
            opacity: CONFIG.particleOpacity,
            boxShadow: `0 0 6px ${CONFIG.neon}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function AnimatedTradingBackground() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respect reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (parallaxRef.current) {
          const y = window.scrollY * CONFIG.parallaxFactor
          parallaxRef.current.style.transform = `translate3d(0, ${y}px, 0)`
        }
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${CONFIG.base2} 0%, ${CONFIG.base} 70%)`,
      }}
    >
      <style>{`
        @keyframes atb-scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes atb-rise {
          0% { transform: translateY(105vh) scale(1); }
          100% { transform: translateY(-10vh) scale(1); }
        }
        @keyframes atb-pulse {
          0%, 100% { opacity: ${CONFIG.glowOpacity}; transform: scale(1); }
          50% { opacity: ${CONFIG.glowOpacity * 1.8}; transform: scale(1.08); }
        }
        @keyframes atb-candle-breathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .atb-particle {
          bottom: -10px;
          animation-name: atb-rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .atb-candles {
          transform-origin: bottom right;
          animation: atb-candle-breathe ${CONFIG.candleGrowSpeed}s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .atb-particle, .atb-candles, .atb-scanline, .atb-glow { animation: none !important; }
        }
      `}</style>

      {/* Parallax layer holds slow-moving decor */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        {/* Faint grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: CONFIG.gridOpacity,
            backgroundImage: `linear-gradient(${CONFIG.neon} 1px, transparent 1px), linear-gradient(90deg, ${CONFIG.neon} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(circle at 50% 40%, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 40%, black, transparent 80%)",
          }}
        />

        {/* Radial glow behind profile area (top) */}
        <div
          className="atb-glow absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${CONFIG.neon} 0%, transparent 70%)`,
            opacity: CONFIG.glowOpacity,
            animation: `atb-pulse ${CONFIG.glowPulseSpeed}s ease-in-out infinite`,
          }}
        />

        {/* Candlestick chart bottom-right */}
        <CandlestickChart />
      </div>

      {/* Scanlines (independent of parallax) */}
      <div
        className="atb-scanline absolute inset-x-0 h-40"
        style={{
          background: `linear-gradient(to bottom, transparent, ${CONFIG.neon}, transparent)`,
          opacity: CONFIG.scanlineOpacity,
          animation: `atb-scanline ${CONFIG.scanlineSpeed}s linear infinite`,
        }}
      />

      {/* Rising particles */}
      <Particles />

      {/* HUD corner frames */}
      <HudCorners />

      {/* Vignette for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 45%, transparent 30%, ${CONFIG.base} 95%)`,
        }}
      />
    </div>
  )
}
