import type { Language } from "./language"

export type ContactFormResponse = {
  success: boolean
  message: string
}

export const contactServiceOptions = [
  { id: "website", label: "Website" },
  { id: "mobile-app", label: "iOS o. Android Application" },
  { id: "google-ads", label: "Google Ads" },
  { id: "seo-geo", label: "SEO & GEO" },
  { id: "nfc-cards", label: "NFC-Cards" },
  { id: "social-media", label: "Social Media Betreuung" },
  { id: "content-production", label: "Content Production" },
  { id: "local-llm", label: "LokalLLM" },
  { id: "ai-solutions", label: "KI-Lösungen" },
  { id: "payment-integrations", label: "Zahlungsintegrationen" },
  { id: "custom-package", label: "Individuelles Komplettpaket" },
] as const

export type ContactServiceId = (typeof contactServiceOptions)[number]["id"]

const serviceLabelMap = new Map<string, string>(
  contactServiceOptions.map(option => [option.id, option.label]),
)

export function resolveContactServiceLabels(input: unknown): string[] | null {
  if (input === undefined || input === null) return []
  if (!Array.isArray(input)) return null
  const labels: string[] = []
  const seen = new Set<string>()
  for (const item of input) {
    if (typeof item !== "string") return null
    const label = serviceLabelMap.get(item.trim())
    if (!label) return null
    if (!seen.has(label)) {
      seen.add(label)
      labels.push(label)
    }
  }
  return labels
}

const serviceHeadingByLanguage: Record<Language, string> = {
  de: "Leistungen (optional)",
  en: "Services (optional)",
  fr: "Services (optionnel)",
  ar: "الخدمات (اختياري)",
  th: "บริการที่สนใจ (ไม่บังคับ)",
  hi: "सेवाएँ (वैकल्पिक)",
  tr: "Hizmetler (isteğe bağlı)",
  sq: "Shërbimet (opsionale)",
  ru: "Услуги (необязательно)",
  es: "Servicios (opcional)",
  it: "Servizi (opzionale)",
  uk: "Послуги (необов’язково)",
  el: "Υπηρεσίες (προαιρετικό)",
  pt: "Serviços (opcional)",
  zh: "所需服务（可选）",
  ja: "ご希望のサービス（任意）",
}

