"use client"

import { useLanguage } from "@/components/language-provider"
import { FileText } from "lucide-react"

export default function AGBPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("agb.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("agb.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("agb.lastUpdated")}</p>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section1.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section1.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section1.p2")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section2.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section2.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section2.p2")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section3.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section3.p1")}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>{t("agb.section3.list1")}</li>
              <li>{t("agb.section3.list2")}</li>
              <li>{t("agb.section3.list3")}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section4.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section4.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section4.p2")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section5.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section5.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section5.p2")}</p>
          </section>

          <section className="mb-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.portfolio.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.portfolio.p1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.portfolio.p2")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.portfolio.p3")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section6.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section6.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section6.p2")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section7.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section7.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section7.p2")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section8.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("agb.section8.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section8.p2")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("agb.section9.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("agb.section9.p1")}</p>
          </section>
        </article>
      </div>
    </main>
  )
}
