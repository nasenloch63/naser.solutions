import { draftMode, headers } from 'next/headers'
import { getCMS } from './cms'

export async function staffPreviewEnabled() {
  if (!(await draftMode()).isEnabled) return false
  const { user } = await (await getCMS()).auth({ headers: await headers() })
  return user?.collection === 'users' && (user.role === 'admin' || user.role === 'editor')
}
