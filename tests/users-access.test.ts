import assert from 'node:assert/strict'
import { test } from 'node:test'
import { Users } from '../cms/collections'

test('only administrators can create accounts or reset other users credentials', async () => {
  const create = Users.access!.create!
  const update = Users.access!.update!
  for (const user of [null, { id: 2, role: 'editor' }]) {
    assert.equal(await create({ req: { user } } as Parameters<typeof create>[0]), false)
    assert.equal(await update({ req: { user } } as Parameters<typeof update>[0]), false)
  }
  const req = { user: { id: 1, role: 'admin' } }
  assert.equal(await create({ req } as Parameters<typeof create>[0]), true)
  assert.equal(await update({ req } as Parameters<typeof update>[0]), true)
})

test('customers may update their own account while role assignment remains admin-only', async () => {
  const update = Users.access!.update!
  assert.deepEqual(await update({ req: { user: { id: 3, role: 'client' } } } as Parameters<typeof update>[0]), { id: { equals: 3 } })
  const role = Users.fields.find(field => 'name' in field && field.name === 'role')!
  assert.ok('access' in role && role.access)
  const createRole = role.access.create!
  const updateRole = role.access.update!
  for (const role of ['editor', 'client']) {
    const req = { user: { id: 2, role } }
    assert.equal(await createRole({ req } as Parameters<typeof createRole>[0]), false)
    assert.equal(await updateRole({ req } as Parameters<typeof updateRole>[0]), false)
  }
})
