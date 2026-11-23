import { supportedLanguages, type Language } from './language'
import type { LocalizedText, PortfolioPartner } from './portfolio'
import { westfalenHelpPartner } from './westfalen-help-project'

export interface DemoPartnerSectionCopy {
  heading: string
  description: string
  collaborationLabel: string
}

export interface DemoPartnerProject {
  id: string
  title: LocalizedText
  description: LocalizedText
  badge: LocalizedText
  url: string
  tags: string[]
  image: string
  alt: string
  partner?: PortfolioPartner | null
}

export const demoPartnerSectionCopy: Record<Language, DemoPartnerSectionCopy> = {
  de: {
    heading: 'Aktuelle Demo-Sites & Partner',
    description: 'Laufende Demo-Websites, Seiten im Aufbau sowie Partner-Agenturen, mit denen ich gemeinsam Projekte ausarbeite und Creator manage.',
    collaborationLabel: 'In Zusammenarbeit mit',
  },
  en: {
    heading: 'Current Demo Sites & Partners',
    description: 'Active demo websites, sites in progress and partner agencies I collaborate with on client projects and creator management.',
    collaborationLabel: 'In collaboration with',
  },
  fr: {
    heading: 'Sites démo actuels & partenaires',
    description: 'Sites démo en cours, projets en construction et agences partenaires avec lesquelles je développe des projets et gère des créateurs.',
    collaborationLabel: 'En collaboration avec',
  },
  ar: {
    heading: 'مواقع تجريبية حالية وشركاء',
    description: 'مواقع تجريبية قيد التطوير وصفحات قيد الإنشاء ووكالات شريكة أعمل معها على تنفيذ المشاريع وإدارة صناع المحتوى.',
    collaborationLabel: 'بالتعاون مع',
  },
  th: {
    heading: 'เว็บไซต์เดโมปัจจุบันและพาร์ตเนอร์',
    description: 'เว็บไซต์เดโมที่กำลังพัฒนา เว็บไซต์ระหว่างจัดทำ และเอเจนซี่พาร์ตเนอร์ที่ร่วมกันพัฒนาโปรเจกต์และดูแลครีเอเตอร์',
    collaborationLabel: 'ร่วมมือกับ',
  },
  hi: {
    heading: 'वर्तमान डेमो साइट्स और पार्टनर',
    description: 'प्रगति पर डेमो वेबसाइट्स, निर्माणाधीन साइट्स और पार्टनर एजेंसियां जिनके साथ मैं प्रोजेक्ट्स तैयार करता हूँ और क्रिएटर्स का प्रबंधन करता हूँ।',
    collaborationLabel: 'सहयोग:',
  },
  tr: {
    heading: 'Güncel Demo Siteler & İş Ortakları',
    description: 'Geliştirme aşamasındaki demo web siteleri, yapım aşamasındaki sayfalar ve birlikte proje geliştirip içerik üreticisi yönettiğim iş ortağı ajanslar.',
    collaborationLabel: 'İş birliğiyle:',
  },
  sq: {
    heading: 'Faqe demo aktuale & partnerë',
    description: 'Faqe demo në zhvillim, sajte në ndërtim dhe agjenci partnere me të cilat realizoj projekte dhe menaxhoj krijues.',
    collaborationLabel: 'Në bashkëpunim me',
  },
  ru: {
    heading: 'Текущие демо-сайты и партнёры',
    description: 'Актуальные демо-сайты в разработке, проекты в процессе запуска и партнёрские агентства, с которыми я совместно разрабатываю проекты и веду креаторов.',
    collaborationLabel: 'В сотрудничестве с',
  },
  es: {
    heading: 'Sitios demo actuales y socios',
    description: 'Sitios web demo en desarrollo, páginas en construcción y agencias asociadas con las que desarrollo proyectos y gestiono creadores.',
    collaborationLabel: 'En colaboración con',
  },
  it: {
    heading: 'Siti demo attuali e partner',
    description: 'Siti demo in sviluppo, pagine in costruzione e agenzie partner con cui realizzo progetti e gestisco creator.',
    collaborationLabel: 'In collaborazione con',
  },
  uk: {
    heading: 'Поточні демо-сайти та партнери',
    description: 'Актуальні демо-сайти в розробці, сторінки в процесі запуску та партнерські агенції, з якими я спільно опрацьовую проєкти й веду креаторів.',
    collaborationLabel: 'У співпраці з',
  },
  el: {
    heading: 'Τρέχοντα demo sites & συνεργάτες',
    description: 'Ενεργά demo websites, σελίδες υπό κατασκευή και συνεργαζόμενα agencies με τα οποία υλοποιώ έργα και διαχειρίζομαι creators.',
    collaborationLabel: 'Σε συνεργασία με',
  },
  pt: {
    heading: 'Sites demo atuais e parceiros',
    description: 'Websites demo em desenvolvimento, páginas em construção e agências parceiras com quem desenvolvo projetos e faço gestão de criadores.',
    collaborationLabel: 'Em colaboração com',
  },
  zh: {
    heading: '当前演示站点与合作伙伴',
    description: '正在开发中的演示网站、筹备中的上线页面，以及与我共同推进项目和运营创作者的合作伙伴机构。',
    collaborationLabel: '合作方：',
  },
  ja: {
    heading: '公開中のデモサイト＆パートナー',
    description: '開発中のデモサイト、準備中のWebサイト、そしてプロジェクトの共同制作やクリエイターマネジメントを行うパートナーエージェンシー。',
    collaborationLabel: '協業パートナー：',
  },
}

