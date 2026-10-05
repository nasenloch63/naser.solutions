import assert from 'node:assert/strict'
import { test } from 'node:test'
import { adminSessionIdentity, adminSessionNavigation } from '../lib/admin-session'

const admin = { id: 1, collection: 'users', role: 'admin' }
const client = { id: 2, collection: 'users', role: 'client' }
const publicPaths = ['/admin/login', '/admin/logout', '/admin/forgot', '/admin/reset', '/admin/unauthorized']
const next = (current: typeof admin | null, actual: typeof admin | null, pathname: string) => adminSessionNavigation(current, actual, pathname, publicPaths, '/admin/login')

test('old admin tabs stop presenting an authenticated dashboard after logout or a customer session replaces it', () => {
  assert.equal(next(admin, null, '/admin/collections/users/2'), 'login')
  assert.equal(next(admin, client, '/admin/collections/users/2'), 'login')
  assert.equal(next(admin, admin, '/admin/collections/users/2'), null)
  assert.equal(next(admin, { ...admin, id: 3 }, '/admin/collections/users/2'), 'reload')
  assert.equal(next(admin, { ...admin, role: 'editor' }, '/admin/collections/users/2'), 'reload')
})

test('signing in elsewhere refreshes stale login screens without interrupting logout or password recovery', () => {
  assert.equal(next(null, admin, '/admin/login'), 'reload')
  assert.equal(next(admin, admin, '/admin/login'), null)
  assert.equal(next(null, client, '/admin/login'), null)
  for (const path of ['/admin/logout', '/admin/forgot', '/admin/reset/token', '/admin/unauthorized']) assert.equal(next(admin, null, path), null)
  assert.equal(next(null, null, '/admin/login-extra'), 'login')
})

test('session identity comparison ignores refreshed tokens and expiry but detects role and account changes', () => {
  assert.equal(adminSessionIdentity(null), null)
  assert.equal(adminSessionIdentity(admin), adminSessionIdentity({ ...admin }))
  assert.notEqual(adminSessionIdentity(admin), adminSessionIdentity(client))
  assert.notEqual(adminSessionIdentity(admin), adminSessionIdentity({ ...admin, role: 'editor' }))
})
