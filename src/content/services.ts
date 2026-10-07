export type Pillar = "design" | "consulting" | "review" | "evacuation" | "documentation";

export interface ServiceFaq {
  bg: { q: string; a: string };
  en: { q: string; a: string };
}

interface ServiceContent {
  title: string;
  short: string;
  body: string;
  whenNeeded: string;
  whatIncludes: string[];
  process: string[];
  infoNeeded: string[];
}

export interface Service {
  slug: string;
  pillar: Pillar;
  standard: string;
  bg: ServiceContent;
  en: ServiceContent;
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: "chast-pozharna-bezopasnost",
    pillar: "design",
    standard: "Наредба № Iз-1971",
    bg: {
      title: "Част „Пожарна безопасност“ на инвестиционен проект",
      short: "Задължителна проектна част за издаване на разрешение за строеж.",
      body: "Разработваме част „Пожарна безопасност“ (наричана често и „противопожарен проект“) на инвестиционния проект съгласно Наредба № Iз-1971 и Приложение № 3 към нея — обхваща пасивните и активните защитни мерки и приетите технически решения за пожаробезопасна експлоатация на обекта. Тази част е задължителна за повечето видове сгради според класа им по функционална пожарна опасност и е необходима за издаване на разрешение за строеж.",
      whenNeeded: "Необходима е при всеки нов строеж, надстройка, пристройка или основен ремонт на сграда, която не е сред изрично освободените по наредбата случаи — без нея не се издава разрешение за строеж.",
      whatIncludes: [
        "Обяснителна записка по част „Пожарна безопасност“",
        "Определяне на клас по функционална пожарна опасност и пожаротехническите показатели",
        "Чертежи с означени пожарни сектори, евакуационни пътища и изходи",
        "Съгласуване с останалите проектни части — архитектура, конструкции, ОВК, Ел.",
      ],
      process: [
        "Изпращате наличните архитектурни чертежи и информация за предназначението на обекта",
        "Определяме приложимите нормативни изисквания за конкретния случай",
        "Изготвяме част „Пожарна безопасност“ в координация с останалите проектанти",
        "Предаваме готовата част за подаване пред общината/ДНСК",
      ],
      infoNeeded: [
        "Архитектурен проект (поне идеен)",
        "Предназначение и капацитет на обекта",
        "Данни за възложителя и адреса на обекта",
      ],
    },
    en: {
      title: "Fire Safety Section of the Investment Project",
      short: "The mandatory design section required to obtain a building permit.",
      body: "We develop the \"Fire Safety\" section of the investment project under Regulation № Iз-1971 and its Appendix 3 — covering the passive and active protection measures and the technical solutions adopted for fire-safe operation of the building. This section is mandatory for most building types based on their functional fire hazard class and is required to obtain a building permit.",
      whenNeeded: "Required for any new construction, extension or major renovation of a building that isn't explicitly exempt under the regulation — a building permit cannot be issued without it.",
      whatIncludes: [
        "Explanatory report for the Fire Safety section",
        "Determining the functional fire hazard class and fire-technical parameters",
        "Drawings marking fire compartments, evacuation routes and exits",
        "Coordination with the other design disciplines — architecture, structures, HVAC, electrical",
      ],
      process: [
        "You send us the available architectural drawings and the building's intended use",
        "We determine the applicable regulatory requirements for the specific case",
        "We prepare the Fire Safety section in coordination with the other designers",
        "We hand over the finished section for submission to the municipality",
      ],
      infoNeeded: [
        "Architectural project (at least concept stage)",
        "Intended use and capacity of the building",
        "Client details and the building's address",
      ],
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
    pillar: "design",
    standard: "EN 54",
    bg: {
      title: "Пожароизвестителни системи (ПИС)",
      short: "Проектиране на системи за ранно откриване на пожар.",
      body: "Проектираме пожароизвестителни системи (ПИС), съобразени с типа и предназначението на обекта — от конвенционални до адресируеми решения. Техническият проект и спецификацията се изготвят съгласно EN 54 и действащата нормативна уредба, готови за изпълнение от лицензиран монтажник по ваш избор.",
      whenNeeded: "Необходима е за повечето обществени, търговски и производствени сгради, както и навсякъде, където част „Пожарна безопасност“ го изисква.",
      whatIncludes: [
        "Избор на тип система — конвенционална или адресируема",
        "Разположение на пожароизвестителни датчици, обявители и модули",
        "Изчисление на зоните на детекция",
        "Техническа спецификация за изпълнение по EN 54",
      ],
      process: [
        "Изпращате архитектурния план на обекта",
        "Определяме типа и обхвата на системата",
        "Изготвяме проекта и спецификацията",
        "Предаваме готова документация за изпълнение от монтажник по ваш избор",
      ],
      infoNeeded: [
        "Архитектурен план",
        "Предназначение на помещенията",
        "Налична друга изградена инсталация, ако има",
      ],
    },
    en: {
      title: "Fire Detection Systems",
      short: "Design of early fire detection systems.",
      body: "We design fire detection systems tailored to the type and purpose of the building — from conventional to addressable solutions. The technical design and specification are prepared under EN 54 and applicable regulations, ready for installation by a licensed contractor of your choice.",
      whenNeeded: "Required for most public, commercial and industrial buildings, and wherever the Fire Safety section calls for it.",
      whatIncludes: [
        "Choosing between a conventional or addressable system",
        "Placement of detectors, sounders and control modules",
        "Detection zone calculations",
        "Technical specification for installation under EN 54",
      ],
      process: [
        "You send us the building's architectural plan",
        "We determine the type and scope of the system",
        "We prepare the design and specification",
        "We hand over documentation ready for installation by a contractor of your choice",
      ],
      infoNeeded: [
        "Architectural plan",
        "Intended use of each room",
        "Any existing installation already in place",
      ],
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
    pillar: "design",
    standard: "EN 12845",
    bg: {
      title: "Пожарогасителни инсталации",
      short: "Проектиране на спринклерни и газови системи за пожарогасене.",
      body: "Проектираме автоматични пожарогасителни инсталации — водни (спринклерни), газови и пенни системи — съобразени със спецификата на обекта и класа на пожарна опасност, с пълна техническа документация за изпълнение съгласно EN 12845.",
      whenNeeded: "Необходима е за обекти с висок клас пожарна опасност или голяма пожаротоварност — складове, производствени halls, паркинги и някои търговски обекти.",
      whatIncludes: [
        "Избор на подходящ тип система — водна, газова или пенна",
        "Хидравлично оразмеряване на спринклерната мрежа",
        "Разположение на резервоари, помпени станции и тръбна разводка",
        "Техническа документация за изпълнение по EN 12845",
      ],
      process: [
        "Изпращате информация за обекта и класа на пожарна опасност",
        "Определяме подходящия тип система",
        "Изготвяме хидравличните изчисления и чертежите",
        "Предаваме готова документация за изпълнение",
      ],
      infoNeeded: [
        "Архитектурен и технологичен план",
        "Клас на пожарна опасност, ако е известен",
        "Налично водоснабдяване на обекта",
      ],
    },
    en: {
      title: "Fire Suppression Systems",
      short: "Design of automatic sprinkler and gas-based fire suppression systems.",
      body: "We design automatic fire suppression systems — water-based (sprinkler), gas and foam systems — tailored to the specific building and its fire hazard classification, with full technical documentation for installation under EN 12845.",
      whenNeeded: "Required for buildings with a high fire hazard class or heavy fire load — warehouses, industrial halls, parking structures and some retail buildings.",
      whatIncludes: [
        "Selecting the right system type — water, gas or foam",
        "Hydraulic sizing of the sprinkler network",
        "Layout of tanks, pump stations and pipework",
        "Technical documentation for installation under EN 12845",
      ],
      process: [
        "You send us information about the building and its fire hazard class",
        "We determine the appropriate system type",
        "We prepare the hydraulic calculations and drawings",
        "We hand over documentation ready for installation",
      ],
      infoNeeded: [
        "Architectural and process layout",
        "Fire hazard class, if known",
        "Available water supply on site",
      ],
    },
    faqs: [],
  },
  {
    slug: "pozharno-dosie",
    pillar: "documentation",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Пожарно досие и документи за обекти в експлоатация",
      short: "Пожарно досие и пълна документация по Наредба № 8121з-647.",
      body: "Изготвяме и поддържаме пожарното досие на вашия обект съгласно Наредба № 8121з-647 — вътрешни правила, заповеди, инструкции и цялата документация, доказваща изпълнението на противопожарните мерки. Досието се съхранява на обекта за целите на проверка от контролните органи. Отговорността за него е на собственика или управителя на обекта — ние поемаме подготовката и текущата му актуализация вместо вас.",
      whenNeeded: "Необходимо е за всеки действащ обект — хотел, магазин, офис, производство — независимо дали е нов, или вече работи от години без организирана документация.",
      whatIncludes: [
        "Вътрешни правила за пожарна безопасност",
        "Заповеди за отговорни лица и реда при пожар",
        "Инструкции за персонала",
        "Пълния комплект документи, изисквани при проверка",
      ],
      process: [
        "Изпращате налична документация за обекта, ако има",
        "Правим оглед или интервю за организацията на обекта",
        "Изготвяме липсващите документи",
        "Предаваме готовото досие, подредено за проверка",
      ],
      infoNeeded: [
        "Вид и предназначение на обекта",
        "Брой персонал и работен режим",
        "Налична документация, ако съществува",
      ],
    },
    en: {
      title: "Fire Safety File & Documentation for Operating Facilities",
      short: "Fire safety file and full documentation under Regulation № 8121з-647.",
      body: "We prepare and maintain your building's fire safety file under Regulation № 8121з-647 — internal rules, orders, instructions and all documentation proving that fire safety measures are in place. The file is kept on site for inspection by the authorities. Responsibility for it rests with the owner or manager of the facility — we handle its preparation and ongoing upkeep on your behalf.",
      whenNeeded: "Required for every operating facility — hotel, shop, office, production site — whether it's brand new or has been running for years without organized documentation.",
      whatIncludes: [
        "Internal fire safety rules",
        "Orders naming responsible persons and the fire procedure",
        "Staff instructions",
        "The full set of documents required during an inspection",
      ],
      process: [
        "You send us any existing documentation for the building",
        "We review the site's organization on site or by interview",
        "We prepare the missing documents",
        "We hand over the finished file, organized for inspection",
      ],
      infoNeeded: [
        "Type and use of the building",
        "Staff count and working schedule",
        "Existing documentation, if any",
      ],
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
    pillar: "review",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Преглед и оценка на обект по пожарна безопасност",
      short: "Независим преглед на обекта и готовност за инспекция — при поискване, не на абонамент.",
      body: "Извършваме независим преглед на съществуващи пожарни инсталации и организацията на обекта — хотели, магазини, офиси и производствени обекти — за да сте сигурни, че сте готови за проверка от контролните органи по всяко време. Прегледът е еднократна услуга при поискване и не изисква абонамент или постоянно присъствие на обекта.",
      whenNeeded: "Подходящо е, когато поемате управлението на нов обект, при съмнение за пропуски, или просто искате независима проверка преди очаквана проверка от органите.",
      whatIncludes: [
        "Оглед на място на инсталациите и организацията",
        "Списък с констатирани несъответствия",
        "Приоритизирани препоръки за отстраняване",
        "Кратък писмен доклад",
      ],
      process: [
        "Уговаряме оглед на обекта",
        "Проверяваме инсталациите, изходите и наличната документация",
        "Изготвяме доклад с констатации",
        "Обсъждаме с вас приоритетите за отстраняване",
      ],
      infoNeeded: [
        "Адрес и достъп до обекта",
        "Налична документация, ако има",
        "Предпочитана дата за оглед",
      ],
    },
    en: {
      title: "Fire Safety Review & Assessment of Existing Facilities",
      short: "An independent review of your facility and inspection-readiness — on demand, not a subscription.",
      body: "We carry out an independent review of existing fire safety installations and site organization — hotels, retail, offices and industrial facilities — so you're always ready for an official inspection. It's a one-off, on-demand service, not a subscription or a recurring site presence.",
      whenNeeded: "Useful when you take over managing a new facility, if you suspect gaps, or simply want an independent check before an expected inspection.",
      whatIncludes: [
        "On-site review of installations and organization",
        "A list of identified non-conformities",
        "Prioritized recommendations for fixing them",
        "A short written report",
      ],
      process: [
        "We schedule a site visit",
        "We check installations, exits and existing documentation",
        "We prepare a findings report",
        "We discuss priorities for fixing issues with you",
      ],
      infoNeeded: [
        "Address and access to the site",
        "Existing documentation, if any",
        "Preferred date for the visit",
      ],
    },
    faqs: [],
  },
  {
    slug: "vsodt",
    pillar: "design",
    standard: "EN 12101",
    bg: {
      title: "ВСОДТ — вентилационни системи за отделяне на дим и топлина",
      short: "Проектиране на системи за контрол на дима при пожар за безопасна евакуация.",
      body: "Проектираме вентилационни системи за отделяне на дим и топлина (ВСОДТ), известни също като противодимна вентилация, които осигуряват видимост и безопасни пътища за евакуация при пожар — техническо решение и документация съгласно EN 12101.",
      whenNeeded: "Необходима е в сгради с големи обеми, атриуми, подземни паркинги или дълги евакуационни коридори, където естествената вентилация не е достатъчна.",
      whatIncludes: [
        "Изчисление на необходимия дебит на дим и топлина",
        "Избор на вентилатори, клапи и управляваща система",
        "Схема на въздуховодите и точките на изхвърляне",
        "Техническа документация по EN 12101",
      ],
      process: [
        "Изпращате архитектурния план и разрезите на обекта",
        "Определяме сценариите на пожар за оразмеряване",
        "Изготвяме изчисленията и проекта",
        "Предаваме готова документация за изпълнение",
      ],
      infoNeeded: [
        "Архитектурен план и разрези",
        "Предназначение на пространствата",
        "Данни за конструкцията — тавани, атриуми",
      ],
    },
    en: {
      title: "Smoke & Heat Extraction Ventilation",
      short: "Design of smoke control systems for safe evacuation during a fire.",
      body: "We design smoke and heat extraction ventilation systems that maintain visibility and safe evacuation routes during a fire — technical solution and documentation under EN 12101.",
      whenNeeded: "Required in buildings with large volumes, atriums, underground parking or long evacuation corridors, where natural ventilation isn't enough.",
      whatIncludes: [
        "Calculating the required smoke and heat extraction rate",
        "Selecting fans, dampers and the control system",
        "Ductwork layout and discharge points",
        "Technical documentation under EN 12101",
      ],
      process: [
        "You send us the architectural plan and sections of the building",
        "We determine the fire scenarios used for sizing",
        "We prepare the calculations and design",
        "We hand over documentation ready for installation",
      ],
      infoNeeded: [
        "Architectural plan and sections",
        "Intended use of the spaces",
        "Structural details — ceilings, atriums",
      ],
    },
    faqs: [],
  },
  {
    slug: "evakuatsionno-osvetlenie",
    pillar: "design",
    standard: "EN 1838",
    bg: {
      title: "Евакуационно осветление",
      short: "Проектиране на аварийно осветление и указателни знаци за безопасна евакуация.",
      body: "Проектираме системи за евакуационно и аварийно осветление, съобразени с плана за евакуация на обекта и изискванията за видимост на изходите, съгласно EN 1838.",
      whenNeeded: "Необходимо е във всяка сграда с обществен достъп или работни места, където основното осветление може да прекъсне при авария.",
      whatIncludes: [
        "Разположение на евакуационни и аварийни осветителни тела",
        "Изчисление на нивата на осветеност по евакуационните пътища",
        "Указателни знаци за изходите",
        "Техническа документация по EN 1838",
      ],
      process: [
        "Изпращате архитектурния план на обекта",
        "Определяме евакуационните пътища и точките за осветление",
        "Изготвяме проекта",
        "Предаваме готова документация за изпълнение",
      ],
      infoNeeded: [
        "Архитектурен план",
        "План за евакуация, ако вече съществува",
      ],
    },
    en: {
      title: "Emergency Evacuation Lighting",
      short: "Design of emergency lighting and exit signage for safe evacuation.",
      body: "We design emergency and evacuation lighting systems aligned with the building's evacuation plan and exit visibility requirements, under EN 1838.",
      whenNeeded: "Required in any building with public access or workplaces where the main lighting could fail in an emergency.",
      whatIncludes: [
        "Placement of evacuation and emergency light fittings",
        "Illuminance calculations along evacuation routes",
        "Exit signage",
        "Technical documentation under EN 1838",
      ],
      process: [
        "You send us the building's architectural plan",
        "We determine evacuation routes and lighting points",
        "We prepare the design",
        "We hand over documentation ready for installation",
      ],
      infoNeeded: [
        "Architectural plan",
        "Existing evacuation plan, if any",
      ],
    },
    faqs: [],
  },
  {
    slug: "evakuatsionni-shemi",
    pillar: "evacuation",
    standard: "Наредба Iз-1971",
    bg: {
      title: "Схеми и планове за евакуация",
      short: "Изготвяне на планове (схеми) за евакуация и табла за обекта.",
      body: "Изготвяме индивидуални схеми (планове) за евакуация за вашия обект — ясно обозначени пътища и изходи, поставени на подходящи места съгласно нормативните изисквания и спецификата на сградата. Схемата за евакуация е графичната част на плана за евакуация по Наредба № 8121з-647 — изготвяме нея. В практиката двете понятия често се ползват като синоними.",
      whenNeeded: "Необходими са за всеки обект с достъп на клиенти или персонал — хотели, магазини, офиси, производство — и често се търсят самостоятелно, без пълен проект.",
      whatIncludes: [
        "Индивидуална схема на евакуация за всеки етаж/помещение",
        "Ясно означени пътища, изходи и събирателни пунктове",
        "Табла, готови за отпечатване и монтаж",
        "Съответствие с нормативните изисквания за формат и съдържание",
      ],
      process: [
        "Изпращате архитектурния план на обекта",
        "Определяме евакуационните пътища и изходи",
        "Изготвяме схемите",
        "Предаваме готовите за печат и монтаж файлове",
      ],
      infoNeeded: [
        "Архитектурен план на обекта",
        "Брой етажи и предназначение на помещенията",
      ],
    },
    en: {
      title: "Evacuation Plans",
      short: "Evacuation floor plans and signage boards for your building.",
      body: "We create individual evacuation plans for your building — clearly marked routes and exits, placed according to regulatory requirements and the specifics of the building. The evacuation scheme is the graphic part of the evacuation plan under Regulation № 8121з-647 — that is what we prepare.",
      whenNeeded: "Required for any facility with customer or staff access — hotels, shops, offices, production sites — and often requested on its own, without a full design project.",
      whatIncludes: [
        "An individual evacuation plan for each floor/room",
        "Clearly marked routes, exits and assembly points",
        "Print-ready boards for wall mounting",
        "Compliance with regulatory format and content requirements",
      ],
      process: [
        "You send us the building's architectural plan",
        "We determine evacuation routes and exits",
        "We prepare the plans",
        "We hand over print- and installation-ready files",
      ],
      infoNeeded: [
        "Architectural plan of the building",
        "Number of floors and use of each room",
      ],
    },
    faqs: [
      {
        bg: {
          q: "Схема или план за евакуация — има ли разлика?",
          a: "Да. По Наредба № 8121з-647 планът за евакуация включва текстова и графична част, а схемата за евакуация е графичната му част. Ние изготвяме схемите — ясно обозначени пътища, изходи и събирателни пунктове за вашия обект. В практиката двете понятия често се ползват като синоними, затова ни търсят и по двата начина.",
        },
        en: {
          q: "Is there a difference between an evacuation \"scheme\" and an evacuation \"plan\"?",
          a: "Yes. Under Regulation № 8121з-647 the evacuation plan consists of a text part and a graphic part, and the evacuation scheme is its graphic part. We prepare the schemes — clearly marked routes, exits and assembly points for your building. In everyday use the two terms are often treated as synonyms, so people search for us both ways.",
        },
      },
    ],
  },
  {
    slug: "konsultatsii-po-pozharna-bezopasnost",
    pillar: "consulting",
    standard: "Нормативно съответствие",
    bg: {
      title: "Консултации по пожарна безопасност",
      short: "Анализ на нормативни изисквания и решения при конкретен казус.",
      body: "Консултираме по конкретни казуси, свързани с пожарната безопасност — нови обекти, преустройства, промяна на предназначение на съществуваща сграда или предварителна оценка преди инвестиция. Анализираме приложимите нормативни изисквания за вашия случай и предлагаме практическо решение, преди да сте вложили средства в грешна посока.",
      whenNeeded: "Когато все още не сте сигурни какво точно се изисква — нов обект, преустройство, смяна на предназначение, или просто въпрос, на който искате бърз и компетентен отговор.",
      whatIncludes: [
        "Анализ на конкретния казус спрямо приложимите наредби",
        "Писмено становище или устна консултация, според нуждата",
        "Препоръка за следващи стъпки",
        "При нужда — насочване към точната последваща услуга",
      ],
      process: [
        "Описвате казуса и изпращате наличната информация",
        "Преглеждаме приложимите нормативни изисквания",
        "Обсъждаме възможните решения",
        "Получавате конкретна препоръка",
      ],
      infoNeeded: [
        "Кратко описание на казуса",
        "Налична документация за обекта, ако има",
      ],
    },
    en: {
      title: "Fire Safety Consulting",
      short: "Regulatory analysis and solutions for your specific case.",
      body: "We provide consulting on specific fire safety cases — new buildings, renovations, change of use for an existing building, or a preliminary assessment before an investment decision. We analyze the applicable regulatory requirements for your situation and propose a practical solution before you've committed resources in the wrong direction.",
      whenNeeded: "When you're not yet sure what's required — a new building, a renovation, a change of use, or simply a question you want a fast, competent answer to.",
      whatIncludes: [
        "Analysis of the specific case against applicable regulations",
        "A written opinion or verbal consultation, as needed",
        "A recommendation for next steps",
        "Pointing you to the right follow-up service, if needed",
      ],
      process: [
        "You describe the case and send us the available information",
        "We review the applicable regulatory requirements",
        "We discuss the possible solutions",
        "You receive a concrete recommendation",
      ],
      infoNeeded: [
        "A short description of the case",
        "Existing documentation for the building, if any",
      ],
    },
    faqs: [
      {
        bg: {
          q: "Кога има смисъл да поискам консултация, вместо направо проект?",
          a: "Когато все още не сте сигурни какво точно е приложимо за вашия обект — например при промяна на предназначението, преустройство или в самото начало на инвестиционен процес. Консултацията изяснява картината, преди да поръчате пълен проект.",
        },
        en: {
          q: "When does it make sense to request a consultation instead of going straight to a design project?",
          a: "When you're not yet sure what applies to your building — for example with a change of use, a renovation, or at the very start of an investment process. A consultation clarifies the picture before you commission a full design project.",
        },
      },
    ],
  },
  {
    slug: "pregled-na-proekti",
    pillar: "review",
    standard: "Наредба № Iз-1971",
    bg: {
      title: "Преглед и контрол на проекти",
      short: "Независим преглед на проект по пожарна безопасност преди съгласуване или строителство.",
      body: "Проверяваме архитектурен или инженерен проект от гледна точка на пожарната безопасност — преди реализация, съгласуване или строителство. Целта е проблемите да бъдат открити навреме, а не след като вече са довели до забавяне, преработка или допълнителни разходи. Преглеждаме евакуационни пътища и изходи, пожарни сектори, огнеустойчивост на конструкцията, димоотвеждане, пожароизвестяване и пожарогасителни системи, достъп за пожарни автомобили, както и съответствието между архитектурната и инженерните части на проекта.",
      whenNeeded: "Най-полезно е преди подаване на проекта за съгласуване, но правим преглед и на вече завършени проекти, или по време на строителството при промяна.",
      whatIncludes: [
        "Писмен доклад с констатирани несъответствия и рискове",
        "Проверка на евакуационни пътища, сектори, огнеустойчивост и инсталации",
        "Препоръки за корекция преди съгласуване или строителство",
        "При нужда — координация директно с проектантския екип",
      ],
      process: [
        "Изпращате проекта — идеен, технически или работен",
        "Преглеждаме всички засегнати части",
        "Изготвяме доклад с констатации",
        "Обсъждаме корекциите с вас или с проектантите",
      ],
      infoNeeded: [
        "Пълния комплект чертежи на проекта",
        "Предназначение и капацитет на обекта",
        "Етап на проекта — идеен, технически или работен",
      ],
    },
    en: {
      title: "Project Review & Control",
      short: "Independent fire safety review of a project before approval or construction.",
      body: "We review an architectural or engineering project from a fire safety perspective — before it's built, approved, or put out to tender. The goal is to catch problems early, before they turn into delays, rework, or extra cost. We check evacuation routes and exits, fire compartments, structural fire resistance, smoke extraction, fire detection and suppression systems, access for fire engines, and the consistency between the architectural and engineering parts of the project.",
      whenNeeded: "Most useful before submitting the project for approval, but we also review already-completed projects, or during construction when something changes.",
      whatIncludes: [
        "A written report of identified issues and risks",
        "Checking evacuation routes, compartments, fire resistance and installations",
        "Recommendations to fix issues before approval or construction",
        "Direct coordination with the design team, if needed",
      ],
      process: [
        "You send us the project — concept, technical or working stage",
        "We review all affected parts",
        "We prepare a findings report",
        "We discuss corrections with you or the design team",
      ],
      infoNeeded: [
        "The full set of project drawings",
        "Intended use and capacity of the building",
        "Project stage — concept, technical or working",
      ],
    },
    faqs: [
      {
        bg: {
          q: "На кой етап е най-добре да поискате преглед на проекта?",
          a: "Колкото по-рано, толкова по-евтино е да се коригира проблем. Най-добре е още на етап идеен или технически проект, преди подаване за съгласуване — но правим преглед и на вече готови проекти при нужда.",
        },
        en: {
          q: "At what stage is it best to request a project review?",
          a: "The earlier, the cheaper it is to fix an issue — ideally at concept or technical design stage, before submission for approval. But we also review already-completed projects when needed.",
        },
      },
    ],
  },
  {
    slug: "ognezashtita",
    pillar: "consulting",
    standard: "Наредба Iз-1971",
    bg: {
      title: "Огнезащита на конструкции",
      short: "Избор и доставка на сертифицирани огнезащитни системи, вкл. огнезащитно боядисване.",
      body: "Консултираме и доставяме сертифицирани огнезащитни продукти за третиране на носещи конструкции — стоманени, дървени и други — включително огнезащитни бои и покрития (огнезащитно боядисване) — за постигане на изискуемия клас на огнеустойчивост съгласно Наредба Iз-1971. Помагаме при избора на подходящата система според конкретния казус.",
      whenNeeded: "Когато конструкцията на обекта — стоманена или дървена — трябва да отговори на конкретен клас на огнеустойчивост, определен от част „Пожарна безопасност“.",
      whatIncludes: [
        "Определяне на необходимия клас на огнеустойчивост",
        "Препоръка за подходяща сертифицирана система",
        "Доставка на продукта до обекта",
        "Техническа спецификация за изпълнение",
      ],
      process: [
        "Изпращате данни за конструкцията и изисквания клас",
        "Препоръчваме подходящата система",
        "Доставяме продукта",
        "Предоставяме техническа спецификация за изпълнението",
      ],
      infoNeeded: [
        "Тип и размери на конструкцията",
        "Изискван клас на огнеустойчивост, ако е известен",
      ],
    },
    en: {
      title: "Structural Fireproofing",
      short: "Selecting and supplying certified fireproofing systems.",
      body: "We advise on and supply certified fireproofing products for load-bearing structures — steel, timber and others — to achieve the required fire-resistance rating under applicable regulations. We help select the right system for your specific case.",
      whenNeeded: "When the building's structure — steel or timber — needs to meet a specific fire-resistance rating set by the Fire Safety section.",
      whatIncludes: [
        "Determining the required fire-resistance rating",
        "Recommending the right certified system",
        "Delivering the product to the site",
        "Technical specification for installation",
      ],
      process: [
        "You send us the structural data and required rating",
        "We recommend the right system",
        "We deliver the product",
        "We provide a technical specification for installation",
      ],
      infoNeeded: [
        "Type and dimensions of the structure",
        "Required fire-resistance rating, if known",
      ],
    },
    faqs: [],
  },
  {
    slug: "pasivna-pozharozashtita",
    pillar: "consulting",
    standard: "EN 1366",
    bg: {
      title: "Пасивна пожарозащита",
      short: "Технически решения и доставка на сертифицирани системи — до EI 240.",
      body: "Решаваме конкретни казуси по пасивна пожарозащита (firestop) на тръбни и кабелни преминавания през пожарозащитни стени и подове — консултираме за правилното техническо решение и доставяме сертифицирани системи до клас EI 240 съгласно EN 1366. Партньори сме на Red Birch — ексклузивен представител за България на британския производител Protecta — и предлагаме техните продукти директно, без посредник.",
      whenNeeded: "При всяко тръбно или кабелно преминаване през пожарозащитна стена или под — най-често пропускан детайл, който често се открива именно при проверка или одит.",
      whatIncludes: [
        "Оглед и класификация на преминаванията",
        "Препоръка за конкретната сертифицирана Protecta система",
        "Доставка на материалите",
        "Техническа спецификация и монтажни указания за изпълнителя",
      ],
      process: [
        "Изпращате снимки или чертежи на преминаванията",
        "Определяме нужния клас (до EI 240) и подходящата система",
        "Доставяме сертифицираните материали",
        "Предоставяме монтажни указания на изпълнителя",
      ],
      infoNeeded: [
        "Снимки или описание на преминаванията",
        "Тип на стената/пода — бетон, гипсокартон и др.",
        "Изискван клас на огнеустойчивост, ако е известен",
      ],
    },
    en: {
      title: "Passive Fire Protection",
      short: "Technical case-solving and supply of certified systems — up to EI 240.",
      body: "We solve specific passive fire protection cases for pipe and cable penetrations through fire-rated walls and floors — advising on the right technical solution and supplying certified systems up to EI 240 under EN 1366. We partner with Red Birch — the exclusive representative for UK manufacturer Protecta in Bulgaria — and offer their products directly, with no middleman.",
      whenNeeded: "For any pipe or cable penetration through a fire-rated wall or floor — the most commonly missed detail, often discovered only during an inspection or audit.",
      whatIncludes: [
        "Inspection and classification of the penetrations",
        "Recommending the specific certified Protecta system",
        "Delivering the materials",
        "Technical specification and installation guidance for the contractor",
      ],
      process: [
        "You send us photos or drawings of the penetrations",
        "We determine the required rating (up to EI 240) and the right system",
        "We deliver the certified materials",
        "We provide installation guidance for the contractor",
      ],
      infoNeeded: [
        "Photos or a description of the penetrations",
        "Wall/floor type — concrete, drywall, etc.",
        "Required fire-resistance rating, if known",
      ],
    },
    faqs: [
      {
        bg: {
          q: "Работите ли с конкретна марка продукти за пасивна пожарозащита?",
          a: "Да — партнираме си с Red Birch, ексклузивен представител на Protecta (Великобритания) за България, и доставяме директно техните сертифицирани по EN 1366 продукти.",
        },
        en: {
          q: "Do you work with a specific passive fire protection brand?",
          a: "Yes — we partner with Red Birch, the exclusive representative of Protecta (UK) in Bulgaria, and supply their EN 1366-certified products directly.",
        },
      },
    ],
  },
  {
    slug: "otsenka-na-risk",
    pillar: "consulting",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Оценка на риска",
      short: "Анализ на пожарния риск (оценка на риска от пожар) и препоръки за минимизирането му.",
      body: "Извършваме оценка на риска от пожар (анализ на пожарния риск) за вашия обект и изготвяме конкретни препоръки за привеждане в съответствие с нормативните изисквания.",
      whenNeeded: "Подходяща е при съмнение за конкретен риск, при промяна в организацията на обекта, или като основа преди изготвяне на пожарно досие.",
      whatIncludes: [
        "Оглед на обекта и идентифициране на рисковите фактори",
        "Писмен доклад с оценка на риска",
        "Конкретни препоръки за намаляване на риска",
        "Приоритизиране на мерките според спешността",
      ],
      process: [
        "Уговаряме оглед на обекта",
        "Идентифицираме рисковите фактори",
        "Изготвяме писмения доклад",
        "Обсъждаме препоръките с вас",
      ],
      infoNeeded: [
        "Адрес и достъп до обекта",
        "Информация за дейността и персонала",
      ],
    },
    en: {
      title: "Fire Risk Assessment",
      short: "Fire risk analysis and recommendations to minimize it.",
      body: "We carry out fire risk assessments for your building and provide concrete recommendations for achieving regulatory compliance.",
      whenNeeded: "Useful when you suspect a specific risk, when the facility's organization changes, or as a basis before preparing a fire safety file.",
      whatIncludes: [
        "Site visit and identification of risk factors",
        "A written risk assessment report",
        "Concrete recommendations for reducing risk",
        "Prioritizing measures by urgency",
      ],
      process: [
        "We schedule a site visit",
        "We identify the risk factors",
        "We prepare the written report",
        "We discuss the recommendations with you",
      ],
      infoNeeded: [
        "Address and access to the site",
        "Information about the activity and staff",
      ],
    },
    faqs: [],
  },
  {
    slug: "podarzhka-i-kontrol",
    pillar: "documentation",
    standard: "Наредба № 8121з-647",
    bg: {
      title: "Годишен абонамент за документация и съответствие",
      short: "Актуализация на досието и следене на нормативните промени — без месечни посещения.",
      body: "Предлагаме годишен абонамент (абонаментно обслужване) за поддържане на пожарното досие в актуално състояние и следене на нормативните промени, засягащи вашия обект. Целта е да сте винаги готови за проверка, без да е нужно постоянно физическо присъствие на обекта — комуникираме основно дистанционно и се включваме на място само при реална нужда.",
      whenNeeded: "Подходящо е за собственици, които искат досието и документацията им да остават актуални във времето, без да наемат щатен специалист или да следят промените в наредбите сами.",
      whatIncludes: [
        "Годишен преглед и актуализация на пожарното досие",
        "Проследяване на нормативни промени, засягащи обекта",
        "Дистанционна консултация при въпроси през годината",
        "Оглед на място само при реална нужда",
      ],
      process: [
        "Сключваме годишен договор",
        "Правим начален преглед на наличната документация",
        "Актуализираме досието при промяна в наредбите или обстоятелствата",
        "Оставаме на разположение за въпроси през годината",
      ],
      infoNeeded: [
        "Текущото пожарно досие, ако съществува",
        "Промени в обекта през годината, при актуализация",
      ],
    },
    en: {
      title: "Annual Compliance & Documentation Retainer",
      short: "Keeping your file up to date and tracking regulatory changes — without monthly site visits.",
      body: "We offer an annual retainer to keep your fire safety file up to date and track regulatory changes affecting your building. The goal is to keep you inspection-ready without requiring constant physical presence on site — we work remotely by default and visit only when genuinely needed.",
      whenNeeded: "Suitable for owners who want their file and documentation to stay current over time, without hiring an in-house specialist or tracking regulatory changes themselves.",
      whatIncludes: [
        "Annual review and update of the fire safety file",
        "Tracking regulatory changes affecting the building",
        "Remote consultation for questions throughout the year",
        "A site visit only when genuinely needed",
      ],
      process: [
        "We sign an annual agreement",
        "We do an initial review of existing documentation",
        "We update the file when regulations or circumstances change",
        "We stay available for questions throughout the year",
      ],
      infoNeeded: [
        "The current fire safety file, if one exists",
        "Changes to the building during the year, for updates",
      ],
    },
    faqs: [],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByPillar(pillar: Pillar) {
  return services.filter((s) => s.pillar === pillar);
}