type DemoEntryCopy = Record<Language, { title: string; description: string; badge: string }>

const verdiBetaCopy: DemoEntryCopy = {
  de: {
    badge: 'Demo-Site · Beta',
    title: 'Ristorante Verdi Pizzeria – Demo-Site',
    description: 'Aktuelle Beta-Website für das Ristorante Verdi in Hessisch Lichtenau: mit interaktiver Speisekarte (Steinofen-Pizza, Pasta & Salate), Vegetarisch-Filter, Google-Bewertungen, Galerie und Öffnungszeiten.',
  },
  en: {
    badge: 'Demo Site · Beta',
    title: 'Ristorante Verdi Pizzeria – Demo site',
    description: 'Active beta website for Ristorante Verdi in Hessisch Lichtenau featuring an interactive menu (stone-oven pizza, pasta & salads), vegetarian filter, Google reviews, gallery and opening hours.',
  },
  fr: {
    badge: 'Site démo · Bêta',
    title: 'Ristorante Verdi Pizzeria – Site démo',
    description: 'Version bêta actuelle pour le Ristorante Verdi à Hessisch Lichtenau : carte interactive (pizzas au feu de pierre, pâtes et salades), filtre végétarien, avis Google, galerie et horaires.',
  },
  ar: {
    badge: 'موقع تجريبي · بيتا',
    title: 'Ristorante Verdi Pizzeria – موقع تجريبي',
    description: 'موقع تجريبي حالي لمطعم Ristorante Verdi في هيسيش ليختناو، يضم قائمة طعام تفاعلية (بيتزا الفرن الحجري والباستا والسلطات) وفلتر للأطباق النباتية وتقييمات Google ومعرض صور ومواعيد العمل.',
  },
  th: {
    badge: 'เว็บไซต์เดโม · เบต้า',
    title: 'Ristorante Verdi Pizzeria – เว็บไซต์เดโม',
    description: 'เว็บไซต์เวอร์ชันเบต้าสำหรับ Ristorante Verdi ใน Hessisch Lichtenau พร้อมเมนูแบบโต้ตอบ (พิซซ่าเตาหิน พาสต้า และสลัด) ตัวกรองมังสวิรัติ รีวิว Google แกลเลอรี และเวลาเปิดทำการ',
  },
  hi: {
    badge: 'डेमो साइट · बीटा',
    title: 'Ristorante Verdi Pizzeria – डेमो साइट',
    description: 'Hessisch Lichtenau स्थित Ristorante Verdi की वर्तमान बीटा वेबसाइट: इंटरैक्टिव मेन्यू (स्टोन-ओवन पिज़्ज़ा, पास्ता और सलाद), शाकाहारी फ़िल्टर, Google समीक्षाएँ, गैलरी और खुलने का समय।',
  },
  tr: {
    badge: 'Demo Site · Beta',
    title: 'Ristorante Verdi Pizzeria – Demo site',
    description: 'Hessisch Lichtenau’daki Ristorante Verdi için güncel beta web sitesi: etkileşimli menü (taş fırın pizza, makarna ve salatalar), vejetaryen filtresi, Google yorumları, galeri ve çalışma saatleri.',
  },
  sq: {
    badge: 'Faqe demo · Beta',
    title: 'Ristorante Verdi Pizzeria – Faqe demo',
    description: 'Faqe beta aktuale për Ristorante Verdi në Hessisch Lichtenau: me menu interaktive (pica në furrë guri, pasta dhe sallata), filtër vegjetarian, vlerësime në Google, galeri dhe orar.',
  },
  ru: {
    badge: 'Демо-сайт · Бета',
    title: 'Ristorante Verdi Pizzeria – Демо-сайт',
    description: 'Актуальная бета-версия сайта для Ristorante Verdi в Хессиш-Лихтенау: интерактивное меню (пицца из каменной печи, паста и салаты), вегетарианский фильтр, отзывы Google, галерея и часы работы.',
  },
  es: {
    badge: 'Sitio demo · Beta',
    title: 'Ristorante Verdi Pizzeria – Sitio demo',
    description: 'Sitio web beta actual para Ristorante Verdi en Hessisch Lichtenau: carta interactiva (pizza en horno de piedra, pasta y ensaladas), filtro vegetariano, reseñas de Google, galería y horarios.',
  },
  it: {
    badge: 'Sito demo · Beta',
    title: 'Ristorante Verdi Pizzeria – Sito demo',
    description: 'Sito beta attuale per il Ristorante Verdi a Hessisch Lichtenau: menu interattivo (pizza nel forno a pietra, pasta e insalate), filtro vegetariano, recensioni Google, galleria e orari di apertura.',
  },
  uk: {
    badge: 'Демо-сайт · Бета',
    title: 'Ristorante Verdi Pizzeria – Демо-сайт',
    description: 'Актуальна бета-версія сайту для Ristorante Verdi у Гессіш-Ліхтенау: інтерактивне меню (піца з кам’яної печі, паста й салати), вегетаріанський фільтр, відгуки Google, галерея та графік роботи.',
  },
  el: {
    badge: 'Demo Site · Beta',
    title: 'Ristorante Verdi Pizzeria – Demo site',
    description: 'Τρέχουσα beta ιστοσελίδα για το Ristorante Verdi στο Hessisch Lichtenau: διαδραστικό μενού (πίτσα σε πετρόφουρνο, ζυμαρικά και σαλάτες), φίλτρο χορτοφαγικών, αξιολογήσεις Google, γκαλερί και ωράριο.',
  },
  pt: {
    badge: 'Site demo · Beta',
    title: 'Ristorante Verdi Pizzeria – Site demo',
    description: 'Website beta atual para o Ristorante Verdi em Hessisch Lichtenau: ementa interativa (pizza em forno de pedra, massas e saladas), filtro vegetariano, avaliações Google, galeria e horários.',
  },
  zh: {
    badge: '演示站点 · Beta',
    title: 'Ristorante Verdi Pizzeria – 演示网站',
    description: '位于 Hessisch Lichtenau 的 Ristorante Verdi 披萨餐厅测试版网站：包含交互式菜单（石炉披萨、意面与沙拉）、素食筛选、Google 评价、图片画廊与营业时间。',
  },
  ja: {
    badge: 'デモサイト・Beta',
    title: 'Ristorante Verdi Pizzeria – デモサイト',
    description: 'Hessisch Lichtenau の Ristorante Verdi 向けベータ版サイト。石窯ピザ・パスタ・サラダのインタラクティブメニュー、ベジタリアンフィルター、Googleレビュー、ギャラリー、営業時間を掲載。',
  },
}

