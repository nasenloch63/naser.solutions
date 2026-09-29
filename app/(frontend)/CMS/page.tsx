import type { Metadata } from "next"
import { CMSProjectPage } from "@/components/cms-project-page"
import { absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "CMS & Kunden-Dashboard",
  description: "Open Source verständlich erklärt: Naser Solutions entwickelt ein CMS-Dashboard, mit dem Kunden kleine Website-Änderungen selbst vornehmen können.",
  alternates: { canonical: absoluteUrl("/CMS") },
  openGraph: {
    title: "CMS & Kunden-Dashboard | Naser Solutions",
    description: "Einblicke in das CMS-Projekt und die geplante selbstständige Pflege deiner Website.",
    url: absoluteUrl("/CMS"),
  },
}

export default function Page() {
  return <CMSProjectPage />
}
