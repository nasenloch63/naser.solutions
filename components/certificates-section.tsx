import { Award, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { hexagonCertificate as certificate } from '@/lib/certificates'

export function CertificatesSection() {
  return (
    <section lang="de" dir="ltr" className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Zertifikate</h1>
      <article className="max-w-3xl rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8">
        <Award aria-hidden="true" className="mb-4 size-7" />
        <h2 lang="en" className="text-xl font-semibold sm:text-2xl">{certificate.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {certificate.issuer} · <time dateTime={certificate.date}>21. November 2026</time>
        </p>
        <p className="mt-5 max-w-prose leading-relaxed">{certificate.description}</p>
        <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
          In der Übung erkannte er eine riskante Änderung bei einer Codeprüfung und lehnte deren Übernahme ab.
          Die Bescheinigung bezieht sich auf diese einzelne Übung.
        </p>
        <Button asChild variant="outline" className="mt-6 min-h-11">
          <a href={certificate.pdfPath} target="_blank" rel="noopener noreferrer">
            Originalzertifikat öffnen (PDF)
            <ExternalLink aria-hidden="true" />
            <span className="sr-only">, öffnet in einem neuen Tab</span>
          </a>
        </Button>
      </article>
    </section>
  )
}
