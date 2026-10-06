import type { CollectionConfig, GlobalConfig } from 'payload'
import { APIError } from 'payload'
import { pageBlocks } from './blocks'

type CMSUser = { id: number | string; role?: 'admin' | 'editor' | 'client' } | null

const isStaff = (user: CMSUser) => user?.role === 'admin' || user?.role === 'editor'
const isAdmin = (user: CMSUser) => user?.role === 'admin'
const isClient = (user: CMSUser) => user?.role === 'client'

const staffOnly = ({ req: { user } }: { req: { user: CMSUser } }) => isStaff(user)
const adminOnly = ({ req: { user } }: { req: { user: CMSUser } }) => isAdmin(user)
const publicUnlessClient = ({ req: { user } }: { req: { user: CMSUser } }) => !isClient(user)

const publicRead = ({ req: { user } }: { req: { user: CMSUser } }) => {
  if (isStaff(user)) return true
  if (isClient(user)) return false
  return { _status: { equals: 'published' } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'System',
  },
  access: {
    create: staffOnly,
    read: ({ req: { user } }) => {
      if (isStaff(user as CMSUser)) return true
      if (isClient(user as CMSUser)) return { id: { equals: user?.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (isStaff(user as CMSUser)) return true
      if (isClient(user as CMSUser)) return { id: { equals: user?.id } }
      return false
    },
    delete: adminOnly,
    admin: staffOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      access: { create: staffOnly, update: adminOnly },
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Redakteur', value: 'editor' },
        { label: 'Kunde', value: 'client' },
      ],
    },
  ],
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medium', plural: 'Medien' },
  admin: { group: 'Inhalte', useAsTitle: 'alt', defaultColumns: ['filename', 'alt', 'updatedAt'], description: 'Öffentliche Website-Medien. Bilder und PDF bis 4 MB pro Datei.' },
  access: { read: () => true, create: staffOnly, update: staffOnly, delete: staffOnly },
  hooks: { beforeOperation: [({ req, operation }) => {
    if ((operation === 'create' || operation === 'update') && req.file && req.file.size > 4 * 1024 * 1024) throw new APIError('Bitte eine Datei mit höchstens 4 MB hochladen.', 400)
  }] },
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 900, height: 600, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true },
    { name: 'caption', type: 'textarea', localized: true },
    { name: 'credit', type: 'text' },
    { name: 'sourcePath', type: 'text', unique: true, admin: { readOnly: true, description: 'Herkunft eines übernommenen Website-Mediums.' } },
  ],
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  defaultSort: 'order',
  labels: { singular: 'Projekt', plural: 'Projekte' },
  admin: {
    group: 'Inhalte',
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'category', '_status', 'updatedAt'],
    description: 'Die Website zeigt veröffentlichte Projekte in aufsteigender Reihenfolge. Entwurf speichern → Vorschau → Veröffentlichen.',
    preview: () => '/preview?collection=projects',
  },
  access: { read: publicRead, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: { autosave: false }, maxPerDoc: 30 },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    { name: 'url', type: 'text', required: true, validate: (value: unknown) => {
      if (typeof value !== 'string') return 'Bitte eine URL eintragen.'
      if (/^\/(?!\/)/.test(value) || /^#[\w-]+$/.test(value)) return true
      try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) || 'Bitte eine HTTPS-Adresse oder einen internen Pfad verwenden.' } catch { return 'Bitte eine gültige URL eintragen.' }
    } },
    { name: 'thumbnail', label: 'Projektbild', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'image/' } } },
    { name: 'containImage', label: 'Bild vollständig zeigen (z. B. Logo)', type: 'checkbox', defaultValue: false },
    { name: 'showInPortfolio', label: 'Im Portfolio anzeigen', type: 'checkbox', defaultValue: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['web', 'design', 'showcase', 'social', 'ecommerce', 'nonprofit', 'gastro'],
    },
    { name: 'tags', type: 'array', fields: [{ name: 'label', type: 'text', required: true, localized: true }] },
    {
      name: 'projectStatus',
      label: 'Projektstatus',
      type: 'select',
      defaultValue: 'showcase',
      options: [
        { label: 'Showcase', value: 'showcase' },
        { label: 'In Entwicklung', value: 'development' },
        { label: 'Live', value: 'live' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', label: 'Reihenfolge', type: 'number', defaultValue: 0, index: true, admin: { description: 'Kleinere Zahlen erscheinen zuerst. Die neue Position wird erst nach Veröffentlichung sichtbar.' } },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    group: 'Inhalte',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Sektionen in „Layout“ verschieben. Änderungen zunächst als Entwurf speichern, dann veröffentlichen.',
    preview: (data) => `/preview?collection=pages&slug=${encodeURIComponent(String(data.slug || 'home'))}`,
    livePreview: {
      url: ({ data, locale }) => {
        return `/preview?collection=pages&slug=${encodeURIComponent(data?.slug || 'home')}&locale=${locale.code}`
      },
    },
  },
  access: { read: publicRead, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: { autosave: false, schedulePublish: true }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: pageBlocks,
      labels: { singular: 'Sektion', plural: 'Sektionen' },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Social Media',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true, maxLength: 180 },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}

export const ClientProjects: CollectionConfig = {
  slug: 'client-projects',
  labels: { singular: 'Kundenprojekt', plural: 'Kundenprojekte' },
  admin: {
    group: 'Kundenportal',
    useAsTitle: 'name',
    defaultColumns: ['name', 'domain', 'status', 'updatedAt'],
  },
  access: {
    admin: staffOnly,
    create: staffOnly,
    read: ({ req: { user } }) => {
      if (isStaff(user as CMSUser)) return true
      if (isClient(user as CMSUser)) return { client: { equals: user?.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (isStaff(user as CMSUser)) return true
      if (isClient(user as CMSUser)) return { client: { equals: user?.id } }
      return false
    },
    delete: staffOnly,
  },
  fields: [
    {
      name: 'name',
      label: 'Projektname',
      type: 'text',
      required: true,
      access: { update: staffOnly },
    },
    {
      name: 'domain',
      label: 'Domain',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      access: { update: staffOnly },
    },
    {
      name: 'client',
      label: 'Kunde',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      filterOptions: { role: { equals: 'client' } },
      access: { read: staffOnly, update: staffOnly },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'In Vorbereitung', value: 'preparation' },
        { label: 'In Bearbeitung', value: 'active' },
        { label: 'Veröffentlicht', value: 'live' },
        { label: 'Pausiert', value: 'paused' },
      ],
      access: { update: staffOnly },
    },
    {
      name: 'notes',
      label: 'Interne Notizen',
      type: 'textarea',
      access: { read: staffOnly, update: staffOnly },
    },
    {
      name: 'clientFeedback',
      label: 'Feedback / Änderungswünsche',
      type: 'textarea',
      maxLength: 5000,
    },
    {
      name: 'feedbackAttachments',
      label: 'Anhänge zur Änderungsanfrage',
      type: 'array',
      maxRows: 20,
      access: { create: staffOnly, update: staffOnly },
      admin: { readOnly: true, description: 'Vom Kunden eingereichte Dateien. Nur für den zugeordneten Kunden und das CMS-Team zugänglich.' },
      fields: [
        { name: 'name', label: 'Dateiname', type: 'text', required: true },
        { name: 'mimeType', label: 'Dateityp', type: 'text', required: true },
        { name: 'size', label: 'Größe (Bytes)', type: 'number', required: true },
        { name: 'requestNote', label: 'Zugehöriger Änderungswunsch', type: 'textarea' },
        { name: 'submittedAt', label: 'Eingereicht am', type: 'date', required: true },
        { name: 'blobPath', type: 'text', required: true, admin: { hidden: true } },
        { name: 'downloadUrl', type: 'text', required: true, admin: { components: { Field: '/cms/admin/attachment-download#AttachmentDownloadField' } } },
      ],
    },
  ],
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Globale Inhalte' },
  access: { read: publicUnlessClient, update: staffOnly },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
        { name: 'newTab', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text' },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Globale Inhalte' },
  access: { read: publicUnlessClient, update: staffOnly },
  fields: [
    { name: 'claim', type: 'textarea', localized: true },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'copyright', type: 'text', localized: true },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Website-Einstellungen',
  admin: { group: 'Globale Inhalte' },
  access: { read: publicUnlessClient, update: staffOnly },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Naser Solutions' },
    { name: 'siteDescription', type: 'textarea', localized: true },
    { name: 'defaultSEOImage', type: 'upload', relationTo: 'media' },
    { name: 'contactEmail', type: 'email', defaultValue: 'info@naser-solutions.de' },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'cookieNotice', type: 'richText', localized: true },
  ],
}
