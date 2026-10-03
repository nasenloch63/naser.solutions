import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingIncludes: {
    '/og/**': [
      './public/images/inverted-20logo-20png.png',
      './public/images/yasin-adam-aissani-2026.jpg',
      './node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf',
    ],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '*.blob.vercel-storage.com' },
    ],
  },
}

export default withPayload(nextConfig)
