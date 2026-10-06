import test from 'node:test'
import assert from 'node:assert/strict'
import { selectPortfolio, localizedText, type PortfolioProject } from '../lib/portfolio'
import { previewPortfolio } from '../lib/portfolio-preview-data'
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

test('all eight migrated projects retain their original translated copy and images', () => {
  assert.equal(previewPortfolio.length, 8)
  for (const project of previewPortfolio) {
    assert.ok(project.image)
    for (const language of supportedLanguages) {
      assert.ok(localizedText(project.title, language))
      assert.ok(localizedText(project.description, language))
      assert.ok(!localizedText(project.title, language).startsWith('projects.'))
    }
  }
  assert.equal(localizedText({ de: 'Fallback', en: 'English' }, 'en'), 'English')
  assert.equal(localizedText({ de: 'Fallback' }, 'ja'), 'Fallback')
})

test('public website media paths cannot address private customer attachments or arbitrary Blob objects', () => {
  assert.equal(mediaBlobPath('project.jpg'), 'cms/media/project.jpg')
  for (const filename of ['../client-feedback/private.pdf', 'client-feedback/private.pdf', '\\private.pdf', '', '..', '.']) assert.throws(() => mediaBlobPath(filename))
})
