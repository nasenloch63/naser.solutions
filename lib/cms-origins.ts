// Both public domains serve this CMS; browser mutations send their current origin.
const productionOrigins = [
  'https://www.naser.solutions',
  'https://naser.solutions',
  'https://www.naser-solutions.de',
  'https://naser-solutions.de',
]

export function cmsOrigins(serverURL: string): string[] {
  const configuredURL = new URL(serverURL)
  if (!['https:', 'http:'].includes(configuredURL.protocol)) {
    throw new Error('The CMS server URL must use HTTP or HTTPS.')
  }
  return [...new Set([...productionOrigins, configuredURL.origin])]
}
