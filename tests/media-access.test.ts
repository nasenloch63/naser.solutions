import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { Media } from '../cms/collections'
import { privateDocumentNames } from '../cms/media-access'

test('anonymous visitors and customers cannot list the previously imported private documents', async () => {
  const read = Media.access!.read!
  for (const user of [null, { id: 1, role: 'client' }]) {
    const result = await read({ req: { user } } as Parameters<typeof read>[0])
    assert.equal(typeof result, 'object')
    const query = JSON.stringify(result)
    for (const name of privateDocumentNames) {
      assert.ok(query.includes(name))
      assert.ok(query.includes(`/documents/${name}`))
    }
    // A manually uploaded public image normally has no import sourcePath.
    assert.ok(query.includes('"exists":false'))
  }
})

test('CMS staff retain access to archived documents while direct file requests enforce media access', async () => {
  const read = Media.access!.read!
  for (const role of ['admin', 'editor']) {
    assert.equal(await read({ req: { user: { id: 1, role } } } as Parameters<typeof read>[0]), true)
  }
  const storage = readFileSync(new URL('../cms/media-storage.ts', import.meta.url), 'utf8')
  assert.match(storage, /req, overrideAccess: false/)
  assert.doesNotMatch(storage, /overrideAccess: true/)
  for (const size of ['thumbnail', 'card', 'hero']) assert.ok(storage.includes(`sizes.${size}.filename`))
})
