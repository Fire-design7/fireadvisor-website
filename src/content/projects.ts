export interface Project {
  slug: string;
  sectorSlug: string;
  bg: { title: string; problem: string; solution: string; result: string };
  en: { title: string; problem: string; solution: string; result: string };
}

// PLACEHOLDER PROJECTS — replace with real, named or sector-anonymized case
// studies (e.g. "manufacturing facility in Plovdiv") once available, ideally
// with 1-2 real photos each.
export const projects: Project[] = [
  {
    slug: "proekt-1",
    sectorSlug: "promishlenost-i-proizvodstvo",
    bg: {
      title: "[Заглавие на проект — производствен обект]",
      problem: "[Опишете конкретния проблем — напр. остаряла аналогова пожароизвестителна система, несъответстваща на действащите изисквания]",
      solution: "[Опишете решението — напр. проектиране и монтаж на адресируема система по EN 54]",
      result: "[Опишете резултата — напр. пълно съответствие с нормативната уредба и намален риск]",
    },
    en: {
      title: "[Project title — manufacturing facility]",
      problem: "[Describe the specific problem — e.g. aging analog fire detection panel non-compliant with current code]",
      solution: "[Describe the solution — e.g. design and installation of an EN 54 addressable system]",
      result: "[Describe the outcome — e.g. full regulatory compliance and reduced risk]",
    },
  },
  {
    slug: "proekt-2",
    sectorSlug: "hoteli-i-hospitality",
    bg: {
      title: "[Заглавие на проект — хотел]",
      problem: "[Опишете конкретния проблем]",
      solution: "[Опишете решението]",
      result: "[Опишете резултата]",
    },
    en: {
      title: "[Project title — hotel]",
      problem: "[Describe the problem]",
      solution: "[Describe the solution]",
      result: "[Describe the outcome]",
    },
  },
  {
    slug: "proekt-3",
    sectorSlug: "skladove-i-logistika",
    bg: {
      title: "[Заглавие на проект — складова база]",
      problem: "[Опишете конкретния проблем]",
      solution: "[Опишете решението]",
      result: "[Опишете резултата]",
    },
    en: {
      title: "[Project title — warehouse]",
      problem: "[Describe the problem]",
      solution: "[Describe the solution]",
      result: "[Describe the outcome]",
    },
  },
];
