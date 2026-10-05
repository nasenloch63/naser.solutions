import type { Language } from './language'
import { japaneseHazeCopy } from './japanese-copy'

type ProjectCopy = { title: string; description: string; gastro: string; social: string }

export const hazeChillProjectCopy: Record<Language, ProjectCopy> = {
  ja: japaneseHazeCopy,
  uk: {
    title: 'Haze & Chill Café — сайт',
    description: 'Сайт Haze & Chill Café у Касселі: цифрове меню, знайомство з лаунжем і настінним мистецтвом, години роботи та маршрут. Доступний німецькою й англійською.',
    gastro: 'Заклади харчування', social: 'Соцмережі',
  },
  th: {
    title: 'Haze & Chill Café – เว็บไซต์',
    description: 'เว็บไซต์ Haze & Chill Café ในคัสเซิล พร้อมเมนูดิจิทัล ภาพเลานจ์และศิลปะบนผนัง เวลาเปิด และเส้นทาง มีภาษาเยอรมันและอังกฤษ',
    gastro: 'ร้านอาหารและคาเฟ่', social: 'โซเชียลมีเดีย',
  },
  hi: {
    title: 'Haze & Chill Café — वेबसाइट',
    description: 'कासेल के Haze & Chill Café की वेबसाइट: डिजिटल मेन्यू, लाउंज और दीवार की कला की झलक, खुलने का समय और रास्ता। जर्मन और अंग्रेज़ी में उपलब्ध।',
    gastro: 'रेस्तराँ और कैफ़े', social: 'सोशल मीडिया',
  },
  de: {
    title: 'Haze & Chill Café – Website',
    description: 'Webauftritt für das Haze & Chill Café in Kassel: mit digitaler Speisekarte, Einblicken in die Lounge und Wandkunst sowie Öffnungszeiten und Anfahrt. Die Website ist auf Deutsch und Englisch verfügbar.',
    gastro: 'Gastronomie', social: 'Social Media',
  },
  en: {
    title: 'Haze & Chill Café – Website',
    description: 'Website for Haze & Chill Café in Kassel, featuring a digital menu, lounge and mural gallery, opening hours and directions. Available in German and English.',
    gastro: 'Hospitality', social: 'Social Media',
  },
  fr: {
    title: 'Haze & Chill Café – Site web',
    description: 'Site du Haze & Chill Café à Kassel : carte numérique, découverte du lounge et des fresques, horaires et accès. Disponible en allemand et en anglais.',
    gastro: 'Restauration', social: 'Réseaux sociaux',
  },
  ar: {
    title: 'Haze & Chill Café – الموقع الإلكتروني',
    description: 'موقع مقهى Haze & Chill في كاسل، مع قائمة طعام رقمية وصور للصالة والرسومات الجدارية ومواعيد العمل وإرشادات الوصول. متاح بالألمانية والإنجليزية.',
    gastro: 'المطاعم والمقاهي', social: 'التواصل الاجتماعي',
  },
  tr: {
    title: 'Haze & Chill Café – Web sitesi',
    description: 'Kassel’deki Haze & Chill Café için dijital menü, lounge ve duvar sanatı galerisi, çalışma saatleri ve yol tarifi içeren web sitesi. Almanca ve İngilizce olarak kullanılabilir.',
    gastro: 'Yeme içme', social: 'Sosyal medya',
  },
  sq: {
    title: 'Haze & Chill Café – Faqja web',
    description: 'Faqja e Haze & Chill Café në Kassel: menu digjitale, pamje të lounge-it dhe artit në mure, orari dhe udhëzimet e mbërritjes. E disponueshme në gjermanisht dhe anglisht.',
    gastro: 'Gastronomi', social: 'Rrjete sociale',
  },
  ru: {
    title: 'Haze & Chill Café – Сайт',
    description: 'Сайт Haze & Chill Café в Касселе: цифровое меню, фотографии лаунжа и настенной живописи, часы работы и маршрут. Доступен на немецком и английском языках.',
    gastro: 'Кафе и рестораны', social: 'Социальные сети',
  },
  es: {
    title: 'Haze & Chill Café – Sitio web',
    description: 'Web del Haze & Chill Café en Kassel: menú digital, imágenes del lounge y sus murales, horarios y cómo llegar. Disponible en alemán e inglés.',
    gastro: 'Hostelería', social: 'Redes sociales',
  },
  it: {
    title: 'Haze & Chill Café – Sito web',
    description: 'Sito dell’Haze & Chill Café a Kassel: menu digitale, immagini del lounge e dei murales, orari e indicazioni. Disponibile in tedesco e inglese.',
    gastro: 'Ristorazione', social: 'Social media',
  },
  el: {
    title: 'Haze & Chill Café – Ιστοσελίδα',
    description: 'Ιστοσελίδα για το Haze & Chill Café στο Κάσελ: ψηφιακό μενού, εικόνες του lounge και των τοιχογραφιών, ωράριο και οδηγίες πρόσβασης. Διαθέσιμη στα γερμανικά και στα αγγλικά.',
    gastro: 'Εστίαση', social: 'Κοινωνικά δίκτυα',
  },
  pt: {
    title: 'Haze & Chill Café – Website',
    description: 'Website do Haze & Chill Café em Kassel: menu digital, imagens do lounge e dos murais, horários e indicações. Disponível em alemão e inglês.',
    gastro: 'Restauração', social: 'Redes sociais',
  },
  zh: {
    title: 'Haze & Chill Café – 网站',
    description: '为卡塞尔的 Haze & Chill Café 打造的网站，提供数字菜单、休闲区及壁画展示、营业时间与路线指引。支持德语和英语。',
    gastro: '餐饮', social: '社交媒体',
  },
}
