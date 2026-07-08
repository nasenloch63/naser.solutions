"use client"

import { useEffect, useCallback } from "react"
import { X, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export type LegalModalType = "imprint" | "privacy" | "terms" | null

interface LegalModalProps {
  type: LegalModalType
  onClose: () => void
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  const { t, isRTL } = useLanguage()

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (type) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [type, handleKeyDown])

  if (!type) return null

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
          <button
            onClick={onClose}
            className={`flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-sm">{t("modal.backToSite")}</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 lg:p-8">
          {type === "imprint" && <ImprintContent />}
          {type === "privacy" && <PrivacyContent />}
          {type === "terms" && <TermsContent />}
        </div>
      </div>
    </div>
  )
}

function ImprintContent() {
  const { t } = useLanguage()

  return (
    <article className="space-y-10">
      <header>
        <h1 id="modal-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {t("impressum.title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("impressum.subtitle")}</p>
      </header>

      <section aria-labelledby="company-info">
        <h2 id="company-info" className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
          {t("impressum.companyInfo")}
        </h2>
        <address className="not-italic space-y-2 text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground">Yasin Adam Aissani</p>
          <p>c/o Impressumservice Dein-Impressum</p>
          <p>Stettiner Straße 41</p>
          <p>35410 Hungen</p>
          <p>Deutschland</p>
        </address>
      </section>

      <section aria-labelledby="contact-info">
        <h2 id="contact-info" className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
          {t("impressum.contact")}
        </h2>
        <dl className="space-y-3 text-muted-foreground">
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-medium text-foreground min-w-[100px]">{t("impressum.email")}:</dt>
            <dd>
              <a href="mailto:nasen@webdigital.cloud" className="hover:text-foreground transition-colors underline underline-offset-4">
                nasen@webdigital.cloud
              </a>
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-medium text-foreground min-w-[100px]">{t("impressum.phone")}:</dt>
            <dd>
              <a href="tel:+4915560729886" className="hover:text-foreground transition-colors underline underline-offset-4">
                +49 15560 729886
              </a>
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-medium text-foreground min-w-[100px]">{t("impressum.website")}:</dt>
            <dd>
              <a href="https://naser.solutions" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline underline-offset-4">
                naser.solutions
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="responsible">
        <h2 id="responsible" className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
          {t("impressum.responsible")}
        </h2>
        <p className="text-muted-foreground">Yasin Adam Aissani</p>
      </section>

      <section aria-labelledby="disclaimer">
        <h2 id="disclaimer" className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
          {t("impressum.disclaimer")}
        </h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h3 className="font-medium text-foreground mb-2">{t("impressum.liabilityContent")}</h3>
            <p>{t("impressum.liabilityContentText")}</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">{t("impressum.liabilityLinks")}</h3>
            <p>{t("impressum.liabilityLinksText")}</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">{t("impressum.copyright")}</h3>
            <p>{t("impressum.copyrightText")}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="dispute">
        <h2 id="dispute" className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
          {t("impressum.dispute")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{t("impressum.disputeText")}</p>
      </section>
    </article>
  )
}

function PrivacyContent() {
  const { t } = useLanguage()

  return (
    <article className="space-y-10">
      <header>
        <h1 id="modal-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {t("privacy.title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("privacy.subtitle")}</p>
        <p className="text-sm text-muted-foreground mt-2">{t("privacy.lastUpdated")}: Januar 2026</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.responsible.title")}</h2>
        <div className="bg-muted/30 rounded-xl p-6 border border-border">
          <address className="not-italic text-foreground leading-relaxed">
            <strong>Yasin Adam Aissani</strong><br />
            c/o Impressumservice Dein-Impressum<br />
            Stettiner Straße 41<br />
            35410 Hungen<br />
            Deutschland<br /><br />
            <span className="text-muted-foreground">{t("privacy.email")}:</span>{" "}
            <a href="mailto:info@naser.solutions" className="text-foreground hover:underline">info@naser.solutions</a><br />
            <span className="text-muted-foreground">{t("privacy.phone")}:</span>{" "}
            <a href="tel:+4917647757444" className="text-foreground hover:underline">+49 176 47757444</a>
          </address>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.overview.title")}</h2>
        <p className="text-muted-foreground leading-relaxed">{t("privacy.overview.text")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.legalBasis.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.legalBasis.text")}</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ms-4">
          <li>{t("privacy.legalBasis.consent")}</li>
          <li>{t("privacy.legalBasis.contract")}</li>
          <li>{t("privacy.legalBasis.legal")}</li>
          <li>{t("privacy.legalBasis.interest")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.hosting.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.hosting.text")}</p>
        <div className="bg-muted/30 rounded-xl p-6 border border-border">
          <p className="text-foreground font-medium mb-2">Vercel Inc.</p>
          <p className="text-muted-foreground text-sm">
            440 N Barranca Ave #4133<br />
            Covina, CA 91723<br />
            USA
          </p>
          <p className="text-muted-foreground text-sm mt-4">{t("privacy.hosting.dpa")}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.cookies.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.cookies.text")}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-start p-3 font-medium text-foreground">{t("privacy.cookies.name")}</th>
                <th className="text-start p-3 font-medium text-foreground">{t("privacy.cookies.purpose")}</th>
                <th className="text-start p-3 font-medium text-foreground">{t("privacy.cookies.duration")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 text-muted-foreground">theme</td>
                <td className="p-3 text-muted-foreground">{t("privacy.cookies.themeDesc")}</td>
                <td className="p-3 text-muted-foreground">1 {t("privacy.cookies.year")}</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 text-muted-foreground">language</td>
                <td className="p-3 text-muted-foreground">{t("privacy.cookies.langDesc")}</td>
                <td className="p-3 text-muted-foreground">1 {t("privacy.cookies.year")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.rights.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.rights.text")}</p>
        <dl className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <dt className="font-medium text-foreground mb-1">{t("privacy.rights.access")}</dt>
            <dd className="text-muted-foreground text-sm">{t("privacy.rights.accessDesc")}</dd>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <dt className="font-medium text-foreground mb-1">{t("privacy.rights.erasure")}</dt>
            <dd className="text-muted-foreground text-sm">{t("privacy.rights.erasureDesc")}</dd>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <dt className="font-medium text-foreground mb-1">{t("privacy.rights.portability")}</dt>
            <dd className="text-muted-foreground text-sm">{t("privacy.rights.portabilityDesc")}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.security.title")}</h2>
        <p className="text-muted-foreground leading-relaxed">{t("privacy.security.text")}</p>
      </section>
    </article>
  )
}

function TermsContent() {
  const { t } = useLanguage()

  return (
    <article className="space-y-10">
      <header>
        <h1 id="modal-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {t("agb.title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("agb.lastUpdated")}</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section1.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section1.p1")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section1.p2")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section2.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section2.p1")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section2.p2")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section3.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section3.p1")}</p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li>{t("agb.section3.list1")}</li>
          <li>{t("agb.section3.list2")}</li>
          <li>{t("agb.section3.list3")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section4.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section4.p1")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section4.p2")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section5.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section5.p1")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section5.p2")}</p>
      </section>

      <section className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.portfolio.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.portfolio.p1")}</p>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.portfolio.p2")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.portfolio.p3")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section6.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section6.p1")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section6.p2")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section7.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section7.p1")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section7.p2")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section8.title")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section8.p1")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section8.p2")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section9.title")}</h2>
        <p className="text-muted-foreground leading-relaxed">{t("agb.section9.p1")}</p>
      </section>
    </article>
  )
}
