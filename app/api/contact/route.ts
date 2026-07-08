import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Send email notification to business owner
    await transporter.sendMail({
      from: `"Naser Solutions Website" <${process.env.SMTP_USER}>`,
      to: "nasen@webdigital.cloud",
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #111827; font-size: 24px; font-weight: bold; margin: 0;">Neue Kontaktanfrage</h1>
                <p style="color: #6b7280; font-size: 14px; margin-top: 8px;">via naser.solutions</p>
              </div>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 100px;">Name:</td>
                    <td style="padding: 12px 0; color: #111827; font-size: 14px; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">E-Mail:</td>
                    <td style="padding: 12px 0;">
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-size: 14px;">${email}</a>
                    </td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Telefon:</td>
                    <td style="padding: 12px 0;">
                      <a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-size: 14px;">${phone}</a>
                    </td>
                  </tr>
                  ` : ""}
                </table>
              </div>
              
              <div style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 24px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px 0;">Nachricht:</p>
                <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px;">
                  <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #111827; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500;">Antworten</a>
              </div>
            </div>
            
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 24px;">
              Diese E-Mail wurde automatisch von naser.solutions gesendet.
            </p>
          </body>
        </html>
      `,
    })

    // Note: Confirmation emails to senders are disabled because the SMTP server IP
    // is blocklisted by some email providers (Microsoft/Outlook), causing bounce-backs.
    // The main notification to nasen@webdigital.cloud works fine.

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
