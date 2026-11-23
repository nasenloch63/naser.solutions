import { supportedLanguages, type Language } from './language'
import type { PortfolioProject, PortfolioSecondaryLink } from './portfolio'

export function isHazeChillKarteUrl(url: string): boolean {
  return /^https?:\/\/(?:haze-chill-karte\.vercel\.app|karte\.haze-chill\.com)(?:\/|$)/i.test(url.trim())
}

export const hazeChillKarteBadge: Record<Language, string> = {
  de: 'CustomOS · QRcode_expo',
  en: 'CustomOS · QRcode_expo',
  fr: 'CustomOS · QRcode_expo',
  ar: 'CustomOS · QRcode_expo',
  th: 'CustomOS · QRcode_expo',
  hi: 'CustomOS · QRcode_expo',
  tr: 'CustomOS · QRcode_expo',
  sq: 'CustomOS · QRcode_expo',
  ru: 'CustomOS · QRcode_expo',
  es: 'CustomOS · QRcode_expo',
  it: 'CustomOS · QRcode_expo',
  uk: 'CustomOS · QRcode_expo',
  el: 'CustomOS · QRcode_expo',
  pt: 'CustomOS · QRcode_expo',
  zh: 'CustomOS · QRcode_expo',
  ja: 'CustomOS · QRcode_expo',
}

export const hazeChillKarteSecondaryLink: PortfolioSecondaryLink = {
  label: 'GitHub: qr_card_expo',
  url: 'https://github.com/nasenloch63/qr_card_expo',
}

