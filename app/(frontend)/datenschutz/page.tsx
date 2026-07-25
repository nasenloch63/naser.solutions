"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalModalProvider } from "@/components/legal-modal-provider"

export default function DatenschutzPage() {
  const { t, isRTL } = useLanguage()

  return (
    <LegalModalProvider>
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 dark:text-glow-strong">
              {t("privacy.title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("privacy.subtitle")}</p>
            <p className="text-sm text-muted-foreground mt-2">{t("privacy.lastUpdated")}: Januar 2026</p>
          </header>

          {/* Section 1: Responsible Party */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">
              {t("privacy.responsible.title")}
            </h2>
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <address className="not-italic text-foreground leading-relaxed">
                <strong>Yasin Adam Aissani</strong>
                <br />
                c/o Impressumservice Dein-Impressum
                <br />
                Stettiner Straße 41
                <br />
                35410 Hungen
                <br />
                Deutschland
                <br />
                <br />
                <span className="text-muted-foreground">{t("privacy.email")}:</span>{" "}
                <a href="mailto:info@naser.solutions" className="text-foreground hover:underline">
                  info@naser.solutions
                </a>
                <br />
                <span className="text-muted-foreground">{t("privacy.phone")}:</span>{" "}
                <a href="tel:+4917647757444" className="text-foreground hover:underline">
                  +49 176 47757444
                </a>
              </address>
            </div>
          </section>

          {/* Section 2: Overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">
              {t("privacy.overview.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.overview.text")}</p>
          </section>

          {/* Section 3: Legal Basis */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">
              {t("privacy.legalBasis.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.legalBasis.text")}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ms-4">
              <li>{t("privacy.legalBasis.consent")}</li>
              <li>{t("privacy.legalBasis.contract")}</li>
              <li>{t("privacy.legalBasis.legal")}</li>
              <li>{t("privacy.legalBasis.interest")}</li>
            </ul>
          </section>

          {/* Section 4: Hosting */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">{t("privacy.hosting.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.hosting.text")}</p>
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <p className="text-foreground font-medium mb-2">Vercel Inc.</p>
              <p className="text-muted-foreground text-sm">
                440 N Barranca Ave #4133
                <br />
                Covina, CA 91723
                <br />
                USA
              </p>
              <p className="text-muted-foreground text-sm mt-4">{t("privacy.hosting.dpa")}</p>
            </div>
          </section>

          {/* Section 5: Logfiles */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">
              {t("privacy.logfiles.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.logfiles.text")}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ms-4">
              <li>{t("privacy.logfiles.ip")}</li>
              <li>{t("privacy.logfiles.datetime")}</li>
              <li>{t("privacy.logfiles.browser")}</li>
              <li>{t("privacy.logfiles.os")}</li>
              <li>{t("privacy.logfiles.referrer")}</li>
              <li>{t("privacy.logfiles.pages")}</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">{t("privacy.logfiles.purpose")}</p>
          </section>

          {/* Section 6: Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">{t("privacy.cookies.title")}</h2>
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
            <p className="text-muted-foreground leading-relaxed mt-4">{t("privacy.cookies.settings")}</p>
          </section>

          {/* Section 7: Contact Form */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">{t("privacy.contact.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.contact.text")}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ms-4">
              <li>{t("privacy.contact.name")}</li>
              <li>{t("privacy.contact.emailData")}</li>
              <li>{t("privacy.contact.phoneData")}</li>
              <li>{t("privacy.contact.message")}</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">{t("privacy.contact.storage")}</p>
          </section>

          {/* Section 8: Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">{t("privacy.rights.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.rights.text")}</p>
            <dl className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <dt className="font-medium text-foreground mb-1">{t("privacy.rights.access")}</dt>
                <dd className="text-muted-foreground text-sm">{t("privacy.rights.accessDesc")}</dd>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <dt className="font-medium text-foreground mb-1">{t("privacy.rights.rectification")}</dt>
                <dd className="text-muted-foreground text-sm">{t("privacy.rights.rectificationDesc")}</dd>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <dt className="font-medium text-foreground mb-1">{t("privacy.rights.erasure")}</dt>
                <dd className="text-muted-foreground text-sm">{t("privacy.rights.erasureDesc")}</dd>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <dt className="font-medium text-foreground mb-1">{t("privacy.rights.restriction")}</dt>
                <dd className="text-muted-foreground text-sm">{t("privacy.rights.restrictionDesc")}</dd>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <dt className="font-medium text-foreground mb-1">{t("privacy.rights.portability")}</dt>
                <dd className="text-muted-foreground text-sm">{t("privacy.rights.portabilityDesc")}</dd>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <dt className="font-medium text-foreground mb-1">{t("privacy.rights.objection")}</dt>
                <dd className="text-muted-foreground text-sm">{t("privacy.rights.objectionDesc")}</dd>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <dt className="font-medium text-foreground mb-1">{t("privacy.rights.complaint")}</dt>
                <dd className="text-muted-foreground text-sm">{t("privacy.rights.complaintDesc")}</dd>
              </div>
            </dl>
          </section>

          {/* Section 9: Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">
              {t("privacy.security.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{t("privacy.security.text")}</p>
          </section>

          {/* Section 10: Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4 dark:text-glow">{t("privacy.changes.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("privacy.changes.text")}</p>
          </section>

          {/* Back Link */}
          <div className="pt-8 border-t border-border">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              {t("privacy.backHome")}
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
    </LegalModalProvider>
  )
}
