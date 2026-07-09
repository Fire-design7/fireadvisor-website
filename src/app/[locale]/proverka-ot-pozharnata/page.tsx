import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { LinkButton } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { pageAlternates, pageSocial } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

const PATH = "/proverka-ot-pozharnata";

const checklist = [
  {
    slug: "pozharno-dosie",
    bg: { title: "Пожарно досие", text: "Пълна, актуална документация по Наредба № 8121з-647 — първото нещо, което се иска при проверка." },
    en: { title: "Fire safety file", text: "Complete, up-to-date documentation under Regulation № 8121з-647 — the first thing an inspection asks for." },
  },
  {
    slug: "evakuatsionni-shemi",
    bg: { title: "Схеми за евакуация", text: "Поставени на видими места, отговарящи на реалната планировка на обекта в момента." },
    en: { title: "Evacuation plans", text: "Displayed in visible locations and matching the building's actual current layout." },
  },
  {
    slug: "pozharoizvestyavane",
    bg: { title: "Пожароизвестителна система", text: "Изправност и редовни тестове на детектори, централа и известителни устройства." },
    en: { title: "Fire detection system", text: "Working condition and regular testing of detectors, the control panel and notification devices." },
  },
  {
    slug: "evakuatsionno-osvetlenie",
    bg: { title: "Евакуационно осветление", text: "Аварийно осветление и указателни знаци, изправни и на местата им." },
    en: { title: "Evacuation lighting", text: "Emergency lighting and exit signage, functional and correctly positioned." },
  },
  {
    slug: "podarzhka-i-kontrol",
    bg: { title: "Протоколи от поддръжка", text: "Документирани периодични прегледи на всички системи — не само, че работят, а че е доказано." },
    en: { title: "Maintenance records", text: "Documented periodic inspections of every system — not just that it works, but that it's on paper." },
  },
  {
    slug: "odit-i-pregled",
    bg: { title: "Пожарогасители и пожарни кранове", text: "Наличие, срок на годност и достъп до преносимите средства за пожарогасене." },
    en: { title: "Fire extinguishers and hydrants", text: "Presence, expiry dates and accessibility of portable firefighting equipment." },
  },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBg = locale === "bg";
  const title = isBg
    ? "Предстои ви проверка от пожарната? Списък какво проверяват"
    : "Fire inspection coming up? Here's what gets checked";
  const description = isBg
    ? "Какво реално проверяват контролните органи по Наредба № 8121з-647 и как да сте готови навреме — пожарно досие, схеми за евакуация, известяване, осветление и поддръжка."
    : "What inspectors actually check under Regulation № 8121з-647, and how to be ready in time — fire safety file, evacuation plans, detection, lighting and maintenance.";
  return {
    title,
    description,
    alternates: pageAlternates(locale, PATH),
    ...pageSocial(locale, title, description),
  };
}

export default async function InspectionPrepPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBg = locale === "bg";
  const tCommon = await getTranslations("common");

  const faqs = isBg
    ? [
        {
          q: "Колко предупреждение обикновено имаме преди проверка?",
          a: "Варира — понякога има известие предварително, но проверки могат да се извършат и без предизвестие. Затова досието и системите трябва да са в изправност постоянно, не само преди насрочена дата.",
        },
        {
          q: "Какво се случва, ако нещо не е наред при проверката?",
          a: "Обичайно се дава срок за отстраняване на констатираните нередности, но при по-сериозни пропуски е възможна и санкция. Най-честите проблеми, които виждаме, са остаряло досие и неработещо евакуационно осветление.",
        },
        {
          q: "Можете ли да направите пълна проверка преди насрочена инспекция?",
          a: "Да — това е точно нашата услуга „Одити и проверки“. Идваме на място, преглеждаме всички точки от списъка по-горе и ви даваме конкретен план какво да се оправи, преди да дойде проверката.",
        },
      ]
    : [
        {
          q: "How much notice do we usually get before an inspection?",
          a: "It varies — sometimes there's advance notice, but inspections can also happen unannounced. That's why the file and systems need to be in order continuously, not just ahead of a scheduled date.",
        },
        {
          q: "What happens if something isn't in order during the inspection?",
          a: "Usually a deadline is given to fix the issues found, but more serious gaps can lead to a penalty. The most common problems we see are an outdated file and non-functioning evacuation lighting.",
        },
        {
          q: "Can you do a full check before a scheduled inspection?",
          a: "Yes — that's exactly our \"Audits & Inspections\" service. We come on site, go through every point on the list above, and give you a concrete plan of what to fix before the inspection arrives.",
        },
      ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <PageHero
        title={
          isBg
            ? "Предстои ви проверка от пожарната?"
            : "Fire inspection coming up?"
        }
        subtitle={
          isBg
            ? "Ето какво реално проверяват контролните органи по Наредба № 8121з-647 — и как да сте готови, преди да са дошли."
            : "Here's what the authorities actually check under Regulation № 8121з-647 — and how to be ready before they arrive."
        }
      >
        <div className="mt-8">
          <LinkButton href="/kontakti?service=odit-i-pregled" className="!bg-amber-500">
            {isBg ? "Поискайте предварителна проверка" : "Request a pre-inspection check"}
          </LinkButton>
        </div>
      </PageHero>

      <Container className="max-w-3xl py-16">
        <p className="text-lg leading-relaxed text-slate-700">
          {isBg
            ? "Нямате нужда от изненади. Ако очаквате проверка — насрочена или не — ето по какви точки най-често се спъват собствениците, и кой от нашите услуги отговаря на всяка от тях."
            : "You don't need surprises. Whether an inspection is scheduled or not, here's where owners most often trip up — and which of our services addresses each point."}
        </p>

        <div className="mt-10 space-y-4">
          {checklist.map((item) => (
            <Link
              key={item.slug}
              href={`/uslugi/${item.slug}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-amber-300 hover:bg-amber-50"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white"
              >
                ✓
              </span>
              <span>
                <span className="block font-semibold text-slate-900">
                  {isBg ? item.bg.title : item.en.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                  {isBg ? item.bg.text : item.en.text}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-900">
            {isBg ? "Често задавани въпроси" : "Frequently Asked Questions"}
          </h2>
          <div className="mt-6">
            <Faq items={faqs} />
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-900 p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            {isBg
              ? "Искате да сте сигурни преди да дойде проверката?"
              : "Want to be sure before the inspection arrives?"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {isBg
              ? "Идваме на място, преглеждаме всичко от списъка и ви даваме ясен план за действие."
              : "We visit on site, review everything on the list, and give you a clear action plan."}
          </p>
          <div className="mt-6">
            <LinkButton href="/kontakti?service=odit-i-pregled">
              {isBg ? "Поискайте предварителна проверка" : "Request a pre-inspection check"}
            </LinkButton>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          {tCommon("callNow")}:{" "}
          <a href="tel:+359893339296" className="font-semibold text-slate-900 hover:text-amber-700">
            +359 89 333 9296
          </a>
        </p>
      </Container>
    </>
  );
}
