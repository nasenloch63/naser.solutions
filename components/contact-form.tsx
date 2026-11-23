"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "@/components/site-link"
import { ArrowRight, Check, LoaderCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import {
  contactServiceLabel,
  contactServiceOptions,
  contactServicesHeading,
  type ContactFormResponse,
  type ContactServiceId,
} from "@/lib/contact-form"

export function ContactForm() {
  const { language, t } = useLanguage()
  const submitting = useRef(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [selectedServices, setSelectedServices] = useState<ContactServiceId[]>([])

  function toggleService(id: ContactServiceId) {
    setSelectedServices(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id],
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    submitting.current = true
    setStatus("loading")
    const data = {
      ...Object.fromEntries(new FormData(form)),
      services: selectedServices,
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(30000),
      })
      const result = (await response.json()) as ContactFormResponse
      if (!response.ok || result.success !== true) throw new Error("Contact request failed")
      form.reset()
      setSelectedServices([])
      setStatus("success")
    } catch {
      setStatus("error")
    } finally {
      submitting.current = false
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={status === "loading"} className="space-y-4">
      <fieldset disabled={status === "loading"} className="space-y-4 min-w-0">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 min-w-0">
            <Label htmlFor="contact-name">{t("contact.form.name")}</Label>
            <Input id="contact-name" name="name" className="h-11 text-base md:text-base" autoComplete="name" enterKeyHint="next" required maxLength={120} pattern=".*\S.*" placeholder={t("contact.form.namePlaceholder")} />
          </div>
          <div className="space-y-2 min-w-0">
            <Label htmlFor="contact-email">{t("contact.form.email")}</Label>
            <Input id="contact-email" name="email" type="email" className="h-11 text-base md:text-base" autoComplete="email" autoCapitalize="none" spellCheck={false} enterKeyHint="next" required maxLength={254} placeholder={t("contact.form.emailPlaceholder")} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">{t("contact.form.phone")}</Label>
          <Input id="contact-phone" name="phone" type="tel" className="h-11 text-base md:text-base" autoComplete="tel" enterKeyHint="next" maxLength={60} placeholder={t("contact.form.phonePlaceholder")} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label asChild>
              <span>{contactServicesHeading(language)}</span>
            </Label>
            {selectedServices.length > 0 && (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-foreground px-2 py-0.5 text-[11px] font-semibold tabular-nums text-background">
                {selectedServices.length}
              </span>
            )}
          </div>
          <div role="group" aria-label={contactServicesHeading(language)} className="flex flex-wrap gap-1.5 sm:gap-2">
            {contactServiceOptions.map(option => {
              const checked = selectedServices.includes(option.id)
              return (
                <label
                  key={option.id}
                  className={`inline-flex min-h-9 cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm transition-[border-color,background-color,color,transform] duration-200 active:scale-[0.96] focus-within:outline-2 focus-within:outline-offset-2 ${
                    checked
                      ? "border-foreground bg-foreground/12 text-foreground font-medium"
                      : "border-border/80 bg-background/55 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={option.id}
                    checked={checked}
                    onChange={() => toggleService(option.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      checked
                        ? "scale-100 border-foreground bg-foreground text-background"
                        : "scale-95 border-muted-foreground/50 bg-transparent"
                    }`}
                  >
                    <Check
                      className={`size-2.5 stroke-[3] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                    />
                  </span>
                  <span>{contactServiceLabel(language, option.id)}</span>
                </label>
              )
            })}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">{t("contact.form.message")}</Label>
          <Textarea id="contact-message" name="message" required maxLength={5000} rows={3} className="min-h-20 resize-y text-base md:text-base" placeholder={t("contact.form.messagePlaceholder")} />
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" autoComplete="off" tabIndex={-1} />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{t("contact.form.privacy")} <Link href="/datenschutz" className="underline underline-offset-2">{t("footer.privacy")}</Link></p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="glossy-pill group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 whitespace-normal px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {status === "loading" ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4 rtl-flip transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          )}
          {t(status === "loading" ? "contact.form.sending" : "contact.form.submit")}
        </button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {status === "success" && <p role="status" className="text-sm text-green-700 dark:text-green-400">{t("contact.form.success")}</p>}
        {status === "error" && <p role="alert" className="text-sm text-red-700 dark:text-red-400">{t("contact.form.error")} <a href="mailto:info@naser-solutions.de" className="underline">info@naser-solutions.de</a></p>}
      </div>
    </form>
  )
}