export const hazeChillKarteCopy: Record<Language, { title: string; description: string }> = {
  de: {
    title: 'Haze & Chill – QRcode_expo & CustomOS',
    description: 'Teil unseres CustomOS für das Haze & Chill Café: eigenes QR-Tischkarten- & Bestellsystem (QRcode_expo) auf Basis von Expo (iOS, Android & Web) und Neon Postgres – mit Tisch-QR-Codes, 2-Stunden-Bestellfenstern, Live-Theken- & Service-Ansicht sowie Speisekarten-Admin.',
  },
  en: {
    title: 'Haze & Chill – QRcode_expo & CustomOS',
    description: 'Part of our CustomOS built for Haze & Chill Café: custom QR table-menu and ordering system (QRcode_expo) powered by Expo (iOS, Android & web) and Neon Postgres — featuring table QR codes, 2-hour ordering windows, live bar & service views, and menu administration.',
  },
  fr: {
    title: 'Haze & Chill – QRcode_expo & CustomOS',
    description: 'Élément de notre CustomOS conçu pour le Haze & Chill Café : système de carte et de commande par QR code (QRcode_expo) développé avec Expo (iOS, Android et web) et Neon Postgres — QR codes de table, fenêtres de 2 heures, vues bar et service en direct et gestion de la carte.',
  },
  ar: {
    title: 'Haze & Chill – نظام QRcode_expo و CustomOS',
    description: 'جزء من نظام CustomOS الخاص بنا لمقهى Haze & Chill: نظام قوائم وطلبات عبر رمز QR للطاولات (QRcode_expo) مبني باستخدام Expo (iOS وAndroid والويب) وNeon Postgres مع رموز QR للطاولات ونوافذ طلب لمدة ساعتين وشاشات مباشرة للبار والخدمة وإدارة القائمة.',
  },
  th: {
    title: 'Haze & Chill – ระบบ QRcode_expo และ CustomOS',
    description: 'ส่วนหนึ่งของ CustomOS ที่พัฒนาให้ Haze & Chill Café: ระบบเมนูดิจิทัลและสั่งอาหารผ่าน QR ประจำโต๊ะ (QRcode_expo) บน Expo (iOS, Android และเว็บ) และ Neon Postgres พร้อมหน้าจอบาร์และบริการแบบเรียลไทม์และระบบจัดการเมนู',
  },
  hi: {
    title: 'Haze & Chill – QRcode_expo और CustomOS',
    description: 'Haze & Chill Café के लिए बनाए जा रहे हमारे CustomOS का हिस्सा: Expo (iOS, Android और वेब) व Neon Postgres पर आधारित QR टेबल-मेन्यू और ऑर्डरिंग सिस्टम (QRcode_expo) — टेबल QR कोड, 2-घंटे के ऑर्डर विंडो, लाइव बार व सर्विस व्यू और मेन्यू एडमिन के साथ।',
  },
  tr: {
    title: 'Haze & Chill – QRcode_expo & CustomOS',
    description: 'Haze & Chill Café için geliştirdiğimiz CustomOS’un bir parçası: Expo (iOS, Android ve web) ve Neon Postgres tabanlı özel QR masa menüsü ve sipariş sistemi (QRcode_expo) — masa QR kodları, canlı bar ve servis ekranları ile menü yönetimi.',
  },
  sq: {
    title: 'Haze & Chill – QRcode_expo & CustomOS',
    description: 'Pjesë e CustomOS-it tonë për Haze & Chill Café: sistem porosish dhe menuje me QR kod për tavolina (QRcode_expo) me Expo (iOS, Android & web) dhe Neon Postgres — me QR kode tavolinash, pamje live për barin e shërbimin dhe menaxhim menuje.',
  },
  ru: {
    title: 'Haze & Chill – QRcode_expo и CustomOS',
    description: 'Часть нашей системы CustomOS для Haze & Chill Café: собственная QR-система меню и заказов за столиками (QRcode_expo) на Expo (iOS, Android и веб) и Neon Postgres — QR-коды столов, 2-часовые окна заказов, живой экран бара и сервиса и админ-панель меню.',
  },
  es: {
    title: 'Haze & Chill – QRcode_expo y CustomOS',
    description: 'Parte de nuestro CustomOS desarrollado para Haze & Chill Café: sistema propio de carta y pedidos por QR en mesa (QRcode_expo) con Expo (iOS, Android y web) y Neon Postgres — códigos QR por mesa, ventanas de 2 horas, vistas en vivo de barra y servicio y gestión de carta.',
  },
  it: {
    title: 'Haze & Chill – QRcode_expo e CustomOS',
    description: 'Parte del nostro CustomOS realizzato per Haze & Chill Café: sistema di menu e ordini al tavolo tramite QR code (QRcode_expo) basato su Expo (iOS, Android e web) e Neon Postgres — QR per tavolo, finestre di 2 ore, viste live banco e servizio e gestione menu.',
  },
  uk: {
    title: 'Haze & Chill – QRcode_expo та CustomOS',
    description: 'Частина нашої системи CustomOS для Haze & Chill Café: власна QR-система меню та замовлень за столиками (QRcode_expo) на Expo (iOS, Android і веб) та Neon Postgres — QR-коди столів, 2-годинні вікна замовлень, живий екран бару й сервісу та керування меню.',
  },
  el: {
    title: 'Haze & Chill – QRcode_expo & CustomOS',
    description: 'Μέρος του CustomOS που αναπτύσσουμε για το Haze & Chill Café: σύστημα ψηφιακού μενού και παραγγελιών τραπεζιού με QR (QRcode_expo) σε Expo (iOS, Android & web) και Neon Postgres — με QR τραπεζιών, ζωντανές προβολές μπαρ & σέρβις και διαχείριση μενού.',
  },
  pt: {
    title: 'Haze & Chill – QRcode_expo e CustomOS',
    description: 'Parte do nosso CustomOS criado para o Haze & Chill Café: sistema próprio de ementa e pedidos por QR na mesa (QRcode_expo) em Expo (iOS, Android e web) e Neon Postgres — QR codes por mesa, janelas de 2 horas, vistas ao vivo de balcão e serviço e gestão da ementa.',
  },
  zh: {
    title: 'Haze & Chill – QRcode_expo 与 CustomOS',
    description: '为 Haze & Chill Café 打造的 CustomOS 核心模块之一：基于 Expo（iOS、Android 与 Web）及 Neon Postgres 的自研桌台扫码点单系统（QRcode_expo），支持桌台二维码、2 小时点单窗口、吧台与服务实时看板及菜单管理。',
  },
  ja: {
    title: 'Haze & Chill – QRcode_expo & CustomOS',
    description: 'Haze & Chill Café 向けに開発している独自 CustomOS の一部。Expo（iOS・Android・Web）と Neon Postgres によるテーブルQR注文システム（QRcode_expo）で、2時間注文ウィンドウ、バー・サービス向けリアルタイム画面、メニュー管理を備えています。',
  },
}

export const hazeChillKarteProject: PortfolioProject = {
  id: 'haze-chill-karte',
  title: Object.fromEntries(supportedLanguages.map(language => [language, hazeChillKarteCopy[language].title])),
  description: Object.fromEntries(supportedLanguages.map(language => [language, hazeChillKarteCopy[language].description])),
  url: 'https://haze-chill-karte.vercel.app/',
  category: 'gastro',
  tags: ['CustomOS', 'QRcode_expo', 'Expo · iOS/Android/Web', 'Haze & Chill'],
  image: '/projects/haze-chill-karte.jpg',
  alt: 'Haze & Chill QRcode_expo – Live-Theken- & Bestellsystem als Teil des Café-CustomOS',
  order: -4,
  featured: true,
  badge: hazeChillKarteBadge,
  secondaryLink: hazeChillKarteSecondaryLink,
}
