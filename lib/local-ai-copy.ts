import type { Language } from './language'

type LocalAiCopy = {
  title: string
  description: string
  customers: string
  memory: string
  cta: string
}

export const localAiCopy: Record<Language, LocalAiCopy> = {
  de: {
    title: 'Lokale KI. Eigene Rechenleistung.',
    description: 'Für komplexe KI-Aufgaben setzen wir auf unseren NVIDIA Jetson AGX Xavier. Mit dem nativen NVIDIA-Softwarestack führen wir geeignete KI-Modelle und Workflows lokal auf eigener Hardware aus.',
    customers: 'Diese Rechenleistung stellen wir auch Kunden für lokale KI-Projekte und die Verarbeitung sensibler Daten zur Verfügung. Einsatz, Umfang und Datenverarbeitung vereinbaren wir passend zum Projekt.',
    memory: 'Gemeinsamer CPU-/GPU-Speicher',
    cta: 'Lokales KI-Projekt besprechen',
  },
  en: {
    title: 'Local AI. Our own computing power.',
    description: 'We use our NVIDIA Jetson AGX Xavier for complex AI tasks. Its native NVIDIA software stack lets us run suitable AI models and workflows locally on our own hardware.',
    customers: 'We also make this computing power available to customers for local AI projects and sensitive data processing. We agree on usage, scope and data handling for each project.',
    memory: 'Shared CPU/GPU memory',
    cta: 'Discuss a local AI project',
  },
  fr: {
    title: 'IA locale. Notre propre puissance de calcul.',
    description: 'Nous utilisons notre NVIDIA Jetson AGX Xavier pour les tâches d’IA complexes. Sa pile logicielle native NVIDIA nous permet d’exécuter des modèles et workflows adaptés localement sur notre propre matériel.',
    customers: 'Nous mettons aussi cette puissance de calcul à disposition de nos clients pour leurs projets d’IA locale et le traitement de données sensibles. L’utilisation, le périmètre et le traitement des données sont convenus pour chaque projet.',
    memory: 'Mémoire partagée CPU/GPU',
    cta: 'Discuter d’un projet d’IA locale',
  },
  ar: {
    title: 'ذكاء اصطناعي محلي. قدرة حوسبة خاصة بنا.',
    description: 'نستخدم جهاز NVIDIA Jetson AGX Xavier لمهام الذكاء الاصطناعي المعقدة. تتيح لنا حزمة برامج NVIDIA الأصلية تشغيل النماذج وسير العمل المناسبة محلياً على أجهزتنا الخاصة.',
    customers: 'نتيح هذه القدرة الحاسوبية أيضاً لعملائنا لمشاريع الذكاء الاصطناعي المحلية ومعالجة البيانات الحساسة. نتفق على الاستخدام والنطاق وكيفية معالجة البيانات لكل مشروع.',
    memory: 'ذاكرة مشتركة بين وحدة المعالجة المركزية والرسومية',
    cta: 'ناقش مشروع ذكاء اصطناعي محلي',
  },
  th: {
    title: 'AI ในระบบของเรา พลังประมวลผลของเราเอง',
    description: 'เราใช้ NVIDIA Jetson AGX Xavier สำหรับงาน AI ที่ซับซ้อน ชุดซอฟต์แวร์ของ NVIDIA ช่วยให้เรารันโมเดลและเวิร์กโฟลว์ AI ที่เหมาะสมบนฮาร์ดแวร์ของเราเองได้โดยตรง',
    customers: 'ลูกค้าสามารถใช้พลังประมวลผลนี้สำหรับโครงการ AI ภายในระบบและการประมวลผลข้อมูลที่ละเอียดอ่อนได้เช่นกัน โดยเราจะตกลงการใช้งาน ขอบเขต และการจัดการข้อมูลเป็นรายโครงการ',
    memory: 'หน่วยความจำร่วมของ CPU/GPU',
    cta: 'พูดคุยเกี่ยวกับโครงการ AI ภายในระบบ',
  },
  hi: {
    title: 'स्थानीय AI। हमारी अपनी कंप्यूटिंग क्षमता।',
    description: 'हम जटिल AI कार्यों के लिए अपने NVIDIA Jetson AGX Xavier का उपयोग करते हैं। NVIDIA के मूल सॉफ़्टवेयर स्टैक से उपयुक्त AI मॉडल और वर्कफ़्लो अपने हार्डवेयर पर स्थानीय रूप से चलाते हैं।',
    customers: 'हम ग्राहकों को स्थानीय AI परियोजनाओं और संवेदनशील डेटा की प्रोसेसिंग के लिए भी यह कंप्यूटिंग क्षमता उपलब्ध कराते हैं। उपयोग, दायरे और डेटा प्रबंधन पर हर परियोजना के अनुसार सहमति बनती है।',
    memory: 'साझा CPU/GPU मेमोरी',
    cta: 'स्थानीय AI परियोजना पर चर्चा करें',
  },
  tr: {
    title: 'Yerel yapay zekâ. Kendi işlem gücümüz.',
    description: 'Karmaşık yapay zekâ görevleri için NVIDIA Jetson AGX Xavier cihazımızı kullanıyoruz. NVIDIA’nın yerel yazılım yığınıyla uygun yapay zekâ modellerini ve iş akışlarını kendi donanımımızda yerel olarak çalıştırıyoruz.',
    customers: 'Bu işlem gücünü yerel yapay zekâ projeleri ve hassas verilerin işlenmesi için müşterilerimize de sunuyoruz. Kullanımı, kapsamı ve veri işlemeyi her proje için birlikte belirliyoruz.',
    memory: 'Paylaşımlı CPU/GPU belleği',
    cta: 'Yerel yapay zekâ projesini görüşelim',
  },
  sq: {
    title: 'AI lokale. Fuqia jonë kompjuterike.',
    description: 'Për detyra komplekse të AI përdorim NVIDIA Jetson AGX Xavier tonë. Me paketën origjinale të programeve NVIDIA ekzekutojmë modele dhe procese të përshtatshme të AI lokalisht në pajisjet tona.',
    customers: 'Këtë fuqi kompjuterike ua ofrojmë edhe klientëve për projekte lokale të AI dhe përpunimin e të dhënave sensitive. Përdorimin, shtrirjen dhe trajtimin e të dhënave i përcaktojmë për çdo projekt.',
    memory: 'Memorie e përbashkët CPU/GPU',
    cta: 'Diskuto një projekt lokal të AI',
  },
  ru: {
    title: 'Локальный ИИ. Собственные вычислительные ресурсы.',
    description: 'Для сложных задач ИИ мы используем собственный NVIDIA Jetson AGX Xavier. Программный стек NVIDIA позволяет запускать подходящие модели и рабочие процессы локально на нашем оборудовании.',
    customers: 'Мы также предоставляем эти вычислительные ресурсы клиентам для локальных проектов ИИ и обработки конфиденциальных данных. Использование, объём работ и обработку данных согласуем для каждого проекта.',
    memory: 'Общая память CPU/GPU',
    cta: 'Обсудить локальный проект ИИ',
  },
  es: {
    title: 'IA local. Nuestra propia capacidad de cálculo.',
    description: 'Utilizamos nuestro NVIDIA Jetson AGX Xavier para tareas complejas de IA. Su pila de software nativa de NVIDIA nos permite ejecutar modelos y flujos de trabajo adecuados localmente en nuestro propio hardware.',
    customers: 'También ofrecemos esta capacidad de cálculo a nuestros clientes para proyectos de IA local y el procesamiento de datos sensibles. Acordamos el uso, el alcance y el tratamiento de los datos para cada proyecto.',
    memory: 'Memoria compartida CPU/GPU',
    cta: 'Hablemos de tu proyecto de IA local',
  },
  it: {
    title: 'IA locale. La nostra potenza di calcolo.',
    description: 'Per attività di IA complesse utilizziamo il nostro NVIDIA Jetson AGX Xavier. Lo stack software nativo NVIDIA ci permette di eseguire modelli e flussi di lavoro adatti localmente sul nostro hardware.',
    customers: 'Mettiamo questa potenza di calcolo a disposizione anche dei clienti per progetti di IA locale e il trattamento di dati sensibili. Concordiamo utilizzo, ambito e trattamento dei dati per ogni progetto.',
    memory: 'Memoria condivisa CPU/GPU',
    cta: 'Parliamo di un progetto di IA locale',
  },
  uk: {
    title: 'Локальний ШІ. Власні обчислювальні ресурси.',
    description: 'Для складних завдань ШІ ми використовуємо власний NVIDIA Jetson AGX Xavier. Програмний стек NVIDIA дає змогу запускати відповідні моделі та робочі процеси локально на нашому обладнанні.',
    customers: 'Ми також надаємо ці обчислювальні ресурси клієнтам для локальних проєктів ШІ та обробки конфіденційних даних. Використання, обсяг робіт і обробку даних погоджуємо для кожного проєкту.',
    memory: 'Спільна пам’ять CPU/GPU',
    cta: 'Обговорити локальний проєкт ШІ',
  },
  el: {
    title: 'Τοπική AI. Η δική μας υπολογιστική ισχύς.',
    description: 'Χρησιμοποιούμε το NVIDIA Jetson AGX Xavier μας για σύνθετες εργασίες AI. Το εγγενές λογισμικό NVIDIA μάς επιτρέπει να εκτελούμε κατάλληλα μοντέλα και ροές εργασίας τοπικά στον δικό μας εξοπλισμό.',
    customers: 'Προσφέρουμε αυτή την υπολογιστική ισχύ και στους πελάτες μας για τοπικά έργα AI και επεξεργασία ευαίσθητων δεδομένων. Συμφωνούμε τη χρήση, το εύρος και τη διαχείριση δεδομένων για κάθε έργο.',
    memory: 'Κοινόχρηστη μνήμη CPU/GPU',
    cta: 'Συζητήστε ένα τοπικό έργο AI',
  },
  pt: {
    title: 'IA local. A nossa própria capacidade de computação.',
    description: 'Utilizamos o nosso NVIDIA Jetson AGX Xavier para tarefas complexas de IA. A sua pilha de software nativa NVIDIA permite executar modelos e fluxos de trabalho adequados localmente no nosso próprio hardware.',
    customers: 'Também disponibilizamos esta capacidade aos clientes para projetos de IA local e processamento de dados sensíveis. A utilização, o âmbito e o tratamento dos dados são acordados para cada projeto.',
    memory: 'Memória partilhada CPU/GPU',
    cta: 'Falar sobre um projeto de IA local',
  },
  zh: {
    title: '本地 AI，自有算力。',
    description: '我们使用自有的 NVIDIA Jetson AGX Xavier 处理复杂的 AI 任务。借助 NVIDIA 原生软件栈，我们能够在自有硬件上本地运行适用的 AI 模型和工作流。',
    customers: '我们也为客户提供这台设备的算力，用于本地 AI 项目和敏感数据处理。使用方式、项目范围与数据处理方案将按项目商定。',
    memory: 'CPU/GPU 共享内存',
    cta: '讨论本地 AI 项目',
  },
  ja: {
    title: 'ローカルAI。自社の計算リソース。',
    description: '複雑なAIタスクには、自社のNVIDIA Jetson AGX Xavierを使用します。NVIDIAのネイティブソフトウェアスタックを活用し、適したAIモデルやワークフローを自社ハードウェア上でローカル実行します。',
    customers: 'ローカルAIプロジェクトや機密性の高いデータの処理向けに、お客様にもこの計算リソースを提供します。利用方法、範囲、データの取り扱いはプロジェクトごとに合意します。',
    memory: 'CPU/GPU共有メモリ',
    cta: 'ローカルAIプロジェクトを相談する',
  },
}
