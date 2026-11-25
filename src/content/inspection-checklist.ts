// What inspectors check under Regulation № 8121з-647. Shared by the
// inspection-prep page and the homepage block, so both say the same.
export const checklist = [
  {
    id: "dosie",
    slug: "pozharno-dosie",
    bg: { title: "Пожарно досие", text: "Пълна, актуална документация по Наредба № 8121з-647 — първото нещо, което се иска при проверка." },
    en: { title: "Fire safety file", text: "Complete, up-to-date documentation under Regulation № 8121з-647 — the first thing an inspection asks for." },
  },
  {
    id: "shemi",
    slug: "evakuatsionni-shemi",
    bg: { title: "Схеми и планове за евакуация", text: "Поставени на видими места, отговарящи на реалната планировка на обекта в момента." },
    en: { title: "Evacuation plans", text: "Displayed in visible locations and matching the building's actual current layout." },
  },
  {
    id: "fizichesko-sastoyanie",
    slug: "odit-i-pregled",
    bg: {
      title: "Физическо състояние на евакуационните пътища",
      text: "Незаключени и свободни изходи, врати с посока на отваряне по посока на евакуация, без стоки и материали, струпани по пътищата и пред изходите.",
    },
    en: {
      title: "Physical condition of escape routes",
      text: "Unlocked, unobstructed exits; doors opening in the direction of evacuation; no goods or materials stacked along routes or in front of exits.",
    },
  },
  {
    id: "izvestyavane",
    slug: "pozharoizvestyavane",
    bg: { title: "Пожароизвестителна система", text: "Изправност и редовни тестове на детектори, централа и известителни устройства." },
    en: { title: "Fire detection system", text: "Working condition and regular testing of detectors, the control panel and notification devices." },
  },
  {
    id: "osvetlenie",
    slug: "evakuatsionno-osvetlenie",
    bg: { title: "Евакуационно осветление", text: "Аварийно осветление и указателни знаци, изправни и на местата им." },
    en: { title: "Evacuation lighting", text: "Emergency lighting and exit signage, functional and correctly positioned." },
  },
  {
    id: "podarzhka",
    slug: "podarzhka-i-kontrol",
    bg: { title: "Протоколи от поддръжка", text: "Документирани периодични прегледи на всички системи — не само, че работят, а че е доказано." },
    en: { title: "Maintenance records", text: "Documented periodic inspections of every system — not just that it works, but that it's on paper." },
  },
  {
    id: "pozharogasiteli",
    slug: "odit-i-pregled",
    bg: { title: "Пожарогасители и пожарни кранове", text: "Наличие, срок на годност и достъп до преносимите средства за пожарогасене." },
    en: { title: "Fire extinguishers and hydrants", text: "Presence, expiry dates and accessibility of portable firefighting equipment." },
  },
] as const;
