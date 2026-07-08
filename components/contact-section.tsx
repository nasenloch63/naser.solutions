"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { t } = useLanguage()

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        e.currentTarget.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontakt" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div>
            <p className="text-muted-foreground text-lg mb-4 tracking-wide uppercase">{t("contact.label")}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 text-balance">
              {t("contact.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">{t("contact.description")}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.email")}</p>
                  <a
                    href="mailto:nasen@webdigital.cloud"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    nasen@webdigital.cloud
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.phone")}</p>
                  <a href="tel:+4915560729886" className="text-foreground hover:text-primary transition-colors">
                    +49 15560 729886
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.location")}</p>
                  <p className="text-foreground">Kassel, Deutschland</p>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://wa.me/4915560729886"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white text-lg font-medium rounded-xl hover:bg-[#22c55e] transition-all hover:scale-[1.02] shadow-lg shadow-[#25D366]/25"
                >
                  <MessageCircle className="h-6 w-6" />
                  {t("contact.whatsapp")}
                </a>
              </div>
            </div>
          </div>

          <div
            className={`bg-secondary/30 p-8 lg:p-12 rounded-2xl transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">{t("contact.form.title")}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contact.form.name")}</Label>
                <Input id="name" name="name" placeholder={t("contact.form.namePlaceholder")} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.form.email")}</Label>
                <Input id="email" name="email" type="email" placeholder={t("contact.form.emailPlaceholder")} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                <Input id="phone" name="phone" type="tel" placeholder={t("contact.form.phonePlaceholder")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.form.message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
              </Button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-600 dark:text-green-400 text-sm text-center">
                    {t("contact.form.success")}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">
                    {t("contact.form.error")}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