const dovareCopy: DemoEntryCopy = {
  de: {
    badge: 'Partner · Im Aufbau',
    title: 'DOVARÉ – Partner & Pre-Launch-Site',
    description: 'Digitalagentur für hochwertige Websites und digitale Markenauftritte – derzeit mit Pre-Launch-Auftritt im Aufbau. Partner-Agentur, mit der ich gemeinsam Kundenprojekte ausarbeite und umsetze (u. a. Westfalen Help).',
  },
  en: {
    badge: 'Partner · In Progress',
    title: 'DOVARÉ – Partner & pre-launch site',
    description: 'Digital agency for high-end websites and brand experiences — currently live with its pre-launch page while the main site is being built. Partner agency I collaborate with on client projects (including Westfalen Help).',
  },
  fr: {
    badge: 'Partenaire · En construction',
    title: 'DOVARÉ – Partenaire & site pré-lancement',
    description: 'Agence digitale spécialisée dans les sites haut de gamme et les identités de marque, actuellement en phase de pré-lancement. Agence partenaire avec laquelle je conçois et réalise des projets clients (dont Westfalen Help).',
  },
  ar: {
    badge: 'شريك · قيد الإنشاء',
    title: 'DOVARÉ – شريك وموقع قيد الإطلاق',
    description: 'وكالة رقمية متخصصة في المواقع الراقية والهويات الرقمية، مع صفحة ما قبل الإطلاق حالياً. وكالة شريكة أعمل معها على تطوير وتنفيذ مشاريع العملاء (من بينها Westfalen Help).',
  },
  th: {
    badge: 'พาร์ตเนอร์ · กำลังพัฒนา',
    title: 'DOVARÉ – พาร์ตเนอร์และหน้า Pre-Launch',
    description: 'ดิจิทัลเอเจนซี่ด้านเว็บไซต์และแบรนด์ดิจิทัลระดับพรีเมียม ปัจจุบันอยู่ในช่วง Pre-Launch เป็นพาร์ตเนอร์ที่ร่วมกันวางแผนและพัฒนาโปรเจกต์ลูกค้า (รวมถึง Westfalen Help)',
  },
  hi: {
    badge: 'पार्टनर · निर्माणाधीन',
    title: 'DOVARÉ – पार्टनर और प्री-लॉन्च साइट',
    description: 'उच्च-स्तरीय वेबसाइट्स और डिजिटल ब्रांड प्रेज़ेंस के लिए डिजिटल एजेंसी — वर्तमान में प्री-लॉन्च चरण में। पार्टनर एजेंसी जिसके साथ मैं क्लाइंट प्रोजेक्ट्स (जैसे Westfalen Help) तैयार और कार्यान्वित करता हूँ।',
  },
  tr: {
    badge: 'İş Ortağı · Yapım Aşamasında',
    title: 'DOVARÉ – İş ortağı & ön lansman sitesi',
    description: 'Yüksek kaliteli web siteleri ve dijital marka kimlikleri geliştiren, şu anda ön lansman aşamasındaki dijital ajans. Müşteri projelerini (Westfalen Help dâhil) birlikte geliştirip hayata geçirdiğim iş ortağım.',
  },
  sq: {
    badge: 'Partner · Në ndërtim',
    title: 'DOVARÉ – Partner & faqe para-lansimi',
    description: 'Agjenci digjitale për faqe interneti cilësore dhe prezencë digjitale të markave, aktualisht në fazën para-lansimit. Agjenci partnere me të cilën zhvilloj dhe realizoj projekte klientësh (përfshirë Westfalen Help).',
  },
  ru: {
    badge: 'Партнёр · В разработке',
    title: 'DOVARÉ – Партнёр и pre-launch сайт',
    description: 'Диджитал-агентство, создающее сайты и цифровые бренд-образы — сейчас на этапе запуска нового сайта. Партнёрское агентство, с которым я совместно разрабатываю и реализую клиентские проекты (включая Westfalen Help).',
  },
  es: {
    badge: 'Socio · En construcción',
    title: 'DOVARÉ – Socio y sitio pre-lanzamiento',
    description: 'Agencia digital especializada en sitios web y presencia de marca de alto nivel, actualmente en fase de pre-lanzamiento. Agencia asociada con la que desarrollo proyectos para clientes (entre ellos Westfalen Help).',
  },
  it: {
    badge: 'Partner · In costruzione',
    title: 'DOVARÉ – Partner e sito pre-lancio',
    description: 'Agenzia digitale per siti web di alto livello e identità di marca, attualmente con pagina pre-lancio in costruzione. Agenzia partner con cui sviluppo e realizzo progetti clienti (tra cui Westfalen Help).',
  },
  uk: {
    badge: 'Партнер · У розробці',
    title: 'DOVARÉ – Партнер і pre-launch сайт',
    description: 'Диджитал-агенція, що створює якісні сайти й цифрові бренд-проєкти, наразі на етапі запуску нового сайту. Партнерська агенція, з якою я спільно опрацьовую та реалізую клієнтські проєкти (зокрема Westfalen Help).',
  },
  el: {
    badge: 'Συνεργάτης · Υπό κατασκευή',
    title: 'DOVARÉ – Συνεργάτης & pre-launch site',
    description: 'Ψηφιακό agency για υψηλής αισθητικής ιστοσελίδες και ψηφιακή ταυτότητα, αυτή τη στιγμή σε φάση pre-launch. Συνεργαζόμενο agency με το οποίο υλοποιούμε από κοινού έργα πελατών (όπως το Westfalen Help).',
  },
  pt: {
    badge: 'Parceiro · Em construção',
    title: 'DOVARÉ – Parceiro e site pré-lançamento',
    description: 'Agência digital focada em websites e identidades digitais de excelência, atualmente em fase de pré-lançamento. Agência parceira com quem desenvolvo projetos para clientes (incluindo a Westfalen Help).',
  },
  zh: {
    badge: '合作伙伴 · 筹备上线',
    title: 'DOVARÉ – 合作伙伴与预上线页面',
    description: '专注于高端网站与数字品牌形象的数字机构，目前主站正在构建中。与我共同策划和落地客户项目（包括 Westfalen Help）的合作伙伴机构。',
  },
  ja: {
    badge: 'パートナー・制作中',
    title: 'DOVARÉ – パートナー＆プレローンチサイト',
    description: '高品質なウェブサイトとデジタルブランディングを手掛けるデジタルエージェンシー（現在メインサイト構築中）。Westfalen Help をはじめ、クライアント案件を共同で進めるパートナーです。',
  },
}

