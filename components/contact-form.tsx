"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import type { ContactFormResponse } from "@/lib/contact-form"

export function ContactForm() {
  const { t } = useLanguage()
  const submitting = useRef(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    submitting.current = true
    setStatus("loading")
    const data = Object.fromEntries(new FormData(form))
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
            <Input id="contact-name" name="name" autoComplete="name" required maxLength={120} pattern=".*\S.*" placeholder={t("contact.form.namePlaceholder")} />
          </div>
          <div className="space-y-2 min-w-0">
            <Label htmlFor="contact-email">{t("contact.form.email")}</Label>
            <Input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={t("contact.form.emailPlaceholder")} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">{t("contact.form.phone")}</Label>
          <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={60} placeholder={t("contact.form.phonePlaceholder")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">{t("contact.form.message")}</Label>
          <Textarea id="contact-message" name="message" required maxLength={5000} rows={3} className="min-h-24 resize-y" placeholder={t("contact.form.messagePlaceholder")} />
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" autoComplete="off" tabIndex={-1} />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{t("contact.form.privacy")} <Link href="/datenschutz" className="underline underline-offset-2">{t("footer.privacy")}</Link></p>
        <Button type="submit" className="w-full min-h-11 h-auto whitespace-normal py-3" disabled={status === "loading"}>
          {status === "loading" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4 rtl-flip" aria-hidden="true" />}
          {t(status === "loading" ? "contact.form.sending" : "contact.form.submit")}
        </Button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {status === "success" && <p role="status" className="text-sm text-green-700 dark:text-green-400">{t("contact.form.success")}</p>}
        {status === "error" && <p role="alert" className="text-sm text-red-700 dark:text-red-400">{t("contact.form.error")} <a href="mailto:info@naser-solutions.de" className="underline">info@naser-solutions.de</a></p>}
      </div>
    </form>
  )
}
