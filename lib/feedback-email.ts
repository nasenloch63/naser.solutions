import nodemailer from 'nodemailer'

export type FeedbackNotification = {
  projectId: string | number
  projectName: string
  customerName: string
  customerEmail: string
  feedback: string
  attachments: { name: string }[]
}

export function feedbackEmail(data: FeedbackNotification) {
  const subjectName = data.projectName.replace(/[\r\n]/g, ' ').slice(0, 150)
  return {
    from: 'info@naser-solutions.de',
    to: 'info@naser-solutions.de',
    subject: `Neuer Änderungswunsch: ${subjectName}`,
    text: [
      `Projekt: ${data.projectName}`,
      `Kunde: ${data.customerName}`,
      `E-Mail: ${data.customerEmail}`,
      '', 'Änderungswunsch:', data.feedback || '(Nur Anhänge eingereicht)',
      '', `Neue Anhänge: ${data.attachments.length}`,
      ...data.attachments.map(file => `- ${file.name}`),
      '', 'Änderungswunsch und geschützte Anhänge im CMS öffnen:',
      `https://www.naser-solutions.de/admin/collections/client-projects/${encodeURIComponent(String(data.projectId))}`,
    ].join('\n'),
  }
}

export async function sendFeedbackNotification(data: FeedbackNotification) {
  const password = process.env.STRATO_SMTP_PASSWORD
  if (!password) throw new Error('SMTP configuration unavailable')
  const transport = nodemailer.createTransport({
    host: 'smtp.strato.de', port: 465, secure: true,
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    auth: { user: 'info@naser-solutions.de', pass: password },
  })
  try {
    const result = await transport.sendMail(feedbackEmail(data))
    if (!result.accepted?.length) throw new Error('SMTP did not accept notification')
  } finally {
    transport.close()
  }
}
