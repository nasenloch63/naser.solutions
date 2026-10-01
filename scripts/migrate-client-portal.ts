import { getPayload } from 'payload'
import * as clientPortal from '../migrations/20260818_113300_add_client_portal'

async function migrate() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.info('Client portal migration: skipped outside the production build.')
    return
  }

  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  await payload.db.migrate({
    migrations: [{
      name: '20260818_113300_add_client_portal',
      up: (args) => clientPortal.up(args as Parameters<typeof clientPortal.up>[0]),
      down: (args) => clientPortal.down(args as Parameters<typeof clientPortal.down>[0]),
    }],
  })
  console.info('Client portal database migration completed.')
}

try {
  await migrate()
  process.exit(0)
} catch (error) {
  console.error('Client portal database migration failed:', error)
  process.exit(1)
}
