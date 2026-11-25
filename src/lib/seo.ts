import { routing } from "@/i18n/routing";

/**
 * Builds correct per-page hreflang + canonical metadata. `path` must be
 * locale-agnostic and start with "/", e.g. "/uslugi/pozharoizvestyavane" or
 * "" for the homepage.
 */
export function pageAlternates(locale: string, path: string) {
  const bgUrl = path || "/";
  const enUrl = `/en${path}`;
  const canonical = locale === "en" ? enUrl : bgUrl;

  return {
    canonical,
    languages: {
      bg: bgUrl,
      en: enUrl,
      "x-default": bgUrl,
    } satisfies Record<string, string>,
  };
}

export const locales = routing.locales;

/**
 * Per-page Open Graph / Twitter card overrides. Without this, pages inherit
 * the root layout's generic site-wide og:title/og:description regardless of
 * what the page is actually about — which is what was happening before this
 * existed (every service/sector/blog page shared the homepage's OG tags).
 */
export function pageSocial(
  locale: string,
  title: string,
  description: string,
  type: "website" | "article" = "website",
  image?: string
) {
  // A page-level `openGraph` replaces the layout's, file-based image included,
  // so every page states its image: its own cover when it has one, otherwise
  // the generated site card (served at /opengraph-image for the default
  // locale, /en/opengraph-image for English).
  const img = image ?? (locale === "en" ? "/en/opengraph-image" : "/opengraph-image");
  return {
    openGraph: {
      type,
      locale: locale === "en" ? "en_US" : "bg_BG",
      title,
      description,
      images: [{ url: img, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [img],
    },
  };
}

/**
 * Search-result title/description for a page, when they should differ from
 * the on-page heading and lead (which are written for people who already
 * landed). Keyed by the locale-agnostic path; missing entries fall back.
 * Titles stay under ~45 characters because " | Fire Advisor" is appended and
 * Google shows about 60.
 */
const searchMeta: Record<string, Record<string, { title?: string; description?: string }>> = {
  bg: {
    "/za-nas": {
      title: "За нас — инженери по пожарна безопасност",
      description:
        "Fire Advisor е екип по пожарна безопасност от Пловдив, член на КИИП и с разрешение от ГДПБЗН. Проекти, документи и системи за обекти в цяла България.",
    },
    "/uslugi": {
      title: "Услуги по пожарна безопасност",
      description:
        "Схеми за евакуация, пожарно досие, пожароизвестяване, пожарогасене, ВСОДТ, част ПБ и консултации — всички услуги по пожарна безопасност за вашия обект.",
    },
    "/sektori": {
      title: "Пожарна безопасност по вид обект",
      description:
        "Пожарна безопасност за производства, складове, магазини, хотели, здравни заведения и обществени сгради — кои системи и документи са важни за всеки.",
    },
    "/blog": {
      title: "Блог за пожарна безопасност",
      description:
        "Практически статии за пожарна безопасност: схеми за евакуация, пожарно досие, пожароизвестяване, знаци и изисквания по Наредба № 8121з-647.",
    },
    "/kontakti": {
      title: "Контакти — запитване за пожарна безопасност",
    },
    "/politika-za-poveritelnost": {
      description: "Как Fire Advisor събира, използва и пази личните данни, изпратени през сайта и формата за запитване.",
    },
    "/cookies-policy": {
      description: "Кои бисквитки използва сайтът на Fire Advisor, за какво служат и как да промените избора си.",
    },
    "/usloviya-za-polzvane": {
      description: "Условия за ползване на сайта fireadvisor.eu на Fire Advisor (\"Файер Адвайзър\" ЕООД).",
    },
    "/uslugi/chast-pozharna-bezopasnost": {
      title: "Част Пожарна безопасност (ПБ) — изготвяне",
      description:
        "Изготвяне на част „Пожарна безопасност“ към инвестиционен проект по Наредба № Iз-1971 — за разрешение за строеж. Работим в цяла България.",
    },
    "/uslugi/pozharoizvestyavane": {
      title: "Пожароизвестителна система — проект и монтаж",
      description:
        "Проектиране, изграждане и поддръжка на пожароизвестителни системи за складове, хотели, офиси и производства. Член на КИИП, с разрешение от ГДПБЗН.",
    },
    "/uslugi/gasitelni-instalatsii": {
      title: "Пожарогасителни инсталации — проектиране",
      description:
        "Проектиране на автоматични пожарогасителни инсталации — спринклерни, газови и пенни системи по EN 12845, за складове, производства и сгради.",
    },
    "/uslugi/pozharno-dosie": {
      title: "Пожарно досие и вътрешни правила — изготвяне",
      description:
        "Изготвяне на пожарно досие, вътрешни правила, заповеди и инструкции по Наредба № 8121з-647 за магазини, офиси, заведения и складове.",
    },
    "/uslugi/odit-i-pregled": {
      title: "Преглед на обект по пожарна безопасност",
      description:
        "Преглед на обекта и готовност за проверка от пожарната — какво липсва в документите, знаците и системите и какво да се направи навреме.",
    },
    "/uslugi/vsodt": {
      description:
        "Проектиране на ВСОДТ — вентилационни системи за отделяне на дим и топлина по EN 12101, за складове, търговски и обществени сгради.",
    },
    "/uslugi/evakuatsionno-osvetlenie": {
      title: "Евакуационно осветление — проектиране",
      description:
        "Проектиране на евакуационно и аварийно осветление по EN 1838 — осветителни тела и указателни знаци по пътищата за евакуация на вашия обект.",
    },
    "/uslugi/konsultatsii-po-pozharna-bezopasnost": {
      description:
        "Отваряте обект или предстои проверка от пожарната? Помагаме да изясните какви мерки и документи са нужни — досие, схеми, инструкции.",
    },
    "/uslugi/pregled-na-proekti": {
      title: "Преглед на проект по пожарна безопасност",
      description:
        "Независим преглед на проект по пожарна безопасност преди съгласуване или строителство — пропуските се откриват навреме, по Наредба № Iз-1971.",
    },
    "/uslugi/ognezashtita": {
      title: "Огнезащита на метални конструкции",
      description:
        "Избор и доставка на сертифицирани огнезащитни системи за метални и други конструкции, включително огнезащитно боядисване.",
    },
    "/uslugi/pasivna-pozharozashtita": {
      title: "Пасивна пожарозащита — системи до EI 240",
      description:
        "Технически решения и доставка на сертифицирани системи за пасивна пожарозащита на кабелни и тръбни преминавания — до EI 240, по EN 1366.",
    },
    "/uslugi/otsenka-na-risk": {
      title: "Оценка на риска от пожар за обект",
      description:
        "Анализ и оценка на риска от пожар за вашия обект по Наредба № 8121з-647, с конкретни препоръки как да се намали. Изпратете запитване.",
    },
    "/uslugi/podarzhka-i-kontrol": {
      title: "Абонамент по пожарна безопасност за фирми",
      description:
        "Годишен абонамент за актуализация на пожарното досие и следене на нормативните промени — без месечни посещения на обекта.",
    },
    "/sektori/promishlenost-i-proizvodstvo": {
      title: "Пожарна безопасност за производство",
      description:
        "Пожароизвестяване, пожарогасене и огнезащита за производствени халета и заводи — съобразени с технологичния процес. Работим в цяла България.",
    },
    "/sektori/targovski-obekti": {
      title: "Пожарна безопасност за магазини и офиси",
      description:
        "Пожарна безопасност за магазини, молове и офис сгради — известяване, евакуационно осветление и преглед на обекта преди проверка.",
    },
    "/sektori/skladove-i-logistika": {
      title: "Пожарна безопасност за складове",
      description:
        "Пожарогасителни инсталации, ВСОДТ (димоотвеждане) и преглед на складови халета с високо складиране и голям горим товар.",
    },
    "/sektori/hoteli-i-hospitality": {
      title: "Пожарна безопасност за хотели и заведения",
      description:
        "Евакуационно осветление, пожароизвестяване и оценка на риска за хотели, ресторанти и заведения, в които гостите не познават сградата.",
    },
    "/sektori/zdravni-zavedeniya": {
      title: "Пожарна безопасност за болници и клиники",
      description:
        "Пожароизвестяване, пожарогасене и оценка на риска за болници, клиники и медицински центрове с пациенти с ограничена подвижност.",
    },
    "/sektori/obshtestveni-sgradi": {
      title: "Пожарна безопасност за обществени сгради",
      description:
        "Пожарна безопасност за училища, администрация и обществени сгради — евакуационно осветление, пожароизвестяване и преглед преди проверка.",
    },
  },
};

export function searchMetaFor(
  locale: string,
  path: string,
  fallback: { title: string; description: string }
) {
  const entry = searchMeta[locale]?.[path];
  return {
    title: entry?.title ?? fallback.title,
    description: entry?.description ?? fallback.description,
  };
}
