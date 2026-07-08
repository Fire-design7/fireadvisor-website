export type Phase = "design" | "build" | "maintain";

export interface ServiceFaq {
  bg: { q: string; a: string };
  en: { q: string; a: string };
}

export interface Service {
  slug: string;
  phase: Phase;
  standard: string;
  bg: { title: string; short: string; body: string };
  en: { title: string; short: string; body: string };
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: "chast-pozharna-bezopasnost",
    phase: "design",
    standard: "Наредба № Iз-1971",
    bg: {
      title: "Част „Пожарна безопасност“ на инвестиционен проект",
      short: "Задължителна проектна част за издаване на разрешение за строеж.",
      body: "Разработваме част „Пожарна безопасност“ на инвестиционния проект съгласно Наредба № Iз-1971 и Приложение № 3 към нея — обхваща пасивните и активните защитни мерки и приетите технически решения за пожаробезопасна експлоатация на обекта. Тази част е задължителна за повечето видове сгради според класа им по функционална пожарна опасност и е необходима за издаване на разрешение за строеж.",
    },
    en: {
      title: "Fire Safety Section of the Investment Project",
      short: "The mandatory design section required to obtain a building permit.",
      body: "We develop the \"Fire Safety\" section of the investment project under Regulation № Iз-1971 and its Appendix 3 — covering the passive and active protection measures and the technical solutions adopted for fire-safe operation of the building. This section is mandatory for most building types based on their functional fire hazard class and is required to obtain a building permit.",
    },
    faqs: [
      {
        bg: {
          q: "Задължителна ли е част „Пожарна безопасност“ за всеки обект?",
          a: "Не за всички — например жилищни и обществено-обслужващи сгради с ниска пожарна опасност, до 200 кв.м и до два етажа, както и едноетажни производствени/складови и селскостопански сгради до 8 м височина и до 200 кв.м, са освободени от изискването. За останалите обекти частта е задължителна.",
        },
        en: {
          q: "Is the Fire Safety section mandatory for every building?",
          a: "Not for all — for example, low fire-hazard residential and public-service buildings up to 200 sq. m and two floors, and single-storey industrial/warehouse or agricultural buildings up to 8 m in height and 200 sq. m, are exempt. For all other buildings, the section is mandatory.",
        },
      },
    ],
  },
  {
    slug: "pozharoizvestyavane",
    phase: "design",
    standard: "EN 54",
    bg: {
      title: "Пожароизвестителни системи",
      short: "Проектиране и монтаж на системи за ранно откриване на пожар.",
      body: "Проектираме и изграждаме пожароизвестителни системи, съобразени с типа и предназначението на обекта — от конвенционални до адресируеми системи. Всяка инсталация се изпълнява съгласно EN 54 и действащата нормативна уредба.",
    },
    en: {
      title: "Fire Detection Systems",
      short: "Design and installation of early fire detection systems.",
      body: "We design and install fire detection systems tailored to the type and purpose of the building — from conventional to addressable systems. Every installation complies with EN 54 and applicable regulations.",
    },
    faqs: [
      {
        bg: {
          q: "Колко често трябва да се тества пожароизвестителна система по закон?",
          a: "Периодичността зависи от типа обект и системата, но обичайно се изисква поне годишна проверка от лицензиран екип, а за някои обекти — по-често.",
        },
        en: {
          q: "How often does a fire detection system need to be tested by law?",
          a: "The frequency depends on the building type and system, but at minimum an annual inspection by a licensed team is typically required — more often for certain facilities.",
        },
      },
    ],
  },
  {
    slug: "gasitelni-instalatsii",
    phase: "design",
    standard: "EN 12845",
    bg: {
      title: "Пожарогасителни инсталации",
      short: "Автоматични спринклерни и газови системи за пожарогасене.",
      body: "Изграждаме автоматични пожарогасителни инсталации — водни (спринклерни), газови и пенни системи — в зависимост от спецификата на защитавания обект и класа на пожарна опасност.",
    },
    en: {
      title: "Fire Suppression Systems",
      short: "Automatic sprinkler and gas-based fire suppression systems.",
      body: "We install automatic fire suppression systems — water-based (sprinkler), gas and foam systems — selected according to the specific building and its fire hazard classification.",
    },
    faqs: [],
  },
  {
    slug: "pozharno-dosie",
    phase: "maintain",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Пожарно досие и документи за обекти в експлоатация",
      short: "Пожарно досие и пълна документация по Наредба № 8121з-647.",
      body: "Изготвяме и поддържаме пожарното досие на вашия обект съгласно Наредба № 8121з-647 за правилата и нормите за пожарна безопасност при експлоатация на обектите. Досието включва цялата документация, доказваща изпълнението на противопожарните мерки — и се съхранява на обекта за целите на проверка от контролните органи. Отговорността за досието е на собственика или управителя на обекта — ние поемаме подготовката и текущата му актуализация вместо вас.",
    },
    en: {
      title: "Fire Safety File & Documentation for Operating Facilities",
      short: "Fire safety file and full documentation under Regulation № 8121з-647.",
      body: "We prepare and maintain your building's fire safety file in line with Regulation № 8121з-647 on fire safety rules for facilities in operation. The file contains all documentation proving that fire safety measures are in place, and is kept on site for inspection by the authorities. Responsibility for the file rests with the owner or manager of the facility — we handle its preparation and ongoing upkeep on your behalf.",
    },
    faqs: [
      {
        bg: {
          q: "Кой носи отговорност за пожарното досие на обекта?",
          a: "Собственикът или управителят на обекта — досието се съхранява на място и трябва да е достъпно и актуално по всяко време за проверка от контролните органи.",
        },
        en: {
          q: "Who is responsible for a building's fire safety file?",
          a: "The owner or manager of the facility. The file is kept on site and must be accessible and up to date at all times for inspection by the authorities.",
        },
      },
    ],
  },
  {
    slug: "odit-i-pregled",
    phase: "maintain",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Одити и проверки на пожарни системи",
      short: "Пожарен одит на място и готовност за проверка от органите.",
      body: "Извършваме одити и проверки на съществуващи пожарни инсталации — хотели, магазини, офиси и производствени обекти — за да сте сигурни, че сте готови за инспекция по всяко време и намалявате риска от санкции.",
    },
    en: {
      title: "Fire Safety Audits & Inspections",
      short: "On-site fire audits and inspection-readiness for any facility.",
      body: "We audit and inspect existing fire safety installations — hotels, retail, offices and industrial sites — so you're always ready for an official inspection and minimize the risk of penalties.",
    },
    faqs: [],
  },
  {
    slug: "vsodt",
    phase: "design",
    standard: "EN 12101",
    bg: {
      title: "ВСОДТ — вентилационни системи за отделяне на дим и топлина",
      short: "Системи за контрол на дима при пожар за безопасна евакуация.",
      body: "Проектираме и изграждаме вентилационни системи за отделяне на дим и топлина (ВСОДТ), които осигуряват видимост и безопасни пътища за евакуация при пожар, съгласно EN 12101.",
    },
    en: {
      title: "Smoke & Heat Extraction Ventilation",
      short: "Smoke control systems for safe evacuation during a fire.",
      body: "We design and install smoke and heat extraction ventilation systems that maintain visibility and safe evacuation routes during a fire, in line with EN 12101.",
    },
    faqs: [],
  },
  {
    slug: "evakuatsionno-osvetlenie",
    phase: "design",
    standard: "EN 1838",
    bg: {
      title: "Евакуационно осветление",
      short: "Аварийно осветление и указателни знаци за безопасна евакуация.",
      body: "Проектираме и монтираме системи за евакуационно и аварийно осветление, съобразени с плана за евакуация на обекта и изискванията за видимост на изходите.",
    },
    en: {
      title: "Emergency Evacuation Lighting",
      short: "Emergency lighting and exit signage for safe evacuation.",
      body: "We design and install emergency and evacuation lighting systems aligned with the building's evacuation plan and exit visibility requirements.",
    },
    faqs: [],
  },
  {
    slug: "evakuatsionni-shemi",
    phase: "design",
    standard: "Наредба Iз-1971",
    bg: {
      title: "Схеми за евакуация",
      short: "Изготвяне на евакуационни планове и табла за обекта.",
      body: "Изготвяме индивидуални схеми за евакуация за вашия обект — ясно обозначени пътища и изходи, поставени на подходящи места съгласно нормативните изисквания и спецификата на сградата.",
    },
    en: {
      title: "Evacuation Plans",
      short: "Evacuation floor plans and signage boards for your building.",
      body: "We create individual evacuation plans for your building — clearly marked routes and exits, placed according to regulatory requirements and the specifics of the building.",
    },
    faqs: [],
  },
  {
    slug: "ognezashtita",
    phase: "build",
    standard: "Наредба Iз-1971",
    bg: {
      title: "Огнезащита на конструкции",
      short: "Огнезащитно покритие на стоманени и дървени конструкции.",
      body: "Изпълняваме огнезащитно третиране на носещи конструкции — стоманени, дървени и други — за постигане на изискуемия клас на огнеустойчивост съгласно Наредба Iз-1971.",
    },
    en: {
      title: "Structural Fireproofing",
      short: "Fireproof coating for steel and timber structures.",
      body: "We apply fireproofing treatment to load-bearing structures — steel, timber and others — to achieve the required fire-resistance rating under applicable regulations.",
    },
    faqs: [],
  },
  {
    slug: "pasivna-pozharozashtita",
    phase: "build",
    standard: "EN 1366",
    bg: {
      title: "Пасивна пожарозащита",
      short: "Уплътняване на тръбни и кабелни преминавания — до EI 240.",
      body: "Изпълняваме пасивна пожарозащита на тръбни и кабелни преминавания през пожарозащитни стени и подове — огнезащитни плоскости, маншети и уплътнители, сертифицирани до клас EI 240 съгласно EN 1366. Работим в партньорство с Red Birch — ексклузивен представител на британския производител Protecta за България — и прилагаме техните сертифицирани системи на място.",
    },
    en: {
      title: "Passive Fire Protection",
      short: "Fire-stopping for pipe and cable penetrations — up to EI 240.",
      body: "We provide passive fire protection for pipe and cable penetrations through fire-rated walls and floors — fireproof boards, collars and sealants certified up to EI 240 under EN 1366. We work in partnership with Red Birch — the exclusive representative for UK manufacturer Protecta in Bulgaria — and install their certified systems on site.",
    },
    faqs: [
      {
        bg: {
          q: "Работите ли с конкретна марка продукти за пасивна пожарозащита?",
          a: "Да — партнираме си с Red Birch, ексклузивен представител на Protecta (Великобритания) за България, и монтираме техните сертифицирани по EN 1366 продукти.",
        },
        en: {
          q: "Do you work with a specific passive fire protection brand?",
          a: "Yes — we partner with Red Birch, the exclusive representative of Protecta (UK) in Bulgaria, and install their EN 1366-certified products.",
        },
      },
    ],
  },
  {
    slug: "otsenka-na-risk",
    phase: "design",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Оценка на риска",
      short: "Анализ на пожарния риск и препоръки за минимизирането му.",
      body: "Извършваме оценка на риска от пожар за вашия обект и изготвяме конкретни препоръки за привеждане в съответствие с нормативните изисквания.",
    },
    en: {
      title: "Fire Risk Assessment",
      short: "Fire risk analysis and recommendations to minimize it.",
      body: "We carry out fire risk assessments for your building and provide concrete recommendations for achieving regulatory compliance.",
    },
    faqs: [],
  },
  {
    slug: "podarzhka-i-kontrol",
    phase: "maintain",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Поддръжка и контрол",
      short: "Абонаментна поддръжка на всички системи за пожарна безопасност.",
      body: "Предлагаме абонаментна поддръжка на пожароизвестителни, пожарогасителни и евакуационни системи — периодични прегледи, сервиз и водене на пожарно досие.",
    },
    en: {
      title: "Maintenance & Control",
      short: "Subscription maintenance for all fire safety systems.",
      body: "We offer subscription maintenance for fire detection, suppression and evacuation systems — periodic inspections, servicing and fire safety file management.",
    },
    faqs: [],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByPhase(phase: Phase) {
  return services.filter((s) => s.phase === phase);
}
