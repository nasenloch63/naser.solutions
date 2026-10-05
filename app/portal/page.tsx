import config from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { getPortalUser } from '@/lib/portal-session'
import { PortalLoginForm } from '@/components/portal-login-form'
import { PortalDashboard } from '@/components/portal-dashboard'

export default async function PortalPage() {
  const requestHeaders = await headers()
  const payload = await getPayload({ config })
  const user = await getPortalUser(payload, requestHeaders)

  if (!user) return <PortalLoginForm />

  const projects = await payload.find({
    collection: 'client-projects',
    overrideAccess: false,
    user,
    depth: 0,
    limit: 20,
    sort: 'name',
  })

  return <PortalDashboard name={user.name} projects={projects.docs.map((project) => ({
    id: String(project.id), name: project.name, domain: project.domain,
    status: project.status, clientFeedback: project.clientFeedback ?? '',
    attachments: (project.feedbackAttachments ?? []).map(file => ({ id: file.id!, name: file.name, size: file.size, mimeType: file.mimeType, downloadUrl: file.downloadUrl })),
  }))} />
}
