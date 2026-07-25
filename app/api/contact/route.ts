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

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactRequest

    // Spam-Check
    if (normalize(body.website)) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const name = normalize(body.name)
    const email = normalize(body.email).toLowerCase()
    const phone = normalize(body.phone)
    const message = normalize(body.message)

    // Validation
    if (!name || name.length > 120) {
      return NextResponse.json(
        { success: false, error: "Bitte gib einen gültigen Namen ein." },
        { status: 400 }
      )
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      )
    }

    if (!message || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Bitte gib eine gültige Nachricht ein." },
        { status: 400 }
      )
    }

    const password = process.env.STRATO_SMTP_PASSWORD
    if (!password) {
      console.error("[v0] STRATO_SMTP_PASSWORD not set")
      return NextResponse.json(
        { success: false, error: "E-Mail-Versand ist nicht konfiguriert." },
        { status: 503 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: password,
      },
    })

    // Send email
    await transporter.sendMail({
      from: `${SMTP_USER}`,
      to: SMTP_USER,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "Nicht angegeben"}\n\nNachricht:\n${message}`,
    })

    transporter.close()

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json(
      { success: false, error: "Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut." },
      { status: 500 }
    )
  }
}
