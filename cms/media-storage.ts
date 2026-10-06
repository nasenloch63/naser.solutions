import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import { del, get, put } from '@vercel/blob'

const prefix = 'cms/media'
export function mediaBlobPath(filename: string) {
  if (!filename || filename.includes('/') || filename.includes('\\') || filename === '.' || filename === '..') throw new Error('Invalid media filename')
  return `${prefix}/${filename}`
}

// Website media are public through Payload. Customer attachments use a separate,
// private namespace and are never served by this adapter.
const adapter: Adapter = () => ({
  name: 'naser-private-blob',
  async handleUpload({ file }) {
    await put(mediaBlobPath(file.filename), file.buffer, {
      access: 'private', contentType: file.mimeType, addRandomSuffix: false,
      allowOverwrite: true, token: process.env.BLOB_READ_WRITE_TOKEN,
    })
  },
  async handleDelete({ filename }) {
    await del(mediaBlobPath(filename), { token: process.env.BLOB_READ_WRITE_TOKEN })
  },
  async staticHandler(req, { params }) {
    let path: string
    try { path = mediaBlobPath(params.filename) } catch { return new Response('Invalid filename', { status: 400 }) }
    const document = await req.payload.find({ collection: 'media', depth: 0, limit: 1, overrideAccess: true, where: { or: ['filename', 'sizes.thumbnail.filename', 'sizes.card.filename', 'sizes.hero.filename'].map(field => ({ [field]: { equals: params.filename } })) } })
    if (!document.docs.length) return new Response('Not found', { status: 404 })
    const result = await get(path, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN })
    if (!result || result.statusCode !== 200) return new Response('Not found', { status: 404 })
    return new Response(result.stream, { headers: {
      'Content-Type': result.blob.contentType,
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; sandbox",
    } })
  },
})

export const websiteMediaStorage = cloudStoragePlugin({
  enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  alwaysInsertFields: true,
  collections: { media: { adapter, prefix, disableLocalStorage: Boolean(process.env.BLOB_READ_WRITE_TOKEN) } },
})
