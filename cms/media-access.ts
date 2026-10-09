import type { Where } from 'payload'

// These private documents were previously imported as public website media.
export const privateDocumentNames = [
  'cw-yasin-2026.pdf',
  'frankenlandschule-zeugnis.jpeg',
  'mittlere-reife-woerth.jpeg',
]

export function websiteMediaRead(user: { role?: string } | null | undefined): true | Where {
  if (user?.role === 'admin' || user?.role === 'editor') return true

  return {
    and: [
      { filename: { not_in: privateDocumentNames } },
      { or: [
        { sourcePath: { exists: false } },
        { sourcePath: { not_in: privateDocumentNames.map(name => `/documents/${name}`) } },
      ] },
    ],
  }
}
