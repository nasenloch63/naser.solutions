import type { Language } from './language'

type PricingCopy = {
  title: string
  description: string
  entry: string
  from: string
  integrations: string
  upTo: string
  app: string
  invoice: string
  note: string
}

export const servicePricingCopy: Record<Language, PricingCopy> = {
  de: {
    title: 'Was kostet dein Projekt?',
    description: 'Unsere Leistungen beginnen bei 200–400 €. Der Preis richtet sich nach Umfang und Komplexität deines Projekts.',
    entry: 'Kleinere Projekte', from: 'ab',
    integrations: 'Buchungssysteme & Integrationen', upTo: 'bis zu',
    app: 'Apps inkl. App-Store-Veröffentlichung',
    invoice: 'Zu jeder Leistung erhältst du eine Rechnung.',
    note: 'Die Beträge dienen zur Orientierung. Den konkreten Leistungsumfang und Preis stimmen wir vor Projektstart mit dir ab.',
  },
  en: {
    title: 'What will your project cost?',
    description: 'Our services start at €200–400. The price depends on the scope and complexity of your project.',
    entry: 'Smaller projects', from: 'from',
    integrations: 'Booking systems & integrations', upTo: 'up to',
    app: 'Apps including App Store publication',
    invoice: 'You receive an invoice for every service.',
    note: 'These amounts are a guide. We agree on the exact scope and price with you before the project starts.',
  },
  fr: {
    title: 'Combien coûte votre projet ?',
    description: 'Nos prestations commencent à 200–400 €. Le prix dépend de l’étendue et de la complexité de votre projet.',
    entry: 'Petits projets', from: 'à partir de',
    integrations: 'Systèmes de réservation et intégrations', upTo: 'jusqu’à',
    app: 'Applications avec publication sur l’App Store',
    invoice: 'Chaque prestation fait l’objet d’une facture.',
    note: 'Ces montants sont indicatifs. Nous convenons avec vous du périmètre et du prix avant le début du projet.',
  },
  ar: {
    title: 'كم تبلغ تكلفة مشروعك؟',
    description: 'تبدأ خدماتنا من 200–400 €. يعتمد السعر على نطاق مشروعك ومدى تعقيده.',
    entry: 'المشاريع الصغيرة', from: 'ابتداءً من',
    integrations: 'أنظمة الحجز والتكاملات', upTo: 'حتى',
    app: 'تطبيقات تشمل النشر في App Store',
    invoice: 'تحصل على فاتورة لكل خدمة.',
    note: 'هذه المبالغ تقديرية. نتفق معك على نطاق العمل والسعر قبل بدء المشروع.',
  },
  tr: {
    title: 'Projenin maliyeti ne kadar?',
    description: 'Hizmetlerimiz 200–400 €’dan başlar. Fiyat, projenin kapsamına ve karmaşıklığına bağlıdır.',
    entry: 'Küçük projeler', from: 'başlangıç',
    integrations: 'Rezervasyon sistemleri ve entegrasyonlar', upTo: 'en fazla',
    app: 'App Store yayını dahil uygulamalar',
    invoice: 'Her hizmet için fatura düzenlenir.',
    note: 'Bu tutarlar yol göstericidir. Proje başlamadan önce kapsamı ve fiyatı birlikte belirleriz.',
  },
  sq: {
    title: 'Sa kushton projekti yt?',
    description: 'Shërbimet tona fillojnë nga 200–400 €. Çmimi varet nga përmasat dhe kompleksiteti i projektit.',
    entry: 'Projekte të vogla', from: 'nga',
    integrations: 'Sisteme rezervimi dhe integrime', upTo: 'deri në',
    app: 'Aplikacione me publikim në App Store',
    invoice: 'Për çdo shërbim merr një faturë.',
    note: 'Këto shuma janë orientuese. Përcaktojmë së bashku përmbajtjen dhe çmimin përpara fillimit të projektit.',
  },
  ru: {
    title: 'Сколько стоит твой проект?',
    description: 'Наши услуги начинаются от 200–400 €. Цена зависит от объёма и сложности проекта.',
    entry: 'Небольшие проекты', from: 'от',
    integrations: 'Системы бронирования и интеграции', upTo: 'до',
    app: 'Приложения с публикацией в App Store',
    invoice: 'За каждую услугу выставляется счёт.',
    note: 'Суммы указаны для ориентира. Точный объём работ и цену согласуем до начала проекта.',
  },
  es: {
    title: '¿Cuánto cuesta tu proyecto?',
    description: 'Nuestros servicios empiezan en 200–400 €. El precio depende del alcance y la complejidad de tu proyecto.',
    entry: 'Proyectos pequeños', from: 'desde',
    integrations: 'Sistemas de reservas e integraciones', upTo: 'hasta',
    app: 'Apps con publicación en el App Store',
    invoice: 'Recibes una factura por cada servicio.',
    note: 'Estos importes son orientativos. Acordamos contigo el alcance y el precio antes de empezar el proyecto.',
  },
  it: {
    title: 'Quanto costa il tuo progetto?',
    description: 'I nostri servizi partono da 200–400 €. Il prezzo dipende dalla portata e dalla complessità del progetto.',
    entry: 'Piccoli progetti', from: 'da',
    integrations: 'Sistemi di prenotazione e integrazioni', upTo: 'fino a',
    app: 'App con pubblicazione sull’App Store',
    invoice: 'Ricevi una fattura per ogni servizio.',
    note: 'Gli importi sono indicativi. Concordiamo con te l’ambito e il prezzo prima di iniziare il progetto.',
  },
  el: {
    title: 'Πόσο κοστίζει το έργο σου;',
    description: 'Οι υπηρεσίες μας ξεκινούν από 200–400 €. Η τιμή εξαρτάται από το εύρος και την πολυπλοκότητα του έργου.',
    entry: 'Μικρότερα έργα', from: 'από',
    integrations: 'Συστήματα κρατήσεων και διασυνδέσεις', upTo: 'έως',
    app: 'Εφαρμογές με δημοσίευση στο App Store',
    invoice: 'Λαμβάνεις τιμολόγιο για κάθε υπηρεσία.',
    note: 'Τα ποσά είναι ενδεικτικά. Συμφωνούμε μαζί σου το ακριβές αντικείμενο και την τιμή πριν ξεκινήσει το έργο.',
  },
  pt: {
    title: 'Quanto custa o teu projeto?',
    description: 'Os nossos serviços começam nos 200–400 €. O preço depende do âmbito e da complexidade do teu projeto.',
    entry: 'Projetos mais pequenos', from: 'a partir de',
    integrations: 'Sistemas de reservas e integrações', upTo: 'até',
    app: 'Apps com publicação na App Store',
    invoice: 'Recebes uma fatura por cada serviço.',
    note: 'Estes valores são indicativos. Acordamos contigo o âmbito e o preço antes de iniciar o projeto.',
  },
  zh: {
    title: '你的项目需要多少费用？',
    description: '我们的服务起价为 200–400 €。价格取决于项目的范围和复杂程度。',
    entry: '小型项目', from: '起价',
    integrations: '预订系统与集成', upTo: '最高',
    app: '含 App Store 发布的应用',
    invoice: '每项服务均提供发票。',
    note: '以上金额仅供参考。我们会在项目开始前与你确认具体范围和价格。',
  },
}
