import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/seo'

// Bundled image/font assets require the Node runtime.
export const runtime = 'nodejs'

let assets: Promise<{ logo: string; portrait: string; font: ArrayBuffer }> | undefined

function getAssets() {
  return assets ??= Promise.all([
    readFile(join(process.cwd(), 'public/images/logo-invertable.png')),
    readFile(join(process.cwd(), 'public/images/yasin-adam-aissani-2026.jpg')),
    readFile(join(process.cwd(), 'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf')),
  ]).then(([logo, portrait, font]) => ({
    logo: `data:image/png;base64,${logo.toString('base64')}`,
    portrait: `data:image/jpeg;base64,${portrait.toString('base64')}`,
    font: new Uint8Array(font).buffer,
  }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const { logo, portrait, font } = await getAssets()
  const isAbout = slug?.join('/') === 'ueber-uns'

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: '48px 64px', background: '#ffffff', color: '#202020', fontFamily: 'Geist', alignItems: 'center', justifyContent: 'center', gap: 100 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <img src={logo} width={440} height={440} alt={`${SITE_NAME} Original-Logo`} />
          <div style={{ display: 'flex', fontSize: 24, color: '#555555' }}>Webagentur aus Kassel</div>
        </div>
        {isAbout && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <img src={portrait} width={320} height={426} alt="Yasin Adam Aissani" style={{ objectFit: 'contain' }} />
            <div style={{ display: 'flex', fontSize: 24 }}>Yasin Adam Aissani · Gründer</div>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Geist', data: font, weight: 400, style: 'normal' }],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800' },
    },
  )
}
