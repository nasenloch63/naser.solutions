import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getPageBySlug } from '@/lib/cms'
import { SHARE_PAGES, SITE_NAME, SITE_URL } from '@/lib/seo'

// CMS access and bundled image/font assets require the Node runtime.
export const runtime = 'nodejs'

let assets: Promise<{ logo: string; portrait: string; font: ArrayBuffer }> | undefined

function getAssets() {
  return assets ??= Promise.all([
    readFile(join(process.cwd(), 'public/images/inverted-20logo-20png.png')),
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
  const path = slug?.length ? `/${slug.join('/')}` : '/'
  let card = SHARE_PAGES[path]

  if (!card) {
    const page = await getPageBySlug(slug!.join('/'))
    if (!page) return new Response('Not found', { status: 404 })
    card = {
      title: page.seo?.title || `${page.title} | ${SITE_NAME}`,
      description: page.seo?.description || `${page.title} – digitale Lösungen von Naser Solutions aus Kassel.`,
      headline: page.title.slice(0, 90),
      label: 'NASER SOLUTIONS · KASSEL',
    }
  }

  const { logo, portrait, font } = await getAssets()
  const isAbout = path === '/ueber-uns'

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: '48px 64px', background: '#101010', color: '#f8f8f8', fontFamily: 'Geist', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* ImageResponse renders plain images from local, bundled data. */}
          <img src={logo} width={88} height={88} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', fontSize: 32 }}>{SITE_NAME}</div>
            <div style={{ display: 'flex', fontSize: 15, letterSpacing: 5, color: '#a3a3a3' }}>WEBAGENCY · KASSEL</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexGrow: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: isAbout ? 660 : 1010 }}>
            <div style={{ display: 'flex', fontSize: 18, letterSpacing: 3, color: '#a3a3a3' }}>{card.label}</div>
            <div style={{ display: 'flex', fontSize: isAbout ? 60 : 66, lineHeight: 1.08, letterSpacing: -2 }}>{card.headline}</div>
            <div style={{ display: 'flex', fontSize: 24, lineHeight: 1.4, color: '#b8b8b8' }}>{card.description.slice(0, 190)}</div>
          </div>
          {isAbout && <img src={portrait} width={280} height={373} alt="Yasin Adam Aissani" style={{ borderRadius: 24, objectFit: 'cover' }} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 22, borderTop: '1px solid #383838', fontSize: 19, color: '#b8b8b8' }}>
          <div style={{ display: 'flex' }}>{new URL(SITE_URL).hostname.replace(/^www\./, '')}</div>
          <div style={{ display: 'flex' }}>PERSÖNLICH. KLAR. DIGITAL.</div>
        </div>
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
