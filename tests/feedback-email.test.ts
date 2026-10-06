import { test } from 'node:test'
import assert from 'node:assert/strict'
import { feedbackEmail } from '../lib/feedback-email'

test('feedback notification goes only to owner and links protected attachments through CMS', () => {
  const mail = feedbackEmail({ projectId: 2, projectName: 'Joe’s Garage\r\nInjected', customerName: 'Sladi', customerEmail: 'customer@example.com', feedback: 'Bitte das Logo ändern.', attachments: [{ name: 'logo.png' }] })
  assert.equal(mail.to, 'info@naser-solutions.de')
  assert.equal(mail.from, mail.to)
  assert.doesNotMatch(mail.subject, /[\r\n]/)
  assert.match(mail.text, /Bitte das Logo ändern/)
  assert.match(mail.text, /logo.png/)
  assert.match(mail.text, /https:\/\/www.naser-solutions.de\/admin\/collections\/client-projects\/2/)
  assert.doesNotMatch(mail.text, /blobPath|private\.blob/)
})
