import { supportedLanguages, type Language } from './language'
import type { PortfolioProject } from './portfolio'

export const kasselUnitedCopy: Record<Language, { title: string; description: string }> = {
  de: { title: 'Kassel United – Community-Website', description: 'Website für die Lauf- und Sport-Community Kassel United: mit Programm und Treffpunkt an der Orangerie, Galerie, Sponsoren und Verknüpfungen zu den Social-Media-Kanälen.' },
  en: { title: 'Kassel United – Community website', description: 'Website for the Kassel United running and sports community, with programme and meeting point at the Orangerie, a gallery, sponsors and links to social media channels.' },
  fr: { title: 'Kassel United – Site communautaire', description: 'Site de la communauté de course et de sport Kassel United : programme, rendez-vous à l’Orangerie, galerie, sponsors et liens vers les réseaux sociaux.' },
  ar: { title: 'Kassel United – موقع المجتمع الرياضي', description: 'موقع لمجتمع الجري والرياضة Kassel United، يضم البرنامج ونقطة اللقاء عند الأورانجيري ومعرض الصور والرعاة وروابط قنوات التواصل الاجتماعي.' },
  th: { title: 'Kassel United – เว็บไซต์ชุมชน', description: 'เว็บไซต์ชุมชนวิ่งและกีฬา Kassel United พร้อมกำหนดการและจุดนัดพบที่ Orangerie แกลเลอรี ผู้สนับสนุน และลิงก์โซเชียลมีเดีย' },
  hi: { title: 'Kassel United – समुदाय की वेबसाइट', description: 'दौड़ और खेल समुदाय Kassel United की वेबसाइट: कार्यक्रम, Orangerie पर मिलने की जगह, गैलरी, प्रायोजक और सोशल मीडिया चैनलों के लिंक।' },
  tr: { title: 'Kassel United – Topluluk web sitesi', description: 'Kassel United koşu ve spor topluluğunun web sitesi: program, Orangerie buluşma noktası, galeri, sponsorlar ve sosyal medya kanallarına bağlantılar.' },
  sq: { title: 'Kassel United – Faqja e komunitetit', description: 'Faqe për komunitetin e vrapimit dhe sportit Kassel United: programi, takimi te Orangerie, galeria, sponsorët dhe lidhjet me rrjetet sociale.' },
  ru: { title: 'Kassel United – Сайт сообщества', description: 'Сайт бегового и спортивного сообщества Kassel United: программа, место встречи у Оранжереи, галерея, спонсоры и ссылки на социальные сети.' },
  es: { title: 'Kassel United – Web de la comunidad', description: 'Web de la comunidad de running y deporte Kassel United: programa, punto de encuentro en la Orangerie, galería, patrocinadores y enlaces a redes sociales.' },
  it: { title: 'Kassel United – Sito della community', description: 'Sito della community di corsa e sport Kassel United: programma, ritrovo all’Orangerie, galleria, sponsor e collegamenti ai canali social.' },
  uk: { title: 'Kassel United – Сайт спільноти', description: 'Сайт бігової та спортивної спільноти Kassel United: програма, місце зустрічі біля Оранжереї, галерея, спонсори та посилання на соціальні мережі.' },
  el: { title: 'Kassel United – Ιστοσελίδα κοινότητας', description: 'Ιστοσελίδα της κοινότητας τρεξίματος και αθλητισμού Kassel United: πρόγραμμα, συνάντηση στην Orangerie, συλλογή φωτογραφιών, χορηγοί και σύνδεσμοι κοινωνικών δικτύων.' },
  pt: { title: 'Kassel United – Site da comunidade', description: 'Site da comunidade de corrida e desporto Kassel United: programa, ponto de encontro na Orangerie, galeria, patrocinadores e ligações às redes sociais.' },
  zh: { title: 'Kassel United – 社群网站', description: 'Kassel United 跑步与运动社群网站：提供活动安排、Orangerie 集合地点、相册、赞助商介绍和社交媒体链接。' },
  ja: { title: 'Kassel United – コミュニティサイト', description: 'ランニングとスポーツのコミュニティ Kassel United のウェブサイト。プログラム、Orangerie の集合場所、ギャラリー、スポンサー、SNSへのリンクを掲載。' },
}

export const kasselUnitedProject: PortfolioProject = {
  id: 'kassel-united',
  title: Object.fromEntries(supportedLanguages.map(language => [language, kasselUnitedCopy[language].title])),
  description: Object.fromEntries(supportedLanguages.map(language => [language, kasselUnitedCopy[language].description])),
  url: 'https://www.kassel-united.de/',
  category: 'web',
  tags: ['Webdesign', 'Community', 'Kassel'],
  image: '/projects/kassel-united.jpg',
  alt: 'Kassel United – Community-Website mit Treffpunkt an der Orangerie Kassel',
  order: -2,
}