const serviceLabelsByLanguage: Record<Language, Record<ContactServiceId, string>> = {
  de: {
    website: "Website",
    "mobile-app": "iOS o. Android Application",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "NFC-Cards",
    "social-media": "Social Media Betreuung",
    "content-production": "Content Production",
    "local-llm": "LokalLLM",
    "ai-solutions": "KI-Lösungen",
    "payment-integrations": "Zahlungsintegrationen",
    "custom-package": "Individuelles Komplettpaket",
  },
  en: {
    website: "Website",
    "mobile-app": "iOS or Android Application",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "NFC Cards",
    "social-media": "Social Media Management",
    "content-production": "Content Production",
    "local-llm": "Local LLM",
    "ai-solutions": "AI Solutions",
    "payment-integrations": "Payment Integrations",
    "custom-package": "Custom Complete Package",
  },
  fr: {
    website: "Site web",
    "mobile-app": "Application iOS ou Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "Cartes NFC",
    "social-media": "Gestion Social Media",
    "content-production": "Production de contenu",
    "local-llm": "LLM local",
    "ai-solutions": "Solutions IA",
    "payment-integrations": "Intégrations de paiement",
    "custom-package": "Pack complet sur mesure",
  },
  ar: {
    website: "موقع إلكتروني",
    "mobile-app": "تطبيق iOS أو Android",
    "google-ads": "إعلانات Google",
    "seo-geo": "SEO و GEO",
    "nfc-cards": "بطاقات NFC",
    "social-media": "إدارة التواصل الاجتماعي",
    "content-production": "إنتاج المحتوى",
    "local-llm": "نموذج لغوي محلي (LokalLLM)",
    "ai-solutions": "حلول الذكاء الاصطناعي",
    "payment-integrations": "تكاملات الدفع",
    "custom-package": "باقة متكاملة مخصصة",
  },
  th: {
    website: "เว็บไซต์",
    "mobile-app": "แอปพลิเคชัน iOS หรือ Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "การ์ด NFC",
    "social-media": "ดูแลโซเชียลมีเดีย",
    "content-production": "ผลิตคอนเทนต์",
    "local-llm": "Local LLM",
    "ai-solutions": "โซลูชัน AI",
    "payment-integrations": "เชื่อมต่อระบบชำระเงิน",
    "custom-package": "แพ็กเกจครบวงจรแบบเฉพาะตัว",
  },
  hi: {
    website: "वेबसाइट",
    "mobile-app": "iOS या Android ऐप",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "NFC कार्ड्स",
    "social-media": "सोशल मीडिया प्रबंधन",
    "content-production": "कंटेंट प्रोडक्शन",
    "local-llm": "Local LLM",
    "ai-solutions": "AI समाधान",
    "payment-integrations": "पेमेंट इंटीग्रेशन",
    "custom-package": "कस्टम कम्प्लीट पैकेज",
  },
  tr: {
    website: "Web Sitesi",
    "mobile-app": "iOS veya Android Uygulama",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "NFC Kartlar",
    "social-media": "Sosyal Medya Yönetimi",
    "content-production": "İçerik Üretimi",
    "local-llm": "Yerel LLM",
    "ai-solutions": "Yapay Zeka Çözümleri",
    "payment-integrations": "Ödeme Entegrasyonları",
    "custom-package": "Özel Komple Paket",
  },
  sq: {
    website: "Uebfaqe",
    "mobile-app": "Aplikacion iOS ose Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "Karta NFC",
    "social-media": "Menaxhim i Rrjeteve Sociale",
    "content-production": "Prodhim Përmbajtjeje",
    "local-llm": "LLM Lokal",
    "ai-solutions": "Zgjidhje me AI",
    "payment-integrations": "Integrime Pagesash",
    "custom-package": "Paketë e Plotë e Personalizuar",
  },
  ru: {
    website: "Веб-сайт",
    "mobile-app": "Приложение iOS или Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO и GEO",
    "nfc-cards": "NFC-карты",
    "social-media": "Ведение соцсетей",
    "content-production": "Контент-продакшн",
    "local-llm": "Локальная LLM",
    "ai-solutions": "ИИ-решения",
    "payment-integrations": "Платёжные интеграции",
    "custom-package": "Индивидуальный комплексный пакет",
  },
  es: {
    website: "Sitio web",
    "mobile-app": "Aplicación iOS o Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO y GEO",
    "nfc-cards": "Tarjetas NFC",
    "social-media": "Gestión de Redes Sociales",
    "content-production": "Producción de Contenido",
    "local-llm": "LLM Local",
    "ai-solutions": "Soluciones de IA",
    "payment-integrations": "Integraciones de Pago",
    "custom-package": "Paquete Completo Personalizado",
  },
  it: {
    website: "Sito web",
    "mobile-app": "Applicazione iOS o Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "Carte NFC",
    "social-media": "Gestione Social Media",
    "content-production": "Produzione di Contenuti",
    "local-llm": "LLM Locale",
    "ai-solutions": "Soluzioni IA",
    "payment-integrations": "Integrazioni di Pagamento",
    "custom-package": "Pacchetto Completo Su Misura",
  },
  uk: {
    website: "Вебсайт",
    "mobile-app": "Застосунок iOS або Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO та GEO",
    "nfc-cards": "NFC-картки",
    "social-media": "Ведення соцмереж",
    "content-production": "Контент-продакшн",
    "local-llm": "Локальна LLM",
    "ai-solutions": "ШІ-рішення",
    "payment-integrations": "Платіжні інтеграції",
    "custom-package": "Індивідуальний комплексний пакет",
  },
  el: {
    website: "Ιστοσελίδα",
    "mobile-app": "Εφαρμογή iOS ή Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO & GEO",
    "nfc-cards": "Κάρτες NFC",
    "social-media": "Διαχείριση Social Media",
    "content-production": "Παραγωγή Περιεχομένου",
    "local-llm": "Τοπικό LLM",
    "ai-solutions": "Λύσεις AI",
    "payment-integrations": "Ενσωματώσεις Πληρωμών",
    "custom-package": "Εξατομικευμένο Πλήρες Πακέτο",
  },
  pt: {
    website: "Website",
    "mobile-app": "Aplicação iOS ou Android",
    "google-ads": "Google Ads",
    "seo-geo": "SEO e GEO",
    "nfc-cards": "Cartões NFC",
    "social-media": "Gestão de Redes Sociais",
    "content-production": "Produção de Conteúdo",
    "local-llm": "LLM Local",
    "ai-solutions": "Soluções de IA",
    "payment-integrations": "Integrações de Pagamento",
    "custom-package": "Pacote Completo Personalizado",
  },
  zh: {
    website: "网站建设",
    "mobile-app": "iOS 或 Android 应用",
    "google-ads": "Google Ads",
    "seo-geo": "SEO 与 GEO",
    "nfc-cards": "NFC 名片",
    "social-media": "社交媒体运营",
    "content-production": "内容制作",
    "local-llm": "本地 LLM",
    "ai-solutions": "AI 解决方案",
    "payment-integrations": "支付集成",
    "custom-package": "定制全套方案",
  },
  ja: {
    website: "ウェブサイト",
    "mobile-app": "iOS / Android アプリ",
    "google-ads": "Google Ads",
    "seo-geo": "SEO・GEO",
    "nfc-cards": "NFCカード",
    "social-media": "SNS運用代行",
    "content-production": "コンテンツ制作",
    "local-llm": "ローカルLLM",
    "ai-solutions": "AIソリューション",
    "payment-integrations": "決済連携",
    "custom-package": "個別フルパッケージ",
  },
}

export function contactServicesHeading(language: Language): string {
  return serviceHeadingByLanguage[language] || serviceHeadingByLanguage.de
}

export function contactServiceLabel(language: Language, id: ContactServiceId): string {
  return serviceLabelsByLanguage[language]?.[id] || serviceLabelsByLanguage.de[id]
}
