import type { Block } from 'payload'

const sectionSettings = {
  name: 'settings',
  type: 'group' as const,
  label: 'Darstellung',
  fields: [
    {
      name: 'anchor',
      type: 'text' as const,
      label: 'Anker-ID',
      admin: { description: 'Optional, z. B. leistungen oder kontakt' },
    },
    {
      name: 'theme',
      type: 'select' as const,
      defaultValue: 'default',
      options: [
        { label: 'Standard', value: 'default' },
        { label: 'Dunkel', value: 'dark' },
        { label: 'Hell', value: 'light' },
        { label: 'Akzent', value: 'accent' },
      ],
    },
    {
      name: 'spacing',
      type: 'select' as const,
      defaultValue: 'normal',
      options: [
        { label: 'Kompakt', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Großzügig', value: 'large' },
      ],
    },
  ],
}

const linkFields = [
  { name: 'label', type: 'text' as const, required: true, localized: true },
  { name: 'url', type: 'text' as const, required: true },
  {
    name: 'style',
    type: 'select' as const,
    defaultValue: 'primary',
    options: [
      { label: 'Primär', value: 'primary' },
      { label: 'Sekundär', value: 'secondary' },
      { label: 'Textlink', value: 'link' },
    ],
  },
  { name: 'newTab', type: 'checkbox' as const, defaultValue: false },
]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero-Sektionen' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'highlight', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'actions', type: 'array', maxRows: 3, fields: linkFields },
    sectionSettings,
  ],
}

export const TextBlock: Block = {
  slug: 'content',
  labels: { singular: 'Textinhalt', plural: 'Textinhalte' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', localized: true },
    { name: 'content', type: 'richText', required: true, localized: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'normal',
      options: ['narrow', 'normal', 'wide'],
    },
    sectionSettings,
  ],
}

export const MediaBlock: Block = {
  slug: 'media',
  labels: { singular: 'Bild / Video', plural: 'Bilder / Videos' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
    { name: 'fullWidth', type: 'checkbox', defaultValue: false },
    sectionSettings,
  ],
}

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Leistungsraster', plural: 'Leistungsraster' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'icon', type: 'text', admin: { description: 'Lucide-Iconname, z. B. Globe, Palette oder Code2' } },
        { name: 'link', type: 'text' },
      ],
    },
    sectionSettings,
  ],
}

export const ProjectsBlock: Block = {
  slug: 'projects',
  labels: { singular: 'Projekte', plural: 'Projekt-Sektionen' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'selection',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { description: 'Leer lassen, um alle veröffentlichten Projekte zu zeigen.' },
    },
    { name: 'showFilters', type: 'checkbox', defaultValue: true },
    sectionSettings,
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Kennzahlen', plural: 'Kennzahlen-Sektionen' },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', localized: true },
      ],
    },
    sectionSettings,
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ-Sektionen' },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'richText', required: true, localized: true },
      ],
    },
    sectionSettings,
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call-to-Action', plural: 'Call-to-Actions' },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'actions', type: 'array', minRows: 1, maxRows: 3, fields: linkFields },
    sectionSettings,
  ],
}

export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Kontakt', plural: 'Kontakt-Sektionen' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'recipientEmail', type: 'email', required: true, defaultValue: 'info@naser.solutions' },
    { name: 'showForm', type: 'checkbox', defaultValue: true },
    sectionSettings,
  ],
}

export const pageBlocks = [
  HeroBlock,
  TextBlock,
  MediaBlock,
  FeatureGridBlock,
  ProjectsBlock,
  StatsBlock,
  FAQBlock,
  CTABlock,
  ContactBlock,
]