const nextstepCopy: DemoEntryCopy = {
  de: {
    badge: 'Partner · Creator Management',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Agentur für Influencer Marketing, Brand Partnerships und Creator-Management (19+ Mio. Community). Partner, mit dem ich gemeinsam Projekte ausarbeite sowie Creator betreue und manage.',
  },
  en: {
    badge: 'Partner · Creator Management',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Agency for influencer marketing, brand partnerships and creator management (19M+ combined community). Partner agency I collaborate with on joint projects and creator management.',
  },
  fr: {
    badge: 'Partenaire · Gestion de créateurs',
    title: 'NEXTSTEP Agency – Gestion de créateurs & talents',
    description: 'Agence de marketing d’influence, de partenariats de marques et de gestion de créateurs (communauté de plus de 19 M). Partenaire avec lequel je développe des projets et gère des créateurs.',
  },
  ar: {
    badge: 'شريك · إدارة صناع المحتوى',
    title: 'NEXTSTEP Agency – إدارة صناع المحتوى والمواهب',
    description: 'وكالة للتسويق عبر المؤثرين وشراكات العلامات التجارية وإدارة صناع المحتوى (مجتمع يتجاوز 19 مليون متابع). شريك أعمل معه على تطوير المشاريع وإدارة صناع المحتوى.',
  },
  th: {
    badge: 'พาร์ตเนอร์ · บริหารครีเอเตอร์',
    title: 'NEXTSTEP Agency – บริหารครีเอเตอร์และทาเลนต์',
    description: 'เอเจนซี่ด้านอินฟลูเอนเซอร์มาร์เก็ตติ้ง พาร์ตเนอร์แบรนด์ และการดูแลครีเอเตอร์ (คอมมูนิตี้กว่า 19 ล้าน) พาร์ตเนอร์ที่ร่วมกันพัฒนาโปรเจกต์และดูแลจัดการครีเอเตอร์',
  },
  hi: {
    badge: 'पार्टनर · क्रिएटर मैनेजमेंट',
    title: 'NEXTSTEP Agency – क्रिएटर और टैलेंट मैनेजमेंट',
    description: 'इन्फ्लुएंसर मार्केटिंग, ब्रांड पार्टनरशिप्स और क्रिएटर मैनेजमेंट की एजेंसी (19M+ कम्युनिटी)। पार्टनर जिसके साथ मैं प्रोजेक्ट्स तैयार करता हूँ और क्रिएटर्स का प्रबंधन करता हूँ।',
  },
  tr: {
    badge: 'İş Ortağı · Creator Management',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Influencer pazarlama, marka iş birlikleri ve içerik üreticisi yönetimi ajansı (19+ milyon topluluk). Projeleri birlikte geliştirdiğim ve içerik üreticilerini yönettiğim iş ortağı.',
  },
  sq: {
    badge: 'Partner · Menaxhim Krijuesish',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Agjenci për influencer marketing, partneritete me marka dhe menaxhim krijuesish (komunitet mbi 19 mln). Partner me të cilin zhvilloj projekte të përbashkëta dhe menaxhoj krijues.',
  },
  ru: {
    badge: 'Партнёр · Менеджмент креаторов',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Агентство инфлюенс-маркетинга, бренд-партнёрств и менеджмента креаторов (аудитория более 19 млн). Партнёр, с которым я совместно прорабатываю проекты и веду креаторов.',
  },
  es: {
    badge: 'Socio · Gestión de creadores',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Agencia de marketing de influencers, alianzas con marcas y gestión de creadores (comunidad de más de 19 M). Socio con el que desarrollo proyectos conjuntos y gestiono creadores.',
  },
  it: {
    badge: 'Partner · Creator Management',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Agenzia di influencer marketing, brand partnership e gestione creator (community oltre 19 mln). Partner con cui sviluppo progetti condivisi e seguo la gestione dei creator.',
  },
  uk: {
    badge: 'Партнер · Менеджмент креаторів',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Агенція інфлюенс-маркетингу, бренд-партнерств і менеджменту креаторів (аудиторія понад 19 млн). Партнер, із яким я спільно опрацьовую проєкти та веду креаторів.',
  },
  el: {
    badge: 'Συνεργάτης · Creator Management',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Agency για influencer marketing, συνεργασίες με brands και διαχείριση creators (κοινότητα 19+ εκ.). Συνεργάτης με τον οποίο αναπτύσσω κοινά έργα και διαχειρίζομαι creators.',
  },
  pt: {
    badge: 'Parceiro · Gestão de Criadores',
    title: 'NEXTSTEP Agency – Creator & Talent Management',
    description: 'Agência de marketing de influência, parcerias com marcas e gestão de criadores (comunidade de mais de 19 M). Parceiro com quem desenvolvo projetos em conjunto e faço gestão de criadores.',
  },
  zh: {
    badge: '合作伙伴 · 创作者运营',
    title: 'NEXTSTEP Agency – 创作者与达人经纪机构',
    description: '专注于达人营销、品牌合作与创作者管理的机构（覆盖 1900 万+ 粉丝社群）。与我共同推进合作项目并开展创作者运营与管理的合作伙伴。',
  },
  ja: {
    badge: 'パートナー・クリエイター管理',
    title: 'NEXTSTEP Agency – クリエイター＆タレントマネジメント',
    description: 'インフルエンサーマーケティング、ブランドパートナーシップ、クリエイターマネジメントを手掛けるエージェンシー（総コミュニティ1,900万人以上）。プロジェクトの共同推進およびクリエイター管理を行うパートナーです。',
  },
}

