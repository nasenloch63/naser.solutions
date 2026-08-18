import type { CollectionConfig, GlobalConfig } from 'payload'
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
  admin: { group: 'Inhalte', useAsTitle: 'alt' },
  access: { read: publicUnlessClient, create: staffOnly, update: staffOnly, delete: staffOnly },
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
  ],
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projekt', plural: 'Projekte' },
  admin: {
    group: 'Inhalte',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
  },
  access: { read: publicRead, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: { autosave: { interval: 500 } }, maxPerDoc: 30 },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    { name: 'url', type: 'text', required: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
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
    { name: 'order', type: 'number', defaultValue: 0, index: true },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    group: 'Inhalte',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, locale }) => {
        const slug = data?.slug === 'home' ? '' : `/${data?.slug ?? ''}`
        return `${process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'}${slug}?preview=true&locale=${locale.code}`
      },
    },
  },
  access: { read: publicRead, create: staffOnly, update: staffOnly, delete: staffOnly },
  versions: { drafts: { autosave: { interval: 500 }, schedulePublish: true }, maxPerDoc: 50 },
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
