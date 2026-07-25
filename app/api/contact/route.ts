import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const SMTP_HOST = "smtp.strato.de"
const SMTP_PORT = 465
const SMTP_USER = "info@naser-solutions.de"

interface ContactRequest {
  name?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
  website?: unknown
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactRequest

    if (normalize(data.website)) {
      return NextResponse.json({ success: true })
    }

    const name = normalize(data.name)
    const email = normalize(data.email).toLowerCase()
    const phone = normalize(data.phone)
    const message = normalize(data.message)

    if (!name || name.length > 120 || !message || message.length > 5000) {
      return NextResponse.json({ error: "Bitte überprüfe deine Eingaben." }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }, { status: 400 })
    }

    const smtpPassword = process.env.STRATO_SMTP_PASSWORD
    if (!smtpPassword) {
      return NextResponse.json({ error: "E-Mail-Versand ist momentan nicht konfiguriert." }, { status: 503 })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: { user: SMTP_USER, pass: smtpPassword },
    })

    await transporter.sendMail({
      from: `Naser Solutions Kontaktformular <${SMTP_USER}>`,
      to: SMTP_USER,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "Nicht angegeben"}\n\nNachricht:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut." },
      { status: 500 },
    )
  }
}