const kvpHelsaCopy: DemoEntryCopy = {
  de: {
    badge: 'Demo-Site · mit DOVARÉ',
    title: 'Landgasthof König von Preußen – Demo-Site',
    description: 'Gemeinsam mit DOVARÉ ausgearbeitete Demo-Website für den Landgasthof König von Preußen in Helsa bei Kassel: Restaurant, Biergarten und zehn Hotelzimmer mit saisonaler Speisekarte, Online-Tischreservierung und Zimmerbuchung.',
  },
  en: {
    badge: 'Demo Site · with DOVARÉ',
    title: 'Landgasthof König von Preußen – Demo site',
    description: 'Demo website developed together with DOVARÉ for Landgasthof König von Preußen in Helsa near Kassel: restaurant, beer garden and ten hotel rooms featuring a seasonal menu, online table reservations and room booking.',
  },
  fr: {
    badge: 'Site démo · avec DOVARÉ',
    title: 'Landgasthof König von Preußen – Site démo',
    description: 'Site démo conçu avec DOVARÉ pour le Landgasthof König von Preußen à Helsa près de Kassel : restaurant, biergarten et dix chambres d’hôtel avec carte saisonnière, réservation de table en ligne et réservation de chambres.',
  },
  ar: {
    badge: 'موقع تجريبي · مع DOVARÉ',
    title: 'Landgasthof König von Preußen – موقع تجريبي',
    description: 'موقع تجريبي أُعدّ بالتعاون مع DOVARÉ لصالح Landgasthof König von Preußen في هيلسا قرب كاسل: مطعم وحديقة بيرة وعشر غرف فندقية مع قائمة موسمية وحجز طاولات وغرف عبر الإنترنت.',
  },
  th: {
    badge: 'เว็บไซต์เดโม · ร่วมกับ DOVARÉ',
    title: 'Landgasthof König von Preußen – เว็บไซต์เดโม',
    description: 'เว็บไซต์เดโมที่พัฒนาร่วมกับ DOVARÉ สำหรับ Landgasthof König von Preußen ใน Helsa ใกล้คัสเซิล: ร้านอาหาร ลานเบียร์ และห้องพักโรงแรม 10 ห้อง พร้อมเมนูตามฤดูกาล จองโต๊ะออนไลน์ และจองห้องพัก',
  },
  hi: {
    badge: 'डेमो साइट · DOVARÉ के साथ',
    title: 'Landgasthof König von Preußen – डेमो साइट',
    description: 'DOVARÉ के साथ मिलकर कासेल के पास Helsa स्थित Landgasthof König von Preußen के लिए तैयार डेमो वेबसाइट: रेस्तराँ, बीयर गार्डन और दस होटल कमरे, मौसमी मेन्यू, ऑनलाइन टेबल और कमरा बुकिंग के साथ।',
  },
  tr: {
    badge: 'Demo Site · DOVARÉ ile',
    title: 'Landgasthof König von Preußen – Demo site',
    description: 'Kassel yakınındaki Helsa’da yer alan Landgasthof König von Preußen için DOVARÉ ile birlikte hazırlanan demo web sitesi: mevsimlik menü, çevrimiçi masa ve oda rezervasyonu içeren restoran, bira bahçesi ve on otel odası.',
  },
  sq: {
    badge: 'Faqe demo · me DOVARÉ',
    title: 'Landgasthof König von Preußen – Faqe demo',
    description: 'Faqe demo e punuar së bashku me DOVARÉ për Landgasthof König von Preußen në Helsa pranë Kassel: restorant, kopsht birre dhe dhjetë dhoma hoteli me menu sezonale, rezervim tavoline dhe dhomash online.',
  },
  ru: {
    badge: 'Демо-сайт · с DOVARÉ',
    title: 'Landgasthof König von Preußen – Демо-сайт',
    description: 'Демо-сайт, разработанный совместно с DOVARÉ для Landgasthof König von Preußen в Хельзе под Касселем: ресторан, пивной сад и десять гостиничных номеров с сезонным меню, онлайн-бронированием столиков и номеров.',
  },
  es: {
    badge: 'Sitio demo · con DOVARÉ',
    title: 'Landgasthof König von Preußen – Sitio demo',
    description: 'Sitio web demo desarrollado junto con DOVARÉ para Landgasthof König von Preußen en Helsa cerca de Kassel: restaurante, biergarten y diez habitaciones de hotel con carta de temporada y reservas online.',
  },
  it: {
    badge: 'Sito demo · con DOVARÉ',
    title: 'Landgasthof König von Preußen – Sito demo',
    description: 'Sito demo realizzato insieme a DOVARÉ per il Landgasthof König von Preußen a Helsa vicino a Kassel: ristorante, biergarten e dieci camere d’hotel con menu stagionale, prenotazione tavoli e camere online.',
  },
  uk: {
    badge: 'Демо-сайт · із DOVARÉ',
    title: 'Landgasthof König von Preußen – Демо-сайт',
    description: 'Демо-сайт, розроблений спільно з DOVARÉ для Landgasthof König von Preußen у Гельзі поблизу Касселя: ресторан, пивний сад і десять готельних номерів із сезонним меню, онлайн-бронюванням столиків і номерів.',
  },
  el: {
    badge: 'Demo Site · με DOVARÉ',
    title: 'Landgasthof König von Preußen – Demo site',
    description: 'Demo ιστοσελίδα που δημιουργήθηκε σε συνεργασία με τη DOVARÉ για το Landgasthof König von Preußen στη Helsa κοντά στο Κάσελ: εστιατόριο, biergarten και δέκα δωμάτια ξενοδοχείου με εποχικό μενού και online κρατήσεις.',
  },
  pt: {
    badge: 'Site demo · com DOVARÉ',
    title: 'Landgasthof König von Preußen – Site demo',
    description: 'Website demo desenvolvido em conjunto com a DOVARÉ para o Landgasthof König von Preußen em Helsa perto de Kassel: restaurante, biergarten e dez quartos de hotel com ementa sazonal e reservas online.',
  },
  zh: {
    badge: '演示站点 · 与 DOVARÉ 合作',
    title: 'Landgasthof König von Preußen – 演示网站',
    description: '与 DOVARÉ 共同为卡塞尔附近 Helsa 的 Landgasthof König von Preußen 打造的演示网站：涵盖餐厅、啤酒花园与十间客房，提供季节菜单及在线订座与订房功能。',
  },
  ja: {
    badge: 'デモサイト・DOVARÉ協業',
    title: 'Landgasthof König von Preußen – デモサイト',
    description: 'DOVARÉ と共同制作したカッセル近郊 Helsa の Landgasthof König von Preußen 向けデモサイト。レストラン・ビアガーデン・10室のホテル客室、季節のメニュー、オンライン予約機能を搭載。',
  },
}

