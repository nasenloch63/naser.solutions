import type { Language } from './language'

type NfcCardsCopy = {
  title: string
  description: string
  single: string
  bundle: string
  perCard: string
  bundleTotal: string
}

export const nfcCardsCopy: Record<Language, NfcCardsCopy> = {
  de: {
    title: 'NFC-Cards',
    description: 'Wir bieten auch NFC-Cards an. Mit steigender Stückzahl sinkt der Preis pro Karte. Weitere Mengen bieten wir dir auf Anfrage an.',
    single: '1 Karte', bundle: 'Ab 10 Stück', perCard: 'pro Karte', bundleTotal: '10 Karten: 130 € insgesamt',
  },
  en: {
    title: 'NFC cards',
    description: 'We also offer NFC cards. The price per card decreases as the quantity increases. Contact us for a quote for other quantities.',
    single: '1 card', bundle: '10+ cards', perCard: 'per card', bundleTotal: '10 cards: €130 total',
  },
  fr: {
    title: 'Cartes NFC',
    description: 'Nous proposons également des cartes NFC. Le prix unitaire diminue avec la quantité. Contactez-nous pour un devis pour d’autres quantités.',
    single: '1 carte', bundle: 'À partir de 10 cartes', perCard: 'par carte', bundleTotal: '10 cartes : 130 € au total',
  },
  ar: {
    title: 'بطاقات NFC',
    description: 'نقدم أيضاً بطاقات NFC. ينخفض سعر البطاقة مع زيادة الكمية. تواصل معنا للحصول على عرض لكميات أخرى.',
    single: 'بطاقة واحدة', bundle: 'ابتداءً من 10 بطاقات', perCard: 'لكل بطاقة', bundleTotal: '10 بطاقات: الإجمالي 130 €',
  },
  th: {
    title: 'บัตร NFC',
    description: 'เรามีบัตร NFC ด้วย ยิ่งสั่งจำนวนมาก ราคาต่อใบยิ่งลดลง ติดต่อเราเพื่อขอราคาสำหรับจำนวนอื่น ๆ',
    single: '1 ใบ', bundle: 'ตั้งแต่ 10 ใบ', perCard: 'ต่อใบ', bundleTotal: '10 ใบ: รวม 130 €',
  },
  hi: {
    title: 'NFC कार्ड',
    description: 'हम NFC कार्ड भी उपलब्ध कराते हैं। मात्रा बढ़ने पर प्रति कार्ड कीमत कम होती है। अन्य मात्राओं के लिए मूल्य जानने हेतु संपर्क करें।',
    single: '1 कार्ड', bundle: '10 या अधिक कार्ड', perCard: 'प्रति कार्ड', bundleTotal: '10 कार्ड: कुल 130 €',
  },
  tr: {
    title: 'NFC kartları',
    description: 'NFC kartları da sunuyoruz. Adet arttıkça kart başına fiyat düşer. Diğer miktarlar için teklif isteyebilirsiniz.',
    single: '1 kart', bundle: '10 adet ve üzeri', perCard: 'kart başına', bundleTotal: '10 kart: toplam 130 €',
  },
  sq: {
    title: 'Karta NFC',
    description: 'Ofrojmë edhe karta NFC. Çmimi për kartë ulet kur sasia rritet. Na kontakto për një ofertë për sasi të tjera.',
    single: '1 kartë', bundle: 'Nga 10 karta', perCard: 'për kartë', bundleTotal: '10 karta: 130 € gjithsej',
  },
  ru: {
    title: 'NFC-карты',
    description: 'Мы также предлагаем NFC-карты. С увеличением количества цена за карту снижается. Стоимость других тиражей — по запросу.',
    single: '1 карта', bundle: 'От 10 карт', perCard: 'за карту', bundleTotal: '10 карт: всего 130 €',
  },
  es: {
    title: 'Tarjetas NFC',
    description: 'También ofrecemos tarjetas NFC. El precio por tarjeta disminuye al aumentar la cantidad. Consúltanos para otras cantidades.',
    single: '1 tarjeta', bundle: 'A partir de 10 tarjetas', perCard: 'por tarjeta', bundleTotal: '10 tarjetas: 130 € en total',
  },
  it: {
    title: 'Carte NFC',
    description: 'Offriamo anche carte NFC. Il prezzo per carta diminuisce all’aumentare della quantità. Contattaci per un preventivo per altre quantità.',
    single: '1 carta', bundle: 'Da 10 carte', perCard: 'per carta', bundleTotal: '10 carte: 130 € in totale',
  },
  uk: {
    title: 'NFC-картки',
    description: 'Ми також пропонуємо NFC-картки. Зі збільшенням кількості ціна за картку знижується. Вартість інших тиражів — за запитом.',
    single: '1 картка', bundle: 'Від 10 карток', perCard: 'за картку', bundleTotal: '10 карток: разом 130 €',
  },
  el: {
    title: 'Κάρτες NFC',
    description: 'Προσφέρουμε επίσης κάρτες NFC. Η τιμή ανά κάρτα μειώνεται όσο αυξάνεται η ποσότητα. Επικοινώνησε μαζί μας για άλλες ποσότητες.',
    single: '1 κάρτα', bundle: 'Από 10 κάρτες', perCard: 'ανά κάρτα', bundleTotal: '10 κάρτες: 130 € συνολικά',
  },
  pt: {
    title: 'Cartões NFC',
    description: 'Também oferecemos cartões NFC. O preço por cartão diminui com o aumento da quantidade. Contacta-nos para outras quantidades.',
    single: '1 cartão', bundle: 'A partir de 10 cartões', perCard: 'por cartão', bundleTotal: '10 cartões: 130 € no total',
  },
  zh: {
    title: 'NFC 卡片',
    description: '我们也提供 NFC 卡片。订购数量越多，每张单价越低。其他数量欢迎咨询报价。',
    single: '1 张', bundle: '10 张起', perCard: '每张', bundleTotal: '10 张：总计 130 €',
  },
  ja: {
    title: 'NFCカード',
    description: 'NFCカードもご提供しています。枚数が増えるほど1枚あたりの価格がお得になります。その他の枚数についてはお問い合わせください。',
    single: '1枚', bundle: '10枚以上', perCard: '1枚あたり', bundleTotal: '10枚：合計130 €',
  },
}
