import assert from 'node:assert/strict'
import { test } from 'node:test'
import { supportedLanguages } from '../lib/language'
import { portalCopy, portalStatusKeys, type FeedbackMessage } from '../lib/portal-copy'

test('every website language has complete portal, login and feedback translations', () => {
  assert.deepEqual(Object.keys(portalCopy).sort(), [...supportedLanguages].sort())
  for (const language of supportedLanguages) {
    assert.deepEqual(Object.keys(portalCopy[language]).sort(), Object.keys(portalCopy.de).sort())
    assert.ok(Object.values(portalCopy[language]).every(value => value.trim().length > 0))
    if (language !== 'de') assert.notEqual(portalCopy[language].description, portalCopy.de.description)
  }
})

test('project states and server feedback outcomes have a message in every language', () => {
  const feedbackMessages: FeedbackMessage[] = ['invalidFeedback', 'feedbackTooLong', 'sessionExpired', 'saved', 'saveError']
  for (const language of supportedLanguages) {
    for (const key of [...Object.values(portalStatusKeys), ...feedbackMessages]) assert.ok(portalCopy[language][key])
  }
})
