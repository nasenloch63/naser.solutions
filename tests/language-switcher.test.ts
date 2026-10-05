import assert from 'node:assert/strict'
import { test } from 'node:test'
import { existsSync } from 'node:fs'
import { languages } from '../components/language-provider'
import { deviceLanguage, requestLanguage, resolveLanguage, supportedLanguages } from '../lib/language'
import { servicePricingCopy } from '../lib/service-pricing-copy'
import { cmsProjectCopy } from '../lib/cms-project-copy'
import { hazeChillProjectCopy } from '../lib/haze-chill-project-copy'
import { paymentServicesCopy } from '../lib/payment-services-copy'
import { uiCopy } from '../lib/ui-copy'

test('switcher lists every supported language once with a flag and requested order', () => {
  const order = languages.map(language => language.code)
  assert.deepEqual([...order].sort(), [...supportedLanguages].sort())
  assert.deepEqual(order.slice(order.indexOf('zh'), order.indexOf('hi') + 1), ['zh', 'ja', 'th', 'hi'])
  assert.equal(order[order.indexOf('el') - 1], 'uk')
  for (const language of languages) {
    assert.ok(existsSync(new URL(`../public/flags/${language.code}.png`, import.meta.url)))
  }
})

test('new locales support regional device tags, request preferences and manual overrides', () => {
  for (const locale of ['uk-UA', 'th-TH', 'hi-IN', 'ja-JP']) {
    const language = locale.split('-')[0]
    assert.equal(deviceLanguage([locale, 'en-US']), language)
    assert.equal(requestLanguage(`en;q=0.5,${locale};q=0.9`), language)
    assert.equal(resolveLanguage(['de-DE'], language), language)
  }
})

test('new locales include UI, project and pricing copy rather than falling back', () => {
  for (const catalog of [uiCopy, servicePricingCopy, cmsProjectCopy, hazeChillProjectCopy, paymentServicesCopy]) {
    for (const language of ['uk', 'th', 'hi', 'ja'] as const) {
      assert.deepEqual(Object.keys(catalog[language]).sort(), Object.keys(catalog.de).sort())
      assert.ok(Object.values(catalog[language]).every(value => typeof value === 'string' ? value.trim().length > 0 : value.length > 0))
    }
  }
})
