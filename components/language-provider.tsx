"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "de" | "en" | "fr" | "ar" | "tr" | "sq" | "ru" | "es" | "it" | "el" | "pt" | "zh"

export const languages = [
  { code: "de" as const, name: "Deutsch", flag: "🇩🇪", dir: "ltr" as const },
  { code: "en" as const, name: "English", flag: "🇬🇧", dir: "ltr" as const },
  { code: "fr" as const, name: "Français", flag: "🇫🇷", dir: "ltr" as const },
  { code: "ar" as const, name: "العربية", flag: "🇸🇦", dir: "rtl" as const },
  { code: "tr" as const, name: "Türkçe", flag: "🇹🇷", dir: "ltr" as const },
  { code: "sq" as const, name: "Shqip", flag: "🇦🇱", dir: "ltr" as const },
  { code: "ru" as const, name: "Русский", flag: "🇷🇺", dir: "ltr" as const },
  { code: "es" as const, name: "Español", flag: "🇪🇸", dir: "ltr" as const },
  { code: "it" as const, name: "Italiano", flag: "🇮🇹", dir: "ltr" as const },
  { code: "el" as const, name: "Ελληνικά", flag: "🇬🇷", dir: "ltr" as const },
  { code: "pt" as const, name: "Português", flag: "🇵🇹", dir: "ltr" as const },
  { code: "zh" as const, name: "中文", flag: "🇨🇳", dir: "ltr" as const },
]

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
  isRTL: boolean
}


