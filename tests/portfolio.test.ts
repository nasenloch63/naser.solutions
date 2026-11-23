import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { selectPortfolio, localizedText, type PortfolioProject } from '../lib/portfolio'
import { previewPortfolio } from '../lib/portfolio-preview-data'
import { demoPartnerProjects, demoPartnerSectionCopy, isMovedDemoProject } from '../lib/demo-partner-projects'
import { isHazeChillKarteUrl } from '../lib/haze-chill-karte-project'
import { isWestfalenHelpUrl } from '../lib/westfalen-help-project'
import { supportedLanguages } from '../lib/language'
import { mediaBlobPath } from '../cms/media-storage'

test('portfolio selection uses only supplied records, respects order, and keeps the input unchanged', () => {
  const project = (id: number, order: number): PortfolioProject => ({ id, order, title: 'Project', description: 'Description', category: 'web', url: '/CMS', tags: [] })
  const input = [project(3, 20), project(2, 1), project(1, 1)]
  assert.deepEqual(selectPortfolio(input).map(project => project.id), [1, 2, 3])
  assert.deepEqual(selectPortfolio(input, [{ id: 3 }, 1, 999]).map(project => project.id), [1, 3])
  assert.deepEqual(input.map(project => project.id), [3, 2, 1])
  assert.deepEqual(selectPortfolio([], [999]), [])
})

test('portfolio previews retain translated copy and images, including CustomOS QRcode_expo, Westfalen Help and Kassel United', () => {
  assert.equal(previewPortfolio.length, 8)
  assert.equal(previewPortfolio.some(project => project.url.includes('crypto-news')), false)
  assert.equal(previewPortfolio.some(project => isMovedDemoProject(String(project.id), project.url)), false)
  const kasselUnited = previewPortfolio.find(project => project.id === 'kassel-united')
  assert.equal(kasselUnited?.url, 'https://www.kassel-united.de/')
  assert.equal(kasselUnited?.category, 'web')
  const westfalenHelp = previewPortfolio.find(project => project.id === 'westfalen-help')
  assert.equal(westfalenHelp?.url, 'https://www.westfalenhelp.de/')
  assert.equal(westfalenHelp?.category, 'web')
  assert.equal(westfalenHelp?.partner?.url, 'https://www.dovare.de/')
  assert.equal(isWestfalenHelpUrl('https://www.westfalenhelp.de/'), true)
  assert.equal(isWestfalenHelpUrl('https://westfalenhelp.de'), true)
  assert.equal(isWestfalenHelpUrl('https://www.dovare.de/'), false)
  const hazeKarte = previewPortfolio.find(project => project.id === 'haze-chill-karte')
  assert.equal(hazeKarte?.url, 'https://haze-chill-karte.vercel.app/')
  assert.equal(hazeKarte?.category, 'gastro')
  assert.equal(hazeKarte?.featured, true)
  assert.equal(hazeKarte?.secondaryLink?.url, 'https://github.com/nasenloch63/qr_card_expo')
  assert.equal(isHazeChillKarteUrl('https://haze-chill-karte.vercel.app/'), true)
  assert.equal(isHazeChillKarteUrl('https://karte.haze-chill.com/'), true)
  assert.equal(isHazeChillKarteUrl('https://www.haze-chill.com/'), false)
  for (const project of previewPortfolio) {
    assert.ok(project.image)
    assert.ok(existsSync(new URL(`../public${project.image}`, import.meta.url)))
    for (const language of supportedLanguages) {
      assert.ok(localizedText(project.title, language))
      assert.ok(localizedText(project.description, language))
      assert.ok(!localizedText(project.title, language).startsWith('projects.'))
    }
  }
  assert.equal(localizedText({ de: 'Fallback', en: 'English' }, 'en'), 'English')
  assert.equal(localizedText({ de: 'Fallback' }, 'ja'), 'Fallback')
})

test('demo sites and partner grid retains all entries, assets, and translations', () => {
  assert.deepEqual(
    demoPartnerProjects.map(project => project.url),
    [
      'https://kvp-helsa.dovare.de/',
      'https://verdi-beta.vercel.app/',
      'https://v0-tylers-designerz-website.vercel.app/',
      'https://v0-luxury-street-chic-website.vercel.app/',
      'https://v0-donation-website-for-al-salam.vercel.app/',
      'https://www.dovare.de/',
      'https://www.nextstepagency.de/',
    ],
  )
  assert.equal(isMovedDemoProject('awd-shop', ''), true)
  assert.equal(isMovedDemoProject('', 'https://v0-donation-website-for-al-salam.vercel.app/'), true)
  assert.equal(isMovedDemoProject('kassel-united', 'https://www.kassel-united.de/'), false)
  assert.equal(demoPartnerProjects.find(project => project.id === 'kvp-helsa')?.partner?.url, 'https://www.dovare.de/')
  for (const language of supportedLanguages) {
    assert.ok(demoPartnerSectionCopy[language].heading.trim())
    assert.ok(demoPartnerSectionCopy[language].description.trim())
    assert.ok(demoPartnerSectionCopy[language].collaborationLabel.trim())
  }
  for (const project of demoPartnerProjects) {
    assert.ok(existsSync(new URL(`../public${project.image}`, import.meta.url)))
    for (const language of supportedLanguages) {
      assert.ok(localizedText(project.title, language))
      assert.ok(localizedText(project.description, language))
      assert.ok(localizedText(project.badge, language))
    }
  }
})

test('public website media paths cannot address private customer attachments or arbitrary Blob objects', () => {
  assert.equal(mediaBlobPath('project.jpg'), 'cms/media/project.jpg')
  for (const filename of ['../client-feedback/private.pdf', 'client-feedback/private.pdf', '\\private.pdf', '', '..', '.']) assert.throws(() => mediaBlobPath(filename))
})
