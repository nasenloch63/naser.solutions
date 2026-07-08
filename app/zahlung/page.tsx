"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Zap, Shield, Clock, Globe, QrCode, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalModalProvider } from "@/components/legal-modal-provider"
import Image from "next/image"

// Crypto icons as SVG components
const BitcoinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm7.189 13.885c.312 2.107-.79 3.481-2.396 4.219l1.063 4.262-1.607.4-.994-3.993c-.423.105-.858.204-1.29.302l1 4.012-1.606.4-1.064-4.267c-.35.08-.693.158-1.027.231l.003.012-2.216.554-.327-1.716s1.192-.273 1.165-.29c.652-.162.94-.593.912-1.034l-1.275-5.117c-.06.015-.12.031-.188.054l.188-.047-.892-3.578c-.115-.38-.427-.786-1.077-.625.026-.038-1.165.29-1.165.29l-.69-1.614 2.092-.522c.39-.098.772-.2 1.148-.297l-1.075-4.313 1.607-.4 1.037 4.167c.439-.12.876-.232 1.304-.339l-1.026-4.113 1.607-.4 1.076 4.319c3.186.612 5.584 1.65 5.097 4.548z" />
  </svg>
)

const SolanaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 397.7 311.7" className={className} fill="currentColor">
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
    <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7z" />
    <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
  </svg>
)

const MoneroIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <path d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0zm0 240.009c-61.757 0-112.009-50.252-112.009-112.009 0-61.757 50.252-112.009 112.009-112.009 61.757 0 112.009 50.252 112.009 112.009 0 61.757-50.252 112.009-112.009 112.009z" />
    <path d="M128 46.203L63.819 155.831v33.963H44.188v-15.989h.012C44.2 118.497 82.009 73.308 128 46.203zm0 0c45.991 27.105 83.8 72.294 83.8 127.602h.012v15.989h-19.631v-33.963L128 46.203z" />
    <path d="M128 96.033l-44.013 66.019v27.742H59.819v-33.963L128 46.203l68.181 109.628v33.963h-24.168v-27.742L128 96.033z" />
  </svg>
)

interface CryptoCard {
  id: string
  name: string
  symbol: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  glowColor: string
  walletAddress: string
  qrCodeImage: string
  benefits: string[]
}

const cryptoCards: CryptoCard[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: BitcoinIcon,
    color: "#F7931A",
    gradient: "from-orange-500 via-yellow-500 to-orange-600",
    glowColor: "rgba(247, 147, 26, 0.5)",
    walletAddress: "bc1qxfs3y03q27dg943pfuvzg6er9vje7p0a7pw7xl",
    qrCodeImage: "/images/btc-deposit.png",
    benefits: ["payment.btc.benefit1", "payment.btc.benefit2", "payment.btc.benefit3"],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: SolanaIcon,
    color: "#00FFA3",
    gradient: "from-emerald-400 via-cyan-500 to-purple-500",
    glowColor: "rgba(0, 255, 163, 0.5)",
    walletAddress: "3Bq2AERuaZZBgGYUs3t21HsBsTAUCy6KfCMcgTmWWpy8",
    qrCodeImage: "/images/sol-deposit.png",
    benefits: ["payment.sol.benefit1", "payment.sol.benefit2", "payment.sol.benefit3"],
  },
  {
    id: "xmr",
    name: "Monero",
    symbol: "XMR",
    icon: MoneroIcon,
    color: "#FF6600",
    gradient: "from-orange-600 via-red-500 to-orange-700",
    glowColor: "rgba(255, 102, 0, 0.5)",
    walletAddress: "84VMc5R9EUFCUenCDNWamQDLjkbBwHGBfQNJGjnibgmVGhUqLXLKw8MQgYkEofQky8ZTHASwKNYjrZcEq8dLG9xRMgccpd7",
    qrCodeImage: "/images/monero-20deposit.jpeg",
    benefits: ["payment.xmr.benefit1", "payment.xmr.benefit2", "payment.xmr.benefit3"],
  },
]

function CryptoPaymentCard({ crypto, index }: { crypto: CryptoCard; index: number }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const Icon = crypto.icon

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(crypto.walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${crypto.glowColor}, transparent)` }}
      />

      <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 lg:p-8 overflow-hidden">
        {/* Background gradient decoration */}
        <div
          className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${crypto.gradient} opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2`}
        />

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${crypto.gradient} p-3 shadow-lg`}
            style={{ boxShadow: `0 0 30px ${crypto.glowColor}` }}
          >
            <Icon className="w-full h-full text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{crypto.name}</h3>
            <span className="text-zinc-400 text-sm">{crypto.symbol}</span>
          </div>
        </div>

        {/* Benefits */}
        <ul className="space-y-3 mb-6">
          {crypto.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-br ${crypto.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>{t(benefit)}</span>
            </li>
          ))}
        </ul>

        {/* QR Code Section */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="relative rounded-xl overflow-hidden bg-black/50 p-2">
              <Image
                src={crypto.qrCodeImage || "/placeholder.svg"}
                alt={`${crypto.name} QR Code`}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <p className="text-xs text-zinc-500 mt-2">{t("payment.scanQR")}</p>
          </motion.div>
        )}

        {/* Wallet Address */}
        <div className="bg-black/50 rounded-xl p-4 mb-4">
          <p className="text-xs text-zinc-500 mb-2">{t("payment.walletAddress")}</p>
          <div className="flex items-center gap-2">
            <code className="text-xs text-zinc-300 font-mono break-all flex-1">
              {crypto.walletAddress.slice(0, 20)}...{crypto.walletAddress.slice(-8)}
            </code>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="flex-shrink-0 hover:bg-zinc-800">
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-zinc-400" />}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => setShowQR(!showQR)}
            variant="outline"
            className="flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          >
            <QrCode className="w-4 h-4 me-2" />
            {showQR ? t("payment.hideQR") : t("payment.showQR")}
          </Button>
          <Button
            onClick={copyToClipboard}
            className={`flex-1 bg-gradient-to-r ${crypto.gradient} text-white hover:opacity-90 border-0`}
          >
            {copied ? t("payment.copied") : t("payment.copy")}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function PaymentPage() {
  const { t } = useLanguage()

  return (
    <LegalModalProvider>
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <Zap className="w-4 h-4" />
              {t("payment.badge")}
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                {t("payment.title")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">{t("payment.description")}</p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>{t("payment.secure")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-500" />
                <span>{t("payment.fast")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-500" />
                <span>{t("payment.global")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Cards Section */}
      <section className="relative py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cryptoCards.map((crypto, index) => (
              <CryptoPaymentCard key={crypto.id} crypto={crypto} index={index} />
            ))}
          </div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/50 border border-zinc-800">
              <ExternalLink className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-400">{t("payment.questions")}</span>
              <a
                href="https://wa.me/4915678395858"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                {t("payment.contactUs")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </LegalModalProvider>
  )
}
