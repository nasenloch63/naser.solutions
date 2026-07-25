import config from '@payload-config'
import { GRAPHQL_POST } from '@payloadcms/next/routes'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const POST = GRAPHQL_POST(config)
