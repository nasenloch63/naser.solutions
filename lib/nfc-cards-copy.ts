import type { Language } from './language'

type NfcCardsCopy = {
  title: string
  description: string
  stampTitle: string
  stampDescription: string
  photoAlt: string
  single: string
  bundle: string
  perCard: string
  bundleTotal: string
}

export const nfcCardsCopy: Record<Language, NfcCardsCopy> = {
  de: {
    title: "NFC-Tischkarten für Google-Bewertungen",
    description: "Deine Gäste halten ihr Smartphone an die Karte auf dem Tisch und können ihr Erlebnis direkt auf Google Maps bewerten.",
    stampTitle: "Stempelkarten für Unternehmen",
    stampDescription: "Ein Kaffee, ein Stempel. Mit einer Karte im Design deines Unternehmens können Stammgäste bei jedem Besuch sammeln. Du legst fest, wann es eine Prämie gibt.",
    photoAlt: "Google-Bewertungskarte neben einem Stapel Stempelkarten auf einem Cafétisch",
    single: '1 Karte', bundle: 'Ab 10 Stück', perCard: 'pro Karte', bundleTotal: '10 Karten: 130 € insgesamt',
  },
  en: {
    title: "NFC table cards for Google reviews",
    description: "Guests tap their phone on the card at the table to review their visit on Google Maps.",
    stampTitle: "Loyalty stamp cards for businesses",
    stampDescription: "One coffee, one stamp. Regular customers collect stamps on a card with your branding. You choose when they earn a reward.",
    photoAlt: "Google review card beside a stack of stamp cards on a café table",
    single: '1 card', bundle: '10+ cards', perCard: 'per card', bundleTotal: '10 cards: €130 total',
  },
  fr: {
    title: "Cartes de table NFC pour les avis Google",
    description: "À table, vos clients approchent leur téléphone de la carte pour laisser un avis sur Google Maps.",
    stampTitle: "Cartes de fidélité à tamponner",
    stampDescription: "Un café, un tampon. Vos habitués collectionnent les tampons sur une carte à vos couleurs. Vous choisissez quand offrir une récompense.",
    photoAlt: "Carte d’avis Google et pile de cartes de fidélité sur une table de café",
    single: '1 carte', bundle: 'À partir de 10 cartes', perCard: 'par carte', bundleTotal: '10 cartes : 130 € au total',
  },
  ar: {
    title: "بطاقات NFC للطاولات لتقييمات Google",
    description: "يقرّب الضيوف هواتفهم من البطاقة على الطاولة لكتابة تقييمهم على خرائط Google.",
    stampTitle: "بطاقات أختام الولاء للشركات",
    stampDescription: "قهوة وختم في كل زيارة. يجمع عملاؤك الأختام على بطاقة تحمل هويتك التجارية، وأنت تحدد متى يحصلون على المكافأة.",
    photoAlt: "بطاقة تقييم Google بجوار بطاقات أختام على طاولة مقهى",
    single: 'بطاقة واحدة', bundle: 'ابتداءً من 10 بطاقات', perCard: 'لكل بطاقة', bundleTotal: '10 بطاقات: الإجمالي 130 €',
  },
  th: {
    title: "การ์ด NFC บนโต๊ะสำหรับรีวิว Google",
    description: "ลูกค้าแตะโทรศัพท์กับการ์ดบนโต๊ะเพื่อเขียนรีวิวบน Google Maps",
    stampTitle: "บัตรสะสมแสตมป์สำหรับธุรกิจ",
    stampDescription: "กาแฟหนึ่งแก้ว รับหนึ่งแสตมป์ ลูกค้าประจำสะสมแสตมป์บนบัตรที่ออกแบบตามแบรนด์ของคุณ คุณกำหนดเงื่อนไขการรับรางวัลได้เอง",
    photoAlt: "การ์ดรีวิว Google และบัตรสะสมแสตมป์บนโต๊ะในคาเฟ่",
    single: '1 ใบ', bundle: 'ตั้งแต่ 10 ใบ', perCard: 'ต่อใบ', bundleTotal: '10 ใบ: รวม 130 €',
  },
  hi: {
    title: "Google समीक्षाओं के लिए NFC टेबल कार्ड",
    description: "मेहमान टेबल पर रखे कार्ड से अपना फ़ोन छुआकर Google Maps पर समीक्षा लिख सकते हैं।",
    stampTitle: "व्यवसायों के लिए स्टैम्प कार्ड",
    stampDescription: "एक कॉफ़ी, एक स्टैम्प। नियमित ग्राहक आपके ब्रांड वाले कार्ड पर स्टैम्प जमा करते हैं। इनाम कब मिलेगा, यह आप तय करते हैं।",
    photoAlt: "कैफ़े की मेज़ पर Google समीक्षा कार्ड और स्टैम्प कार्ड",
    single: '1 कार्ड', bundle: '10 या अधिक कार्ड', perCard: 'प्रति कार्ड', bundleTotal: '10 कार्ड: कुल 130 €',
  },
  tr: {
    title: "Google yorumları için NFC masa kartları",
    description: "Misafirler telefonlarını masadaki karta yaklaştırıp Google Haritalar’da yorum bırakabilir.",
    stampTitle: "İşletmelere özel damgalı sadakat kartları",
    stampDescription: "Bir kahve, bir damga. Müdavimleriniz markanıza özel kartta damga biriktirir. Ödülü ne zaman vereceğinizi siz belirlersiniz.",
    photoAlt: "Kafe masasında Google yorum kartı ve damga kartları",
    single: '1 kart', bundle: '10 adet ve üzeri', perCard: 'kart başına', bundleTotal: '10 kart: toplam 130 €',
  },
  sq: {
    title: "Karta NFC për vlerësime në Google",
    description: "Klientët afrojnë telefonin te karta mbi tavolinë për të lënë një vlerësim në Google Maps.",
    stampTitle: "Karta besnikërie me vula për biznese",
    stampDescription: "Një kafe, një vulë. Klientët e rregullt mbledhin vula në një kartë me dizajnin e biznesit tënd. Ti vendos kur jepet shpërblimi.",
    photoAlt: "Kartë për vlerësime në Google pranë kartave me vula mbi tavolinën e një kafeneje",
    single: '1 kartë', bundle: 'Nga 10 karta', perCard: 'për kartë', bundleTotal: '10 karta: 130 € gjithsej',
  },
  ru: {
    title: "Настольные NFC-карты для отзывов в Google",
    description: "Гости подносят телефон к карте на столе и могут оставить отзыв в Google Картах.",
    stampTitle: "Карты лояльности со штампами для бизнеса",
    stampDescription: "Один кофе — один штамп. Постоянные гости собирают штампы на карте в вашем фирменном стиле. Вы решаете, когда вручить награду.",
    photoAlt: "Карта для отзывов в Google и стопка карт лояльности на столе в кафе",
    single: '1 карта', bundle: 'От 10 карт', perCard: 'за карту', bundleTotal: '10 карт: всего 130 €',
  },
  es: {
    title: "Tarjetas NFC de mesa para reseñas de Google",
    description: "Tus clientes acercan el móvil a la tarjeta de la mesa para dejar su reseña en Google Maps.",
    stampTitle: "Tarjetas de sellos para negocios",
    stampDescription: "Un café, un sello. Tus clientes habituales acumulan sellos en una tarjeta con tu marca. Tú decides cuándo reciben su recompensa.",
    photoAlt: "Tarjeta de reseñas de Google junto a tarjetas de sellos en la mesa de un café",
    single: '1 tarjeta', bundle: 'A partir de 10 tarjetas', perCard: 'por tarjeta', bundleTotal: '10 tarjetas: 130 € en total',
  },
  it: {
    title: "Carte NFC da tavolo per le recensioni Google",
    description: "I clienti avvicinano il telefono alla carta sul tavolo per lasciare una recensione su Google Maps.",
    stampTitle: "Tessere a timbri per le attività",
    stampDescription: "Un caffè, un timbro. I clienti abituali raccolgono timbri su una tessera con il tuo marchio. Decidi tu quando assegnare un premio.",
    photoAlt: "Carta per le recensioni Google e tessere a timbri sul tavolo di un bar",
    single: '1 carta', bundle: 'Da 10 carte', perCard: 'per carta', bundleTotal: '10 carte: 130 € in totale',
  },
  uk: {
    title: "Настільні NFC-картки для відгуків у Google",
    description: "Гості підносять телефон до картки на столі й можуть залишити відгук у Google Картах.",
    stampTitle: "Картки лояльності зі штампами для бізнесу",
    stampDescription: "Одна кава — один штамп. Постійні гості збирають штампи на картці у вашому фірмовому стилі. Ви обираєте, коли надавати винагороду.",
    photoAlt: "Картка для відгуків у Google та стос карток зі штампами на столику в кафе",
    single: '1 картка', bundle: 'Від 10 карток', perCard: 'за картку', bundleTotal: '10 карток: разом 130 €',
  },
  el: {
    title: "Κάρτες NFC για κριτικές στο Google Maps",
    description: "Οι πελάτες πλησιάζουν το κινητό τους στην κάρτα του τραπεζιού και αφήνουν κριτική στο Google Maps.",
    stampTitle: "Κάρτες επιβράβευσης με σφραγίδες",
    stampDescription: "Ένας καφές, μία σφραγίδα. Οι τακτικοί πελάτες συλλέγουν σφραγίδες σε κάρτα με το δικό σου σχέδιο. Εσύ ορίζεις πότε παίρνουν το δώρο τους.",
    photoAlt: "Κάρτα κριτικών Google δίπλα σε κάρτες επιβράβευσης πάνω σε τραπέζι καφέ",
    single: '1 κάρτα', bundle: 'Από 10 κάρτες', perCard: 'ανά κάρτα', bundleTotal: '10 κάρτες: 130 € συνολικά',
  },
  pt: {
    title: "Cartões NFC de mesa para avaliações no Google",
    description: "Os clientes aproximam o telemóvel do cartão na mesa para deixar uma avaliação no Google Maps.",
    stampTitle: "Cartões de carimbos para empresas",
    stampDescription: "Um café, um carimbo. Os clientes habituais juntam carimbos num cartão com a tua marca. Tu decides quando recebem a recompensa.",
    photoAlt: "Cartão de avaliações no Google ao lado de cartões de carimbos na mesa de um café",
    single: '1 cartão', bundle: 'A partir de 10 cartões', perCard: 'por cartão', bundleTotal: '10 cartões: 130 € no total',
  },
  zh: {
    title: "用于 Google 地图评价的 NFC 桌卡",
    description: "客人将手机靠近桌上的卡片，即可在 Google 地图上评价本次体验。",
    stampTitle: "企业集章卡",
    stampDescription: "一杯咖啡，一枚印章。熟客每次光顾都可以在印有你品牌的卡片上集章，由你决定何时兑换奖励。",
    photoAlt: "咖啡馆桌上的 Google 评价卡和一叠集章卡",
    single: '1 张', bundle: '10 张起', perCard: '每张', bundleTotal: '10 张：总计 130 €',
  },
  ja: {
    title: "Google マップのクチコミ用 NFC テーブルカード",
    description: "お客様はテーブルのカードにスマートフォンをかざして、Google マップにクチコミを投稿できます。",
    stampTitle: "お店のスタンプカード",
    stampDescription: "コーヒー1杯でスタンプを1つ。常連のお客様がお店のデザインのカードにスタンプを集めます。特典の条件はお店で決められます。",
    photoAlt: "カフェのテーブルに並ぶ Google クチコミカードとスタンプカード",
    single: '1枚', bundle: '10枚以上', perCard: '1枚あたり', bundleTotal: '10枚：合計130 €',
  },
}