const translations = {
  de: {
    // Navbar
    "nav.services": "Leistungen",
    "nav.projects": "Projekte",
    "nav.about": "Über uns",
    "nav.vision": "Vision",
    "nav.contact": "Kontakt",
    "nav.cryptoPayment": "Krypto-Zahlung",

    // Hero
    "hero.badge": "Neu gegründet 2026",
    "hero.eyebrow": "Wir denken, gestalten und entwickeln digitale Lösungen",
    "hero.subtitle": "wir denken, gestalten und entwickeln",
    "hero.title1": "Websites & Branding,",
    "hero.title2": "die sichtbar machen und verkaufen.",
    "hero.description":
      "Für Unternehmen, Selbstständige & Creator, die online ernst genommen werden wollen und Ergebnisse erwarten.",
    "hero.cta": "Projekt starten",
    "hero.cta2": "Kostenloses Erstgespräch",
    "hero.refBtn": "Referenzprojekte",
    "hero.vision": "Unsere Vision",
    "hero.trust": "Bereits erfolgreich umgesetzt für Kunden in ganz Europa",
    "hero.languages": "Deutsch & Englisch fließend · Arabisch & Französisch verhandlungssicher",
    "hero.regions": "Projekte u.a. in Deutschland, Frankreich & Portugal",

    // Stats
    "stats.founded": "gegründet",
    "stats.potential": "Potenzial",
    "stats.passion": "Leidenschaft",
    "stats.availability": "Erreichbarkeit",

    // Services
    "services.label": "Leistungen",
    "services.title": "Was wir für dich tun.",
    "services.description":
      "Von der Idee bis zur fertigen Lösung – wir begleiten dich in allen Phasen deines digitalen Projekts.",
    "services.web.title": "Webdesign & Webentwicklung",
    "services.web.description":
      "Professionelle und moderne Websites, die Ihr Unternehmen optimal präsentieren und Kunden überzeugen. Von der Konzeption bis zur Umsetzung.",
    "services.influencer.title": "Influencer-Websites",
    "services.influencer.description":
      "Einzigartige digitale Präsenzen für Content Creator und Influencer mit Portfolio-Showcases und nahtloser Social Media Integration.",
    "services.supermarket.title": "Supermarkt-Apps",
    "services.supermarket.description":
      "Maßgeschneiderte Apps mit Push-Notifications, digitalen Coupons und Treueprogrammen für den Einzelhandel – mehr Kundenbindung, mehr Umsatz.",
    "services.social.title": "Social Media & Ads",
    "services.social.description":
      "Professionelle Kampagnen auf TikTok, Instagram, Facebook und Google Ads für maximale Reichweite und messbare Ergebnisse.",
    "services.design.title": "Grafikdesign & Branding",
    "services.design.description":
      "Kreatives Design, das Ihre Marke zum Leben erweckt – von Logos bis zu kompletten Corporate Designs mit Wiedererkennungswert.",
    "services.seo.title": "SEO & Performance",
    "services.seo.description":
      "Suchmaschinenoptimierung und technische Performance-Optimierung für beste Sichtbarkeit und schnelle Ladezeiten.",
    "services.ai.title": "KI-gestützte Video & Bildbearbeitung",
    "services.ai.description":
      "Professionelle Video- und Bildbearbeitung mit KI-Technologie für atemberaubende visuelle Inhalte – schnell, effizient und hochwertig.",

    // Projects
    "projects.badge": "In Entwicklung",
    "projects.title": "Aktuelle Projekte.",
    "projects.description": "Ein Einblick in unsere laufenden Projekte. Diese Websites befinden sich noch in der Entwicklung und zeigen unser Engagement für innovative digitale Lösungen.",
    "projects.preview": "Live-Vorschau verfügbar",
    "projects.viewProject": "Projekt ansehen",
    "projects.moreComingSoon": "Weitere Projekte folgen in Kürze...",
    "projects.crypto.title": "Crypto News Portal",
    "projects.crypto.description": "Ein modernes Nachrichtenportal für Kryptowährungen mit Echtzeit-Updates, Marktanalysen und Branchennews.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Elegante Portfolio-Website für ein kreatives Designstudio mit minimalistischer Ästhetik und fließenden Animationen.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Professioneller Webauftritt für ein Hochleistungs-Autohaus in Leipzig mit modernem Design und Premium-Fahrzeugpräsentation.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "High-End Fashion E-Commerce-Shop mit modernem Design und nahtloser Benutzererfahrung.",
    "projects.donation.title": "Spendenseite Al Salam",
    "projects.donation.description": "Professionelle Spendenwebsite für humanitäre Zwecke mit modernem Design und benutzerfreundlicher Spendenverwaltung.",
    "projects.hazechill.title": "Haze & Chill Cafe",
    "projects.hazechill.description":
      "Design und Social-Media-Betreuung für ein trendiges Café – von der Markenidentität bis zum Instagram-Auftritt. Zusätzlich unterstützen wir das Café beim Design der Speisekarte, bei der Korrespondenz mit Werbepartnern sowie aktiv in der Entwicklung und Skalierung des Konzepts.",
    "projects.reel.title": "Haze & Chill Café – Content Production",
    "projects.reel.description":
      "Diese Produktion ist Teil unserer Content-Arbeit für das Haze & Chill Café. Wir entwickeln und produzieren Reels und visuelle Inhalte für den Instagram-Auftritt der Marke.",

    // About
    "about.label": "Der Kopf dahinter",
    "about.title": "Vision trifft Umsetzung.",
    "about.description":
      "Unter der Leitung von <strong>Yasin Adam Aissani</strong> steht Naser Solutions für Innovation und Qualität. Als frisch gegründete Agentur bringen wir frischen Wind in die Branche – mit dem Hunger, Außergewöhnliches zu schaffen und uns durch exzellente Arbeit zu beweisen.",
    "about.benefit1": "Frische Perspektiven & innovative Ideen",
    "about.benefit2": "Modernste Technologien & Frameworks",
    "about.benefit3": "Persönliche Betreuung von Anfang an",
    "about.benefit4": "Faire Preise für höchste Qualität",
    "about.role": "Direktor & Gründer",

    // Vision
    "vision.label": "Unsere Vision",
    "vision.title": "Groß denken. Größer werden.",
    "vision.description":
      "Als junge Agentur haben wir keine Altlasten – nur unbegrenztes Potenzial. Wir sind hier, um zu beweisen, dass frische Ideen und unbändiger Antrieb den Unterschied machen.",
    "vision.innovation.title": "Innovation First",
    "vision.innovation.description":
      "Wir nutzen die neuesten Technologien und Trends, um zukunftssichere Lösungen zu entwickeln.",
    "vision.results.title": "Ergebnisorientiert",
    "vision.results.description": "Jedes Projekt wird mit klaren Zielen und messbaren Erfolgen umgesetzt.",
    "vision.creative.title": "Kreative Exzellenz",
    "vision.creative.description":
      "Design, das nicht nur gut aussieht, sondern Geschichten erzählt und Emotionen weckt.",
    "vision.partnership.title": "Partnerschaft",
    "vision.partnership.description":
      "Wir sehen uns als Erweiterung deines Teams – transparent, zuverlässig, engagiert.",

    // Tools
    "tools.badge": "Technologie-Stack",
    "tools.title": "Werkzeuge der Profis",
    "tools.description": "Wir arbeiten mit führenden KI- und Design-Plattformen, um digitale Lösungen auf höchstem Niveau zu realisieren.",

    // Contact
    "contact.label": "Kontakt",
    "contact.title": "Starte dein Projekt.",
    "contact.description":
      "Kontaktiere uns für ein kostenloses Beratungsgespräch. Wir freuen uns darauf, deine Vision Wirklichkeit werden zu lassen.",
    "contact.email": "E-Mail",
    "contact.phone": "Telefon",
    "contact.location": "Standort",
    "contact.whatsapp": "Direkt über WhatsApp kontaktieren",
    "contact.form.title": "Sende uns eine Nachricht",
    "contact.form.name": "Name *",
    "contact.form.namePlaceholder": "Dein Name",
    "contact.form.email": "E-Mail *",
    "contact.form.emailPlaceholder": "deine@email.de",
    "contact.form.phone": "Telefon (optional)",
    "contact.form.phonePlaceholder": "+49 123 456789",
    "contact.form.message": "Nachricht *",
    "contact.form.messagePlaceholder": "Erzähle uns von deinem Projekt...",
    "contact.form.submit": "Nachricht senden",
    "contact.form.sending": "Wird gesendet...",
    "contact.form.success": "Vielen Dank für deine Nachricht! Wir melden uns in Kürze.",
    "contact.form.error": "Ein Fehler ist aufgetreten. Bitte versuche es erneut oder kontaktiere uns direkt.",

    // Footer
    "footer.imprint": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.agb": "AGB",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.cryptoAccepted": "Krypto akzeptiert",
    "footer.payment": "Zahlung",

    // Modal
    "modal.backToSite": "Zurück zur Seite",

    // AGB
    "agb.badge": "Rechtliche Informationen",
    "agb.title": "Allgemeine Geschäftsbedingungen",
    "agb.lastUpdated": "Stand: Januar 2026",
    "agb.section1.title": "1. Geltungsbereich",
    "agb.section1.p1": "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Naser Solutions (nachfolgend 'Auftragnehmer') und seinen Kunden (nachfolgend 'Auftraggeber') über die Erbringung von Dienstleistungen im Bereich Webdesign, Webentwicklung, App-Entwicklung, Social Media Marketing, Grafikdesign und KI-gestützte Video- und Bildbearbeitung.",
    "agb.section1.p2": "Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.",
    "agb.section2.title": "2. Vertragsschluss",
    "agb.section2.p1": "Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern nicht ausdrücklich als verbindlich gekennzeichnet. Der Vertrag kommt zustande durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der Leistungserbringung.",
    "agb.section2.p2": "Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung durch den Auftragnehmer.",
    "agb.section3.title": "3. Leistungsumfang",
    "agb.section3.p1": "Der Umfang der zu erbringenden Leistungen ergibt sich aus der Leistungsbeschreibung in der Auftragsbestätigung. Nachträgliche Änderungswünsche des Auftraggebers werden gesondert berechnet.",
    "agb.section3.list1": "Webdesign und Webentwicklung: Konzeption, Design und technische Umsetzung von Websites",
    "agb.section3.list2": "App-Entwicklung: Entwicklung maßgeschneiderter Anwendungen für verschiedene Plattformen",
    "agb.section3.list3": "KI-gestützte Bild- und Videobearbeitung: Professionelle Bearbeitung mit modernsten KI-Technologien",
    "agb.section4.title": "4. Mitwirkungspflichten des Auftraggebers",
    "agb.section4.p1": "Der Auftraggeber verpflichtet sich, alle für die Durchführung des Auftrags notwendigen Informationen, Unterlagen und Zugänge rechtzeitig zur Verfügung zu stellen. Verzögerungen, die durch verspätete oder unvollständige Zulieferungen entstehen, gehen zu Lasten des Auftraggebers.",
    "agb.section4.p2": "Der Auftraggeber ist verpflichtet, die vom Auftragnehmer erstellten Entwürfe und Zwischenergebnisse zeitnah zu prüfen und Änderungswünsche mitzuteilen.",
    "agb.section5.title": "5. Preise und Zahlungsbedingungen",
    "agb.section5.p1": "Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer. Die Zahlung erfolgt nach Rechnungsstellung innerhalb von 14 Tagen ohne Abzug. Bei Projekten mit längerer Laufzeit können Teilzahlungen vereinbart werden.",
    "agb.section5.p2": "Wir akzeptieren Zahlungen in Bitcoin (BTC), Solana (SOL), Monero (XMR) sowie per Banküberweisung. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet.",
    "agb.portfolio.title": "6. Nutzungsrechte und Portfolio-Verwendung",
    "agb.portfolio.p1": "Der Auftragnehmer räumt dem Auftraggeber nach vollständiger Zahlung der Vergütung die vertraglich vereinbarten Nutzungsrechte an den erstellten Werken ein. Sofern nicht anders vereinbart, erhält der Auftraggeber ein einfaches, zeitlich und räumlich unbeschränktes Nutzungsrecht.",
    "agb.portfolio.p2": "<strong>Portfolio-Verwendung:</strong> Der Auftragnehmer behält sich das Recht vor, die im Rahmen des Projekts erstellten Arbeiten (Websites, Apps, Designs, Videos, Bilder) für eigene Marketing- und Präsentationszwecke zu verwenden. Dies umfasst insbesondere die Darstellung in Portfolio, auf der eigenen Website, in Social Media sowie gegenüber potenziellen Neukunden als Referenz.",
    "agb.portfolio.p3": "Sollte der Auftraggeber eine Portfolio-Verwendung ausdrücklich nicht wünschen, ist dies vor Vertragsschluss schriftlich mitzuteilen. In diesem Fall kann ein Aufschlag von 20% auf die Projektkosten erhoben werden.",
    "agb.section6.title": "7. Gewährleistung",
    "agb.section6.p1": "Der Auftragnehmer gewährleistet, dass die erstellten Arbeiten zum Zeitpunkt der Abnahme frei von Sach- und Rechtsmängeln sind. Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme.",
    "agb.section6.p2": "Mängelansprüche setzen voraus, dass der Auftraggeber seinen Untersuchungs- und Rügepflichten gemäß § 377 HGB ordnungsgemäß nachgekommen ist. Bei berechtigter Mängelrüge erfolgt zunächst eine Nachbesserung.",
    "agb.section7.title": "8. Haftung",
    "agb.section7.p1": "Der Auftragnehmer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für die Verletzung von Leben, Körper oder Gesundheit. Für leichte Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten.",
    "agb.section7.p2": "Die Haftung für Datenverlust ist auf den typischen Wiederherstellungsaufwand beschränkt, der bei regelmäßiger Anfertigung von Sicherungskopien entstanden wäre.",
    "agb.section8.title": "9. Geheimhaltung",
    "agb.section8.p1": "Beide Vertragsparteien verpflichten sich, alle im Rahmen der Zusammenarbeit bekannt gewordenen vertraulichen Informationen geheim zu halten und nur zur Erfüllung des Vertrags zu verwenden.",
    "agb.section8.p2": "Diese Verpflichtung besteht auch nach Beendigung des Vertragsverhältnisses fort.",
    "agb.section9.title": "10. Schlussbestimmungen",
    "agb.section9.p1": "Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Auftragnehmers. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.",

    // Impressum
    "impressum.title": "Impressum",
    "impressum.subtitle": "Angaben gemäß § 5 DDG",
    "impressum.companyInfo": "Unternehmensangaben",
    "impressum.contact": "Kontakt",
    "impressum.email": "E-Mail",
    "impressum.phone": "Telefon",
    "impressum.website": "Website",
    "impressum.responsible": "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    "impressum.disclaimer": "Haftungsausschluss",
    "impressum.liabilityContent": "Haftung für Inhalte",
    "impressum.liabilityContentText":
      "Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
    "impressum.liabilityLinks": "Haftung für Links",
    "impressum.liabilityLinksText":
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
    "impressum.copyright": "Urheberrecht",
    "impressum.copyrightText":
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
    "impressum.dispute": "Streitschlichtung",
    "impressum.disputeText":
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    "impressum.backHome": "Zurück zur Startseite",

    // Privacy Policy (Datenschutz)
    "privacy.title": "Datenschutzerklärung",
    "privacy.subtitle": "Informationen gemäß DSGVO und BDSG",
    "privacy.lastUpdated": "Stand",
    "privacy.email": "E-Mail",
    "privacy.phone": "Telefon",
    "privacy.responsible.title": "1. Verantwortliche Stelle",
    "privacy.overview.title": "2. Übersicht der Verarbeitungen",
    "privacy.overview.text":
      "Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. In dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten wir erheben, zu welchen Zwecken wir sie verarbeiten und welche Rechte Ihnen zustehen.",
    "privacy.legalBasis.title": "3. Rechtsgrundlagen der Verarbeitung",
    "privacy.legalBasis.text":
      "Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage folgender Rechtsgrundlagen:",
    "privacy.legalBasis.consent": "Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)",
    "privacy.legalBasis.contract": "Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)",
    "privacy.legalBasis.legal": "Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO)",
    "privacy.legalBasis.interest": "Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)",
    "privacy.hosting.title": "4. Hosting",
    "privacy.hosting.text":
      "Unsere Website wird bei Vercel Inc. gehostet. Der Hoster erhebt in sog. Logfiles Informationen, die Ihr Browser automatisch übermittelt.",
    "privacy.hosting.dpa":
      "Mit Vercel besteht ein Auftragsverarbeitungsvertrag (Data Processing Agreement). Die Datenübertragung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
    "privacy.logfiles.title": "5. Server-Logfiles",
    "privacy.logfiles.text": "Bei jedem Zugriff auf unsere Website werden folgende Daten automatisch erfasst:",
    "privacy.logfiles.ip": "IP-Adresse (anonymisiert)",
    "privacy.logfiles.datetime": "Datum und Uhrzeit der Anfrage",
    "privacy.logfiles.browser": "Browsertyp und -version",
    "privacy.logfiles.os": "Betriebssystem",
    "privacy.logfiles.referrer": "Referrer-URL (zuvor besuchte Seite)",
    "privacy.logfiles.pages": "Aufgerufene Seiten",
    "privacy.logfiles.purpose":
      "Diese Daten sind technisch erforderlich, um die Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text":
      "Unsere Website verwendet ausschließlich technisch notwendige Cookies. Diese sind für den Betrieb der Website erforderlich und speichern keine personenbezogenen Daten.",
    "privacy.cookies.name": "Cookie-Name",
    "privacy.cookies.purpose": "Zweck",
    "privacy.cookies.duration": "Speicherdauer",
    "privacy.cookies.themeDesc": "Speichert Ihre Präferenz für Hell-/Dunkelmodus",
    "privacy.cookies.langDesc": "Speichert Ihre bevorzugte Spracheinstellung",
    "privacy.cookies.year": "Jahr",
    "privacy.cookies.settings":
      "Sie können Cookies in Ihren Browsereinstellungen jederzeit deaktivieren. Beachten Sie, dass dies die Funktionalität der Website einschränken kann.",
    "privacy.contact.title": "7. Kontaktformular",
    "privacy.contact.text": "Wenn Sie uns über das Kontaktformular kontaktieren, werden folgende Daten erhoben:",
    "privacy.contact.name": "Name",
    "privacy.contact.emailData": "E-Mail-Adresse",
    "privacy.contact.phoneData": "Telefonnummer (optional)",
    "privacy.contact.message": "Ihre Nachricht",
    "privacy.contact.storage":
      "Diese Daten werden zur Bearbeitung Ihrer Anfrage verwendet und nach Abschluss der Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).",
    "privacy.rights.title": "8. Ihre Rechte als betroffene Person",
    "privacy.rights.text": "Sie haben gemäß DSGVO folgende Rechte:",
    "privacy.rights.access": "Auskunftsrecht (Art. 15 DSGVO)",
    "privacy.rights.accessDesc":
      "Sie haben das Recht, Auskunft über die von uns verarbeiteten personenbezogenen Daten zu verlangen.",
    "privacy.rights.rectification": "Berichtigungsrecht (Art. 16 DSGVO)",
    "privacy.rights.rectificationDesc":
      "Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten zu verlangen.",
    "privacy.rights.erasure": "Löschungsrecht (Art. 17 DSGVO)",
    "privacy.rights.erasureDesc":
      "Sie haben das Recht, die Löschung Ihrer Daten zu verlangen, sofern keine Aufbewahrungspflichten entgegenstehen.",
    "privacy.rights.restriction": "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
    "privacy.rights.restrictionDesc":
      "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.",
    "privacy.rights.portability": "Datenübertragbarkeit (Art. 20 DSGVO)",
    "privacy.rights.portabilityDesc":
      "Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.",
    "privacy.rights.objection": "Widerspruchsrecht (Art. 21 DSGVO)",
    "privacy.rights.objectionDesc":
      "Sie haben das Recht, der Verarbeitung Ihrer Daten aus Gründen, die sich aus Ihrer besonderen Situation ergeben, zu widersprechen.",
    "privacy.rights.complaint": "Beschwerderecht (Art. 77 DSGVO)",
    "privacy.rights.complaintDesc":
      "Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten rechtswidrig erfolgt.",
    "privacy.security.title": "9. Datensicherheit",
    "privacy.security.text":
      "Wir verwenden SSL/TLS-Verschlüsselung für die sichere Übertragung von Daten. Unsere Website ist ausschließlich über HTTPS erreichbar. Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.",
    "privacy.changes.title": "10. Änderungen dieser Datenschutzerklärung",
    "privacy.changes.text":
      "Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslagen oder bei Änderungen unserer Dienste anzupassen. Es gilt die jeweils aktuelle auf unserer Website veröffentlichte Fassung.",
    "privacy.backHome": "Zurück zur Startseite",

    // Payment Page
    "payment.badge": "Sichere Krypto-Zahlungen",
    "payment.title": "Bezahlen mit Krypto",
    "payment.description":
      "Wir akzeptieren Bitcoin, Solana und Monero für schnelle, sichere und globale Zahlungen ohne Zwischenhändler.",
    "payment.secure": "100% Sicher",
    "payment.fast": "Schnelle Transaktionen",
    "payment.global": "Weltweit verfügbar",
    "payment.walletAddress": "Wallet-Adresse",
    "payment.showQR": "QR-Code",
    "payment.hideQR": "Ausblenden",
    "payment.copy": "Kopieren",
    "payment.copied": "Kopiert!",
    "payment.scanQR": "QR-Code scannen zum Bezahlen",
    "payment.questions": "Fragen zur Zahlung?",
    "payment.contactUs": "Kontaktiere uns",
    "payment.btc.benefit1": "Lightning Network für sofortige Zahlungen",
    "payment.btc.benefit2": "On-Chain für größere Beträge",
    "payment.btc.benefit3": "Weltweit akzeptierter Standard",
    "payment.sol.benefit1": "Ultra-schnelle Transaktionen (<1 Sek.)",
    "payment.sol.benefit2": "Minimale Gebühren (~$0.00025)",
    "payment.sol.benefit3": "Hohe Skalierbarkeit",
    "payment.xmr.benefit1": "Maximale Privatsphäre",
    "payment.xmr.benefit2": "Vollständige Anonymität",
    "payment.xmr.benefit3": "Keine Transaktions-Nachverfolgung",
  },
  pt: {
    // Navbar
    "nav.services": "Serviços",
    "nav.projects": "Projetos",
    "nav.about": "Sobre nós",
    "nav.vision": "Visão",
    "nav.contact": "Contato",
    "nav.cryptoPayment": "Pagamento Cripto",

    // Hero
    "hero.badge": "Fundada em 2026",
    "hero.eyebrow": "Pensamos, projetamos e desenvolvemos soluções digitais",
    "hero.subtitle": "pensamos, projetamos e desenvolvemos",
    "hero.title1": "Websites & Branding,",
    "hero.title2": "que fazem diferença e vendem.",
    "hero.description":
      "Para empresas, autônomos e criadores que querem ser levados a sério online e esperam resultados.",
    "hero.cta": "Iniciar Projeto",
    "hero.cta2": "Consulta Inicial Gratuita",
    "hero.refBtn": "Projetos de Referência",
    "hero.vision": "Nossa Visão",
    "hero.trust": "Já implementado com sucesso para clientes em toda a Europa",
    "hero.languages": "Português e Inglês fluentes · Árabe e Francês em nível profissional",
    "hero.regions": "Projetos em Portugal, Brasil, Alemanha e além",

    // Stats
    "stats.founded": "fundada",
    "stats.potential": "Potencial",
    "stats.passion": "Paixão",
    "stats.availability": "Disponibilidade",

    // Projects
    "projects.badge": "Em Desenvolvimento",
    "projects.title": "Projetos Atuais.",
    "projects.description": "Uma visão dos nossos projetos atuais. Estes sites ainda estão em desenvolvimento e mostram nosso compromisso com soluções digitais inovadoras.",
    "projects.preview": "Prévia ao vivo disponível",
    "projects.viewProject": "Ver Projeto",
    "projects.moreComingSoon": "Mais projetos em breve...",
    "projects.crypto.title": "Portal de Notícias Cripto",
    "projects.crypto.description": "Um portal de notícias moderno para criptomoedas com atualizações em tempo real, análises de mercado e notícias da indústria.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Site de portfólio elegante para um estúdio de design criativo com estética minimalista e animações fluidas.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Apresentação automotiva de luxo com design imersivo e experiências visuais de alta qualidade.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "Loja de e-commerce de moda de alto padrão com design moderno e experiência do usuário perfeita.",
    "projects.donation.title": "Site de Doações Al Salam",
    "projects.donation.description": "Site de doações profissional para fins humanitários com design moderno e gerenciamento fácil de doações.",

    // About
    "about.label": "A mente por trás disso",
    "about.title": "Visão encontra execução.",
    "about.description":
      "Sob a liderança de <strong>Yasin Adam Aissani</strong>, Naser Solutions representa inovação e qualidade. Como agência recém-fundada, trazemos um novo fôlego para o setor – com a fome de criar coisas extraordinárias e nos provarmos através de trabalho excelente.",
    "about.benefit1": "Perspectivas frescas e ideias inovadoras",
    "about.benefit2": "Tecnologias e frameworks mais recentes",
    "about.benefit3": "Suporte pessoal desde o início",
    "about.benefit4": "Preços justos para qualidade máxima",
    "about.role": "Diretor e Fundador",

    // Vision
    "vision.label": "Nossa Visão",
    "vision.title": "Pensar grande. Crescer mais.",
    "vision.description":
      "Como agência jovem, não temos bagagem – apenas potencial ilimitado. Estamos aqui para provar que ideias frescas e determinação fazem a diferença.",
    "vision.innovation.title": "Inovação em Primeiro Lugar",
    "vision.innovation.description":
      "Usamos as tecnologias e tendências mais recentes para desenvolver soluções à prova de futuro.",
    "vision.results.title": "Orientado por Resultados",
    "vision.results.description": "Cada projeto é implementado com objetivos claros e sucessos mensuráveis.",
    "vision.creative.title": "Excelência Criativa",
    "vision.creative.description":
      "Design que não apenas parece bom, mas conta histórias e desperta emoções.",
    "vision.partnership.title": "Parceria",
    "vision.partnership.description":
      "Nos vemos como uma extensão da sua equipe – transparentes, confiáveis, engajados.",

    // Tools
    "tools.badge": "Stack Tecnológico",
    "tools.title": "Ferramentas dos Profissionais",
    "tools.description": "Trabalhamos com as melhores plataformas de IA e design para entregar soluções digitais no mais alto nível.",

    // Contact
    "contact.label": "Contato",
    "contact.title": "Comece seu projeto.",
    "contact.description":
      "Entre em contato conosco para uma consulta gratuita. Estamos ansiosos para fazer sua visão se tornar realidade.",
    "contact.email": "E-mail",
    "contact.phone": "Telefone",
    "contact.location": "Localização",
    "contact.whatsapp": "Entre em contato direto via WhatsApp",
    "contact.form.title": "Envie-nos uma mensagem",
    "contact.form.name": "Nome *",
    "contact.form.namePlaceholder": "Seu nome",
    "contact.form.email": "E-mail *",
    "contact.form.emailPlaceholder": "seu@email.com",
    "contact.form.phone": "Telefone (opcional)",
    "contact.form.phonePlaceholder": "+55 11 98765-4321",
    "contact.form.message": "Mensagem *",
    "contact.form.messagePlaceholder": "Conte-nos sobre seu projeto...",
    "contact.form.submit": "Enviar mensagem",
    "contact.form.sending": "Enviando...",
    "contact.form.success": "Obrigado por sua mensagem! Entraremos em contato em breve.",

    // Footer
    "footer.imprint": "Impressum",
    "footer.privacy": "Privacidade",
    "footer.rights": "Todos os direitos reservados.",
    "footer.cryptoAccepted": "Cripto aceito",
    "footer.payment": "Pagamento",

    // Modal
    "modal.backToSite": "Voltar ao site",

    // Payment Page
    "payment.badge": "Pagamentos Cripto Seguros",
    "payment.title": "Pagar com Cripto",
    "payment.description":
      "Aceitamos Bitcoin, Solana e Monero para pagamentos rápidos, seguros e globais sem intermediários.",
    "payment.secure": "100% Seguro",
    "payment.fast": "Transações Rápidas",
    "payment.global": "Disponível Globalmente",
    "payment.walletAddress": "Endereço da Carteira",
    "payment.showQR": "Código QR",
    "payment.hideQR": "Ocultar",
    "payment.copy": "Copiar",
    "payment.copied": "Copiado!",
    "payment.scanQR": "Escaneie o código QR para pagar",
    "payment.questions": "Dúvidas sobre pagamento?",
    "payment.contactUs": "Entre em contato conosco",
    "payment.btc.benefit1": "Lightning Network para pagamentos instantâneos",
    "payment.btc.benefit2": "On-Chain para valores maiores",
    "payment.btc.benefit3": "Padrão aceito mundialmente",
    "payment.sol.benefit1": "Transações ultra-rápidas (<1 seg)",
    "payment.sol.benefit2": "Taxas mínimas (~$0.00025)",
    "payment.sol.benefit3": "Alta escalabilidade",
    "payment.xmr.benefit1": "Privacidade máxima",
    "payment.xmr.benefit2": "Anonimato completo",
    "payment.xmr.benefit3": "Sem rastreamento de transações",
  },
  en: {
    // Navbar
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.about": "About us",
    "nav.vision": "Vision",
    "nav.contact": "Contact",
    "nav.cryptoPayment": "Crypto Payment",

    // Hero
    "hero.badge": "Newly founded 2026",
    "hero.eyebrow": "We think, design and develop digital solutions",
    "hero.subtitle": "we think, design and develop",
    "hero.title1": "Websites & Branding,",
    "hero.title2": "that get visibility and drive sales.",
    "hero.description":
      "For companies, freelancers & creators who want to be taken seriously online and expect results.",
    "hero.cta": "Start Project",
    "hero.cta2": "Free Initial Consultation",
    "hero.refBtn": "Reference Projects",
    "hero.vision": "Our Vision",
    "hero.trust": "Successfully implemented for clients across Europe",
    "hero.languages": "German & English fluent · Arabic & French professional level",
    "hero.regions": "Projects in Germany, France & Portugal, among others",

    // Stats
    "stats.founded": "founded",
    "stats.potential": "Potential",
    "stats.passion": "Passion",
    "stats.availability": "Availability",

    // Services
    "services.label": "Services",
    "services.title": "What we do for you.",
    "services.description": "From idea to finished solution – we accompany you in all phases of your digital project.",
    "services.web.title": "Web Design & Development",
    "services.web.description":
      "Professional and modern websites that optimally present your company and convince customers. From concept to implementation.",
    "services.influencer.title": "Influencer Websites",
    "services.influencer.description":
      "Unique digital presences for content creators and influencers with portfolio showcases and seamless social media integration.",
    "services.supermarket.title": "Supermarket Apps",
    "services.supermarket.description":
      "Custom apps with push notifications, digital coupons and loyalty programs for retail – more customer loyalty, more revenue.",
    "services.social.title": "Social Media & Ads",
    "services.social.description":
      "Professional campaigns on TikTok, Instagram, Facebook and Google Ads for maximum reach and measurable results.",
    "services.design.title": "Graphic Design & Branding",
    "services.design.description":
      "Creative design that brings your brand to life – from logos to complete corporate designs with recognition value.",
    "services.seo.title": "SEO & Performance",
    "services.seo.description":
      "Search engine optimization and technical performance optimization for best visibility and fast loading times.",
    "services.ai.title": "AI-Powered Video & Image Editing",
    "services.ai.description":
      "Professional video and image editing with AI technology for stunning visual content – fast, efficient, and high-quality.",

    // Projects
    "projects.badge": "In Development",
    "projects.title": "Ongoing Projects.",
    "projects.description": "A glimpse into our current projects. These websites are still under development and showcase our commitment to innovative digital solutions.",
    "projects.preview": "Live preview available",
    "projects.viewProject": "View Project",
    "projects.moreComingSoon": "More projects coming soon...",
    "projects.crypto.title": "Crypto News Portal",
    "projects.crypto.description": "A modern news portal for cryptocurrencies with real-time updates, market analysis, and industry news.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Elegant portfolio website for a creative design studio with minimalist aesthetics and fluid animations.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Professional web presence for a high-performance car dealership in Leipzig with modern design and premium vehicle presentation.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "High-end fashion e-commerce shop with modern design and seamless user experience.",
    "projects.donation.title": "Al Salam Donation Website",
    "projects.donation.description": "Professional donation website for humanitarian purposes with modern design and user-friendly donation management.",
    "projects.hazechill.title": "Haze & Chill Cafe",
    "projects.hazechill.description":
      "Design and social media management for a trendy café – from brand identity to Instagram presence. We also support the café with menu design, correspondence with advertising partners, and actively in developing and scaling the concept.",
    "projects.reel.title": "Haze & Chill Café – Content Production",
    "projects.reel.description":
      "This production is part of our content work for Haze & Chill Café. We develop and produce reels and visual content for the brand's Instagram presence.",

    // About
    "about.label": "The mind behind it",
    "about.title": "Vision meets execution.",
    "about.description":
      "Led by <strong>Yasin Adam Aissani</strong>, Naser Solutions stands for innovation and quality. As a newly founded agency, we bring fresh wind to the industry – with the hunger to create extraordinary things and prove ourselves through excellent work.",
    "about.benefit1": "Fresh perspectives & innovative ideas",
    "about.benefit2": "Latest technologies & frameworks",
    "about.benefit3": "Personal support from the start",
    "about.benefit4": "Fair prices for highest quality",
    "about.role": "Director & Founder",

    // Vision
    "vision.label": "Our Vision",
    "vision.title": "Think big. Become bigger.",
    "vision.description":
      "As a young agency, we have no legacy – only unlimited potential. We're here to prove that fresh ideas and relentless drive make the difference.",
    "vision.innovation.title": "Innovation First",
    "vision.innovation.description": "We use the latest technologies and trends to develop future-proof solutions.",
    "vision.results.title": "Results-oriented",
    "vision.results.description": "Every project is implemented with clear goals and measurable success.",
    "vision.creative.title": "Creative Excellence",
    "vision.creative.description": "Design that not only looks good but tells stories and evokes emotions.",
    "vision.partnership.title": "Partnership",
    "vision.partnership.description":
      "We see ourselves as an extension of your team – transparent, reliable, committed.",

    // Tools
    "tools.badge": "Technology Stack",
    "tools.title": "Professional Tools",
    "tools.description": "We work with industry-leading AI and design platforms to deliver digital solutions at the highest level.",

    // Contact
    "contact.label": "Contact",
    "contact.title": "Start your project.",
    "contact.description": "Contact us for a free consultation. We look forward to making your vision a reality.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.whatsapp": "Contact directly via WhatsApp",
    "contact.form.title": "Send us a message",
    "contact.form.name": "Name *",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email *",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.phone": "Phone (optional)",
    "contact.form.phonePlaceholder": "+49 123 456789",
    "contact.form.message": "Message *",
    "contact.form.messagePlaceholder": "Tell us about your project...",
    "contact.form.submit": "Send message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Thank you for your message! We will get back to you shortly.",
    "contact.form.error": "An error occurred. Please try again or contact us directly.",

    // Footer
    "footer.imprint": "Imprint",
    "footer.privacy": "Privacy",
    "footer.agb": "Terms",
    "footer.rights": "All rights reserved.",
    "footer.cryptoAccepted": "Crypto accepted",
    "footer.payment": "Payment",

    // Modal
    "modal.backToSite": "Back to site",

    // AGB
    "agb.badge": "Legal Information",
    "agb.title": "Terms and Conditions",
    "agb.lastUpdated": "Last updated: January 2026",
    "agb.section1.title": "1. Scope",
    "agb.section1.p1": "These Terms and Conditions apply to all contracts between Naser Solutions (hereinafter 'Contractor') and its clients (hereinafter 'Client') for the provision of services in web design, web development, app development, social media marketing, graphic design, and AI-powered video and image editing.",
    "agb.section1.p2": "Deviating conditions of the Client are not recognized unless the Contractor expressly agrees to their validity in writing.",
    "agb.section2.title": "2. Contract Formation",
    "agb.section2.p1": "Offers from the Contractor are non-binding unless expressly marked as binding. The contract is concluded by written order confirmation from the Contractor or by commencement of service provision.",
    "agb.section2.p2": "Oral side agreements require written confirmation by the Contractor to be effective.",
    "agb.section3.title": "3. Scope of Services",
    "agb.section3.p1": "The scope of services to be provided is determined by the service description in the order confirmation. Subsequent change requests from the Client will be charged separately.",
    "agb.section3.list1": "Web Design and Development: Conception, design, and technical implementation of websites",
    "agb.section3.list2": "App Development: Development of customized applications for various platforms",
    "agb.section3.list3": "AI-Powered Image and Video Editing: Professional editing using state-of-the-art AI technologies",
    "agb.section4.title": "4. Client Obligations",
    "agb.section4.p1": "The Client undertakes to provide all information, documents, and access necessary for the execution of the order in a timely manner. Delays resulting from late or incomplete deliveries are at the Client's expense.",
    "agb.section4.p2": "The Client is obligated to promptly review drafts and intermediate results created by the Contractor and communicate any change requests.",
    "agb.section5.title": "5. Prices and Payment Terms",
    "agb.section5.p1": "All prices are exclusive of statutory VAT. Payment is due within 14 days of invoicing without deduction. For projects with longer duration, partial payments can be agreed.",
    "agb.section5.p2": "We accept payments in Bitcoin (BTC), Solana (SOL), Monero (XMR) as well as bank transfer. In case of payment default, default interest of 9 percentage points above the base rate will be charged.",
    "agb.portfolio.title": "6. Usage Rights and Portfolio Use",
    "agb.portfolio.p1": "The Contractor grants the Client the contractually agreed usage rights to the created works after full payment of the fee. Unless otherwise agreed, the Client receives a simple, temporally and geographically unlimited right of use.",
    "agb.portfolio.p2": "<strong>Portfolio Use:</strong> The Contractor reserves the right to use the work created within the project (websites, apps, designs, videos, images) for their own marketing and presentation purposes. This includes in particular the presentation in portfolio, on their own website, on social media, and to potential new clients as a reference.",
    "agb.portfolio.p3": "If the Client expressly does not wish portfolio use, this must be communicated in writing before contract conclusion. In this case, a surcharge of 20% on the project costs may be levied.",
    "agb.section6.title": "7. Warranty",
    "agb.section6.p1": "The Contractor warrants that the created works are free from material defects and defects of title at the time of acceptance. The warranty period is 12 months from acceptance.",
    "agb.section6.p2": "Claims for defects require that the Client has properly fulfilled their inspection and notification obligations according to § 377 HGB. In case of justified defect notification, subsequent performance will be carried out first.",
    "agb.section7.title": "8. Liability",
    "agb.section7.p1": "The Contractor is liable without limitation for intent and gross negligence as well as for injury to life, body, or health. For slight negligence, the Contractor is only liable for breach of essential contractual obligations.",
    "agb.section7.p2": "Liability for data loss is limited to the typical recovery effort that would have arisen with regular creation of backup copies.",
    "agb.section8.title": "9. Confidentiality",
    "agb.section8.p1": "Both contracting parties undertake to keep confidential all confidential information that becomes known in the course of cooperation and to use it only for the fulfillment of the contract.",
    "agb.section8.p2": "This obligation continues even after termination of the contractual relationship.",
    "agb.section9.title": "10. Final Provisions",
    "agb.section9.p1": "The law of the Federal Republic of Germany applies. The place of jurisdiction is, insofar as legally permissible, the seat of the Contractor. Should individual provisions of these terms be invalid, the validity of the remaining provisions remains unaffected.",

    // Impressum
    "impressum.title": "Legal Notice",
    "impressum.subtitle": "Information according to § 5 DDG",
    "impressum.companyInfo": "Company Information",
    "impressum.contact": "Contact",
    "impressum.email": "Email",
    "impressum.phone": "Phone",
    "impressum.website": "Website",
    "impressum.responsible": "Responsible for content according to § 18 para. 2 MStV",
    "impressum.disclaimer": "Disclaimer",
    "impressum.liabilityContent": "Liability for Content",
    "impressum.liabilityContentText":
      "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 para. 1 DDG. According to §§ 8 to 10 DDG, however, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.",
    "impressum.liabilityLinks": "Liability for Links",
    "impressum.liabilityLinksText":
      "Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.",
    "impressum.copyright": "Copyright",
    "impressum.copyrightText":
      "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.",
    "impressum.dispute": "Dispute Resolution",
    "impressum.disputeText":
      "The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr/. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
    "impressum.backHome": "Back to homepage",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.subtitle": "Information according to GDPR",
    "privacy.lastUpdated": "Last updated",
    "privacy.email": "Email",
    "privacy.phone": "Phone",
    "privacy.responsible.title": "1. Responsible Party",
    "privacy.overview.title": "2. Overview of Data Processing",
    "privacy.overview.text":
      "The protection of your personal data is important to us. In this privacy policy, we inform you about what personal data we collect, for what purposes we process it, and what rights you have.",
    "privacy.legalBasis.title": "3. Legal Basis for Processing",
    "privacy.legalBasis.text": "The processing of personal data is based on the following legal bases:",
    "privacy.legalBasis.consent": "Consent (Art. 6 para. 1 lit. a GDPR)",
    "privacy.legalBasis.contract": "Contract fulfillment (Art. 6 para. 1 lit. b GDPR)",
    "privacy.legalBasis.legal": "Legal obligation (Art. 6 para. 1 lit. c GDPR)",
    "privacy.legalBasis.interest": "Legitimate interest (Art. 6 para. 1 lit. f GDPR)",
    "privacy.hosting.title": "4. Hosting",
    "privacy.hosting.text":
      "Our website is hosted by Vercel Inc. The host collects information in so-called log files that your browser automatically transmits.",
    "privacy.hosting.dpa":
      "We have a data processing agreement with Vercel. Data transfer to the USA is based on EU standard contractual clauses.",
    "privacy.logfiles.title": "5. Server Log Files",
    "privacy.logfiles.text": "The following data is automatically collected each time you access our website:",
    "privacy.logfiles.ip": "IP address (anonymized)",
    "privacy.logfiles.datetime": "Date and time of the request",
    "privacy.logfiles.browser": "Browser type and version",
    "privacy.logfiles.os": "Operating system",
    "privacy.logfiles.referrer": "Referrer URL (previously visited page)",
    "privacy.logfiles.pages": "Pages visited",
    "privacy.logfiles.purpose":
      "This data is technically necessary to display the website and ensure stability and security. The legal basis is Art. 6 para. 1 lit. f GDPR (legitimate interest).",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text":
      "Our website uses only technically necessary cookies. These are required for the operation of the website and do not store personal data.",
    "privacy.cookies.name": "Cookie Name",
    "privacy.cookies.purpose": "Purpose",
    "privacy.cookies.duration": "Duration",
    "privacy.cookies.themeDesc": "Stores your preference for light/dark mode",
    "privacy.cookies.langDesc": "Stores your preferred language setting",
    "privacy.cookies.year": "year",
    "privacy.cookies.settings":
      "You can disable cookies in your browser settings at any time. Note that this may limit the functionality of the website.",
    "privacy.contact.title": "7. Contact Form",
    "privacy.contact.text": "When you contact us via the contact form, the following data is collected:",
    "privacy.contact.name": "Name",
    "privacy.contact.emailData": "Email address",
    "privacy.contact.phoneData": "Phone number (optional)",
    "privacy.contact.message": "Your message",
    "privacy.contact.storage":
      "This data is used to process your request and deleted after completion, unless legal retention obligations exist. Legal basis is Art. 6 para. 1 lit. b GDPR (pre-contractual measures) or Art. 6 para. 1 lit. f GDPR (legitimate interest).",
    "privacy.rights.title": "8. Your Rights",
    "privacy.rights.text": "You have the following rights under GDPR:",
    "privacy.rights.access": "Right of Access (Art. 15 GDPR)",
    "privacy.rights.accessDesc":
      "You have the right to obtain information about the personal data we process about you.",
    "privacy.rights.rectification": "Right to Rectification (Art. 16 GDPR)",
    "privacy.rights.rectificationDesc":
      "You have the right to request the correction of inaccurate or completion of incomplete data.",
    "privacy.rights.erasure": "Right to Erasure (Art. 17 GDPR)",
    "privacy.rights.erasureDesc":
      "You have the right to request the deletion of your data, unless retention obligations apply.",
    "privacy.rights.restriction": "Right to Restriction (Art. 18 GDPR)",
    "privacy.rights.restrictionDesc": "You have the right to request the restriction of processing of your data.",
    "privacy.rights.portability": "Right to Data Portability (Art. 20 GDPR)",
    "privacy.rights.portabilityDesc":
      "You have the right to receive your data in a structured, commonly used and machine-readable format.",
    "privacy.rights.objection": "Right to Object (Art. 21 GDPR)",
    "privacy.rights.objectionDesc":
      "You have the right to object to the processing of your data for reasons arising from your particular situation.",
    "privacy.rights.complaint": "Right to Lodge a Complaint (Art. 77 GDPR)",
    "privacy.rights.complaintDesc":
      "You have the right to lodge a complaint with a supervisory authority if you believe that the processing of your data is unlawful.",
    "privacy.security.title": "9. Data Security",
    "privacy.security.text":
      "We use SSL/TLS encryption for secure data transmission. Our website is only accessible via HTTPS. We implement technical and organizational measures to protect your data from unauthorized access, loss, or misuse.",
    "privacy.changes.title": "10. Changes to this Privacy Policy",
    "privacy.changes.text":
      "We reserve the right to adapt this privacy policy as needed to adapt to changed legal situations or changes in our services. The current version published on our website always applies.",
    "privacy.backHome": "Back to homepage",

    // Payment Page
    "payment.badge": "Secure Crypto Payments",
    "payment.title": "Pay with Crypto",
    "payment.description":
      "We accept Bitcoin, Solana, and Monero for fast, secure, and global payments without intermediaries.",
    "payment.secure": "100% Secure",
    "payment.fast": "Fast Transactions",
    "payment.global": "Available Worldwide",
    "payment.walletAddress": "Wallet Address",
    "payment.showQR": "QR Code",
    "payment.hideQR": "Hide",
    "payment.copy": "Copy",
    "payment.copied": "Copied!",
    "payment.scanQR": "Scan QR code to pay",
    "payment.questions": "Questions about payment?",
    "payment.contactUs": "Contact us",
    "payment.btc.benefit1": "Lightning Network for instant payments",
    "payment.btc.benefit2": "On-Chain for larger amounts",
    "payment.btc.benefit3": "Globally accepted standard",
    "payment.sol.benefit1": "Ultra-fast transactions (<1 sec)",
    "payment.sol.benefit2": "Minimal fees (~$0.00025)",
    "payment.sol.benefit3": "High scalability",
    "payment.xmr.benefit1": "Maximum privacy",
    "payment.xmr.benefit2": "Complete anonymity",
    "payment.xmr.benefit3": "No transaction tracking",
  },
  fr: {
    // Navbar
    "nav.services": "Services",
    "nav.projects": "Projets",
    "nav.about": "À propos",
    "nav.vision": "Vision",
    "nav.contact": "Contact",
    "nav.cryptoPayment": "Paiement Crypto",

    // Projects
    "projects.badge": "En développement",
    "projects.title": "Projets en cours.",
    "projects.description": "Un aperçu de nos projets actuels. Ces sites web sont encore en développement et montrent notre engagement pour des solutions numériques innovantes.",
    "projects.preview": "Aperçu en direct disponible",
    "projects.viewProject": "Voir le projet",
    "projects.moreComingSoon": "Plus de projets à venir...",
    "projects.crypto.title": "Portail Crypto News",
    "projects.crypto.description": "Un portail d'actualités moderne pour les cryptomonnaies avec des mises à jour en temps réel, des analyses de marché et des nouvelles de l'industrie.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Site portfolio élégant pour un studio de design créatif avec une esthétique minimaliste et des animations fluides.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Présence web professionnelle pour un concessionnaire haute performance à Leipzig avec un design moderne et une présentation premium des véhicules.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "Boutique e-commerce de mode haut de gamme avec un design moderne et une expérience utilisateur fluide.",
    "projects.donation.title": "Site de Dons Al Salam",
    "projects.donation.description": "Site de dons professionnel à des fins humanitaires avec un design moderne et une gestion des dons conviviale.",

    // Hero
    "hero.badge": "Fondée en 2026",
    "hero.eyebrow": "Nous pensons, concevons et développons des solutions numériques",
    "hero.subtitle": "nous pensons, concevons et développons",
    "hero.title1": "Sites Web & Branding,",
    "hero.title2": "qui génèrent de la visibilité et des ventes.",
    "hero.description":
      "Pour les entreprises, les indépendants et les créateurs qui veulent être pris au sérieux en ligne et attendre des résultats.",
    "hero.cta": "Commencer le projet",
    "hero.cta2": "Consultation Initiale Gratuite",
    "hero.refBtn": "Projets de Référence",
    "hero.vision": "Notre Vision",
    "hero.trust": "Déjà mis en œuvre avec succès pour des clients à travers l'Europe",
    "hero.languages": "Allemand et anglais courants · Arabe et français au niveau professionnel",
    "hero.regions": "Projets notamment en Allemagne, France et Portugal",

    // Stats
    "stats.founded": "fondée",
    "stats.potential": "Potentiel",
    "stats.passion": "Passion",
    "stats.availability": "Disponibilité",

    // Services
    "services.label": "Services",
    "services.title": "Ce que nous faisons pour vous.",
    "services.description":
      "De l'idée à la solution finie – nous vous accompagnons dans toutes les phases de votre projet digital.",
    "services.web.title": "Design & Développement Web",
    "services.web.description":
      "Sites web professionnels et modernes qui présentent votre entreprise de manière optimale et convainquent les clients.",
    "services.influencer.title": "Sites pour Influenceurs",
    "services.influencer.description":
      "Présences digitales uniques pour créateurs de contenu et influenceurs avec portfolios et intégration réseaux sociaux.",
    "services.supermarket.title": "Applications Supermarché",
    "services.supermarket.description":
      "Applications sur mesure avec notifications push, coupons digitaux et programmes de fidélité pour le commerce.",
    "services.social.title": "Réseaux Sociaux & Publicité",
    "services.social.description":
      "Campagnes professionnelles sur TikTok, Instagram, Facebook et Google Ads pour une portée maximale.",
    "services.design.title": "Design Graphique & Branding",
    "services.design.description":
      "Design créatif qui donne vie à votre marque – des logos aux designs d'entreprise complets.",
    "services.seo.title": "SEO & Performance",
    "services.seo.description":
      "Optimisation pour les moteurs de recherche et performance technique pour une visibilité optimale.",

    // About
    "about.label": "Le cerveau derrière",
    "about.title": "La vision rencontre l'exécution.",
    "about.description":
      "Sous la direction de <strong>Yasin Adam Aissani</strong>, Naser Solutions représente l'innovation et la qualité.",
    "about.benefit1": "Perspectives fraîches & idées innovantes",
    "about.benefit2": "Technologies & frameworks les plus récents",
    "about.benefit3": "Accompagnement personnel dès le début",
    "about.benefit4": "Prix justes pour la plus haute qualité",
    "about.role": "Directeur & Fondateur",

    // Vision
    "vision.label": "Notre Vision",
    "vision.title": "Penser grand. Devenir plus grand.",
    "vision.description": "En tant que jeune agence, nous n'avons pas d'héritage – seulement un potentiel illimité.",
    "vision.innovation.title": "Innovation First",
    "vision.innovation.description":
      "Nous utilisons les dernières technologies et tendances pour développer des solutions pérennes.",
    "vision.results.title": "Orienté résultats",
    "vision.results.description": "Chaque projet est réalisé avec des objectifs clairs et des succès mesurables.",
    "vision.creative.title": "Excellence Créative",
    "vision.creative.description": "Un design qui non seulement est beau mais raconte des histoires.",
    "vision.partnership.title": "Partenariat",
    "vision.partnership.description":
      "Nous nous voyons comme une extension de votre équipe – transparent, fiable, engagé.",

    // Tools
    "tools.badge": "Stack Technologique",
    "tools.title": "Outils des Professionnels",
    "tools.description": "Nous travaillons avec les meilleures plateformes d'IA et de design pour offrir des solutions numériques au plus haut niveau.",

    // Contact
    "contact.label": "Contact",
    "contact.title": "Démarrez votre projet.",
    "contact.description": "Contactez-nous pour une consultation gratuite.",
    "contact.email": "E-mail",
    "contact.phone": "Téléphone",
    "contact.location": "Localisation",
    "contact.whatsapp": "Contacter directement via WhatsApp",
    "contact.form.title": "Envoyez-nous un message",
    "contact.form.name": "Nom *",
    "contact.form.namePlaceholder": "Votre nom",
    "contact.form.email": "E-mail *",
    "contact.form.emailPlaceholder": "votre@email.fr",
    "contact.form.phone": "Téléphone (optionnel)",
    "contact.form.phonePlaceholder": "+33 1 23 45 67 89",
    "contact.form.message": "Message *",
    "contact.form.messagePlaceholder": "Parlez-nous de votre projet...",
    "contact.form.submit": "Envoyer le message",
    "contact.form.sending": "Envoi en cours...",
    "contact.form.success": "Merci pour votre message ! Nous vous répondrons bientôt.",

    // Footer
    "footer.imprint": "Mentions légales",
    "footer.privacy": "Confidentialité",
    "footer.rights": "Tous droits réservés.",
    "footer.cryptoAccepted": "Crypto acceptée",
    "footer.payment": "Paiement",

    // Modal
    "modal.backToSite": "Retour au site",

    // Impressum
    "impressum.title": "Mentions Légales",
    "impressum.subtitle": "Informations conformément à § 5 DDG",
    "impressum.companyInfo": "Informations sur l'entreprise",
    "impressum.contact": "Contact",
    "impressum.email": "E-mail",
    "impressum.phone": "Téléphone",
    "impressum.website": "Site web",
    "impressum.responsible": "Responsable du contenu selon § 18 al. 2 MStV",
    "impressum.disclaimer": "Clause de non-responsabilité",
    "impressum.liabilityContent": "Responsabilité pour le contenu",
    "impressum.liabilityContentText":
      "En tant que fournisseur de services, nous sommes responsables de notre propre contenu sur ces pages.",
    "impressum.liabilityLinks": "Responsabilité pour les liens",
    "impressum.liabilityLinksText":
      "Notre site contient des liens vers des sites externes sur lesquels nous n'avons aucune influence.",
    "impressum.copyright": "Droits d'auteur",
    "impressum.copyrightText": "Le contenu et les œuvres créés sur ces pages sont soumis au droit d'auteur allemand.",
    "impressum.dispute": "Règlement des litiges",
    "impressum.disputeText": "La Commission européenne fournit une plateforme de règlement en ligne des litiges.",
    "impressum.backHome": "Retour à l'accueil",

    // Privacy Policy
    "privacy.title": "Politique de Confidentialité",
    "privacy.subtitle": "Informations conformément au RGPD",
    "privacy.lastUpdated": "Dernière mise à jour",
    "privacy.email": "E-mail",
    "privacy.phone": "Téléphone",
    "privacy.responsible.title": "1. Responsable du traitement",
    "privacy.overview.title": "2. Aperçu du traitement des données",
    "privacy.overview.text":
      "La protection de vos données personnelles est importante pour nous. Dans cette politique de confidentialité, nous vous informons sur les données personnelles que nous collectons.",
    "privacy.legalBasis.title": "3. Base juridique du traitement",
    "privacy.legalBasis.text":
      "Le traitement des données personnelles est basé sur les fondements juridiques suivants:",
    "privacy.legalBasis.consent": "Consentement (Art. 6 para. 1 lit. a RGPD)",
    "privacy.legalBasis.contract": "Exécution du contrat (Art. 6 para. 1 lit. b RGPD)",
    "privacy.legalBasis.legal": "Obligation légale (Art. 6 para. 1 lit. c RGPD)",
    "privacy.legalBasis.interest": "Intérêt légitime (Art. 6 para. 1 lit. f RGPD)",
    "privacy.hosting.title": "4. Hébergement",
    "privacy.hosting.text":
      "Notre site web est hébergé par Vercel Inc. L'hébergeur collecte des informations dans les fichiers journaux.",
    "privacy.hosting.dpa":
      "Nous avons un accord de traitement des données avec Vercel. Le transfert de données vers les États-Unis est basé sur les clauses contractuelles types de l'UE.",
    "privacy.logfiles.title": "5. Fichiers journaux du serveur",
    "privacy.logfiles.text": "Les données suivantes sont automatiquement collectées lors de chaque accès:",
    "privacy.logfiles.ip": "Adresse IP (anonymisée)",
    "privacy.logfiles.datetime": "Date et heure de la demande",
    "privacy.logfiles.browser": "Type et version du navigateur",
    "privacy.logfiles.os": "Système d'exploitation",
    "privacy.logfiles.referrer": "URL de référence",
    "privacy.logfiles.pages": "Pages visitées",
    "privacy.logfiles.purpose":
      "Ces données sont techniquement nécessaires pour afficher le site web et assurer la stabilité et la sécurité.",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text": "Notre site utilise uniquement des cookies techniquement nécessaires.",
    "privacy.cookies.name": "Nom du cookie",
    "privacy.cookies.purpose": "Objectif",
    "privacy.cookies.duration": "Durée",
    "privacy.cookies.themeDesc": "Enregistre votre préférence de mode clair/sombre",
    "privacy.cookies.langDesc": "Enregistre votre préférence de langue",
    "privacy.cookies.year": "an",
    "privacy.cookies.settings": "Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.",
    "privacy.contact.title": "7. Formulaire de contact",
    "privacy.contact.text": "Lorsque vous nous contactez via le formulaire, les données suivantes sont collectées:",
    "privacy.contact.name": "Nom",
    "privacy.contact.emailData": "Adresse e-mail",
    "privacy.contact.phoneData": "Numéro de téléphone (optionnel)",
    "privacy.contact.message": "Votre message",
    "privacy.contact.storage": "Ces données sont utilisées pour traiter votre demande et supprimées après traitement.",
    "privacy.rights.title": "8. Vos droits",
    "privacy.rights.text": "Vous disposez des droits suivants en vertu du RGPD:",
    "privacy.rights.access": "Droit d'accès (Art. 15 RGPD)",
    "privacy.rights.accessDesc": "Vous avez le droit d'obtenir des informations sur vos données personnelles.",
    "privacy.rights.rectification": "Droit de rectification (Art. 16 RGPD)",
    "privacy.rights.rectificationDesc": "Vous avez le droit de demander la correction de données inexactes.",
    "privacy.rights.erasure": "Droit à l'effacement (Art. 17 RGPD)",
    "privacy.rights.erasureDesc": "Vous avez le droit de demander la suppression de vos données.",
    "privacy.rights.restriction": "Droit à la limitation (Art. 18 RGPD)",
    "privacy.rights.restrictionDesc": "Vous avez le droit de demander la limitation du traitement.",
    "privacy.rights.portability": "Droit à la portabilité (Art. 20 RGPD)",
    "privacy.rights.portabilityDesc": "Vous avez le droit de recevoir vos données dans un format structuré.",
    "privacy.rights.objection": "Droit d'opposition (Art. 21 RGPD)",
    "privacy.rights.objectionDesc": "Vous avez le droit de vous opposer au traitement de vos données.",
    "privacy.rights.complaint": "Droit de réclamation (Art. 77 RGPD)",
    "privacy.rights.complaintDesc": "Vous avez le droit de déposer une plainte auprès d'une autorité de contrôle.",
    "privacy.security.title": "9. Sécurité des données",
    "privacy.security.text": "Nous utilisons le cryptage SSL/TLS pour la transmission sécurisée des données.",
    "privacy.changes.title": "10. Modifications de cette politique",
    "privacy.changes.text": "Nous nous réservons le droit d'adapter cette politique de confidentialité si nécessaire.",
    "privacy.backHome": "Retour à l'accueil",

    // Payment Page
    "payment.badge": "Paiements crypto sécurisés",
    "payment.title": "Payer en crypto",
    "payment.description":
      "Nous acceptons Bitcoin, Solana et Monero pour des paiements rapides, sécurisés et mondiaux sans intermédiaires.",
    "payment.secure": "100% Sécurisé",
    "payment.fast": "Transactions rapides",
    "payment.global": "Disponible mondialement",
    "payment.walletAddress": "Adresse du portefeuille",
    "payment.showQR": "Code QR",
    "payment.hideQR": "Masquer",
    "payment.copy": "Copier",
    "payment.copied": "Copié!",
    "payment.scanQR": "Scanner le code QR pour payer",
    "payment.questions": "Questions sur le paiement?",
    "payment.contactUs": "Contactez-nous",
    "payment.btc.benefit1": "Lightning Network pour paiements instantanés",
    "payment.btc.benefit2": "On-Chain pour montants plus importants",
    "payment.btc.benefit3": "Standard accepté mondialement",
    "payment.sol.benefit1": "Transactions ultra-rapides (<1 sec)",
    "payment.sol.benefit2": "Frais minimaux (~$0.00025)",
    "payment.sol.benefit3": "Haute évolutivité",
    "payment.xmr.benefit1": "Confidentialité maximale",
    "payment.xmr.benefit2": "Anonymat complet",
    "payment.xmr.benefit3": "Aucun suivi des transactions",
  },
  ar: {
    // Navbar
    "nav.services": "الخدمات",
    "nav.projects": "المشاريع",
    "nav.about": "من نحن",
    "nav.vision": "الرؤية",
    "nav.contact": "اتصل بنا",
    "nav.cryptoPayment": "الدفع بالعملات المشفرة",

    // Projects
    "projects.badge": "قيد التطوير",
    "projects.title": "المشاريع الجارية.",
    "projects.description": "نظرة على مشاريعنا الحالية. هذه المواقع لا تزال قيد التطوير وتُظهر التزامنا بالحلول الرقمية المبتكرة.",
    "projects.preview": "معاينة مباشرة متاحة",
    "projects.viewProject": "عرض المشروع",
    "projects.moreComingSoon": "المزيد من المشاريع قريباً...",
    "projects.crypto.title": "بوابة أخبار العملات المشفرة",
    "projects.crypto.description": "بوابة أخبار حديثة للعملات المشفرة مع تحديثات فورية وتحليلات السوق وأخبار الصناعة.",
    "projects.studio.title": "ستوديو غلاسيه",
    "projects.studio.description": "موقع بورتفوليو أنيق لاستوديو تصميم إبداعي بجمالية بسيطة ورسوم متحركة سلسة.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "حضور ويب احترافي لوكالة سيارات عالية الأداء في لايبزيغ بتصميم حديث وعرض مميز للمركبات.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "متجر إلكتروني للأزياء الراقية بتصميم عصري وتجربة مستخدم سلسة.",
    "projects.donation.title": "موقع التبرعات Al Salam",
    "projects.donation.description": "موقع تبرع احترافي للأغراض الإنسانية بتصميم حديث وإدارة تبرعات سهلة الاستخدام.",

    // Hero
    "hero.badge": "تأسست في 2026",
    "hero.subtitle": "نفكر، نصمم ونطور",
    "hero.title1": "المستقبل.",
    "hero.title2": "رقمياً.",
    "hero.description":
      "ناصر سوليوشنز هي وكالة ويب مبتكرة ذات طموحات كبيرة. نجمع بين أحدث التقنيات والتصميم الإبداعي لخلق تجارب رقمية ملهمة.",
    "hero.cta": "لنبدأ",
    "hero.cta2": "استشارة أولى مجانية",
    "hero.refBtn": "مشاريع مرجعية",
    "hero.vision": "رؤيتنا",

    // Stats
    "stats.founded": "تأسست",
    "stats.potential": "إمكانات",
    "stats.passion": "شغف",
    "stats.availability": "التوفر",

    // Services
    "services.label": "الخدمات",
    "services.title": "ما نقدمه لك.",
    "services.description": "من الفكرة إلى الحل النهائي – نرافقك في جميع مراحل مشروعك الرقمي.",
    "services.web.title": "تصميم وتطوير المواقع",
    "services.web.description": "مواقع احترافية وحديثة تقدم شركتك بشكل مثالي وتقنع العملاء.",
    "services.influencer.title": "مواقع المؤثرين",
    "services.influencer.description": "حضور رقمي فريد لصناع المحتوى والمؤثرين مع معارض الأعمال وتكامل وسائل التواصل.",
    "services.supermarket.title": "تطبيقات السوبرماركت",
    "services.supermarket.description": "تطبيقات مخصصة مع إشعارات فورية وكوبونات رقمية وبرامج ولاء.",
    "services.social.title": "وسائل التواصل والإعلانات",
    "services.social.description": "حملات احترافية على تيك توك وإنستغرام وفيسبوك وجوجل للوصول الأقصى.",
    "services.design.title": "التصميم الجرافيكي والهوية",
    "services.design.description": "تصميم إبداعي يحيي علامتك التجارية – من الشعارات إلى الهوية الكاملة.",
    "services.seo.title": "SEO والأداء",
    "services.seo.description": "تحسين محركات البحث والأداء التقني لأفضل ظهور وسرعة تحميل.",

    // About
    "about.label": "العقل المدبر",
    "about.title": "الرؤية تلتقي بالتنفيذ.",
    "about.description": "بقيادة <strong>ياسين آدم عيساني</strong>، تمثل ناصر سوليوشنز الابتكار والجودة.",
    "about.benefit1": "وجهات نظر جديدة وأفكار مبتكرة",
    "about.benefit2": "أحدث التقنيات والأطر",
    "about.benefit3": "دعم شخصي من البداية",
    "about.benefit4": "أسعار عادلة لأعلى جودة",
    "about.role": "المدير والمؤسس",

    // Vision
    "vision.label": "رؤيتنا",
    "vision.title": "فكر كبيراً. كن أكبر.",
    "vision.description": "كوكالة شابة، ليس لدينا إرث قديم – فقط إمكانات غير محدودة.",
    "vision.innovation.title": "الابتكار أولاً",
    "vision.innovation.description": "نستخدم أحدث التقنيات والاتجاهات لتطوير حلول مستقبلية.",
    "vision.results.title": "موجه بالنتائج",
    "vision.results.description": "كل مشروع ينفذ بأهداف واضحة ونجاح قابل للقياس.",
    "vision.creative.title": "التميز الإبداعي",
    "vision.creative.description": "تصميم لا يبدو جيداً فحسب بل يروي قصصاً ويثير المشاعر.",
    "vision.partnership.title": "الشراكة",
    "vision.partnership.description": "نعتبر أنفسنا امتداداً لفريقك – شفافون، موثوقون، ملتزمون.",

    // Tools
    "tools.badge": "مجموعة التكنولوجيا",
    "tools.title": "أدوات المحترفين",
    "tools.description": "نعمل مع أفضل منصات الذكاء الاصطناعي والتصميم لتقديم حلول رقمية على أعلى مستوى.",

    // Contact
    "contact.label": "اتصل بنا",
    "contact.title": "ابدأ مشروعك.",
    "contact.description": "تواصل معنا للحصول على استشارة مجانية.",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "الهاتف",
    "contact.location": "الموقع",
    "contact.whatsapp": "تواصل مباشرة عبر واتساب",
    "contact.form.title": "أرسل لنا رسالة",
    "contact.form.name": "الاسم *",
    "contact.form.namePlaceholder": "اسمك",
    "contact.form.email": "البريد الإلكتروني *",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.phone": "الهاتف (اختياري)",
    "contact.form.phonePlaceholder": "+49 123 456789",
    "contact.form.message": "الرسالة *",
    "contact.form.messagePlaceholder": "أخبرنا عن مشروعك...",
    "contact.form.submit": "إرسال الرسالة",
    "contact.form.sending": "جاري الإرسال...",
    "contact.form.success": "شكراً لرسا��تك! سنرد عليك قريباً.",

    // Footer
    "footer.imprint": "البيانات القانونية",
    "footer.privacy": "سياسة الخصوصية",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.cryptoAccepted": "نقبل العملات المشفرة",
    "footer.payment": "الدفع",

    // Modal
    "modal.backToSite": "العودة للموقع",

    // Impressum
    "impressum.title": "البيانات القانونية",
    "impressum.subtitle": "معلومات وفقاً للقانون الألماني",
    "impressum.companyInfo": "معلومات الشركة",
    "impressum.contact": "الاتصال",
    "impressum.email": "البريد الإلكتروني",
    "impressum.phone": "الهاتف",
    "impressum.website": "الموقع",
    "impressum.responsible": "المسؤول عن المحتوى",
    "impressum.disclaimer": "إخلاء المسؤولية",
    "impressum.liabilityContent": "المسؤولية عن المحتوى",
    "impressum.liabilityContentText": "كمزود خدمة، نحن مسؤولون عن المحتوى الخاص بنا على هذه الصفحات.",
    "impressum.liabilityLinks": "المسؤولية عن الروابط",
    "impressum.liabilityLinksText": "يحتوي موقعنا على روابط لمواقع خارجية ليس لدينا تأثير على محتواها.",
    "impressum.copyright": "حقوق النشر",
    "impressum.copyrightText": "المحتوى والأعمال على هذه الصفحات تخضع لقانون حقوق النشر الألماني.",
    "impressum.dispute": "تسوية النزاعات",
    "impressum.disputeText": "توفر المفوضية الأوروبية منصة لتسوية النزاعات عبر الإنترنت.",
    "impressum.backHome": "العودة للصفحة الرئيسية",

    // Privacy Policy
    "privacy.title": "سياسة الخصوصية",
    "privacy.subtitle": "معلومات وفقاً للائحة العامة لحماية البيانات",
    "privacy.lastUpdated": "آخر تحديث",
    "privacy.email": "البريد الإلكتروني",
    "privacy.phone": "الهاتف",
    "privacy.responsible.title": "1. الجهة المسؤولة",
    "privacy.overview.title": "2. نظرة عامة على معالجة البيانات",
    "privacy.overview.text":
      "حماية بياناتك الشخصية مهمة بالنسبة لنا. في سياسة الخصوصية هذه، نعلمك بالبيانات التي نجمعها.",
    "privacy.legalBasis.title": "3. الأساس القانوني للمعالجة",
    "privacy.legalBasis.text": "تستند معالجة البيانات الشخصية إلى الأسس القانونية التالية:",
    "privacy.legalBasis.consent": "الموافقة (المادة 6 فقرة 1 أ)",
    "privacy.legalBasis.contract": "تنفيذ العقد (المادة 6 فقرة 1 ب)",
    "privacy.legalBasis.legal": "الالتزام القانوني (المادة 6 فقرة 1 ج)",
    "privacy.legalBasis.interest": "المصلحة المشروعة (المادة 6 فقرة 1 و)",
    "privacy.hosting.title": "4. الاستضافة",
    "privacy.hosting.text": "موقعنا مستضاف لدى Vercel Inc. يجمع المضيف معلومات في ملفات السجل.",
    "privacy.hosting.dpa": "لدينا اتفاقية معالجة بيانات مع Vercel.",
    "privacy.logfiles.title": "5. ملفات سجل الخادم",
    "privacy.logfiles.text": "يتم جمع البيانات التالية تلقائياً عند كل زيارة:",
    "privacy.logfiles.ip": "عنوان IP (مجهول)",
    "privacy.logfiles.datetime": "تاريخ ووقت الطلب",
    "privacy.logfiles.browser": "نوع وإصدار المتصفح",
    "privacy.logfiles.os": "نظام التشغيل",
    "privacy.logfiles.referrer": "عنوان URL المرجعي",
    "privacy.logfiles.pages": "الصفحات المزارة",
    "privacy.logfiles.purpose": "هذه البيانات ضرورية تقنياً لعرض ��لموقع وضمان الاستقرار والأمان.",
    "privacy.cookies.title": "6. ملفات تعريف الارتباط",
    "privacy.cookies.text": "يستخدم موقعنا ملفات تعريف الارتباط الضرورية تقنياً فقط.",
    "privacy.cookies.name": "اسم الكوكي",
    "privacy.cookies.purpose": "الغرض",
    "privacy.cookies.duration": "المدة",
    "privacy.cookies.themeDesc": "يحفظ تفضيلك للوضع الفاتح/الداكن",
    "privacy.cookies.langDesc": "يحفظ إعداد اللغة المفضلة",
    "privacy.cookies.year": "سنة",
    "privacy.cookies.settings": "يمكنك تعطيل ملفات تعريف الارتباط في إعدادات المتصفح.",
    "privacy.contact.title": "7. نموذج الاتصال",
    "privacy.contact.text": "عند الاتصال بنا عبر النموذج، يتم جمع البيانات التالية:",
    "privacy.contact.name": "الاسم",
    "privacy.contact.emailData": "عنوان البريد الإلكتروني",
    "privacy.contact.phoneData": "رقم الهاتف (اختياري)",
    "privacy.contact.message": "رسالتك",
    "privacy.contact.storage": "تُستخدم هذه البيانات لمعالجة طلب���� وتُحذف بعد الانتهاء.",
    "privacy.rights.title": "8. حقوقك",
    "privacy.rights.text": "لديك الحقوق التالية بموجب اللائحة العامة لحماية البيانات:",
    "privacy.rights.access": "حق الوصول (المادة 15)",
    "privacy.rights.accessDesc": "لديك الحق في الحصول على معلومات حول بياناتك الشخصية.",
    "privacy.rights.rectification": "حق التصحيح (المادة 16)",
    "privacy.rights.rectificationDesc": "لديك الحق في طلب تصحيح البيانات غير الدقيقة.",
    "privacy.rights.erasure": "حق المحو (المادة 17)",
    "privacy.rights.erasureDesc": "لديك الحق في طلب حذف بياناتك.",
    "privacy.rights.restriction": "حق التقييد (المادة 18)",
    "privacy.rights.restrictionDesc": "لديك الحق في طلب تقييد معالجة بياناتك.",
    "privacy.rights.portability": "حق نقل البيانات (المادة 20)",
    "privacy.rights.portabilityDesc": "لديك الحق في الحصول على بياناتك بتنسيق منظم.",
    "privacy.rights.objection": "حق الاعتراض (المادة 21)",
    "privacy.rights.objectionDesc": "لديك الحق في الاعتراض على معالجة بياناتك.",
    "privacy.rights.complaint": "حق الشكوى (المادة 77)",
    "privacy.rights.complaintDesc": "لديك الحق في تقديم شكوى لدى سلطة إشرافية.",
    "privacy.security.title": "9. أمان البيانات",
    "privacy.security.text": "نستخدم تشفير SSL/TLS لنقل البيانات بشكل آمن.",
    "privacy.changes.title": "10. التغييرات على هذه السياسة",
    "privacy.changes.text": "نحتفظ بالحق في تعديل سياسة الخصوصية هذه حسب الحاجة.",
    "privacy.backHome": "العودة للصفحة الرئيسية",

    // Payment Page
    "payment.badge": "مدفوعات آمنة بالعملات المشفرة",
    "payment.title": "ادفع بالعملات المشفرة",
    "payment.description": "نقبل البيتكوين وسولانا ومونيرو للمدفوعات السريعة والآمنة والعالمية بدون وسطاء.",
    "payment.secure": "آمن 100%",
    "payment.fast": "معاملات سريعة",
    "payment.global": "متاح عالمياً",
    "payment.walletAddress": "عنوان المحفظة",
    "payment.showQR": "رمز QR",
    "payment.hideQR": "إخفاء",
    "payment.copy": "نسخ",
    "payment.copied": "تم النسخ!",
    "payment.scanQR": "امسح رمز QR للدفع",
    "payment.questions": "أسئلة حول الدفع؟",
    "payment.contactUs": "تواصل معنا",
    "payment.btc.benefit1": "شبكة Lightning للمدفوعات الفورية",
    "payment.btc.benefit2": "On-Chain للمبالغ الكبيرة",
    "payment.btc.benefit3": "معيار مقبول عالمياً",
    "payment.sol.benefit1": "معاملات فائقة السرعة (<1 ثانية)",
    "payment.sol.benefit2": "رسوم ضئيلة (~$0.00025)",
    "payment.sol.benefit3": "قابلية توسع عالية",
    "payment.xmr.benefit1": "أقصى درجات الخصوصية",
    "payment.xmr.benefit2": "إخفاء هوية كامل",
    "payment.xmr.benefit3": "لا تتبع للمعاملات",
  },
  tr: {
    // Navbar
    "nav.services": "Hizmetler",
    "nav.projects": "Projeler",
    "nav.about": "Hakkımızda",
    "nav.vision": "Vizyon",
    "nav.contact": "İletişim",
    "nav.cryptoPayment": "Kripto Ödeme",

    // Projects
    "projects.badge": "Geliştirme Aşamasında",
    "projects.title": "Devam Eden Projeler.",
    "projects.description": "Mevcut projelerimize bir bakış. Bu web siteleri hala geliştirme aşamasında ve yenilikçi dijital çözümlere olan bağlılığımızı gösteriyor.",
    "projects.preview": "Canlı önizleme mevcut",
    "projects.viewProject": "Projeyi Görüntüle",
    "projects.moreComingSoon": "Daha fazla proje yakında...",
    "projects.crypto.title": "Kripto Haber Portalı",
    "projects.crypto.description": "Gerçek zamanlı güncellemeler, piyasa analizleri ve sektör haberleri içeren modern bir kripto para haber portalı.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Minimalist estetik ve akıcı animasyonlarla yaratıcı bir tasarım stüdyosu için şık portfolyo sitesi.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Leipzig'deki yüksek performanslı bir otomobil bayisi için modern tasarım ve premium araç sunumuyla profesyonel web varlığı.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "Modern tasarım ve kusursuz kullanıcı deneyimi ile üst düzey moda e-ticaret mağazası.",
    "projects.donation.title": "Al Salam Bağış Websitesi",
    "projects.donation.description": "İnsani amaçlar için profesyonel bağış websitesi, modern tasarım ve kullanıcı dostu bağış yönetimiyle.",

    // Hero
    "hero.badge": "2026'da kuruldu",
    "hero.subtitle": "düşünüyoruz, tasarlıyoruz ve geliştiriyoruz",
    "hero.title1": "geleceği.",
    "hero.title2": "dijital.",
    "hero.description":
      "Naser Solutions, büyük hedefleri olan yenilikçi bir web ajansıdır. İlham veren dijital deneyimler yaratmak için en son teknolojiyi yaratıcı tasarımla birleştiriyoruz.",
    "hero.cta": "Başlayalım",
    "hero.cta2": "Ücretsiz İlk Danışma",
    "hero.refBtn": "Referans Projeler",
    "hero.vision": "Vizyonumuz",

    // Stats
    "stats.founded": "kuruldu",
    "stats.potential": "Potansiyel",
    "stats.passion": "Tutku",
    "stats.availability": "Ulaşılabilirlik",

    // Services
    "services.label": "Hizmetler",
    "services.title": "Sizin için ne yapıyoruz.",
    "services.description": "Fikirden bitmiş çözüme – dijital projenizin tüm aşamalarında size eşlik ediyoruz.",
    "services.web.title": "Web Tasarım ve Geliştirme",
    "services.web.description":
      "Şirketinizi en iyi şekilde sunan ve müşterileri ikna eden profesyonel ve modern web siteleri.",
    "services.influencer.title": "Influencer Web Siteleri",
    "services.influencer.description":
      "İçerik oluşturucular ve influencerlar için portföy vitrinleri ve sosyal medya entegrasyonu ile benzersiz dijital varlıklar.",
    "services.supermarket.title": "Süpermarket Uygulamaları",
    "services.supermarket.description":
      "Push bildirimleri, dijital kuponlar ve sadakat programları ile özel uygulamalar.",
    "services.social.title": "Sosyal Medya ve Reklamlar",
    "services.social.description":
      "TikTok, Instagram, Facebook ve Google Ads'de maksimum erişim için profesyonel kampanyalar.",
    "services.design.title": "Grafik Tasarım ve Marka",
    "services.design.description": "Markanızı hayata geçiren yaratıcı tasarım – logolardan kurumsal tasarımlara.",
    "services.seo.title": "SEO ve Performans",
    "services.seo.description": "En iyi görünürlük ve hızlı yükleme süreleri için arama motoru optimizasyonu.",

    // About
    "about.label": "Arkasındaki beyin",
    "about.title": "Vizyon uygulamayla buluşuyor.",
    "about.description":
      "<strong>Yasin Adam Aissani</strong> liderliğinde, Naser Solutions yenilik ve kaliteyi temsil ediyor.",
    "about.benefit1": "Taze bakış açıları ve yenilikçi fikirler",
    "about.benefit2": "En son teknolojiler ve frameworkler",
    "about.benefit3": "Baştan itibaren kişisel destek",
    "about.benefit4": "En yüksek kalite için adil fiyatlar",
    "about.role": "Direktör ve Kurucu",

    // Vision
    "vision.label": "Vizyonumuz",
    "vision.title": "Büyük düşün. Daha büyük ol.",
    "vision.description": "Genç bir ajans olarak mirasımız yok – sadece sınırsız potansiyel.",
    "vision.innovation.title": "Önce İnovasyon",
    "vision.innovation.description": "Geleceğe yönelik çözümler geliştirmek için en son teknolojileri kullanıyoruz.",
    "vision.results.title": "Sonuç odaklı",
    "vision.results.description": "Her proje net hedefler ve ölçülebilir başarıyla uygulanır.",
    "vision.creative.title": "Yaratıcı Mükemmellik",
    "vision.creative.description": "Sadece iyi görünmekle kalmayıp hikayeler anlatan tasarım.",
    "vision.partnership.title": "Ortaklık",
    "vision.partnership.description": "Kendimizi ekibinizin uzantısı olarak görüyoruz – şeffaf, güvenilir, kararlı.",

    // Tools
    "tools.badge": "Teknoloji Yığını",
    "tools.title": "Profesyonellerin Araçları",
    "tools.description": "En iyi yapay zeka ve tasarım platformlarıyla çalışarak en yüksek kalitede dijital çözümler sunuyoruz.",

    // Contact
    "contact.label": "İletişim",
    "contact.title": "Projenize başlayın.",
    "contact.description": "Ücretsiz danışmanlık için bize ulaşın.",
    "contact.email": "E-posta",
    "contact.phone": "Telefon",
    "contact.location": "Konum",
    "contact.whatsapp": "WhatsApp üzerinden doğrudan iletişime geçin",
    "contact.form.title": "Bize mesaj gönderin",
    "contact.form.name": "İsim *",
    "contact.form.namePlaceholder": "Adınız",
    "contact.form.email": "E-posta *",
    "contact.form.emailPlaceholder": "sizin@email.com",
    "contact.form.phone": "Telefon (isteğe bağlı)",
    "contact.form.phonePlaceholder": "+49 123 456789",
    "contact.form.message": "Mesaj *",
    "contact.form.messagePlaceholder": "Projeniz hakkında bilgi verin...",
    "contact.form.submit": "Mesaj gönder",
    "contact.form.sending": "Gönderiliyor...",
    "contact.form.success": "Mesajınız için teşekkürler! En kısa sürede size döneceğiz.",

    // Footer
    "footer.imprint": "Yasal Bilgiler",
    "footer.privacy": "Gizlilik Politikası",
    "footer.rights": "Tüm hakları saklıdır.",
    "footer.cryptoAccepted": "Kripto kabul edilir",
    "footer.payment": "Ödeme",

    // Modal
    "modal.backToSite": "Siteye dön",

    // Impressum
    "impressum.title": "Yasal Bilgiler",
    "impressum.subtitle": "§ 5 DDG'ye göre bilgiler",
    "impressum.companyInfo": "Şirket Bilgileri",
    "impressum.contact": "İletişim",
    "impressum.email": "E-posta",
    "impressum.phone": "Telefon",
    "impressum.website": "Web sitesi",
    "impressum.responsible": "İçerikten sorumlu",
    "impressum.disclaimer": "Sorumluluk Reddi",
    "impressum.liabilityContent": "İçerik Sorumluluğu",
    "impressum.liabilityContentText": "Hizmet sağlayıcı olarak bu sayfalardaki kendi içeriğimizden sorumluyuz.",
    "impressum.liabilityLinks": "Bağlantı Sorumluluğu",
    "impressum.liabilityLinksText":
      "Web sitemiz, içerikleri üzerinde etkimiz olmayan harici sitelere bağlantılar içerir.",
    "impressum.copyright": "Telif Hakkı",
    "impressum.copyrightText": "Bu sayfalardaki içerik ve eserler Alman telif hakkı yasasına tabidir.",
    "impressum.dispute": "Uyuşmazlık Çözümü",
    "impressum.disputeText": "Avrupa Komisyonu çevrimiçi uyuşmazlık çözümü için bir platform sağlamaktadır.",
    "impressum.backHome": "Ana sayfaya dön",

    // Privacy Policy
    "privacy.title": "Gizlilik Politikası",
    "privacy.subtitle": "GDPR'ye göre bilgiler",
    "privacy.lastUpdated": "Son güncelleme",
    "privacy.email": "E-posta",
    "privacy.phone": "Telefon",
    "privacy.responsible.title": "1. Sorumlu Taraf",
    "privacy.overview.title": "2. Veri İşleme Genel Bakış",
    "privacy.overview.text": "Kişisel verilerinizin korunması bizim için önemlidir.",
    "privacy.legalBasis.title": "3. İşlemenin Yasal Dayanağı",
    "privacy.legalBasis.text": "Kişisel verilerin işlenmesi aşağıdaki yasal dayanaklara dayanmaktadır:",
    "privacy.legalBasis.consent": "Onay (Madde 6 paragraf 1 lit. a GDPR)",
    "privacy.legalBasis.contract": "Sözleşme ifası (Madde 6 paragraf 1 lit. b GDPR)",
    "privacy.legalBasis.legal": "Yasal yükümlülük (Madde 6 paragraf 1 lit. c GDPR)",
    "privacy.legalBasis.interest": "Meşru menfaat (Madde 6 paragraf 1 lit. f GDPR)",
    "privacy.hosting.title": "4. Barındırma",
    "privacy.hosting.text": "Web sitemiz Vercel Inc. tarafından barındırılmaktadır.",
    "privacy.hosting.dpa": "Vercel ile veri işleme sözleşmemiz bulunmaktadır.",
    "privacy.logfiles.title": "5. Sunucu Günlük Dosyaları",
    "privacy.logfiles.text": "Web sitemize her erişimde aşağıdaki veriler otomatik olarak toplanır:",
    "privacy.logfiles.ip": "IP adresi (anonimleştirilmiş)",
    "privacy.logfiles.datetime": "İstek tarihi ve saati",
    "privacy.logfiles.browser": "Tarayıcı türü ve sürümü",
    "privacy.logfiles.os": "İşletim sistemi",
    "privacy.logfiles.referrer": "Yönlendiren URL",
    "privacy.logfiles.pages": "Ziyaret edilen sayfalar",
    "privacy.logfiles.purpose":
      "Bu veriler web sitesini görüntülemek ve güvenliği sağlamak için teknik olarak gereklidir.",
    "privacy.cookies.title": "6. Çerezler",
    "privacy.cookies.text": "Web sitemiz yalnızca teknik olarak gerekli çerezleri kullanır.",
    "privacy.cookies.name": "Çerez Adı",
    "privacy.cookies.purpose": "Amaç",
    "privacy.cookies.duration": "Süre",
    "privacy.cookies.themeDesc": "Açık/koyu mod tercihinizi kaydeder",
    "privacy.cookies.langDesc": "Tercih ettiğiniz dil ayarını kaydeder",
    "privacy.cookies.year": "yıl",
    "privacy.cookies.settings": "Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.",
    "privacy.contact.title": "7. İletişim Formu",
    "privacy.contact.text": "İletişim formu üzerinden bize ulaştığınızda aşağıdaki veriler toplanır:",
    "privacy.contact.name": "İsim",
    "privacy.contact.emailData": "E-posta adresi",
    "privacy.contact.phoneData": "Telefon numarası (isteğe bağlı)",
    "privacy.contact.message": "Mesajınız",
    "privacy.contact.storage": "Bu veriler talebinizi işlemek için kullanılır ve işlem tamamlandıktan sonra silinir.",
    "privacy.rights.title": "8. Haklarınız",
    "privacy.rights.text": "GDPR kapsamında aşağıdaki haklara sahipsiniz:",
    "privacy.rights.access": "Erişim Hakkı (Madde 15 GDPR)",
    "privacy.rights.accessDesc": "Hakkınızdaki kişisel veriler hakkında bilgi alma hakkınız vardır.",
    "privacy.rights.rectification": "Düzeltme Hakkı (Madde 16 GDPR)",
    "privacy.rights.rectificationDesc": "Yanlış verilerin düzeltilmesini talep etme hakkınız vardır.",
    "privacy.rights.erasure": "Silme Hakkı (Madde 17 GDPR)",
    "privacy.rights.erasureDesc": "Verilerinizin silinmesini talep etme hakkınız vardır.",
    "privacy.rights.restriction": "Kısıtlama Hakkı (Madde 18 GDPR)",
    "privacy.rights.restrictionDesc": "Verilerinizin işlenmesinin kısıtlanmasını talep etme hakkınız vardır.",
    "privacy.rights.portability": "Veri Taşınabilirliği Hakkı (Madde 20 GDPR)",
    "privacy.rights.portabilityDesc": "Verilerinizi yapılandırılmış bir formatta alma hakkınız vardır.",
    "privacy.rights.objection": "İtiraz Hakkı (Madde 21 GDPR)",
    "privacy.rights.objectionDesc": "Verilerinizin işlenmesine itiraz etme hakkınız vardır.",
    "privacy.rights.complaint": "Şikayet Hakkı (Madde 77 GDPR)",
    "privacy.rights.complaintDesc": "Bir denetim makamına şikayette bulunma hakkınız vardır.",
    "privacy.security.title": "9. Veri Güvenliği",
    "privacy.security.text": "Güvenli veri iletimi için SSL/TLS şifrelemesi kullanıyoruz.",
    "privacy.changes.title": "10. Bu Politikadaki Değişiklikler",
    "privacy.changes.text": "Bu gizlilik politikasını gerektiğinde uyarlama hakkımızı saklı tutarız.",
    "privacy.backHome": "Ana sayfaya dön",

    // Payment Page
    "payment.badge": "Güvenli Kripto Ödemeleri",
    "payment.title": "Kripto ile Öde",
    "payment.description": "Aracısız hızlı, güvenli ve küresel ödemeler için Bitcoin, Solana ve Monero kabul ediyoruz.",
    "payment.secure": "%100 Güvenli",
    "payment.fast": "Hızlı İşlemler",
    "payment.global": "Dünya Çapında Geçerli",
    "payment.walletAddress": "Cüzdan Adresi",
    "payment.showQR": "QR Kodu",
    "payment.hideQR": "Gizle",
    "payment.copy": "Kopyala",
    "payment.copied": "Kopyalandı!",
    "payment.scanQR": "Ödeme için QR kodu tarayın",
    "payment.questions": "Ödeme hakkında sorularınız mı var?",
    "payment.contactUs": "Bize ulaşın",
    "payment.btc.benefit1": "Anında ödemeler için Lightning Network",
    "payment.btc.benefit2": "Büyük tutarlar için On-Chain",
    "payment.btc.benefit3": "Küresel olarak kabul gören standart",
    "payment.sol.benefit1": "Ultra hızlı işlemler (<1 sn)",
    "payment.sol.benefit2": "Minimum ücretler (~$0.00025)",
    "payment.sol.benefit3": "Yüksek ölçeklenebilirlik",
    "payment.xmr.benefit1": "Maksimum gizlilik",
    "payment.xmr.benefit2": "Tam anonimlik",
    "payment.xmr.benefit3": "İşlem takibi yok",
  },
  sq: {
    // Navbar
    "nav.services": "Shërbimet",
    "nav.projects": "Projektet",
    "nav.about": "Rreth nesh",
    "nav.vision": "Vizioni",
    "nav.contact": "Kontakti",
    "nav.cryptoPayment": "Pagesa Kripto",

    // Projects
    "projects.badge": "Në Zhvillim",
    "projects.title": "Projektet Aktuale.",
    "projects.description": "Një vështrim në projektet tona aktuale. Këto faqe interneti janë ende në zhvillim dhe tregojnë angazhimin tonë për zgjidhje digjitale inovative.",
    "projects.preview": "Parashikimi live në dispozicion",
    "projects.viewProject": "Shiko Projektin",
    "projects.moreComingSoon": "Më shumë projekte së shpejti...",
    "projects.crypto.title": "Portali i Lajmeve Kripto",
    "projects.crypto.description": "Një portal modern i lajmeve për kriptovalutat me përditësime në kohë reale, analiza tregu dhe lajme të industrisë.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Faqe elegante portfolioje për një studio kreative dizajni me estetikë minimaliste dhe animacione të lëngshme.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Prani profesionale në ueb për një shitës makinash me performancë të lartë në Lajpcig me dizajn modern dhe prezantim premium të automjeteve.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "Dyqan e-commerce mode të nivelit të lartë me dizajn modern dhe përvojë të përdoruesit pa probleme.",
    "projects.donation.title": "Faqja e Donacioneve Al Salam",
    "projects.donation.description": "Faqe profesionale donacioni për qëllime humanitare me dizajn modern dhe menaxhim të lehtë të donacioneve.",

    // Hero
    "hero.badge": "Themeluar në 2026",
    "hero.subtitle": "mendojmë, dizajnojmë dhe zhvillojmë",
    "hero.title1": "të ardhmen.",
    "hero.title2": "dixhitale.",
    "hero.description":
      "Naser Solutions është një agjenci web inovative me ambicie të mëdha. Ne kombinojmë teknologjinë më të fundit me dizajn kreativ.",
    "hero.cta": "Le të fillojmë",
    "hero.cta2": "Konsultim Paraprak Falas",
    "hero.refBtn": "Projekte Referuese",
    "hero.vision": "Vizioni ynë",

    // Stats
    "stats.founded": "themeluar",
    "stats.potential": "Potencial",
    "stats.passion": "Pasion",
    "stats.availability": "Disponueshmëri",

    // Services
    "services.label": "Shërbimet",
    "services.title": "Çfarë bëjmë për ju.",
    "services.description": "Nga ideja te zgjidhja – ju shoqërojmë në të gjitha fazat e projektit tuaj dixhital.",
    "services.web.title": "Dizajn dhe Zhvillim Web",
    "services.web.description":
      "Faqe web profesionale dhe moderne që prezantojnë kompaninë tuaj në mënyrën më të mirë.",
    "services.influencer.title": "Faqe për Influencerë",
    "services.influencer.description":
      "Prezenca dixhitale unike për krijuesit e përmbajtjes me portofol dhe integrim të mediave sociale.",
    "services.supermarket.title": "Aplikacione Supermarketi",
    "services.supermarket.description":
      "Aplikacione të personalizuara me njoftime push, kuponë dixhitalë dhe programe besnikërie.",
    "services.social.title": "Media Sociale dhe Reklama",
    "services.social.description": "Fushata profesionale në TikTok, Instagram, Facebook dhe Google Ads.",
    "services.design.title": "Dizajn Grafik dhe Branding",
    "services.design.description": "Dizajn kreativ që sjell markën tuaj në jetë – nga logot te dizajnet korporative.",
    "services.seo.title": "SEO dhe Performancë",
    "services.seo.description": "Optimizim për motorët e kërkimit dhe performancë teknike për dukshmëri të lartë.",

    // About
    "about.label": "Mendja pas saj",
    "about.title": "Vizioni takon ekzekutimin.",
    "about.description":
      "Nën udhëheqjen e <strong>Yasin Adam Aissani</strong>, Naser Solutions përfaqëson inovacionin dhe cilësinë.",
    "about.benefit1": "Perspektiva të reja dhe ide inovative",
    "about.benefit2": "Teknologjitë dhe frameworkët më të fundit",
    "about.benefit3": "Mbështetje personale që nga fillimi",
    "about.benefit4": "Çmime të drejta për cilësinë më të lartë",
    "about.role": "Drejtor dhe Themelues",

    // Vision
    "vision.label": "Vizioni ynë",
    "vision.title": "Mendo madh. Bëhu më i madh.",
    "vision.description": "Si agjenci e re, nuk kemi trashëgimi – vetëm potencial të pakufizuar.",
    "vision.innovation.title": "Inovacioni i Parë",
    "vision.innovation.description": "Përdorim teknologjitë më të fundit për zgjidhje të orientuara nga e ardhmja.",
    "vision.results.title": "I orientuar nga rezultatet",
    "vision.results.description": "Çdo projekt realizohet me objektiva të qarta dhe sukses të matshëm.",
    "vision.creative.title": "Ekselencë Kreative",
    "vision.creative.description": "Dizajn që jo vetëm duket mirë por tregon histori.",
    "vision.partnership.title": "Partneritet",
    "vision.partnership.description":
      "E shohim veten si zgjerim të ekipit tuaj – transparent, i besueshëm, i përkushtuar.",

    // Tools
    "tools.badge": "Pile Teknologjie",
    "tools.title": "Mjetet e Profesionistëve",
    "tools.description": "Punojmë me platformat më të mira të inteligjencës artificiale dhe dizajnit për të ofruar zgjidhje dixhitale në nivelin më të lartë.",

    // Contact
    "contact.label": "Kontakti",
    "contact.title": "Filloni projektin tuaj.",
    "contact.description": "Na kontaktoni për një konsultë falas.",
    "contact.email": "Email",
    "contact.phone": "Telefon",
    "contact.location": "Vendndodhja",
    "contact.whatsapp": "Kontaktoni drejtpërdrejt përmes WhatsApp",
    "contact.form.title": "Na dërgoni një mesazh",
    "contact.form.name": "Emri *",
    "contact.form.namePlaceholder": "Emri juaj",
    "contact.form.email": "Email *",
    "contact.form.emailPlaceholder": "juaj@email.com",
    "contact.form.phone": "Telefon (opsional)",
    "contact.form.phonePlaceholder": "+49 123 456789",
    "contact.form.message": "Mesazhi *",
    "contact.form.messagePlaceholder": "Na tregoni për projektin tuaj...",
    "contact.form.submit": "Dërgo mesazhin",
    "contact.form.sending": "Duke dërguar...",
    "contact.form.success": "Faleminderit për mesazhin tuaj! Do t'ju kontaktojmë së shpejti.",

    // Footer
    "footer.imprint": "Impresum",
    "footer.privacy": "Politika e Privatësisë",
    "footer.rights": "Të gjitha të drejtat e rezervuara.",
    "footer.cryptoAccepted": "Kripto e pranuar",
    "footer.payment": "Pagesa",

    // Modal
    "modal.backToSite": "Kthehu në faqe",

    // Impressum
    "impressum.title": "Njoftim Ligjor",
    "impressum.subtitle": "Informacion sipas § 5 DDG",
    "impressum.companyInfo": "Informacioni i Kompanisë",
    "impressum.contact": "Kontakti",
    "impressum.email": "Email",
    "impressum.phone": "Telefon",
    "impressum.website": "Faqja web",
    "impressum.responsible": "Përgjegjës për përmbajtjen",
    "impressum.disclaimer": "Mohim Përgjegjësie",
    "impressum.liabilityContent": "Përgjegjësia për Përmbajtjen",
    "impressum.liabilityContentText": "Si ofrues shërbimi, ne jemi përgjegjës për përmbajtjen tonë në këto faqe.",
    "impressum.liabilityLinks": "Përgjegjësia për Lidhjet",
    "impressum.liabilityLinksText": "Faqja jonë përmban lidhje me faqe të jashtme mbi të cilat nuk kemi ndikim.",
    "impressum.copyright": "Të Drejtat e Autorit",
    "impressum.copyrightText":
      "Përmbajtja dhe veprat në këto faqe i nënshtrohen ligjit gjerman të të drejtave të autorit.",
    "impressum.dispute": "Zgjidhja e Mosmarrëveshjeve",
    "impressum.disputeText": "Komisioni Evropian ofron platformë për zgjidhjen online të mosmarrëveshjeve.",
    "impressum.backHome": "Kthehu në faqen kryesore",

    // Privacy Policy
    "privacy.title": "Politika e Privatësisë",
    "privacy.subtitle": "Informacion sipas GDPR",
    "privacy.lastUpdated": "Përditësimi i fundit",
    "privacy.email": "Email",
    "privacy.phone": "Telefon",
    "privacy.responsible.title": "1. Pala Përgjegjëse",
    "privacy.overview.title": "2. Përmbledhje e Përpunimit të të Dhënave",
    "privacy.overview.text": "Mbrojtja e të dhënave tuaja personale është e rëndësishme për ne.",
    "privacy.legalBasis.title": "3. Baza Ligjore për Përpunimin",
    "privacy.legalBasis.text": "Përpunimi i të dhënave personale bazohet në bazat ligjore të mëposhtme:",
    "privacy.legalBasis.consent": "Pëlqimi (Neni 6 paragrafi 1 lit. a GDPR)",
    "privacy.legalBasis.contract": "Përmbushja e kontratës (Neni 6 paragrafi 1 lit. b GDPR)",
    "privacy.legalBasis.legal": "Detyrimi ligjor (Neni 6 paragrafi 1 lit. c GDPR)",
    "privacy.legalBasis.interest": "Interesi legjitim (Neni 6 paragrafi 1 lit. f GDPR)",
    "privacy.hosting.title": "4. Hostimi",
    "privacy.hosting.text": "Faqja jonë web hostohet nga Vercel Inc.",
    "privacy.hosting.dpa": "Kemi një marrëveshje përpunimi të dhënash me Vercel.",
    "privacy.logfiles.title": "5. Skedarët e Regjistrave të Serverit",
    "privacy.logfiles.text": "Të dhënat e mëposhtme mblidhen automatikisht në çdo akses:",
    "privacy.logfiles.ip": "Adresa IP (e anonimizuar)",
    "privacy.logfiles.datetime": "Data dhe ora e kërkesës",
    "privacy.logfiles.browser": "Lloji dhe versioni i shfletuesit",
    "privacy.logfiles.os": "Sistemi operativ",
    "privacy.logfiles.referrer": "URL referuese",
    "privacy.logfiles.pages": "Faqet e vizituara",
    "privacy.logfiles.purpose": "Këto të dhëna janë teknikisht të nevojshme për të shfaqur faqen web.",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text": "Faqja jonë përdor vetëm cookies teknikisht të nevojshme.",
    "privacy.cookies.name": "Emri i Cookie",
    "privacy.cookies.purpose": "Qëllimi",
    "privacy.cookies.duration": "Kohëzgjatja",
    "privacy.cookies.themeDesc": "Ruan preferencën tuaj për modalitetin e ndritshëm/errët",
    "privacy.cookies.langDesc": "Ruan cilësimin tuaj të preferuar të gjuhës",
    "privacy.cookies.year": "vit",
    "privacy.cookies.settings": "Mund të çaktivizoni cookies në cilësimet e shfletuesit tuaj.",
    "privacy.contact.title": "7. Formulari i Kontaktit",
    "privacy.contact.text": "Kur na kontaktoni përmes formularit, mblidhen të dhënat e mëposhtme:",
    "privacy.contact.name": "Emri",
    "privacy.contact.emailData": "Adresa email",
    "privacy.contact.phoneData": "Numri i telefonit (opsional)",
    "privacy.contact.message": "Mesazhi juaj",
    "privacy.contact.storage": "Këto të dhëna përdoren për të përpunuar kërkesën tuaj dhe fshihen pas përfundimit.",
    "privacy.rights.title": "8. Të Drejtat Tuaja",
    "privacy.rights.text": "Keni të drejtat e mëposhtme sipas GDPR:",
    "privacy.rights.access": "E Drejta e Aksesit (Neni 15 GDPR)",
    "privacy.rights.accessDesc": "Keni të drejtën të merrni informacion rreth të dhënave tuaja personale.",
    "privacy.rights.rectification": "E Drejta e Korrigjimit (Neni 16 GDPR)",
    "privacy.rights.rectificationDesc": "Keni të drejtën të kërkoni korrigjimin e të dhënave jo të sakta.",
    "privacy.rights.erasure": "E Drejta e Fshirjes (Neni 17 GDPR)",
    "privacy.rights.erasureDesc": "Keni të drejtën të kërkoni fshirjen e të dhënave tuaja.",
    "privacy.rights.restriction": "E Drejta e Kufizimit (Neni 18 GDPR)",
    "privacy.rights.restrictionDesc": "Keni të drejtën të kërkoni kufizimin e përpunimit të të dhënave tuaja.",
    "privacy.rights.portability": "E Drejta e Transferueshmërisë (Neni 20 GDPR)",
    "privacy.rights.portabilityDesc": "Keni të drejtën të merrni të dhënat tuaja në një format të strukturuar.",
    "privacy.rights.objection": "E Drejta e Kundërshtimit (Neni 21 GDPR)",
    "privacy.rights.objectionDesc": "Keni të drejtën të kundërshtoni përpunimin e të dhënave tuaja.",
    "privacy.rights.complaint": "E Drejta e Ankesës (Neni 77 GDPR)",
    "privacy.rights.complaintDesc": "Keni të drejtën të paraqisni një ankesë pranë një autoriteti mbikëqyrës.",
    "privacy.security.title": "9. Siguria e të Dhënave",
    "privacy.security.text": "Përdorim enkriptimin SSL/TLS për transmetimin e sigurt të të dhënave.",
    "privacy.changes.title": "10. Ndryshimet në Këtë Politikë",
    "privacy.changes.text": "Rezervojmë të drejtën të përshtatim këtë politikë privatësie sipas nevojës.",
    "privacy.backHome": "Kthehu në faqen kryesore",

    // Payment Page
    "payment.badge": "Pagesa të sigurta me Kripto",
    "payment.title": "Paguaj me Kripto",
    "payment.description":
      "Ne pranojmë Bitcoin, Solana dhe Monero për pagesa të shpejta, të sigurta dhe globale pa ndërmjetës.",
    "payment.secure": "100% E sigurt",
    "payment.fast": "Transaksione të shpejta",
    "payment.global": "E disponueshme globalisht",
    "payment.walletAddress": "Adresa e Portofolit",
    "payment.showQR": "Kodi QR",
    "payment.hideQR": "Fshih",
    "payment.copy": "Kopjo",
    "payment.copied": "U kopjua!",
    "payment.scanQR": "Skanoni kodin QR për të paguar",
    "payment.questions": "Pyetje rreth pagesës?",
    "payment.contactUs": "Na kontaktoni",
    "payment.btc.benefit1": "Lightning Network për pagesa të menjëhershme",
    "payment.btc.benefit2": "On-Chain për shuma më të mëdha",
    "payment.btc.benefit3": "Standard i pranuar globalisht",
    "payment.sol.benefit1": "Transaksione ultra të shpejta (<1 sek)",
    "payment.sol.benefit2": "Tarifa minimale (~$0.00025)",
    "payment.sol.benefit3": "Shkallëzueshmëri e lartë",
    "payment.xmr.benefit1": "Privatësi maksimale",
    "payment.xmr.benefit2": "Anonimitet i plotë",
    "payment.xmr.benefit3": "Pa gjurmim të transaksioneve",
  },
  ru: {
    // Navbar
    "nav.services": "Услуги",
    "nav.projects": "Проекты",
    "nav.about": "О нас",
    "nav.vision": "Видение",
    "nav.contact": "Контакт",
    "nav.cryptoPayment": "Крипто-оплата",

    // Projects
    "projects.badge": "В разработке",
    "projects.title": "Текущие проекты.",
    "projects.description": "Обзор наших текущих проектов. Эти веб-сайты все еще находятся в разработке и демонстрируют нашу приверженность инновационным цифровым решениям.",
    "projects.preview": "Доступен живой предпросмотр",
    "projects.viewProject": "Смотреть проект",
    "projects.moreComingSoon": "Скоро будет больше проектов...",
    "projects.crypto.title": "Крипто Новостной Портал",
    "projects.crypto.description": "Современный новостной портал для криптовалют с обновлениями в реальном времени, анализом рынка и отраслевыми новостями.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Элегантный сайт-портфолио для креативной дизайн-студии с минималистичной эстетикой и плавными анимациями.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Профессиональное веб-присутствие для высокопроизводительного автосалона в Лейпциге с современным дизайном и премиум-презентацией автомобилей.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "Интернет-магазин высокой моды с современным дизайном и безупречным пользовательским опытом.",
    "projects.donation.title": "Сайт пожертвований Al Salam",
    "projects.donation.description": "Про��ессиональный сайт пожертвований в благотворительных целях с современным дизайном и удобным управлением пожертвованиями.",

    // Hero
    "hero.badge": "Основано в 2026",
    "hero.subtitle": "мы думаем, создаём и разрабатываем",
    "hero.title1": "будущее.",
    "hero.title2": "цифровое.",
    "hero.description":
      "Naser Solutions — инновационное веб-агентство с большими амбициями. Мы сочетаем передовые технологии с креативным дизайном для создания цифровых впечатлений, которые вдохновляют.",
    "hero.cta": "Начнём",
    "hero.cta2": "Бесплатная первичная консультация",
    "hero.refBtn": "Референсные проекты",
    "hero.vision": "Наше видение",

    // Stats
    "stats.founded": "основано",
    "stats.potential": "Потенциал",
    "stats.passion": "Страсть",
    "stats.availability": "Доступность",

    // Services
    "services.label": "Услуги",
    "services.title": "Что мы делаем для вас.",
    "services.description":
      "От идеи до готового решения — мы сопровождаем вас на всех этапах вашего цифрового проекта.",
    "services.web.title": "Веб-дизайн и разработка",
    "services.web.description":
      "Профессиональные и современные сайты, которые оптимально представляют вашу компанию и убеждают клиентов. От концепции до реализации.",
    "services.influencer.title": "Сайты для инфлюенсеров",
    "services.influencer.description":
      "Уни��альное цифровое присутствие для создателей контента и инфлюенсеров с портфолио и интеграцией социальных сетей.",
    "services.supermarket.title": "Приложения для супермаркетов",
    "services.supermarket.description":
      "Индивидуальные приложения с push-уведомлениями, цифровыми купонами и программами лояльности для розничной торговли.",
    "services.social.title": "Социальные сети и реклама",
    "services.social.description":
      "Профессиональные кампании в TikTok, Instagram, Facebook и Google Ads для максимального охвата и измеримых результатов.",
    "services.design.title": "Графический дизайн и брендинг",
    "services.design.description":
      "Креативный дизайн, который оживляет ваш бренд — от логотипов до полного корпоративного стиля.",
    "services.seo.title": "SEO и производительность",
    "services.seo.description":
      "Оптимизация для поисковых систем и техническая оптимизация производительности для лучшей видимости и быстрой загрузки.",

    // About
    "about.label": "Человек за всем этим",
    "about.title": "Видение встречает исполнение.",
    "about.description":
      "Под руководством <strong>Yasın Adam Aissani</strong> Naser Solutions олицетворяет инновации и качество. Как молодое агентство, мы привносим свежий ветер в индустрию — с желанием создавать выдающееся и доказывать себя отличной работой.",
    "about.benefit1": "Свежие перспективы и инновационные идеи",
    "about.benefit2": "Новейшие технологии и фреймворки",
    "about.benefit3": "Персональная поддержка с самого начала",
    "about.benefit4": "Справедливые цены за высочайшее качество",
    "about.role": "Директор и основатель",

    // Vision
    "vision.label": "Наше видение",
    "vision.title": "Думать масштабно. Становиться больше.",
    "vision.description":
      "Как молод��е агентство, у нас нет наследия — только безграничный потенциал. Мы здесь, чтобы доказать, что свежие идеи и неустанный драйв имеют значение.",
    "vision.innovation.title": "Инновации прежде всего",
    "vision.innovation.description": "Мы используем новейшие технологии и тренды для разработки перспективных решений.",
    "vision.results.title": "Ориентация на результат",
    "vision.results.description": "Каждый проект реализуется с чёткими целями и измеримым успехом.",
    "vision.creative.title": "Творческое превосходство",
    "vision.creative.description":
      "Дизайн, который не только хорошо выглядит, но рассказывает истории и вызывает эмоции.",
    "vision.partnership.title": "Партнёрство",
    "vision.partnership.description":
      "Мы видим себя продолжением вашей команды — прозрачные, надёжные, преданные делу.",

    // Tools
    "tools.badge": "Технологический Стек",
    "tools.title": "Инструменты Профессионалов",
    "tools.description": "Мы работаем с ведущими платформами ИИ и дизайна, чтобы предоставить цифровые решения высочайшего уровня.",

    // Contact
    "contact.label": "Контакты",
    "contact.title": "Начните свой проект.",
    "contact.description":
      "Свяжитесь с нами для бесплатной консультации. Мы с нетерпением ждём возможности воплотить ваше видение в реальность.",
    "contact.email": "Эл. почта",
    "contact.phone": "Телефон",
    "contact.location": "Местоположение",
    "contact.whatsapp": "Связаться через WhatsApp",
    "contact.form.title": "Отправьте нам сообщение",
    "contact.form.name": "Имя *",
    "contact.form.namePlaceholder": "Ваше имя",
    "contact.form.email": "Эл. почта *",
    "contact.form.emailPlaceholder": "ваша@почта.ru",
    "contact.form.phone": "Телефон (опционально)",
    "contact.form.phonePlaceholder": "+7 123 456789",
    "contact.form.message": "Сообщение *",
    "contact.form.messagePlaceholder": "Расскажите нам о вашем проекте...",
    "contact.form.submit": "Отправить сообщение",
    "contact.form.sending": "Отправка...",
    "contact.form.success": "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.",

    // Footer
    "footer.imprint": "Импрессум",
    "footer.privacy": "Конфиденциальность",
    "footer.rights": "Все права защищены.",
    "footer.cryptoAccepted": "Криптовалюта принимается",
    "footer.payment": "Оплата",

    // Modal
    "modal.backToSite": "Вернуться на сайт",

    // Impressum
    "impressum.title": "Импрессум",
    "impressum.subtitle": "Информация согласно § 5 DDG",
    "impressum.companyInfo": "Информация о компании",
    "impressum.contact": "Контакты",
    "impressum.email": "Эл. почта",
    "impressum.phone": "Телефон",
    "impressum.website": "Веб-��а��т",
    "impressum.responsible": "Ответственный за содержание согласно § 18 Abs. 2 MStV",
    "impressum.disclaimer": "Отказ от ответственности",
    "impressum.liabilityContent": "Ответственность за содержание",
    "impressum.liabilityContentText":
      "Как поставщик услуг, мы несём ответственность за собственный контент на этих страницах в соответствии с общими законами согласно § 7 Abs.1 DDG.",
    "impressum.liabilityLinks": "Ответственность за ссылки",
    "impressum.liabilityLinksText":
      "Наше предложение содержит ссылки на внешние веб-сайты третьих лиц, на содержание которых мы не влияем.",
    "impressum.copyright": "Авторское право",
    "impressum.copyrightText":
      "Контент и работы, созданные операторами сайта на этих страницах, защищены немецким авторским правом.",
    "impressum.dispute": "Разрешение споров",
    "impressum.disputeText":
      "Европейская комиссия предоставляет платформу для онлайн-разрешения споров (OS): https://ec.europa.eu/consumers/odr/. Мы не готовы или не обязаны участвовать в процедурах разрешения споров перед посредническим органом по делам потребителей.",
    "impressum.backHome": "Вернуться на главную",

    // Privacy Policy
    "privacy.title": "Политика конфиденциальности",
    "privacy.subtitle": "Информация согласно GDPR и BDSG",
    "privacy.lastUpdated": "Обновлено",
    "privacy.email": "Эл. почта",
    "privacy.phone": "Телефон",
    "privacy.responsible.title": "1. Ответственная сторона",
    "privacy.overview.title": "2. Обзор обработки",
    "privacy.overview.text":
      "Защита ваших персональных данных важна для нас. В этой политике конфиденциальности мы информируем вас о том, какие персональные данные мы собираем.",
    "privacy.legalBasis.title": "3. Правовые основы обработки",
    "privacy.legalBasis.text": "Обработка персональных данных основана на следующих правовых основаниях:",
    "privacy.legalBasis.consent": "Согласие (ст. 6 п. 1 лит. a GDPR)",
    "privacy.legalBasis.contract": "Исполнение договора (ст. 6 п. 1 lit. b GDPR)",
    "privacy.legalBasis.legal": "Юридическое обязательство (ст. 6 п. 1 lit. c GDPR)",
    "privacy.legalBasis.interest": "Законный интерес (ст. 6 п. 1 lit. f GDPR)",
    "privacy.hosting.title": "4. Хостинг",
    "privacy.hosting.text": "Наш веб-сайт размещён на Vercel Inc.",
    "privacy.hosting.dpa":
      "С Vercel заключено соглашение об обработке данных. Передача данных в США осуществляется на основе стандартных договорных положений ЕС.",
    "privacy.logfiles.title": "5. Серверные лог-файлы",
    "privacy.logfiles.text": "При каждом доступе к нашему веб-сайту автоматически собираются следующие данные:",
    "privacy.logfiles.ip": "IP-адрес (анонимизированный)",
    "privacy.logfiles.datetime": "Дата и время запроса",
    "privacy.logfiles.browser": "Тип и версия браузера",
    "privacy.logfiles.os": "Операционная система",
    "privacy.logfiles.referrer": "URL-реферер (ранее посещённая страница)",
    "privacy.logfiles.pages": "Посещённые страницы",
    "privacy.logfiles.purpose":
      "Эти данные технически необходимы для отображения веб-сайта и обеспечения стабильности и безопасности.",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text": "Наш веб-сайт использует только технически необходимые cookies.",
    "privacy.cookies.name": "Название cookie",
    "privacy.cookies.purpose": "Цель",
    "privacy.cookies.duration": "Срок хранения",
    "privacy.cookies.themeDesc": "Сохраняет ваши предпочтения светлой/тёмной темы",
    "privacy.cookies.langDesc": "Сохраняет предпочтительный язык",
    "privacy.cookies.year": "год",
    "privacy.cookies.settings": "Вы можете отключить cookies в настройках браузера в любое время.",
    "privacy.contact.title": "7. Контактная форма",
    "privacy.contact.text": "При обращении через контактную форму собираются следующие данные:",
    "privacy.contact.name": "Имя",
    "privacy.contact.emailData": "Адрес эл. почты",
    "privacy.contact.phoneData": "Номер телефона (опционально)",
    "privacy.contact.message": "Ваше сообщение",
    "privacy.contact.storage": "Эти данные используются для обработки вашего запроса и удаляются после завершения.",
    "privacy.rights.title": "8. Ваши права как субъекта данных",
    "privacy.rights.text": "Согласно GDPR вы имеете следующие права:",
    "privacy.rights.access": "Право на доступ (ст. 15 GDPR)",
    "privacy.rights.accessDesc": "Вы имеете право запросить информацию о ваших персональных данных.",
    "privacy.rights.rectification": "Право на исправление (ст. 16 GDPR)",
    "privacy.rights.rectificationDesc": "Вы имеете право требовать исправления неточных данных.",
    "privacy.rights.erasure": "Право на удаление (ст. 17 GDPR)",
    "privacy.rights.erasureDesc": "Вы имеете право требовать удаления ваших данных.",
    "privacy.rights.restriction": "Ограничение обработки (ст. 18 GDPR)",
    "privacy.rights.restrictionDesc": "Вы имеете право требовать ограничения обработки ваших данных.",
    "privacy.rights.portability": "Переносимость данных (ст. 20 GDPR)",
    "privacy.rights.portabilityDesc":
      "Вы имеете право получить свои данные в структурированном, машиночитаемом формате.",
    "privacy.rights.objection": "Право на возражение (ст. 21 GDPR)",
    "privacy.rights.objectionDesc": "Вы имеете право возражать против обработки ваших данных.",
    "privacy.rights.complaint": "Право на жалобу (ст. 77 GDPR)",
    "privacy.rights.complaintDesc": "Вы имеете право подать жалобу в надзорный орган.",
    "privacy.security.title": "9. Безопасность данных",
    "privacy.security.text": "Мы используем SSL/TLS шифрование для безопасной ��ере��ачи данных.",
    "privacy.changes.title": "10. Изменения в политике конфиденциальности",
    "privacy.changes.text": "Мы оставляем за собой право изменять эту политику конфиденциальности при необходимости.",
    "privacy.backHome": "Вернуться на главную",

    // Payment Page
    "payment.badge": "Безопасные криптоплатежи",
    "payment.title": "Оплата криптовалютой",
    "payment.description":
      "Мы принимаем Bitcoin, Solana и Monero для быстрых, безопасных и глобальных платежей без посредников.",
    "payment.secure": "100% безопасно",
    "payment.fast": "Быстрые транзакции",
    "payment.global": "Доступно по всему миру",
    "payment.walletAddress": "Адрес кошелька",
    "payment.showQR": "QR-код",
    "payment.hideQR": "Скрыть",
    "payment.copy": "Копировать",
    "payment.copied": "Скопировано!",
    "payment.scanQR": "Отсканируйте QR-код для оплаты",
    "payment.questions": "Вопросы по оплате?",
    "payment.contactUs": "Свяжитесь с нами",
    "payment.btc.benefit1": "Lightning Network для мгновенных платежей",
    "payment.btc.benefit2": "On-Chain для крупных сумм",
    "payment.btc.benefit3": "Общепринятый мировой стандарт",
    "payment.sol.benefit1": "Сверхбыстрые транзакции (<1 сек.)",
    "payment.sol.benefit2": "Минимальные комиссии (~$0.00025)",
    "payment.sol.benefit3": "Высокая масштабируемость",
    "payment.xmr.benefit1": "Максимальная конфиденциальность",
    "payment.xmr.benefit2": "Полная анонимность",
    "payment.xmr.benefit3": "Нет отслеживания транзакций",
  },
  es: {
    // Navbar
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.about": "Sobre nosotros",
    "nav.vision": "Visión",
    "nav.contact": "Contacto",
    "nav.cryptoPayment": "Pago Cripto",

    // Projects
    "projects.badge": "En Desarrollo",
    "projects.title": "Proyectos Actuales.",
    "projects.description": "Una vista de nuestros proyectos actuales. Estos sitios web aún están en desarrollo y muestran nuestro compromiso con soluciones digitales innovadoras.",
    "projects.preview": "Vista previa en vivo disponible",
    "projects.viewProject": "Ver Proyecto",
    "projects.moreComingSoon": "Más proyectos próximamente...",
    "projects.crypto.title": "Portal de Noticias Cripto",
    "projects.crypto.description": "Un portal de noticias moderno para criptomonedas con actualizaciones en tiempo real, análisis de mercado y noticias de la industria.",
    "projects.studio.title": "Studio Glacé",
    "projects.studio.description": "Sitio web de portafolio elegante para un estudio de diseño creativo con estética minimalista y animaciones fluidas.",
    "projects.porsche.title": "A&A Performance Autohaus Leipzig",
    "projects.porsche.description": "Presencia web profesional para un concesionario de alto rendimiento en Leipzig con diseño moderno y presentación premium de vehículos.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "Tienda e-commerce de moda de alta gama con diseño moderno y experiencia de usuario perfecta.",
    "projects.donation.title": "Sitio de Donaciones Al Salam",
    "projects.donation.description": "Sitio de donaciones profesional para fines humanitarios con diseño moderno y gestión fácil de donaciones.",

    // Hero
    "hero.badge": "Fundada en 2026",
    "hero.subtitle": "pensamos, diseñamos y desarrollamos",
    "hero.title1": "el futuro.",
    "hero.title2": "digital.",
    "hero.description":
      "Naser Solutions es una agencia web innovadora con grandes ambiciones. Combinamos tecnología de vanguardia con diseño creativo para crear experiencias digitales que inspiran.",
    "hero.cta": "Empecemos",
    "hero.cta2": "Consulta Inicial Gratuita",
    "hero.refBtn": "Proyectos de Referencia",
    "hero.vision": "Nuestra Visión",

    // Stats
    "stats.founded": "fundada",
    "stats.potential": "Potencial",
    "stats.passion": "Pasión",
    "stats.availability": "Disponibilidad",

    // Services
    "services.label": "Servicios",
    "services.title": "Lo que hacemos por ti.",
    "services.description":
      "Desde la idea hasta la solución final – te acompañamos en todas las fases de tu proyecto digital.",
    "services.web.title": "Diseño y Desarrollo Web",
    "services.web.description":
      "Sitios web profesionales y modernos que presentan tu empresa de manera óptima y convencen a los clientes. Desde el concepto hasta la implementación.",
    "services.influencer.title": "Webs para Influencers",
    "services.influencer.description":
      "Presencias digitales únicas para creadores de contenido e influencers con portafolios y perfecta integración con redes sociales.",
    "services.supermarket.title": "Apps para Supermercados",
    "services.supermarket.description":
      "Apps personalizadas con notificaciones push, cupones digitales y programas de fidelización para el comercio minorista.",
    "services.social.title": "Redes Sociales y Anuncios",
    "services.social.description":
      "Campañas profesionales en TikTok, Instagram, Facebook y Google Ads para máximo alcance y resultados medibles.",
    "services.design.title": "Diseño Gráfico y Branding",
    "services.design.description":
      "Diseño creativo que da vida a tu marca – desde logotipos hasta diseños corporativos completos con valor de reconocimiento.",
    "services.seo.title": "SEO y Rendimiento",
    "services.seo.description":
      "Optimización para motores de búsqueda y rendimiento técnico para la mejor visibilidad y tiempos de carga rápidos.",

    // About
    "about.label": "La mente detrás",
    "about.title": "Visión y ejecución.",
    "about.description":
      "Dirigida por <strong>Yasin Adam Aissani</strong>, Naser Solutions representa innovación y calidad. Como agencia recién fundada, traemos aire fresco a la industria – con el hambre de crear cosas extraordinarias y demostrar nuestro valor a través de un trabajo excelente.",
    "about.benefit1": "Perspectivas frescas e ideas innovadoras",
    "about.benefit2": "Últimas tecnologías y frameworks",
    "about.benefit3": "Atención personal desde el inicio",
    "about.benefit4": "Precios justos para la más alta calidad",
    "about.role": "Director y Fundador",

    // Vision
    "vision.label": "Nuestra Visión",
    "vision.title": "Piensa en grande. Crece más.",
    "vision.description":
      "Como agencia joven, no tenemos legado – solo potencial ilimitado. Estamos aquí para demostrar que las ideas frescas y el impulso implacable marcan la diferencia.",
    "vision.innovation.title": "Innovación Primero",
    "vision.innovation.description":
      "Utilizamos las últimas tecnologías y tendencias para desarrollar soluciones a prueba de futuro.",
    "vision.results.title": "Orientados a Resultados",
    "vision.results.description": "Cada proyecto se implementa con objetivos claros y éxito medible.",
    "vision.creative.title": "Excelencia Creativa",
    "vision.creative.description": "Diseño que no solo se ve bien sino que cuenta historias y evoca emociones.",
    "vision.partnership.title": "Asociación",
    "vision.partnership.description":
      "Nos vemos como una extensión de tu equipo – transparentes, confiables, comprometidos.",

    // Tools
    "tools.badge": "Stack Tecnológico",
    "tools.title": "Herramientas de Profesionales",
    "tools.description": "Trabajamos con las mejores plataformas de IA y diseño para entregar soluciones digitales de nivel superior.",

    // Contact
    "contact.label": "Contacto",
    "contact.title": "Inicia tu proyecto.",
    "contact.description": "Contáctanos para una consulta gratuita. Estamos deseando hacer realidad tu visión.",
    "contact.email": "Correo electrónico",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.whatsapp": "Contactar directamente por WhatsApp",
    "contact.form.title": "Envíanos un mensaje",
    "contact.form.name": "Nombre *",
    "contact.form.namePlaceholder": "Tu nombre",
    "contact.form.email": "Correo *",
    "contact.form.emailPlaceholder": "tu@correo.com",
    "contact.form.phone": "Teléfono (opcional)",
    "contact.form.phonePlaceholder": "+34 123 456789",
    "contact.form.message": "Mensaje *",
    "contact.form.messagePlaceholder": "Cuéntanos sobre tu proyecto...",
    "contact.form.submit": "Enviar mensaje",
    "contact.form.sending": "Enviando...",
    "contact.form.success": "¡Gracias por tu mensaje! Nos pondremos en contacto pronto.",

    // Footer
    "footer.imprint": "Aviso legal",
    "footer.privacy": "Privacidad",
    "footer.rights": "Todos los derechos reservados.",
    "footer.cryptoAccepted": "Aceptamos cripto",
    "footer.payment": "Pago",

    // Modal
    "modal.backToSite": "Volver al sitio",

    // Impressum
    "impressum.title": "Aviso Legal",
    "impressum.subtitle": "Información según § 5 DDG",
    "impressum.companyInfo": "Información de la empresa",
    "impressum.contact": "Contacto",
    "impressum.email": "Correo",
    "impressum.phone": "Teléfono",
    "impressum.website": "Sitio web",
    "impressum.responsible": "Responsable del contenido según § 18 párr. 2 MStV",
    "impressum.disclaimer": "Aviso legal",
    "impressum.liabilityContent": "Responsabilidad por contenidos",
    "impressum.liabilityContentText":
      "Como proveedor de servicios, somos responsables de nuestros propios contenidos en estas páginas según las leyes generales conforme al § 7 párr. 1 DDG.",
    "impressum.liabilityLinks": "Responsabilidad por enlaces",
    "impressum.liabilityLinksText":
      "Nuestra oferta contiene enlaces a sitios web externos de terceros sobre cuyo contenido no tenemos influencia.",
    "impressum.copyright": "Derechos de autor",
    "impressum.copyrightText":
      "Los contenidos y obras creados por los operadores del sitio en estas páginas están sujetos a los derechos de autor alemanes.",
    "impressum.dispute": "Resolución de disputas",
    "impressum.disputeText":
      "La Comisión Europea proporciona una plataforma para la resolución de disputas en línea (ODR).",
    "impressum.backHome": "Volver al inicio",

    // Privacy
    "privacy.title": "Política de Privacidad",
    "privacy.subtitle": "Información según RGPD",
    "privacy.lastUpdated": "Última actualización",
    "privacy.email": "Correo",
    "privacy.phone": "Teléfono",
    "privacy.responsible.title": "1. Responsable",
    "privacy.overview.title": "2. Resumen del procesamiento",
    "privacy.overview.text":
      "La protección de sus datos personales es importante para nosotros. En esta política de privacidad le informamos sobre qué datos personales recopilamos.",
    "privacy.legalBasis.title": "3. Base legal del procesamiento",
    "privacy.legalBasis.text": "El procesamiento de datos personales se realiza sobre las siguientes bases legales:",
    "privacy.legalBasis.consent": "Consentimiento (Art. 6 párr. 1 lit. a RGPD)",
    "privacy.legalBasis.contract": "Cumplimiento del contrato (Art. 6 párr. 1 lit. b RGPD)",
    "privacy.legalBasis.legal": "Obligación legal (Art. 6 párr. 1 lit. c RGPD)",
    "privacy.legalBasis.interest": "Interés legítimo (Art. 6 párr. 1 lit. f RGPD)",
    "privacy.hosting.title": "4. Alojamiento",
    "privacy.hosting.text": "Nuestro sitio web está alojado en Vercel Inc.",
    "privacy.hosting.dpa": "Existe un acuerdo de procesamiento de datos con Vercel.",
    "privacy.logfiles.title": "5. Archivos de registro del servidor",
    "privacy.logfiles.text": "Con cada acceso a nuestro sitio web, se recopilan automáticamente los siguientes datos:",
    "privacy.logfiles.ip": "Dirección IP (anonimizada)",
    "privacy.logfiles.datetime": "Fecha y hora de la solicitud",
    "privacy.logfiles.browser": "Tipo y versión del navegador",
    "privacy.logfiles.os": "Sistema operativo",
    "privacy.logfiles.referrer": "URL de referencia",
    "privacy.logfiles.pages": "Páginas visitadas",
    "privacy.logfiles.purpose": "Estos datos son técnicamente necesarios para mostrar el sitio web.",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text": "Nuestro sitio web utiliza exclusivamente cookies técnicamente necesarias.",
    "privacy.cookies.name": "Nombre de la cookie",
    "privacy.cookies.purpose": "Propósito",
    "privacy.cookies.duration": "Duración del almacenamiento",
    "privacy.cookies.themeDesc": "Guarda su preferencia de modo claro/oscuro",
    "privacy.cookies.langDesc": "Guarda su configuración de idioma preferida",
    "privacy.cookies.year": "Año",
    "privacy.cookies.settings": "Puede desactivar las cookies en la configuración de su navegador.",
    "privacy.contact.title": "7. Formulario de contacto",
    "privacy.contact.text":
      "Cuando nos contacta a través del formulario de contacto, se recopilan los siguientes datos:",
    "privacy.contact.name": "Nombre",
    "privacy.contact.emailData": "Dirección de correo electrónico",
    "privacy.contact.phoneData": "Número de teléfono (opcional)",
    "privacy.contact.message": "Su mensaje",
    "privacy.contact.storage": "Estos datos se utilizan para procesar su consulta.",
    "privacy.rights.title": "8. Sus derechos",
    "privacy.rights.text": "Tiene los siguientes derechos según el RGPD:",
    "privacy.rights.access": "Derecho de acceso (Art. 15 RGPD)",
    "privacy.rights.accessDesc": "Tiene derecho a solicitar información sobre sus datos personales procesados.",
    "privacy.rights.rectification": "Derecho de rectificación (Art. 16 RGPD)",
    "privacy.rights.rectificationDesc": "Tiene derecho a solicitar la corrección de datos incorrectos.",
    "privacy.rights.erasure": "Derecho de supresión (Art. 17 RGPD)",
    "privacy.rights.erasureDesc": "Tiene derecho a solicitar la eliminación de sus datos.",
    "privacy.rights.restriction": "Restricción del procesamiento (Art. 18 RGPD)",
    "privacy.rights.restrictionDesc": "Tiene derecho a solicitar la restricción del procesamiento.",
    "privacy.rights.portability": "Portabilidad de datos (Art. 20 RGPD)",
    "privacy.rights.portabilityDesc": "Tiene derecho a recibir sus datos en un formato estructurado.",
    "privacy.rights.objection": "Derecho de oposición (Art. 21 RGPD)",
    "privacy.rights.objectionDesc": "Tiene derecho a oponerse al procesamiento de sus datos.",
    "privacy.rights.complaint": "Derecho de queja (Art. 77 RGPD)",
    "privacy.rights.complaintDesc": "Tiene derecho a presentar una queja ante una autoridad supervisora.",
    "privacy.security.title": "9. Seguridad de datos",
    "privacy.security.text": "Utilizamos cifrado SSL/TLS para la transmisión segura de datos.",
    "privacy.changes.title": "10. Cambios en esta política de privacidad",
    "privacy.changes.text": "Nos reservamos el derecho de adaptar esta política de privacidad según sea necesario.",
    "privacy.backHome": "Volver al inicio",

    // Payment
    "payment.badge": "Pagos seguros con cripto",
    "payment.title": "Pagar con Cripto",
    "payment.description":
      "Aceptamos Bitcoin, Solana y Monero para pagos rápidos, seguros y globales sin intermediarios.",
    "payment.secure": "100% Seguro",
    "payment.fast": "Transacciones rápidas",
    "payment.global": "Disponible mundialmente",
    "payment.walletAddress": "Dirección de billetera",
    "payment.showQR": "Código QR",
    "payment.hideQR": "Ocultar",
    "payment.copy": "Copiar",
    "payment.copied": "¡Copiado!",
    "payment.scanQR": "Escanea el código QR para pagar",
    "payment.questions": "¿Preguntas sobre el pago?",
    "payment.contactUs": "Contáctanos",
    "payment.btc.benefit1": "Lightning Network para pagos instantáneos",
    "payment.btc.benefit2": "On-Chain para cantidades mayores",
    "payment.btc.benefit3": "Estándar aceptado mundialmente",
    "payment.sol.benefit1": "Transacciones ultra rápidas (<1 seg.)",
    "payment.sol.benefit2": "Tarifas mínimas (~$0.00025)",
    "payment.sol.benefit3": "Alta escalabilidad",
    "payment.xmr.benefit1": "Máxima privacidad",
    "payment.xmr.benefit2": "Anonimato completo",
    "payment.xmr.benefit3": "Sin rastreo de transacciones",
  },
  it: {
    // Navbar
    "nav.services": "Servizi",
    "nav.about": "Chi siamo",
    "nav.vision": "Visione",
    "nav.contact": "Contatto",
    "nav.cryptoPayment": "Pagamento Crypto",

    // Hero
    "hero.badge": "Fondata nel 2026",
    "hero.subtitle": "pensiamo, progettiamo e sviluppiamo",
    "hero.title1": "il futuro.",
    "hero.title2": "digitale.",
    "hero.description":
      "Naser Solutions è un'agenzia web innovativa con grandi ambizioni. Combiniamo tecnologia all'avanguardia con design creativo per creare esperienze digitali che ispirano.",
    "hero.cta": "Iniziamo",
    "hero.cta2": "Consulenza Iniziale Gratuita",
    "hero.refBtn": "Progetti di Riferimento",
    "hero.vision": "La nostra Visione",

    // Stats
    "stats.founded": "fondata",
    "stats.potential": "Potenziale",
    "stats.passion": "Passione",
    "stats.availability": "Disponibilità",

    // Services
    "services.label": "Servizi",
    "services.title": "Cosa facciamo per te.",
    "services.description":
      "Dall'idea alla soluzione finale – ti accompagniamo in tutte le fasi del tuo progetto digitale.",
    "services.web.title": "Web Design e Sviluppo",
    "services.web.description":
      "Siti web professionali e moderni che presentano la tua azienda in modo ottimale e convincono i clienti. Dal concept all'implementazione.",
    "services.influencer.title": "Siti per Influencer",
    "services.influencer.description":
      "Presenze digitali uniche per content creator e influencer con portfolio e perfetta integrazione social media.",
    "services.supermarket.title": "App per Supermercati",
    "services.supermarket.description":
      "App personalizzate con notifiche push, coupon digitali e programmi fedeltà per il retail.",
    "services.social.title": "Social Media e Ads",
    "services.social.description":
      "Campagne professionali su TikTok, Instagram, Facebook e Google Ads per massima portata e risultati misurabili.",
    "services.design.title": "Grafica e Branding",
    "services.design.description":
      "Design creativo che dà vita al tuo marchio – dai loghi ai design aziendali completi con valore di riconoscimento.",
    "services.seo.title": "SEO e Performance",
    "services.seo.description":
      "Ottimizzazione per i motori di ricerca e performance tecnica per la migliore visibilità e tempi di caricamento rapidi.",

    // About
    "about.label": "La mente dietro",
    "about.title": "Visione ed esecuzione.",
    "about.description":
      "Guidata da <strong>Yasin Adam Aissani</strong>, Naser Solutions rappresenta innovazione e qualità. Come agenzia appena fondata, portiamo aria fresca nel settore – con la fame di creare cose straordinarie.",
    "about.benefit1": "Prospettive fresche e idee innovative",
    "about.benefit2": "Ultime tecnologie e framework",
    "about.benefit3": "Supporto personale dall'inizio",
    "about.benefit4": "Prezzi giusti per la massima qualità",
    "about.role": "Direttore e Fondatore",

    // Vision
    "vision.label": "La nostra Visione",
    "vision.title": "Pensa in grande. Diventa più grande.",
    "vision.description":
      "Come agenzia giovane, non abbiamo eredità – solo potenziale illimitato. Siamo qui per dimostrare che idee fresche e spinta inarrestabile fanno la differenza.",
    "vision.innovation.title": "Innovazione Prima",
    "vision.innovation.description":
      "Utilizziamo le ultime tecnologie e tendenze per sviluppare soluzioni a prova di futuro.",
    "vision.results.title": "Orientati ai Risultati",
    "vision.results.description": "Ogni progetto viene implementato con obiettivi chiari e successo misurabile.",
    "vision.creative.title": "Eccellenza Creativa",
    "vision.creative.description": "Design che non solo ha un bell'aspetto ma racconta storie ed evoca emozioni.",
    "vision.partnership.title": "Partnership",
    "vision.partnership.description":
      "Ci vediamo come un'estensione del tuo team – trasparenti, affidabili, impegnati.",

    // Tools
    "tools.badge": "Stack Tecnologico",
    "tools.title": "Strumenti dei Professionisti",
    "tools.description": "Lavoriamo con le migliori piattaforme di IA e design per fornire soluzioni digitali di livello superiore.",

    // Contact
    "contact.label": "Contatto",
    "contact.title": "Inizia il tuo progetto.",
    "contact.description": "Contattaci per una consulenza gratuita. Non vediamo l'ora di realizzare la tua visione.",
    "contact.email": "E-mail",
    "contact.phone": "Telefono",
    "contact.location": "Posizione",
    "contact.whatsapp": "Contatta direttamente su WhatsApp",
    "contact.form.title": "Inviaci un messaggio",
    "contact.form.name": "Nome *",
    "contact.form.namePlaceholder": "Il tuo nome",
    "contact.form.email": "E-mail *",
    "contact.form.emailPlaceholder": "tua@email.it",
    "contact.form.phone": "Telefono (opzionale)",
    "contact.form.phonePlaceholder": "+39 123 456789",
    "contact.form.message": "Messaggio *",
    "contact.form.messagePlaceholder": "Raccontaci del tuo progetto...",
    "contact.form.submit": "Invia messaggio",
    "contact.form.sending": "Invio in corso...",
    "contact.form.success": "Grazie per il tuo messaggio! Ti contatteremo presto.",

    // Footer
    "footer.imprint": "Note legali",
    "footer.privacy": "Privacy",
    "footer.rights": "Tutti i diritti riservati.",
    "footer.cryptoAccepted": "Accettiamo crypto",
    "footer.payment": "Pagamento",

    // Modal
    "modal.backToSite": "Torna al sito",

    // Impressum
    "impressum.title": "Note Legali",
    "impressum.subtitle": "Informazioni secondo § 5 DDG",
    "impressum.companyInfo": "Informazioni aziendali",
    "impressum.contact": "Contatto",
    "impressum.email": "E-mail",
    "impressum.phone": "Telefono",
    "impressum.website": "Sito web",
    "impressum.responsible": "Responsabile del contenuto secondo § 18 comma 2 MStV",
    "impressum.disclaimer": "Disclaimer",
    "impressum.liabilityContent": "Responsabilità per i contenuti",
    "impressum.liabilityContentText":
      "Come fornitori di servizi, siamo responsabili dei nostri contenuti su queste pagine secondo le leggi generali.",
    "impressum.liabilityLinks": "Responsabilità per i link",
    "impressum.liabilityLinksText":
      "La nostra offerta contiene link a siti web esterni di terze parti sui cui contenuti non abbiamo influenza.",
    "impressum.copyright": "Diritto d'autore",
    "impressum.copyrightText":
      "I contenuti e le opere create dagli operatori del sito su queste pagine sono soggetti al diritto d'autore tedesco.",
    "impressum.dispute": "Risoluzione delle controversie",
    "impressum.disputeText":
      "La Commissione Europea fornisce una piattaforma per la risoluzione delle controversie online (ODR).",
    "impressum.backHome": "Torna alla home",

    // Privacy
    "privacy.title": "Informativa sulla Privacy",
    "privacy.subtitle": "Informazioni secondo GDPR",
    "privacy.lastUpdated": "Ultimo aggiornamento",
    "privacy.email": "E-mail",
    "privacy.phone": "Telefono",
    "privacy.responsible.title": "1. Responsabile",
    "privacy.overview.title": "2. Panoramica del trattamento",
    "privacy.overview.text":
      "La protezione dei tuoi dati personali è importante per noi. In questa informativa ti informiamo su quali dati personali raccogliamo.",
    "privacy.legalBasis.title": "3. Base giuridica del trattamento",
    "privacy.legalBasis.text": "Il trattamento dei dati personali avviene sulla base delle seguenti basi giuridiche:",
    "privacy.legalBasis.consent": "Consenso (Art. 6 comma 1 lett. a GDPR)",
    "privacy.legalBasis.contract": "Esecuzione del contratto (Art. 6 comma 1 lett. b GDPR)",
    "privacy.legalBasis.legal": "Obbligo legale (Art. 6 comma 1 lett. c GDPR)",
    "privacy.legalBasis.interest": "Interesse legittimo (Art. 6 comma 1 lett. f GDPR)",
    "privacy.hosting.title": "4. Hosting",
    "privacy.hosting.text": "Il nostro sito web è ospitato da Vercel Inc.",
    "privacy.hosting.dpa": "Esiste un accordo di trattamento dati con Vercel.",
    "privacy.logfiles.title": "5. File di log del server",
    "privacy.logfiles.text": "Con ogni accesso al nostro sito web, vengono raccolti automaticamente i seguenti dati:",
    "privacy.logfiles.ip": "Indirizzo IP (anonimizzato)",
    "privacy.logfiles.datetime": "Data e ora della richiesta",
    "privacy.logfiles.browser": "Tipo e versione del browser",
    "privacy.logfiles.os": "Sistema operativo",
    "privacy.logfiles.referrer": "URL di riferimento",
    "privacy.logfiles.pages": "Pagine visitate",
    "privacy.logfiles.purpose": "Questi dati sono tecnicamente necessari per visualizzare il sito web.",
    "privacy.cookies.title": "6. Cookie",
    "privacy.cookies.text": "Il nostro sito web utilizza esclusivamente cookie tecnicamente necessari.",
    "privacy.cookies.name": "Nome del cookie",
    "privacy.cookies.purpose": "Scopo",
    "privacy.cookies.duration": "Durata di conservazione",
    "privacy.cookies.themeDesc": "Salva la tua preferenza modalità chiaro/scuro",
    "privacy.cookies.langDesc": "Salva la tua impostazione di lingua preferita",
    "privacy.cookies.year": "Anno",
    "privacy.cookies.settings": "Puoi disattivare i cookie in qualsiasi momento nelle impostazioni del browser.",
    "privacy.contact.title": "7. Modulo di contatto",
    "privacy.contact.text": "Quando ci contatti tramite il modulo di contatto, vengono raccolti i seguenti dati:",
    "privacy.contact.name": "Nome",
    "privacy.contact.emailData": "Indirizzo e-mail",
    "privacy.contact.phoneData": "Numero di telefono (opzionale)",
    "privacy.contact.message": "Il tuo messaggio",
    "privacy.contact.storage": "Questi dati vengono utilizzati per elaborare la tua richiesta.",
    "privacy.rights.title": "8. I tuoi diritti",
    "privacy.rights.text": "Hai i seguenti diritti secondo il GDPR:",
    "privacy.rights.access": "Diritto di accesso (Art. 15 GDPR)",
    "privacy.rights.accessDesc": "Hai il diritto di richiedere informazioni sui tuoi dati personali trattati.",
    "privacy.rights.rectification": "Diritto di rettifica (Art. 16 GDPR)",
    "privacy.rights.rectificationDesc": "Hai il diritto di richiedere la correzione di dati errati.",
    "privacy.rights.erasure": "Diritto alla cancellazione (Art. 17 GDPR)",
    "privacy.rights.erasureDesc": "Hai il diritto di richiedere la cancellazione dei tuoi dati.",
    "privacy.rights.restriction": "Limitazione del trattamento (Art. 18 GDPR)",
    "privacy.rights.restrictionDesc": "Hai il diritto di richiedere la limitazione del trattamento.",
    "privacy.rights.portability": "Portabilità dei dati (Art. 20 GDPR)",
    "privacy.rights.portabilityDesc": "Hai il diritto di ricevere i tuoi dati in un formato strutturato.",
    "privacy.rights.objection": "Diritto di opposizione (Art. 21 GDPR)",
    "privacy.rights.objectionDesc": "Hai il diritto di opporti al trattamento dei tuoi dati.",
    "privacy.rights.complaint": "Diritto di reclamo (Art. 77 GDPR)",
    "privacy.rights.complaintDesc": "Hai il diritto di presentare un reclamo presso un'autorità di controllo.",
    "privacy.security.title": "9. Sicurezza dei dati",
    "privacy.security.text": "Utilizziamo la crittografia SSL/TLS per la trasmissione sicura dei dati.",
    "privacy.changes.title": "10. Modifiche a questa informativa",
    "privacy.changes.text": "Ci riserviamo il diritto di adattare questa informativa secondo necessità.",
    "privacy.backHome": "Torna alla home",

    // Payment
    "payment.badge": "Pagamenti crypto sicuri",
    "payment.title": "Paga con Crypto",
    "payment.description":
      "Accettiamo Bitcoin, Solana e Monero per pagamenti veloci, sicuri e globali senza intermediari.",
    "payment.secure": "100% Sicuro",
    "payment.fast": "Transazioni veloci",
    "payment.global": "Disponibile in tutto il mondo",
    "payment.walletAddress": "Indirizzo wallet",
    "payment.showQR": "Codice QR",
    "payment.hideQR": "Nascondi",
    "payment.copy": "Copia",
    "payment.copied": "Copiato!",
    "payment.scanQR": "Scansiona il codice QR per pagare",
    "payment.questions": "Domande sul pagamento?",
    "payment.contactUs": "Contattaci",
    "payment.btc.benefit1": "Lightning Network per pagamenti istantanei",
    "payment.btc.benefit2": "On-Chain per importi maggiori",
    "payment.btc.benefit3": "Standard accettato a livello mondiale",
    "payment.sol.benefit1": "Transazioni ultra veloci (<1 sec.)",
    "payment.sol.benefit2": "Commissioni minime (~$0.00025)",
    "payment.sol.benefit3": "Alta scalabilità",
    "payment.xmr.benefit1": "Massima privacy",
    "payment.xmr.benefit2": "Anonimato completo",
    "payment.xmr.benefit3": "Nessun tracciamento delle transazioni",
  },
  el: {
  // Navbar
  "nav.services": "Υπηρεσίες",
  "nav.projects": "Έργα",
  "nav.about": "Σχετικά",
  "nav.vision": "Όραμα",
  "nav.contact": "Επικοινωνία",

  // Projects
  "projects.badge": "Υπό Ανάπτυξη",
  "projects.title": "Τρέχοντα Έργα.",
  "projects.description": "Μια ματιά στα τρέχοντα έργα μας. Αυτοί οι ιστότοποι βρίσκονται ακόμα υπό ανάπτυξη και δείχνουν τη δέσμευσή μας για καινοτόμες ψηφιακές λύσεις.",
  "projects.preview": "Διαθέσιμη ζωντανή προεπισκόπηση",
  "projects.viewProject": "Δείτε το Έργο",
  "projects.moreComingSoon": "Περισσότερα έργα σύντομα...",
  "projects.crypto.title": "Πύλη Ειδήσεων Crypto",
  "projects.crypto.description": "Μ��α σύγχρονη πύλη ειδήσεων για κρυπτονομίσματα με ενημερώσεις σε πραγματικό χρόνο, ανάλυση αγοράς και ειδήσεις του κλάδου.",
  "projects.studio.title": "Studio Glacé",
  "projects.studio.description": "Κομψός ιστότοπος portfolio για ένα δημιουργικό στούντιο σχεδιασμού με μινιμαλιστική αισθητική και ρευστές κινήσεις.",
  "projects.porsche.title": "A&A Performance Autohaus Leipzig",
  "projects.porsche.description": "Επαγγελματική διαδικτυακή παρουσία για ένα κατάστημα αυτοκινήτων υψηλής απόδοσης στη Λειψία με μοντέρνο σχεδιασμό και premium παρουσίαση οχημάτων.",
    "projects.luxury.title": "AWD Shop",
    "projects.luxury.description": "Ηλεκτρονικό κατάστημα μόδας υψηλής κλάσης με μοντέρνο σχεδιασμό και άψογη εμπειρία χρήστη.",
  "projects.donation.title": "Ιστοσελίδα Δωρεών Al Salam",
  "projects.donation.description": "Επαγγελματική ιστοσελίδα δωρεών για ανθρωπιστικούς σκοπούς με σύγχρονο σχεδιασμό και εύκολη διαχείριση δωρεών.",

  // Hero
    "hero.badge": "Ιδρύθηκε το 2026",
    "hero.subtitle": "σκεφτόμαστε, σχεδιάζουμε και αναπτύσσουμε",
    "hero.title1": "το μέλλον.",
    "hero.title2": "ψηφιακά.",
    "hero.description":
      "Η Naser Solutions είναι ένα καινοτόμο web agency με μεγάλες φιλοδοξίες. Συνδυάζουμε τεχνολογία αιχμής με δημιουργικό σχεδιασμό για να δημιουργήσουμε ψηφιακές εμπειρίες που εμπνέουν.",
    "hero.cta": "Ας ξεκινήσουμε",
    "hero.cta2": "Δωρεάν Αρχική Συμβουλή",
    "hero.refBtn": "Έργα Αναφοράς",
    "hero.vision": "Το Όραμά μας",

    // Stats
    "stats.founded": "ιδρύθηκε",
    "stats.potential": "Δυναμικό",
    "stats.passion": "Πάθος",
    "stats.availability": "Διαθεσιμότητα",

    // Services
    "services.label": "Υπηρεσίες",
    "services.title": "Τι κάνουμε για εσάς.",
    "services.description":
      "Από την ιδέα μέχρι την τελική λύση – σας συνοδεύουμε σε όλες τις φάσεις του ψηφιακού σας έργου.",
    "services.web.title": "Σχεδίαση & Ανάπτυξη Ιστοσελίδων",
    "services.web.description":
      "Επαγγελματικές και μοντέρνες ιστοσελίδες που παρουσιάζουν βέλτιστα την εταιρεία σας και πείθουν τους πελάτες.",
    "services.influencer.title": "Ιστοσελίδες για Influencers",
    "services.influencer.description":
      "Μοναδικές ψηφιακές παρουσίες για content creators και influencers με portfolio και άψογη ενσωμάτωση social media.",
    "services.supermarket.title": "Εφαρμογές Supermarket",
    "services.supermarket.description":
      "Προσαρμοσμένες εφαρμογές με push notifications, ψηφιακά κουπόνια και προγράμματα πιστότητας για το λιανεμπόριο.",
    "services.social.title": "Social Media & Διαφημίσεις",
    "services.social.description":
      "Επαγγελματικές καμπάνιες σε TikTok, Instagram, Facebook και Google Ads για μέγιστη απήχηση.",
    "services.design.title": "Γραφικός Σχεδιασμός & Branding",
    "services.design.description":
      "Δημιουργικός σχεδιασμός που δίνει ζωή στο brand σας – από λογότυπα έως πλήρεις εταιρικές ταυτότητες.",
    "services.seo.title": "SEO & Απόδοση",
    "services.seo.description":
      "Βελτιστοποίηση μηχανών αναζήτησης και τεχνική βελτιστοποίηση για καλύτερη ορατότητα και γρήγορους χρόνους φόρτωσης.",

    // About
    "about.label": "Ο νους πίσω",
    "about.title": "Όραμα και υλοποίηση.",
    "about.description":
      "Υπό την ηγεσία του <strong>Yasin Adam Aissani</strong>, η Naser Solutions αντιπροσωπεύει καινοτομία και ποιότητα. Ως νεοϊδρυθείσα εταιρεία, φέρνουμε φρέσκο αέρα στον κλάδο.",
    "about.benefit1": "Φρέσκες προοπτικές & καινοτόμες ιδέες",
    "about.benefit2": "Τελευταίες τεχνολογίες & frameworks",
    "about.benefit3": "Προσωπική υποστήριξη από την αρχή",
    "about.benefit4": "Δίκαιες τιμές για υψηλότατη ποιότητα",
    "about.role": "Διευθυντής & Ιδρυτής",

    // Vision
    "vision.label": "Το Όραμά μας",
    "vision.title": "Σκέψου μεγάλα. Γίνε μεγαλύτερος.",
    "vision.description":
      "Ως νέο agency, δεν έχουμε παρελθόν – μόνο απεριόριστο δυναμικό. Είμαστε εδώ για να αποδείξουμε ότι οι φρέσκες ιδέες κάνουν τη διαφορά.",
    "vision.innovation.title": "Καινοτομία Πρώτα",
    "vision.innovation.description":
      "Χρησιμοποιούμε τις τελευταίες τεχνολογίες για να αναπτύξουμε λύσεις για το μέλλον.",
    "vision.results.title": "Προσανατολισμένοι στα Αποτελέσματα",
    "vision.results.description": "Κάθε έργο υλοποιείται με σαφείς στόχους και μετρήσιμη επιτυχία.",
    "vision.creative.title": "Δημιουργική Αριστεία",
    "vision.creative.description": "Σχεδιασμός που όχι μόνο δείχνει καλός αλλά αφηγείται ιστορίες.",
    "vision.partnership.title": "Συνεργασία",
    "vision.partnership.description":
      "Θεωρούμε τον εαυτό μας επέκταση της ομάδας σας – διαφανείς, αξιόπιστοι, αφοσιωμένοι.",

    // Tools
    "tools.badge": "Σωρός Τεχνολογίας",
    "tools.title": "Εργαλεία των Επαγγελματιών",
    "tools.description": "Συνεργαζόμαστε με τις κορυφαίες πλατφόρμες ΤΝ και σχεδίασης για παροχή ψηφιακών λύσεων κορυφαίου επιπέδου.",

    // Contact
    "contact.label": "Επικοινωνία",
    "contact.title": "Ξεκινήστε το έργο σας.",
    "contact.description":
      "Επικοινωνήστε μαζί μας για δωρεάν συμβουλευτική. Ανυπομονούμε να κάνουμε το όραμά σας πραγματικότητα.",
    "contact.email": "E-mail",
    "contact.phone": "Τηλέφωνο",
    "contact.location": "Τοποθεσία",
    "contact.whatsapp": "Επικοινωνία απευθείας μέσω WhatsApp",
    "contact.form.title": "Στείλτε μας μήνυμα",
    "contact.form.name": "Όνομα *",
    "contact.form.namePlaceholder": "Το όνομά σας",
    "contact.form.email": "E-mail *",
    "contact.form.emailPlaceholder": "your@email.gr",
    "contact.form.phone": "Τηλέφωνο (προαιρετικό)",
    "contact.form.phonePlaceholder": "+30 123 456789",
    "contact.form.message": "Μήνυμα *",
    "contact.form.messagePlaceholder": "Πείτε μας για το έργο σας...",
    "contact.form.submit": "Αποστολή μηνύματος",
    "contact.form.sending": "Αποστολή...",
    "contact.form.success": "Ευχαριστούμε για το μήνυμά σας! Θα επικοινωνήσουμε σύντομα.",

    // Footer
    "footer.imprint": "Νομικές πληροφορίες",
    "footer.privacy": "Απόρρητο",
    "footer.rights": "Όλα τα δικαιώματα κατοχυρωμένα.",
    "footer.cryptoAccepted": "Δεχόμαστε crypto",
    "footer.payment": "Πληρωμή",

    // Modal
    "modal.backToSite": "Επιστροφή στον ιστότοπο",

    // Impressum
    "impressum.title": "Νομικές Πληροφορίες",
    "impressum.subtitle": "Πληροφορίες σύμφωνα με § 5 DDG",
    "impressum.companyInfo": "Πληροφορίες εταιρείας",
    "impressum.contact": "Επικοινωνία",
    "impressum.email": "E-mail",
    "impressum.phone": "Τηλέφωνο",
    "impressum.website": "Ιστοσελίδα",
    "impressum.responsible": "Υπεύθυνος για το περιεχόμενο σύμφωνα με § 18 παρ. 2 MStV",
    "impressum.disclaimer": "Αποποίηση ευθύνης",
    "impressum.liabilityContent": "Ευθύνη για περιεχόμενα",
    "impressum.liabilityContentText":
      "Ως πάροχοι υπηρεσιών, είμαστε υπεύθυνοι για το δικό μας περιεχόμενο σε αυτές τις σελίδες.",
    "impressum.liabilityLinks": "Ευθύνη για συνδέσμους",
    "impressum.liabilityLinksText": "Η προσφορά μας περιέχει συνδέσμους προς εξωτερικές ιστοσελίδες τρίτων.",
    "impressum.copyright": "Πνευματικά δικαιώματα",
    "impressum.copyrightText":
      "Τα περιεχόμενα και τα έργα που δημιουργήθηκαν από τους διαχειριστές του ιστότοπου υπόκεινται στο γερμανικό δίκαιο πνευματικής ιδιοκτησίας.",
    "impressum.dispute": "Επίλυση διαφορών",
    "impressum.disputeText": "Η Ευρωπαϊκή Επιτροπή παρέχει πλατφόρμα για την ηλεκτρονική επίλυση διαφορών (ODR).",
    "impressum.backHome": "Επιστροφή στην αρχική",

    // Privacy Policy
    "privacy.title": "Πολιτική Απορρήτου",
    "privacy.subtitle": "Πληροφορίες σύμφωνα με GDPR",
    "privacy.lastUpdated": "Τελευταία ενημέρωση",
    "privacy.email": "E-mail",
    "privacy.phone": "Τηλέφωνο",
    "privacy.responsible.title": "1. Υπεύθυνος",
    "privacy.overview.title": "2. Επισκόπηση επεξεργασίας",
    "privacy.overview.text":
      "Η προστασία των προσωπικών σας δεδομένων είναι σημαντική για εμάς. Σε αυτήν την πολιτική απορρήτου, σας ενημερώνουμε για τα προσωπικά δεδομένα που συλλέγουμε.",
    "privacy.legalBasis.title": "3. Νομική βάση επεξεργασίας",
    "privacy.legalBasis.text": "Η επεξεργασία προσωπικών δεδομένων γίνεται βάσει των ακόλουθων νομικών βάσεων:",
    "privacy.legalBasis.consent": "Συγκατάθεση (Άρθ. 6 παρ. 1 στ. α GDPR)",
    "privacy.legalBasis.contract": "Εκτέλεση σύμβασης (Άρθ. 6 παρ. 1 στ. β GDPR)",
    "privacy.legalBasis.legal": "Νομική υποχρέωση (Άρθ. 6 παρ. 1 στ. γ GDPR)",
    "privacy.legalBasis.interest": "Έννομο συμφέρον (Άρθ. 6 παρ. 1 στ. στ GDPR)",
    "privacy.hosting.title": "4. Φιλοξενία",
    "privacy.hosting.text": "Η ιστοσελίδα μας φιλοξενείται από την Vercel Inc.",
    "privacy.hosting.dpa": "Υπάρχει συμφωνία επεξεργασίας δεδομένων με τη Vercel.",
    "privacy.logfiles.title": "5. Αρχεία καταγραφής διακομιστή",
    "privacy.logfiles.text": "Με κάθε πρόσβαση στην ιστοσελίδα μας, συλλέγονται αυτόματα τα ακόλουθα δεδομένα:",
    "privacy.logfiles.ip": "Διεύθυνση IP (ανωνυμοποιημένη)",
    "privacy.logfiles.datetime": "Ημερομηνία και ώρα αιτήματος",
    "privacy.logfiles.browser": "Τύπος και έκδοση browser",
    "privacy.logfiles.os": "Λειτουργικό σύστημα",
    "privacy.logfiles.referrer": "URL παραπομπής",
    "privacy.logfiles.pages": "Σελίδες που επισκέφθηκαν",
    "privacy.logfiles.purpose": "Αυτά τα δεδομένα είναι τεχνικά απαραίτητα για την εμφάνιση της ιστοσελίδας.",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text": "Η ιστοσελίδα μας χρησιμοποιεί αποκλειστικά τεχνικά απαραίτητα cookies.",
    "privacy.cookies.name": "Όνομα cookie",
    "privacy.cookies.purpose": "Σκοπός",
    "privacy.cookies.duration": "Διάρκεια αποθήκευσης",
    "privacy.cookies.themeDesc": "Αποθηκεύει την προτίμησή σας για φωτεινή/σκοτεινή λειτουργία",
    "privacy.cookies.langDesc": "Αποθηκεύει την προτιμώμενη ρύθμιση γλώσσας",
    "privacy.cookies.year": "Έτος",
    "privacy.cookies.settings": "Μπορείτε να απενεργοποιήσετε τα cookies ανά πάσα στιγμή στις ρυθμίσεις του browser.",
    "privacy.contact.title": "7. Φόρμα επ��κοινωνίας",
    "privacy.contact.text": "Όταν μας επικοινωνείτε μέσω της φόρμας, συλλέγονται τα ακόλουθα δεδομένα:",
    "privacy.contact.name": "Όνομα",
    "privacy.contact.emailData": "Διεύθυνση e-mail",
    "privacy.contact.phoneData": "Αριθμός τηλεφώνου (προαιρετικό)",
    "privacy.contact.message": "Το μήνυμά σας",
    "privacy.contact.storage": "Αυτά τα δεδομένα χρησιμοποιούνται για την επεξεργασία του αιτήματός σας.",
    "privacy.rights.title": "8. Τα δικαιώματά σας",
    "privacy.rights.text": "Έχετε τα ακόλουθα δικαιώματα σύμφωνα με το GDPR:",
    "privacy.rights.access": "Δικαίωμα πρόσβασης (Άρθ. 15 GDPR)",
    "privacy.rights.accessDesc":
      "Έχετε το δικαίωμα να ζητήσετε πληροφορίες για τα επεξεργασμένα προσωπικά σας δεδομένα.",
    "privacy.rights.rectification": "Δικαίωμα διόρθωσης (Άρθ. 16 GDPR)",
    "privacy.rights.rectificationDesc": "Έχετε το δικαίωμα να ζητήσετε τη διόρθωση ε��φαλμένων δεδομένων.",
    "privacy.rights.erasure": "Δικαίωμα διαγραφής (Άρθ. 17 GDPR)",
    "privacy.rights.erasureDesc": "Έχετε το δικαίωμα να ζητήσετε τη διαγραφή των δεδομένων σας.",
    "privacy.rights.restriction": "Περιορισμός επεξεργασίας (Άρθ. 18 GDPR)",
    "privacy.rights.restrictionDesc": "Έχετε το δικαίωμα να ζητήσετε τον περιορισμό της επεξεργασίας.",
    "privacy.rights.portability": "Φορητότητα δεδομένων (Άρθ. 20 GDPR)",
    "privacy.rights.portabilityDesc": "Έχετε το δικαίωμα να λάβετε τα δεδομένα σας σε δομημένη μορφή.",
    "privacy.rights.objection": "Δικαίωμα εναντίωσης (Άρθ. 21 GDPR)",
    "privacy.rights.objectionDesc": "Έχετε το δικαίωμα να εναντιωθείτε στην επεξεργασία των δεδομένων σας.",
    "privacy.rights.complaint": "Δικαίωμα καταγγελίας (Άρθ. 77 GDPR)",
    "privacy.rights.complaintDesc": "Έχετε το δικαίωμα να υποβάλετε καταγγελία σε εποπτική αρχή.",
    "privacy.security.title": "9. Ασφάλεια δεδομένων",
    "privacy.security.text": "Χρησιμοποιούμε κρυπτογράφηση SSL/TLS για την ασφαλή μεταφορά δεδομένων.",
    "privacy.changes.title": "10. Αλλαγές σε αυτή την πολιτική",
    "privacy.changes.text": "Διατηρούμε το δικαίωμα να προσαρμόσουμε αυτή την πολιτική απορρήτου όπως απαιτείται.",
    "privacy.backHome": "Επιστροφή στην αρχική",

    // Payment
    "payment.badge": "Ασφαλείς πληρωμές crypto",
    "payment.title": "Πληρωμή με Crypto",
    "payment.description":
      "Δεχόμαστε Bitcoin, Solana και Monero για γρήγορες, ασφαλείς και παγκόσμιες πληρωμές χωρίς μεσάζοντες.",
    "payment.secure": "100% Ασφαλές",
    "payment.fast": "Γρήγορες συναλλαγές",
    "payment.global": "Διαθέσιμο παγκοσμίως",
    "payment.walletAddress": "Διεύθυνση wallet",
    "payment.showQR": "Κωδικός QR",
    "payment.hideQR": "Απόκρυψη",
    "payment.copy": "Αντιγραφή",
    "payment.copied": "Αντιγράφηκε!",
    "payment.scanQR": "Σαρώστε τον κωδικό QR για πληρωμή",
    "payment.questions": "Ερωτήσεις σχετικά με την πληρωμή;",
    "payment.contactUs": "Επικοινωνήστε μαζί μας",
    "payment.btc.benefit1": "Lightning Network για άμεσες πληρωμές",
    "payment.btc.benefit2": "On-Chain για μεγαλύτερα ποσά",
    "payment.btc.benefit3": "Παγκοσμίως αποδεκτό πρότυπο",
    "payment.sol.benefit1": "Υπερ-γρήγορες συναλλαγές (<1 δευτ.)",
    "payment.sol.benefit2": "Ελάχιστα τέλη (~$0.00025)",
    "payment.sol.benefit3": "Υψηλή επεκτασιμότητα",
    "payment.xmr.benefit1": "Μέγιστη ιδιωτικότητα",
    "payment.xmr.benefit2": "Πλήρης ανωνυμία",
    "payment.xmr.benefit3": "Χωρίς παρακολούθηση συναλλαγών",
  },

  zh: {
    // Navbar
    "nav.services": "服务",
    "nav.projects": "项目",
    "nav.about": "关于我们",
    "nav.vision": "愿景",
    "nav.contact": "联系",
    "nav.cryptoPayment": "加密货币支付",

    // Hero
    "hero.badge": "成立于2026年",
    "hero.eyebrow": "我们思考、设计和开发数字解决方案",
    "hero.subtitle": "我们思考、设计和开发",
    "hero.title1": "网站与品牌",
    "hero.title2": "让您脱颖而出并实现销售",
    "hero.description": "为希望在线上获得认可并期待成果的企业、自由职业者和创作者服务。",
    "hero.cta": "启动项目",
    "hero.cta2": "免费初步咨询",
    "hero.refBtn": "参考项目",
    "hero.vision": "我们的愿景",
    "hero.trust": "已成功为欧洲各地的客户实施",
    "hero.languages": "流利德语和英语·商务级阿拉伯语和法语",
    "hero.regions": "德国、法国和葡萄牙等地的项目",

    // Stats
    "stats.founded": "成立",
    "stats.potential": "潜力",
    "stats.passion": "热情",
    "stats.availability": "可用性",

    // Services
    "services.label": "服务",
    "services.title": "我们为您做什么",
    "services.description":
      "从想法到完成的解决方案——我们陪伴您完成数字项目的所有阶段。",
    "services.web.title": "网页设计与开发",
    "services.web.description":
      "专业且现代的网站，完美展示您的企业并说服客户。从构思到实施。",
    "services.influencer.title": "网红网站",
    "services.influencer.description":
      "为内容创作者和网红打造独特的数字形象，包括作品展示和无缝的社交媒体整合。",
    "services.supermarket.title": "超市应用",
    "services.supermarket.description":
      "定制应用程序，配备推送通知、数字优惠券和零售忠诚度计划——更多客户忠诚度，更多销售额。",
    "services.social.title": "社交媒体与广告",
    "services.social.description":
      "在TikTok、Instagram、Facebook和Google Ads上开展专业活动，实现最大覆盖面和可衡量的结果。",
    "services.design.title": "平面设计与品牌",
    "services.design.description":
      "让您的品牌焕发生机的创意设计——从标志到完整的企业设计，具有高辨识度。",
    "services.seo.title": "SEO与性能",
    "services.seo.description":
      "搜索引擎优化和技术性能优化，确保最佳可见性和快速加载时间。",
    "services.ai.title": "AI驱动的视频和图像编辑",
    "services.ai.description":
      "使用AI技术进行专业视频和图像编辑，创造令人惊叹的视觉内容——快速、高效且高质量。",

    // Projects
    "projects.badge": "开发中",
    "projects.title": "当前项目",
    "projects.description":
      "我们当前项目的一瞥。这些网站仍在开发中，展示了我们对创新数字解决方案的承诺。",
    "projects.preview": "提供实时预览",
    "projects.viewProject": "查看项目",
    "projects.moreComingSoon": "更多项目即将推出...",
    "projects.crypto.title": "加密货币新闻门户",
    "projects.crypto.description":
      "具有实时更新、市场分析和行业新闻的现代加密货币新闻门户。",
    "projects.studio.title": "Glacé工作室",
    "projects.studio.description":
      "为创意设计工作室打造的优雅作品集网站，采用极简美学和流畅动画。",
    "projects.porsche.title": "A&amp;A Performance 莱比锡汽车经销商",
    "projects.porsche.description":
      "莱比锡高性能汽车经销商的专业网站，现代设计和优质车辆展示。",
    "projects.luxury.title": "AWD商店",
    "projects.luxury.description":
      "高端时尚电商店铺，现代设计和无缝用户体验。",
    "projects.donation.title": "Al Salam捐赠页面",
    "projects.donation.description":
      "人道主义目的的专业捐赠网站，现代设计和用户友好的捐赠管理。",

    // About
    "about.label": "背后的核心",
    "about.title": "愿景遇见实施",
    "about.description":
      "在<strong>Yasin Adam Aissani</strong>的领导下，Naser Solutions代表创新和质量。作为一家新成立的机构，我们为行业带来新气象——渴望创造非凡并通过卓越的工作证明自己。",
    "about.benefit1": "新鲜视角和创新理念",
    "about.benefit2": "最先进的技术和框架",
    "about.benefit3": "从一开始就提供个人护理",
    "about.benefit4": "最高质量的公平价格",
    "about.role": "总监兼创始人",

    // Vision
    "vision.label": "我们的愿景",
    "vision.title": "思考大格局，成就更大",
    "vision.description":
      "作为一家年轻的机构，我们没有历史包袱——只有无限的潜力。我们在这里证明新想法和无限动力能够带来不同。",
    "vision.innovation.title": "创新优先",
    "vision.innovation.description":
      "我们利用最新的技术和趋势来开发面向未来的解决方案。",
    "vision.results.title": "以结果为导向",
    "vision.results.description":
      "每个项目都以明确的目标和可衡量的成功来实施。",
    "vision.creative.title": "创意卓越",
    "vision.creative.description":
      "不仅看起来漂亮，还能讲述故事并唤起情感的设计。",
    "vision.partnership.title": "合作伙伴关系",
    "vision.partnership.description":
      "我们将自己视为您团队的延伸——透明、可靠、敬业。",

    // Tools
    "tools.badge": "技术栈",
    "tools.title": "专业工具",
    "tools.description":
      "我们与领先的AI和设计平台合作，提供最高水平的数字解决方案。",

    // Contact
    "contact.label": "联系",
    "contact.title": "启动您的项目",
    "contact.description":
      "联系我们进行免费咨询。我们期待让您的愿景成为现实。",
    "contact.email": "电子邮件",
    "contact.phone": "电话",
    "contact.location": "位置",
    "contact.whatsapp": "通过WhatsApp直接联系",
    "contact.form.title": "给我们发送消息",
    "contact.form.name": "姓名 *",
    "contact.form.namePlaceholder": "您的姓名",
    "contact.form.email": "电子邮件 *",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.phone": "电话（可选）",
    "contact.form.phonePlaceholder": "+86 123 456789",
    "contact.form.message": "消息 *",
    "contact.form.messagePlaceholder": "告诉我们您的项目...",
    "contact.form.submit": "发送消息",
    "contact.form.sending": "发送中...",
    "contact.form.success": "感谢您的消息！我们会尽快回复。",
    "contact.form.error": "发生错误。请重试或直接联系我们。",

    // Footer
    "footer.imprint": "法律信息",
    "footer.privacy": "隐私政策",
    "footer.agb": "条款",
    "footer.rights": "保留所有权利。",
    "footer.cryptoAccepted": "接受加密货币",
    "footer.payment": "支付",

    // Modal
    "modal.backToSite": "返回网站",

    // AGB
    "agb.badge": "法律信息",
    "agb.title": "一般条款和条件",
    "agb.lastUpdated": "更新日期：2026年1月",
    "agb.section1.title": "1. 适用范围",
    "agb.section1.p1":
      "这些一般条款和条件（GTC）适用于Naser Solutions（以下简称&quot;承包商&quot;）与其客户（以下简称&quot;客户&quot;）之间关于网页设计、网页开发、应用开发、社交媒体营销、平面设计和AI驱动的视频和图像编辑领域的服务提供的所有合同。",
    "agb.section1.p2":
      "客户的不同条件不予承认，除非承包商明确书面同意其有效性。",
    "agb.section2.title": "2. 合同的订立",
    "agb.section2.p1":
      "承包商的报价不具约束力和非承诺性，除非明确标记为具有约束力。合同通过承包商的书面订单确认或开始提供服务而成立。",
    "agb.section2.p2":
      "口头辅助协议需要承包商的书面确认才能生效。",
    "agb.section3.title": "3. 服务范围",
    "agb.section3.p1":
      "要提供的服务范围由订单确认中的服务说明确定。客户的后续变更请求将单独计费。",
    "agb.section3.list1":
      "网页设计和网页开发：网站的概念、设计和技术实施",
    "agb.section3.list2":
      "应用开发：为各种平台开发定制应用程序",
    "agb.section3.list3":
      "AI驱动的图像和视频编辑：使用最先进的AI技术进行专业编辑",
    "agb.section4.title": "4. 客户的合作义务",
    "agb.section4.p1":
      "客户有义务及时提供执行订单所需的所有信息、文件和访问权限。由于延迟或不完整的交付而造成的延误由客户承担。",
    "agb.section4.p2":
      "客户有义务及时检查承包商创建的草稿和中间结果，并传达变更请求。",
    "agb.section5.title": "5. 价格和付款条件",
    "agb.section5.p1":
      "所有价格均为增值税。开具发票后14天内支付，不得扣除。对于较长期的项目，可以约定分期付款。",
    "agb.section5.p2":
      "我们接受比特币（BTC）、Solana（SOL）、Monero（XMR）支付以及银行转账。逾期付款将按基准利率加9个百分点计算违约利息。",
    "agb.portfolio.title": "6. 使用权和作品集使用",
    "agb.portfolio.p1":
      "在完全支付报酬后，承包商向客户授予创建作品的合同约定使用权。除非另有约定，客户将获得简单的、在时间和空间上无限制的使用权。",
    "agb.portfolio.p2":
      "<strong>作品集使用：</strong>承包商保留将项目中创建的作品（网站、应用、设计、视频、图像）用于自己的营销和展示目的的权利。这特别包括在作品集中、在自己的网站上、在社交媒体中以及作为对潜在新客户的参考的展示。",
    "agb.portfolio.p3":
      "如果客户明确不希望作品集使用，必须在签订合同前以书面形式通知。在这种情况下，可能会对项目成本收取20%的附加费。",
    "agb.section6.title": "7. 保证",
    "agb.section6.p1":
      "承包商保证创建的作品在验收时没有物质和法律缺陷。保证期为验收后12个月。",
    "agb.section6.p2":
      "缺陷索赔的前提是客户已根据德国商法典第377条正确履行其检查和投诉义务。对于合理的缺陷投诉，首先进行改进。",
    "agb.section7.title": "8. 责任",
    "agb.section7.p1":
      "承包商对故意和重大过失以及对生命、身体或健康的伤害承担无限责任。对于轻微过失，承包商仅对违反重要合同义务负责。",
    "agb.section7.p2":
      "数据丢失的责任限于定期制作备份副本时产生的典型恢复费用。",
    "agb.section8.title": "9. 保密",
    "agb.section8.p1":
      "双方承诺对在合作过程中了解到的所有机密信息保密，并仅用于履行合同。",
    "agb.section8.p2":
      "此义务在合同关系结束后继续有效。",
    "agb.section9.title": "10. 最终条款",
    "agb.section9.p1":
      "适用德意志联邦共和国法律。在法律允许的范围内，管辖地为承包商所在地。如果这些GTC的个别规定无效，其余规定的有效性不受影响。",

    // Impressum
    "impressum.title": "法律信息",
    "impressum.subtitle": "根据§5 DDG的信息",
    "impressum.companyInfo": "公司信息",
    "impressum.contact": "联系",
    "impressum.email": "电子邮件",
    "impressum.phone": "电话",
    "impressum.website": "网站",
    "impressum.responsible": "根据§18第2���MStV负责内容",
    "impressum.disclaimer": "免责声明",
    "impressum.liabilityContent": "内容责任",
    "impressum.liabilityContentText":
      "作为服务提供商，我们根据§7第1款DDG对这些页面上的自有内容负责。但是，根据§§8至10 DDG，我们作为服务提供商没有义务监控传输或存储的外部信息或调查表明非法活动的情况。",
    "impressum.liabilityLinks": "链接责任",
    "impressum.liabilityLinksText":
      "我们的网站包含第三方外部网站的链接，对其内容我们没有影响。因此，我们无法对这些外部内容承担任何责任。链接页面的内容始终由各自的提供商或运营商负责。",
    "impressum.copyright": "版权",
    "impressum.copyrightText":
      "网站运营商在这些页面上创建的内容和作品受德国版权法保护。复制、编辑、分发和任何形式的利用超出版权范围需要相应作者或创建者的书面同意。",
    "impressum.dispute": "争议解决",
    "impressum.disputeText":
      "欧盟委员会提供在线争议解决（OS）平台：https://ec.europa.eu/consumers/odr/。我们不愿意或没有义务参与消费者仲裁委员会的争议解决程序。",
    "impressum.backHome": "返回首页",

    // Privacy Policy
    "privacy.title": "隐私政策",
    "privacy.subtitle": "根据GDPR和BDSG的信息",
    "privacy.lastUpdated": "更新日期",
    "privacy.email": "电子邮件",
    "privacy.phone": "电话",
    "privacy.responsible.title": "1. 负责方",
    "privacy.overview.title": "2. 处理概述",
    "privacy.overview.text":
      "保护您的个人数据对我们来说非常重要。在本隐私政策中，我们通知您我们收集哪些个人数据、出于什么目的处理它们以及您拥有哪些权利。",
    "privacy.legalBasis.title": "3. 处理的法律依据",
    "privacy.legalBasis.text":
      "个人数据的处理基于以下法律依据：",
    "privacy.legalBasis.consent": "同意（GDPR第6条第1款a项）",
    "privacy.legalBasis.contract": "合同履行（GDPR第6条第1款b项）",
    "privacy.legalBasis.legal": "法律义务（GDPR第6条第1款c项）",
    "privacy.legalBasis.interest": "合法利益（GDPR第6条第1款f项）",
    "privacy.hosting.title": "4. 托管",
    "privacy.hosting.text":
      "我们的网站托管在Vercel Inc.。主机在所谓的日志文件中收集您的浏览器自动传输的信息。",
    "privacy.hosting.dpa":
      "与Vercel存在数据处理协议。向美国传输数据基于欧盟标准合同条款。",
    "privacy.logfiles.title": "5. 服务器日志文件",
    "privacy.logfiles.text":
      "每次访问我们的网站时，都会自动收集以下数据：",
    "privacy.logfiles.ip": "IP地址（匿名）",
    "privacy.logfiles.datetime": "请求的日期和时间",
    "privacy.logfiles.browser": "浏览器类型和版本",
    "privacy.logfiles.os": "操作系统",
    "privacy.logfiles.referrer": "引荐URL（之前访问的页面）",
    "privacy.logfiles.pages": "访问的页面",
    "privacy.logfiles.purpose":
      "这些数据在技术上是显示网站和确保稳定性和安全性所必需的。法律依据是GDPR第6条第1款f项（合法利益）。",
    "privacy.cookies.title": "6. Cookies",
    "privacy.cookies.text":
      "我们的网站仅使用技术上必要的cookies。这些是网站运营所必需的，不存储任何个人数据。",
    "privacy.cookies.name": "Cookie名称",
    "privacy.cookies.purpose": "目的",
    "privacy.cookies.duration": "存储期限",
    "privacy.cookies.themeDesc": "存储您对亮/暗模式的偏好",
    "privacy.cookies.langDesc": "存储您的首选语言设置",
    "privacy.cookies.year": "年",
    "privacy.cookies.settings":
      "您可以随时在浏览器设置中停用cookies。请注意，这可能会限制网站的功能。",
    "privacy.contact.title": "7. 联系表格",
    "privacy.contact.text":
      "当您通��联系表格联系我们时，会收集以下数据：",
    "privacy.contact.data":
      "姓名、电子邮件地址、电话号码（可选）、消息内容",
    "privacy.contact.purpose":
      "数据处理用于处理您的请求。法律依据是GDPR第6条第1款b项（合同前措施）。",
    "privacy.contact.retention":
      "您的数据在完全处理您的请求后将被删除，除非法律保留义务要求更长的存储期。",
    "privacy.whatsapp.title": "8. WhatsApp联系",
    "privacy.whatsapp.text":
      "我们提供通过WhatsApp Business联系的可能性。当您使用WhatsApp联系我们时，Meta Platforms Ireland Ltd.的隐私政策适用。",
    "privacy.rights.title": "9. 您的权利",
    "privacy.rights.text":
      "根据GDPR，您对我们拥有以下权利：",
    "privacy.rights.access": "访问权（GDPR第15条）",
    "privacy.rights.accessDesc":
      "您有权要求有关您个人数据的信息。",
    "privacy.rights.rectification": "更正权（GDPR第16条）",
    "privacy.rights.rectificationDesc":
      "您有权要求更正不正确的数据。",
    "privacy.rights.erasure": "删除权（GDPR第17条）",
    "privacy.rights.erasureDesc":
      "您有权要求删除您的数据。",
    "privacy.rights.restriction": "限制处理（GDPR第18条）",
    "privacy.rights.restrictionDesc":
      "您有权要求限制处理。",
    "privacy.rights.portability": "数据可携性（GDPR第20条）",
    "privacy.rights.portabilityDesc":
      "您有权以结构化格式接收您的数据。",
    "privacy.rights.objection": "反对权（GDPR第21条）",
    "privacy.rights.objectionDesc":
      "您有权反对处理您的数据。",
    "privacy.rights.complaint": "投诉权（GDPR第77条）",
    "privacy.rights.complaintDesc":
      "您有权向监管机构投诉。",
    "privacy.security.title": "9. 数据安全",
    "privacy.security.text":
      "我们使用SSL/TLS加密进行安全的数据传输。",
    "privacy.changes.title": "10. 本政策的变更",
    "privacy.changes.text":
      "我们保留根据需要调整本隐私政策的权利。",
    "privacy.backHome": "返回首页",

    // Payment
    "payment.badge": "安全的加密货币支付",
    "payment.title": "使用加密货币支���",
    "payment.description":
      "我们接受比特币、Solana和Monero支付。选择您喜欢的加密货币：",
    "payment.secure": "100% 安全",
    "payment.fast": "快速交易",
    "payment.global": "全球可用",
    "payment.walletAddress": "钱包地址",
    "payment.showQR": "二维码",
    "payment.hideQR": "隐藏",
    "payment.copy": "复制",
    "payment.copied": "已复制！",
    "payment.scanQR": "扫描二维码支付",
    "payment.questions": "有关支付的问题？",
    "payment.contactUs": "联系我们",
    "payment.btc.benefit1": "闪电网络支持即时支付",
    "payment.btc.benefit2": "链上支持大额交易",
    "payment.btc.benefit3": "全球接受的标准",
    "payment.sol.benefit1": "超快速交易（少于1秒）",
    "payment.sol.benefit2": "极低费用（约$0.00025）",
    "payment.sol.benefit3": "高可扩展性",
    "payment.xmr.benefit1": "最大隐私保护",
    "payment.xmr.benefit2": "完全匿名",
    "payment.xmr.benefit3": "无交易追踪",
  }
}

const defaultContextValue: LanguageContextType = {
  language: "de",
  setLanguage: () => {},
  t: (key: string) => key,
  dir: "ltr",
  isRTL: false,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de")
  const [mounted, setMounted] = useState(false)

  const currentLang = languages.find((l) => l.code === language) || languages[0]
  const dir = currentLang.dir
  const isRTL = dir === "rtl"

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null
    if (stored && languages.some((l) => l.code === stored)) {
      setLanguageState(stored)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
      document.documentElement.dir = dir
    }
  }, [language, dir, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.de[key] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    return defaultContextValue
  }
  return context
}
