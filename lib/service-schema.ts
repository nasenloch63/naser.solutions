import type { LocalService } from './local-services'
import { absoluteUrl, SITE_NAME, SITE_URL } from './seo'

export function serviceSchema(service: LocalService) {
  const url = absoluteUrl(`/${service.slug}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: service.title, description: service.description, inLanguage: 'de-DE', mainEntity: { '@id': `${url}#service` } },
      { '@type': 'Service', '@id': `${url}#service`, name: service.heading, serviceType: service.serviceType, description: service.intro, url, areaServed: { '@type': 'City', name: 'Kassel' }, provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: absoluteUrl('/leistungen') },
        { '@type': 'ListItem', position: 3, name: service.heading, item: url },
      ] },
      { '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: 'de-DE', mainEntity: service.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ],
  }
}
