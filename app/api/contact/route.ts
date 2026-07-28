import nodemailer from "nodemailer"
import type { ContactFormResponse } from "@/lib/contact-form"

const SUCCESS_MESSAGE = "Kontaktanfrage erfolgreich! Wir melden uns schnellstmöglich bei dir."
const ERROR_MESSAGE = "Ein Fehler ist aufgetreten. Bitte versuche es erneut oder kontaktiere uns direkt."

function jsonResponse(data: ContactFormResponse, status: number) {
  return Response.json(data, { status })
}

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
      return jsonResponse({ success: true, message: SUCCESS_MESSAGE }, 200)
    }

    const name = normalize(body.name)
    const email = normalize(body.email).toLowerCase()
    const phone = normalize(body.phone)
    const message = normalize(body.message)

    // Validation
    if (!name || name.length > 120) {
      return jsonResponse({ success: false, message: ERROR_MESSAGE }, 400)
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return jsonResponse({ success: false, message: ERROR_MESSAGE }, 400)
    }

    if (!message || message.length > 5000) {
      return jsonResponse({ success: false, message: ERROR_MESSAGE }, 400)
    }

    const password = process.env.STRATO_SMTP_PASSWORD
    if (!password) {
      return jsonResponse({ success: false, message: ERROR_MESSAGE }, 500)
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

    return jsonResponse({ success: true, message: SUCCESS_MESSAGE }, 200)
  } catch {
    return jsonResponse({ success: false, message: ERROR_MESSAGE }, 500)
  }
}
