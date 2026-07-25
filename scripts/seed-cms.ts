import config from '../payload.config'
import { getPayload } from 'payload'

const localized = <T>(value: T) => value

async function seed() {
  const payload = await getPayload({ config })
  const password = process.env.PAYLOAD_SEED_PASSWORD

  if (!password) throw new Error('PAYLOAD_SEED_PASSWORD ist nicht gesetzt.')

  const existingAdmin = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: 'yasin.aissani@gmx.de' } },
  })

  if (!existingAdmin.docs.length) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'yasin.aissani@gmx.de',
        password,
        name: 'Yasin Adam Aissani',
        role: 'admin',
      },
    })
  }

  const existing = await payload.find({ collection: 'pages', limit: 1, where: { slug: { equals: 'home' } } })

  if (!existing.docs.length) {
    await payload.create({
      collection: 'pages',
      draft: false,
      data: {
        title: localized('Naser Solutions'),
        slug: 'home',
        _status: 'published',
        layout: [
          {
            blockType: 'hero',
            eyebrow: localized('Digitale Lösungen aus Kassel'),
            heading: localized('Wir bauen digitale Erlebnisse,'),
            highlight: localized('die Menschen erreichen.'),
            description: localized('Strategie, Design und Entwicklung für Unternehmen, die online sichtbar wachsen wollen.'),
            actions: [
              { label: localized('Projekt starten'), url: '#kontakt', style: 'primary' },
              { label: localized('Arbeiten ansehen'), url: '#projekte', style: 'secondary' },
            ],
            settings: { anchor: 'start', theme: 'default', spacing: 'large' },
          },
          {
            blockType: 'featureGrid',
            eyebrow: localized('Unsere Leistungen'),
            heading: localized('Von der Idee bis zum digitalen Produkt.'),
            description: localized('Ein eingespielter Prozess für starke Marken, moderne Websites und performante Anwendungen.'),
            items: [
              { title: localized('Webentwicklung'), description: localized('Schnelle, zugängliche und wartbare Websites mit modernem Technologie-Stack.'), icon: 'Code2' },
              { title: localized('UI/UX Design'), description: localized('Klar strukturierte Nutzererlebnisse, die Marke und Geschäftsziel verbinden.'), icon: 'Palette' },
              { title: localized('Digitale Strategie'), description: localized('Fundierte Beratung für Positionierung, Inhalte, Wachstum und technische Umsetzung.'), icon: 'Rocket' },
            ],
            settings: { anchor: 'leistungen', theme: 'light', spacing: 'normal' },
          },
          {
            blockType: 'projects',
            eyebrow: localized('Ausgewählte Arbeiten'),
            heading: localized('Projekte mit Haltung und messbarem Nutzen.'),
            description: localized('Eine Auswahl digitaler Auftritte, Markenwelten und individueller Lösungen.'),
            showFilters: false,
            settings: { anchor: 'projekte', theme: 'default', spacing: 'normal' },
          },
          {
            blockType: 'stats',
            items: [
              { value: '360°', label: localized('Digitale Betreuung') },
              { value: '11', label: localized('Sprachen') },
              { value: '100%', label: localized('Individuelle Lösungen') },
              { value: 'Kassel', label: localized('Regional verwurzelt') },
            ],
            settings: { anchor: 'zahlen', theme: 'dark', spacing: 'compact' },
          },
          {
            blockType: 'cta',
            heading: localized('Bereit für den nächsten digitalen Schritt?'),
            description: localized('Lassen Sie uns unverbindlich über Ihr Vorhaben sprechen.'),
            actions: [{ label: localized('Kontakt aufnehmen'), url: '#kontakt', style: 'primary' }],
            settings: { theme: 'accent', spacing: 'compact' },
          },
          {
            blockType: 'contact',
            eyebrow: localized('Kontakt'),
            heading: localized('Lassen Sie uns gemeinsam etwas Starkes entwickeln.'),
            description: localized('Schreiben Sie uns – wir melden uns persönlich bei Ihnen.'),
            recipientEmail: 'info@naser-solutions.de',
            showForm: true,
            settings: { anchor: 'kontakt', theme: 'default', spacing: 'normal' },
          },
        ],
        seo: {
          title: localized('Naser Solutions | Webdesign & Entwicklung aus Kassel'),
          description: localized('Naser Solutions entwickelt moderne Websites, digitale Marken und individuelle Lösungen für nachhaltiges Online-Wachstum.'),
        },
      },
    })
  }

  const projects = [
    { title: 'Naser Solutions', slug: 'naser-solutions', description: 'Mehrsprachiger Agenturauftritt mit klarem Fokus auf Leistung, Projekte und direkte Kontaktwege.', url: 'https://www.naser.solutions', category: 'web' as const, projectStatus: 'live' as const, featured: true, order: 1 },
    { title: 'Digitale Markenwelt', slug: 'digitale-markenwelt', description: 'Konzeptstudie für einen konsistenten digitalen Markenauftritt über Website und Social Media.', url: '#kontakt', category: 'design' as const, projectStatus: 'showcase' as const, featured: true, order: 2 },
    { title: 'E-Commerce Experience', slug: 'ecommerce-experience', description: 'Conversion-orientiertes Storefront-Konzept mit schneller Produktsuche und reduzierter Kaufstrecke.', url: '#kontakt', category: 'ecommerce' as const, projectStatus: 'showcase' as const, featured: true, order: 3 },
  ]

  for (const project of projects) {
    const found = await payload.find({ collection: 'projects', limit: 1, where: { slug: { equals: project.slug } } })
    if (!found.docs.length) await payload.create({ collection: 'projects', data: { ...project, _status: 'published' } })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Naser Solutions',
      siteDescription: 'Digitale Lösungen, Webdesign und Entwicklung aus Kassel.',
      contactEmail: 'info@naser-solutions.de',
      phone: '+49 15560 729886',
      address: 'Kassel, Deutschland',
    },
  })

  console.info('[v0] CMS-Anfangsinhalte wurden erstellt.')
}

try {
  await seed()
  process.exit(0)
} catch (error) {
  console.error('[v0] CMS-Seeding fehlgeschlagen:', error)
  process.exit(1)
}
