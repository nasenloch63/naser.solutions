"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { LegalModalProvider } from "@/components/legal-modal-provider"

export default function ImpressumPage() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <LegalModalProvider>
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Header */}
            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
                {t("impressum.title")}
              </h1>
              <p className="text-lg text-muted-foreground">{t("impressum.subtitle")}</p>
            </header>

            {/* Content */}
            <article className="space-y-10">
              {/* Company Information */}
              <section aria-labelledby="company-info">
                <h2
                  id="company-info"
                  className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2"
                >
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

              {/* Contact */}
              <section aria-labelledby="contact-info">
                <h2
                  id="contact-info"
                  className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2"
                >
                  {t("impressum.contact")}
                </h2>
                <dl className="space-y-3 text-muted-foreground">
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-medium text-foreground min-w-[100px]">{t("impressum.email")}:</dt>
                    <dd>
                      <a
                        href="mailto:nasen@webdigital.cloud"
                        className="hover:text-foreground transition-colors underline underline-offset-4"
                      >
                        nasen@webdigital.cloud
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-medium text-foreground min-w-[100px]">{t("impressum.phone")}:</dt>
                    <dd>
                      <a
                        href="tel:+4915560729886"
                        className="hover:text-foreground transition-colors underline underline-offset-4"
                      >
                        +49 15560 729886
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-medium text-foreground min-w-[100px]">{t("impressum.website")}:</dt>
                    <dd>
                      <a
                        href="https://naser.solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors underline underline-offset-4"
                      >
                        naser.solutions
                      </a>
                    </dd>
                  </div>
                </dl>
              </section>

              {/* Responsible for Content */}
              <section aria-labelledby="responsible">
                <h2 id="responsible" className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                  {t("impressum.responsible")}
                </h2>
                <p className="text-muted-foreground">Yasin Adam Aissani</p>
              </section>

              {/* Disclaimer */}
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

              {/* Dispute Resolution */}
              <section aria-labelledby="dispute">
                <h2 id="dispute" className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                  {t("impressum.dispute")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t("impressum.disputeText")}</p>
              </section>
            </article>

            {/* Back Link */}
            <div className="mt-12 pt-8 border-t border-border">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t("impressum.backHome")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </LegalModalProvider>
  )
}
