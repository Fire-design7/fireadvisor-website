export interface Sector {
  slug: string;
  relevantServiceSlugs: string[];
  bg: { title: string; short: string; body: string };
  en: { title: string; short: string; body: string };
}

export const sectors: Sector[] = [
  {
    slug: "promishlenost-i-proizvodstvo",
    relevantServiceSlugs: ["pozharoizvestyavane", "gasitelni-instalatsii", "ognezashtita"],
    bg: {
      title: "Производство и промишленост",
      short: "Системи за пожарна безопасност за производствени халета и заводи.",
      body: "Производствените обекти често съчетават горими материали, технологично оборудване и постоянно движение на хора — това изисква внимателно проектирани системи за откриване и гасене на пожар, съобразени със спецификата на производствения процес.",
    },
    en: {
      title: "Manufacturing & Industry",
      short: "Fire safety systems for production facilities and factories.",
      body: "Industrial facilities often combine combustible materials, process equipment and constant movement of people — this calls for carefully designed detection and suppression systems tailored to the production process.",
    },
  },
  {
    slug: "targovski-obekti",
    relevantServiceSlugs: ["pozharoizvestyavane", "evakuatsionno-osvetlenie", "odit-i-pregled"],
    bg: {
      title: "Търговски обекти",
      short: "Пожарна безопасност за магазини, молове и офис сгради.",
      body: "При обекти с голям поток от посетители приоритет е бързото известяване и ясно обозначените пътища за евакуация, без да се пренебрегва естетиката на пространството.",
    },
    en: {
      title: "Commercial Properties",
      short: "Fire safety for retail stores, malls and office buildings.",
      body: "In high-footfall venues, rapid detection and clearly marked evacuation routes are the priority — without compromising the aesthetics of the space.",
    },
  },
  {
    slug: "skladove-i-logistika",
    relevantServiceSlugs: ["gasitelni-instalatsii", "vsodt", "odit-i-pregled"],
    bg: {
      title: "Складове и логистика",
      short: "Пожарогасителни и димоотвеждащи системи за складови халета.",
      body: "Складовите обекти с високо складиране и голям горим товар изискват специализирани пожарогасителни решения и системи за отвеждане на дим, съобразени с височината и вида на съхраняваната стока.",
    },
    en: {
      title: "Warehousing & Logistics",
      short: "Suppression and smoke-extraction systems for warehouses.",
      body: "High-storage warehouses with significant fire load require specialized suppression solutions and smoke extraction systems tailored to storage height and the type of goods stored.",
    },
  },
  {
    slug: "hoteli-i-hospitality",
    relevantServiceSlugs: ["evakuatsionno-osvetlenie", "pozharoizvestyavane", "otsenka-na-risk"],
    bg: {
      title: "Хотели и хотелиерство",
      short: "Пожарна безопасност за хотели, ресторанти и заведения.",
      body: "Обектите за настаняване и хранене приемат гости, които не познават сградата — затова ясната евакуационна сигнализация и надеждното известяване са от критично значение.",
    },
    en: {
      title: "Hotels & Hospitality",
      short: "Fire safety for hotels, restaurants and venues.",
      body: "Accommodation and dining venues host guests unfamiliar with the building — making clear evacuation signage and reliable detection critically important.",
    },
  },
  {
    slug: "zdravni-zavedeniya",
    relevantServiceSlugs: ["pozharoizvestyavane", "gasitelni-instalatsii", "otsenka-na-risk"],
    bg: {
      title: "Здравни заведения",
      short: "Системи за пожарна безопасност за болници и медицински центрове.",
      body: "Здравните заведения имат пациенти с ограничена подвижност и непрекъснат работен процес — проектираме системи, които минимизират прекъсванията, но осигуряват максимална защита.",
    },
    en: {
      title: "Healthcare Facilities",
      short: "Fire safety systems for hospitals and medical centers.",
      body: "Healthcare facilities have patients with limited mobility and round-the-clock operations — we design systems that minimize disruption while ensuring maximum protection.",
    },
  },
  {
    slug: "obshtestveni-sgradi",
    relevantServiceSlugs: ["evakuatsionno-osvetlenie", "pozharoizvestyavane", "odit-i-pregled"],
    bg: {
      title: "Обществени сгради",
      short: "Пожарна безопасност за училища, администрация и обществени пространства.",
      body: "Обществените сгради изискват съответствие с редица нормативни изисквания и готовност за редовни проверки — помагаме на собствениците и управителите да поддържат пълно съответствие.",
    },
    en: {
      title: "Public Buildings",
      short: "Fire safety for schools, administrative and public spaces.",
      body: "Public buildings must comply with a range of regulatory requirements and stay ready for regular inspections — we help owners and administrators maintain full compliance.",
    },
  },
];

export function getSectorBySlug(slug: string) {
  return sectors.find((s) => s.slug === slug);
}
