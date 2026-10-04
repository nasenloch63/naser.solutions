import type { Language } from './language'

type PaymentServiceKey = 'services.cryptoPayments.title' | 'services.cryptoPayments.description' | 'services.sumup.title' | 'services.sumup.description'

export const paymentServicesCopy: Record<Language, Record<PaymentServiceKey, string>> = {
  hi: {
    "services.cryptoPayments.title": "व्यवसायों के लिए क्रिप्टो भुगतान समाधान",
    "services.cryptoPayments.description": "हम आपके व्यवसाय में क्रिप्टो भुगतान शुरू करने में मदद करते हैं: सही समाधान चुनने, सेटअप और वेबसाइट या दुकान से जोड़ने से लेकर अनुकूलन और लगातार तकनीकी सहायता तक।",
    "services.sumup.title": "SumUp: स्थापना, रखरखाव और अनुकूलन",
    "services.sumup.description": "हम SumUp कार्ड टर्मिनल और बिक्री प्रणालियाँ स्थापित और कॉन्फ़िगर करते हैं, उत्पाद, रसीदें और कार्यप्रवाह अनुकूलित करते हैं और समर्थित इंटरफ़ेस के माध्यम से अपडेट, तकनीकी रखरखाव और इंटीग्रेशन में सहायता देते हैं।"
  },
  th: {
    "services.cryptoPayments.title": "โซลูชันชำระเงินคริปโตสำหรับธุรกิจ",
    "services.cryptoPayments.description": "เราช่วยธุรกิจของคุณเริ่มรับชำระเงินคริปโต ตั้งแต่เลือกโซลูชันที่เหมาะสม ตั้งค่าและเชื่อมกับเว็บไซต์หรือร้านค้า ไปจนถึงปรับแต่งและดูแลด้านเทคนิคอย่างต่อเนื่อง",
    "services.sumup.title": "SumUp: ติดตั้ง ดูแล และปรับแต่ง",
    "services.sumup.description": "เราติดตั้งและตั้งค่าเครื่องรับบัตรและระบบขายหน้าร้าน SumUp ปรับแต่งสินค้า ใบเสร็จ และกระบวนการ พร้อมดูแลการอัปเดต การบำรุงรักษา และการเชื่อมต่อผ่านอินเทอร์เฟซที่รองรับ"
  },
  uk: {
    "services.cryptoPayments.title": "Криптовалютні платіжні рішення для бізнесу",
    "services.cryptoPayments.description": "Допомагаємо твоїй компанії впровадити криптовалютні платежі: від вибору відповідного рішення, налаштування та інтеграції із сайтом або магазином до адаптації та постійної технічної підтримки.",
    "services.sumup.title": "SumUp: встановлення, обслуговування та налаштування",
    "services.sumup.description": "Встановлюємо й налаштовуємо карткові термінали та касові системи SumUp, адаптуємо товари, чеки й процеси, супроводжуємо оновлення, технічне обслуговування та інтеграції через підтримувані інтерфейси."
  },
  de: {
    'services.cryptoPayments.title': 'Krypto-Zahlungslösungen für Unternehmen',
    'services.cryptoPayments.description': 'Wir unterstützen dein Unternehmen bei der Einführung von Krypto-Zahlungen: von der Auswahl passender Lösungen über Einrichtung und Integration in Website oder Shop bis zu Anpassungen und laufender technischer Betreuung.',
    'services.sumup.title': 'SumUp: Installation, Wartung & Customizing',
    'services.sumup.description': 'Wir installieren und konfigurieren SumUp-Kartenterminals und Kassensysteme, passen Artikel, Belege und Abläufe an und begleiten Updates, technische Wartung und die Integration über unterstützte Schnittstellen.',
  },
  en: {
    'services.cryptoPayments.title': 'Crypto payment solutions for businesses',
    'services.cryptoPayments.description': 'We help your business introduce crypto payments: from choosing suitable solutions to setup, website or shop integration, customization and ongoing technical support.',
    'services.sumup.title': 'SumUp: installation, maintenance & customization',
    'services.sumup.description': 'We install and configure SumUp card terminals and point-of-sale systems, customize products, receipts and workflows, and support updates, technical maintenance and integration through supported interfaces.',
  },
  fr: {
    'services.cryptoPayments.title': 'Solutions de paiement crypto pour les entreprises',
    'services.cryptoPayments.description': 'Nous accompagnons votre entreprise dans la mise en place de paiements en cryptomonnaies : choix des solutions, configuration, intégration au site ou à la boutique, personnalisation et suivi technique.',
    'services.sumup.title': 'SumUp : installation, maintenance et personnalisation',
    'services.sumup.description': 'Nous installons et configurons les terminaux et systèmes de caisse SumUp, adaptons les produits, reçus et processus, et assurons le suivi des mises à jour, la maintenance technique et les intégrations via les interfaces disponibles.',
  },
  ar: {
    'services.cryptoPayments.title': 'حلول الدفع بالعملات المشفرة للشركات',
    'services.cryptoPayments.description': 'نساعد شركتك على إدخال الدفع بالعملات المشفرة، من اختيار الحل المناسب وإعداده ودمجه في الموقع أو المتجر إلى تخصيصه وتقديم الدعم التقني المستمر.',
    'services.sumup.title': 'SumUp: التركيب والصيانة والتخصيص',
    'services.sumup.description': 'نركّب ونضبط أجهزة الدفع وأنظمة نقاط البيع من SumUp، ونخصص المنتجات والإيصالات وسير العمل، ونتابع التحديثات والصيانة التقنية والتكامل عبر الواجهات المدعومة.',
  },
  tr: {
    'services.cryptoPayments.title': 'İşletmeler için kripto ödeme çözümleri',
    'services.cryptoPayments.description': 'İşletmenizin kripto ödemeleri kullanmasına yardımcı oluyoruz: uygun çözümün seçimi, kurulum, web sitesi veya mağaza entegrasyonu, özelleştirme ve sürekli teknik destek.',
    'services.sumup.title': 'SumUp: kurulum, bakım ve özelleştirme',
    'services.sumup.description': 'SumUp kart terminallerini ve kasa sistemlerini kurup yapılandırıyor, ürünleri, fişleri ve iş akışlarını uyarlıyor; güncellemeler, teknik bakım ve desteklenen arayüzlerle entegrasyon sağlıyoruz.',
  },
  sq: {
    'services.cryptoPayments.title': 'Zgjidhje pagesash me kriptomonedha për bizneset',
    'services.cryptoPayments.description': 'Ndihmojmë biznesin tënd të zbatojë pagesa me kriptomonedha: nga zgjedhja e zgjidhjes te konfigurimi, integrimi në faqe ose dyqan, përshtatja dhe mbështetja teknike e vazhdueshme.',
    'services.sumup.title': 'SumUp: instalim, mirëmbajtje dhe përshtatje',
    'services.sumup.description': 'Instalojmë dhe konfigurojmë terminalet dhe sistemet e arkës SumUp, përshtatim produktet, faturat dhe proceset, dhe mbështesim përditësimet, mirëmbajtjen teknike dhe integrimet përmes ndërfaqeve të mbështetura.',
  },
  ru: {
    'services.cryptoPayments.title': 'Криптовалютные платёжные решения для бизнеса',
    'services.cryptoPayments.description': 'Помогаем внедрить криптовалютные платежи: выбрать решение, настроить его, интегрировать с сайтом или магазином, адаптировать и обеспечить постоянную техническую поддержку.',
    'services.sumup.title': 'SumUp: установка, обслуживание и настройка',
    'services.sumup.description': 'Устанавливаем и настраиваем терминалы и кассовые системы SumUp, адаптируем товары, чеки и процессы, сопровождаем обновления, техническое обслуживание и интеграции через поддерживаемые интерфейсы.',
  },
  es: {
    'services.cryptoPayments.title': 'Soluciones de pago con criptomonedas para empresas',
    'services.cryptoPayments.description': 'Ayudamos a tu empresa a incorporar pagos con criptomonedas: selección de soluciones, configuración, integración en la web o tienda, personalización y soporte técnico continuo.',
    'services.sumup.title': 'SumUp: instalación, mantenimiento y personalización',
    'services.sumup.description': 'Instalamos y configuramos terminales y sistemas de caja SumUp, adaptamos productos, recibos y procesos, y acompañamos las actualizaciones, el mantenimiento técnico y las integraciones mediante interfaces compatibles.',
  },
  it: {
    'services.cryptoPayments.title': 'Soluzioni di pagamento in criptovalute per le aziende',
    'services.cryptoPayments.description': 'Aiutiamo la tua azienda a introdurre pagamenti in criptovalute: scelta delle soluzioni, configurazione, integrazione nel sito o negozio, personalizzazione e assistenza tecnica continuativa.',
    'services.sumup.title': 'SumUp: installazione, manutenzione e personalizzazione',
    'services.sumup.description': 'Installiamo e configuriamo terminali e sistemi di cassa SumUp, adattiamo prodotti, ricevute e flussi di lavoro e seguiamo aggiornamenti, manutenzione tecnica e integrazioni tramite le interfacce supportate.',
  },
  el: {
    'services.cryptoPayments.title': 'Λύσεις πληρωμών με κρυπτονομίσματα για επιχειρήσεις',
    'services.cryptoPayments.description': 'Βοηθάμε την επιχείρησή σου να εισαγάγει πληρωμές με κρυπτονομίσματα: επιλογή λύσεων, ρύθμιση, ενσωμάτωση σε ιστοσελίδα ή κατάστημα, προσαρμογή και συνεχή τεχνική υποστήριξη.',
    'services.sumup.title': 'SumUp: εγκατάσταση, συντήρηση και προσαρμογή',
    'services.sumup.description': 'Εγκαθιστούμε και ρυθμίζουμε τερματικά και ταμειακά συστήματα SumUp, προσαρμόζουμε προϊόντα, αποδείξεις και διαδικασίες και υποστηρίζουμε ενημερώσεις, τεχνική συντήρηση και διασυνδέσεις μέσω υποστηριζόμενων διεπαφών.',
  },
  pt: {
    'services.cryptoPayments.title': 'Soluções de pagamento com criptomoedas para empresas',
    'services.cryptoPayments.description': 'Ajudamos a tua empresa a introduzir pagamentos com criptomoedas: escolha de soluções, configuração, integração no site ou loja, personalização e acompanhamento técnico contínuo.',
    'services.sumup.title': 'SumUp: instalação, manutenção e personalização',
    'services.sumup.description': 'Instalamos e configuramos terminais e sistemas de caixa SumUp, adaptamos produtos, recibos e processos e acompanhamos atualizações, manutenção técnica e integrações através das interfaces suportadas.',
  },
  zh: {
    'services.cryptoPayments.title': '企业加密货币支付解决方案',
    'services.cryptoPayments.description': '我们帮助企业引入加密货币支付：从选择合适的方案，到配置、网站或商店集成、定制及持续的技术支持。',
    'services.sumup.title': 'SumUp：安装、维护与定制',
    'services.sumup.description': '我们安装并配置 SumUp 支付终端和收银系统，定制商品、收据和业务流程，并通过受支持的接口协助更新、技术维护和系统集成。',
  },
}

export function paymentServiceTranslation(language: Language, key: string): string | undefined {
  return (paymentServicesCopy[language] as Record<string, string>)[key]
}