const mapLocalized = (copy: DemoEntryCopy, field: 'title' | 'description' | 'badge'): LocalizedText =>
  Object.fromEntries(supportedLanguages.map(language => [language, copy[language][field]]))

export const demoPartnerProjects: DemoPartnerProject[] = [
  {
    id: 'kvp-helsa',
    title: mapLocalized(kvpHelsaCopy, 'title'),
    description: mapLocalized(kvpHelsaCopy, 'description'),
    badge: mapLocalized(kvpHelsaCopy, 'badge'),
    url: 'https://kvp-helsa.dovare.de/',
    tags: ['Demo-Site', 'DOVARÉ', 'Gastronomie & Hotel', 'Webdesign'],
    image: '/projects/kvp-helsa.jpg',
    alt: 'Landgasthof König von Preußen in Helsa – Demo-Website in Zusammenarbeit mit DOVARÉ',
    partner: westfalenHelpPartner,
  },
  {
    id: 'verdi-beta',
    title: mapLocalized(verdiBetaCopy, 'title'),
    description: mapLocalized(verdiBetaCopy, 'description'),
    badge: mapLocalized(verdiBetaCopy, 'badge'),
    url: 'https://verdi-beta.vercel.app/',
    tags: ['Demo-Site', 'Beta', 'Gastronomie', 'Webdesign'],
    image: '/projects/verdi-beta.jpg',
    alt: 'Ristorante Verdi Pizzeria in Hessisch Lichtenau – Aktuelle Demo-Website',
  },
  {
    id: 'dovare',
    title: mapLocalized(dovareCopy, 'title'),
    description: mapLocalized(dovareCopy, 'description'),
    badge: mapLocalized(dovareCopy, 'badge'),
    url: 'https://www.dovare.de/',
    tags: ['Partner', 'Im Aufbau', 'Projektarbeit', 'Webdesign'],
    image: '/projects/dovare.jpg',
    alt: 'DOVARÉ – Partner-Agentur für Webdesign & digitale Markenauftritte',
  },
  {
    id: 'nextstep-agency',
    title: mapLocalized(nextstepCopy, 'title'),
    description: mapLocalized(nextstepCopy, 'description'),
    badge: mapLocalized(nextstepCopy, 'badge'),
    url: 'https://www.nextstepagency.de/',
    tags: ['Partner', 'Creator Management', 'Projektarbeit', 'Influencer Marketing'],
    image: '/projects/nextstep-agency.jpg',
    alt: 'NEXTSTEP Agency – Partner für Creator & Talent Management',
  },
]
