import { supportedLanguages, type Language } from './language'
import type { PortfolioPartner, PortfolioProject } from './portfolio'

export const westfalenHelpPartner: PortfolioPartner = {
  name: 'DOVARÉ',
  url: 'https://www.dovare.de/',
}

export function isWestfalenHelpUrl(url: string): boolean {
  return /^https?:\/\/(?:www\.)?westfalenhelp\.de(?:\/|$)/i.test(url.trim())
}

export const westfalenHelpCopy: Record<Language, { title: string; description: string }> = {
  de: {
    title: 'Westfalen Help – App & Website',
    description: 'Webauftritt und Kundenportal-App für Westfalen Help in Münster (Leckageortung, Trocknung & Sanierung) in Zusammenarbeit mit DOVARÉ. Meine Rolle: App-Testing & Qualitätssicherung (QA) sowie Visual QA und UI/UX-Review.',
  },
  en: {
    title: 'Westfalen Help – App & website',
    description: 'Website and customer portal app for Westfalen Help in Münster (leak detection, drying & restoration) in collaboration with DOVARÉ. My role: app testing & quality assurance (QA) as well as visual QA and UI/UX review.',
  },
  fr: {
    title: 'Westfalen Help – Application & site web',
    description: 'Site web et application portail client pour Westfalen Help à Münster (détection de fuites, assèchement et rénovation) en collaboration avec DOVARÉ. Mon rôle : tests applicatifs & assurance qualité (QA) ainsi que Visual QA et revue UI/UX.',
  },
  ar: {
    title: 'Westfalen Help – التطبيق والموقع الإلكتروني',
    description: 'موقع إلكتروني وتطبيق بوابة عملاء لصالح Westfalen Help في مونستر (كشف التسربات والتجفيف والترميم) بالتعاون مع DOVARÉ. دوري: اختبار التطبيق وضمان الجودة (QA) بالإضافة إلى المراجعة البصرية وتقييم UI/UX.',
  },
  th: {
    title: 'Westfalen Help – แอปและเว็บไซต์',
    description: 'เว็บไซต์และแอปพอร์ทัลลูกค้าสำหรับ Westfalen Help ในมึนสเตอร์ (ตรวจจับรอยรั่ว ทำความแห้ง และฟื้นฟูอาคาร) ร่วมกับ DOVARÉ บทบาทของฉัน: ทดสอบแอปและประกันคุณภาพ (QA) รวมถึง Visual QA และการรีวิว UI/UX',
  },
  hi: {
    title: 'Westfalen Help – ऐप और वेबसाइट',
    description: 'म्यूनस्टर में Westfalen Help (लीकेज डिटेक्शन, ड्राइंग और रेस्टोरेशन) के लिए वेबसाइट और ग्राहक पोर्टल ऐप, DOVARÉ के सहयोग से। मेरी भूमिका: ऐप टेस्टिंग और क्वालिटी एश्योरेंस (QA) तथा Visual QA और UI/UX रिव्यू।',
  },
  tr: {
    title: 'Westfalen Help – Uygulama & web sitesi',
    description: 'Münster’deki Westfalen Help (kaçak tespiti, kurutma ve tadilat) için DOVARÉ iş birliğiyle geliştirilen web sitesi ve müşteri portalı uygulaması. Rolüm: uygulama testi ve kalite güvencesi (QA) ile Visual QA ve UI/UX incelemesi.',
  },
  sq: {
    title: 'Westfalen Help – Aplikacioni & faqja web',
    description: 'Faqe interneti dhe aplikacion portali për klientët e Westfalen Help në Münster (zbulim rrjedhjesh, tharje dhe rinovim) në bashkëpunim me DOVARÉ. Roli im: testim aplikacioni & sigurim cilësie (QA), si dhe Visual QA dhe rishikim UI/UX.',
  },
  ru: {
    title: 'Westfalen Help – Приложение и сайт',
    description: 'Веб-сайт и приложение клиентского портала для Westfalen Help в Мюнстере (поиск протечек, осушение и восстановление) в сотрудничестве с DOVARÉ. Моя роль: тестирование приложения и контроль качества (QA), а также Visual QA и UI/UX-ревью.',
  },
  es: {
    title: 'Westfalen Help – App y sitio web',
    description: 'Sitio web y aplicación de portal de clientes para Westfalen Help en Münster (detección de fugas, secado y saneamiento) en colaboración con DOVARÉ. Mi rol: pruebas de la app y control de calidad (QA), además de Visual QA y revisión UI/UX.',
  },
  it: {
    title: 'Westfalen Help – App e sito web',
    description: 'Sito web e app portale clienti per Westfalen Help a Münster (ricerca perdite, asciugatura e risanamento) in collaborazione con DOVARÉ. Il mio ruolo: test dell’app e quality assurance (QA), oltre a Visual QA e revisione UI/UX.',
  },
  uk: {
    title: 'Westfalen Help – Застосунок і сайт',
    description: 'Вебсайт і застосунок клієнтського порталу для Westfalen Help у Мюнстері (пошук протікань, осушення та відновлення) у співпраці з DOVARÉ. Моя роль: тестування застосунку та контроль якості (QA), а також Visual QA і UI/UX-рев’ю.',
  },
  el: {
    title: 'Westfalen Help – Εφαρμογή & ιστοσελίδα',
    description: 'Ιστοσελίδα και εφαρμογή πύλης πελατών για τη Westfalen Help στο Μύνστερ (εντοπισμός διαρροών, αφύγρανση και αποκατάσταση) σε συνεργασία με τη DOVARÉ. Ο ρόλος μου: δοκιμές εφαρμογής & διασφάλιση ποιότητας (QA), καθώς και Visual QA και αξιολόγηση UI/UX.',
  },
  pt: {
    title: 'Westfalen Help – App e website',
    description: 'Website e aplicação de portal de clientes para a Westfalen Help em Münster (deteção de fugas, secagem e restauro) em colaboração com a DOVARÉ. O meu papel: testes da app e garantia de qualidade (QA), bem como Visual QA e revisão de UI/UX.',
  },
  zh: {
    title: 'Westfalen Help – 应用与网站',
    description: '与 DOVARÉ 合作，为明斯特的 Westfalen Help（漏水检测、烘干与修复服务）打造网站及客户门户应用。我的角色：应用测试与质量保障（QA），以及视觉质量评审（Visual QA）与 UI/UX 评审。',
  },
  ja: {
    title: 'Westfalen Help – アプリ＆ウェブサイト',
    description: 'DOVARÉ との協業による、ミュンスターの Westfalen Help（漏水調査・乾燥・復旧サービス）向けウェブサイトおよび顧客ポータルアプリ。担当：アプリテスト・品質保証（QA）、ビジュアルQAおよびUI/UXレビュー。',
  },
}

export const westfalenHelpProject: PortfolioProject = {
  id: 'westfalen-help',
  title: Object.fromEntries(supportedLanguages.map(language => [language, westfalenHelpCopy[language].title])),
  description: Object.fromEntries(supportedLanguages.map(language => [language, westfalenHelpCopy[language].description])),
  url: 'https://www.westfalenhelp.de/',
  category: 'web',
  tags: ['App-Testing & QA', 'Visual QA', 'UI/UX Review', 'DOVARÉ'],
  image: '/projects/westfalen-help.jpg',
  alt: 'Westfalen Help – Website & App für Leckageortung, Trocknung und Sanierung in Münster',
  order: -3,
  partner: westfalenHelpPartner,
}
