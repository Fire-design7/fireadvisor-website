export interface Resource {
  slug: string;
  fileHref: string; // placeholder path — add real PDF to /public/resources and update
  bg: { title: string; description: string };
  en: { title: string; description: string };
}

// PLACEHOLDER RESOURCES — add real PDFs under /public/resources/ and update
// fileHref once available.
export const resources: Resource[] = [
  {
    slug: "chek-list-pozharen-risk",
    fileHref: "#",
    bg: {
      title: "Чек-лист за пожарен риск",
      description: "Кратък списък за самопроверка на основните пожарни рискове във вашия обект.",
    },
    en: {
      title: "Fire Risk Checklist",
      description: "A short self-assessment checklist for the main fire risks in your building.",
    },
  },
  {
    slug: "gayd-normativni-iziskvaniya",
    fileHref: "#",
    bg: {
      title: "Гайд за нормативни изисквания",
      description: "Обзор на основните нормативни изисквания за пожарна безопасност на търговски обекти.",
    },
    en: {
      title: "Regulatory Requirements Guide",
      description: "An overview of the core fire safety regulatory requirements for commercial buildings.",
    },
  },
];
