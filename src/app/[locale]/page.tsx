import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { SectorCard } from "@/components/SectorCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Faq } from "@/components/Faq";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { WhyUsCard, icons } from "@/components/WhyUsCard";
import { StatCounter } from "@/components/StatCounter";
import { SectorQuickMatch } from "@/components/SectorQuickMatch";
import { TestimonialCard } from "@/components/TestimonialCard";
import { HeroStatusPanel } from "@/components/HeroStatusPanel";
import { Link } from "@/i18n/navigation";
import { services, getMainServices, getOtherServices } from "@/content/services";
import { sectors } from "@/content/sectors";
import { testimonials } from "@/content/testimonials";
import { siteConfig } from "@/content/site-config";
import { checklist } from "@/content/inspection-checklist";
import type { Locale } from "@/i18n/routing";

const commonNeeds = [
  { href: "/uslugi/konsultatsii-po-pozharna-bezopasnost", labelKey: "commonNeedNewSite", textKey: "commonNeedNewSiteText" },
  { href: "/uslugi/evakuatsionni-shemi", labelKey: "commonNeedShemi", textKey: "commonNeedShemiText" },
  { href: "/uslugi/pozharno-dosie", labelKey: "commonNeedDosie", textKey: "commonNeedDosieText" },
  { href: "/uslugi/pozharoizvestyavane#poddrazhka", labelKey: "commonNeedPodarzhka", textKey: "commonNeedPodarzhkaText" },
  { href: "/uslugi/vsodt", labelKey: "commonNeedVsodt", textKey: "commonNeedVsodtText" },
  { href: "/proverka-ot-pozharnata#test", labelKey: "commonNeedProverka", textKey: "commonNeedProverkaText" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  const mainServices = getMainServices();
  const otherServices = getOtherServices();

  // The same array feeds the visible FAQ and the FAQPage structured data.
  const faqItems =
    locale === "bg"
      ? [
          {
            q: "Отварям нов обект. Какво ми трябва за пожарна безопасност?",
            a: "Зависи от вида на обекта и дейността. Опишете ни обекта във формата за запитване или ни се обадете — ще ви помогнем да изясните необходимите мерки и документи, например пожарно досие, вътрешни правила и схеми за евакуация.",
          },
          {
            q: "Не знам коя услуга ми трябва. Какво да избера?",
            a: "Изберете „Не знам какво ми трябва“ във формата за запитване и опишете накратко обекта. Ще се свържем с вас и ще уточним от какво имате нужда.",
          },
          {
            q: "Работите ли само в Пловдив?",
            a: "Базирани сме в Пловдив, но работим по обекти в цялата страна.",
          },
          {
            q: "Предлагате ли годишен абонамент за поддържане на документацията?",
            a: "Да — предлагаме годишен абонамент за актуализация на пожарното досие и следене на нормативните промени, без да е нужно постоянно физическо присъствие на обекта.",
          },
        ]
      : [
          {
            q: "I'm opening a new facility. What do I need for fire safety?",
            a: "It depends on the type of facility and the activity. Describe it in the inquiry form or give us a call — we'll help you clarify the measures and documents required, for example a fire safety file, internal rules and evacuation plans.",
          },
          {
            q: "I don't know which service I need. What should I choose?",
            a: "Choose \"I don't know what I need\" in the inquiry form and briefly describe the facility. We'll get back to you and clarify what you need.",
          },
          {
            q: "Do you only work in Plovdiv?",
            a: "We're based in Plovdiv, but we work on projects across the whole country.",
          },
          {
            q: "Do you offer an annual documentation retainer?",
            a: "Yes — we offer an annual retainer to keep your fire safety file up to date and track regulatory changes, without requiring constant physical presence on site.",
          },
        ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${siteConfig.url}/#business`,
          name: siteConfig.name,
          url: siteConfig.url,
          image: `${siteConfig.url}/opengraph-image`,
          logo: `${siteConfig.url}/logo-icon-dark.png`,
          parentOrganization: { "@id": `${siteConfig.url}/#organization` },
          telephone: siteConfig.phone,
          email: siteConfig.email,
          areaServed: { "@type": "Country", name: "Bulgaria" },
          knowsAbout: [
            "пожарна безопасност",
            "схеми за евакуация",
            "пожарно досие",
            "пожароизвестителни системи",
            "пожарогасителни инсталации",
            "ВСОДТ",
            "евакуационно осветление",
            "Наредба № 8121з-647",
            "Наредба № Iз-1971",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Пловдив",
            addressCountry: "BG",
          },
          sameAs: [siteConfig.linkedin],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: t("mainServicesTitle"),
            itemListElement: mainServices.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s[locale].title,
                url: `${locale === "en" ? `${siteConfig.url}/en` : siteConfig.url}/uslugi/${s.slug}`,
              },
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-20 text-white sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-16 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Container className="relative lg:grid lg:grid-cols-[1fr_360px] lg:items-center lg:gap-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              {t("heroEyebrow")}
            </span>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              {t("heroSubtitle")}
            </p>
            <p className="mt-5 max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-base leading-relaxed text-amber-100">
              {t("heroNewSite")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/kontakti" variant="primary">
                {t("heroCta")}
              </LinkButton>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 5.5c0-.6.4-1 1-1h2.4c.5 0 .9.3 1 .8l.8 3a1 1 0 01-.3 1L8 10.7a11 11 0 005.3 5.3l1.4-1.4a1 1 0 011-.3l3 .8c.5.1.8.5.8 1v2.4c0 .6-.4 1-1 1C10.5 19.5 4.5 13.5 4.5 5.5z"
                  />
                </svg>
                {t("heroCall")}
                <span className="font-normal text-slate-300">{siteConfig.phone}</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-300">{t("heroFreeCall")}</p>
            <div className="mt-10 max-w-2xl">
              <TrustBadges />
            </div>
          </div>

          <HeroStatusPanel />
        </Container>

        <svg
          aria-hidden
          className="absolute -bottom-px left-0 w-full text-[var(--background)]"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0 60L60 51.7C120 43 240 27 360 24.5C480 22 600 33 720 38.5C840 44 960 44 1080 38.2C1200 32 1320 22 1380 16.7L1440 11V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
          />
        </svg>
      </section>

      {/* Five main directions — first thing after the hero, same order as the footer and the form */}
      <section className="bg-white pt-16 pb-4">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title={t("mainServicesTitle")} subtitle={t("mainServicesSubtitle")} />
            <Link
              href="/uslugi"
              className="text-sm font-semibold text-slate-900 hover:text-amber-700"
            >
              {tCommon("viewAllServices")} &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* "Sound familiar?" — situations the visitor recognises themselves in,
          phrased the way people describe them, each leading to its service. */}
      <section className="bg-white py-14">
        <Container>
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("commonNeedsTitle")}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commonNeeds.map((need) => (
              <Link
                key={need.href}
                href={need.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-amber-300 hover:bg-amber-50"
              >
                <span className="font-semibold text-slate-900">{t(need.labelKey)}</span>
                <span className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
                  {t(need.textKey)}
                </span>
                <span className="mt-4 text-sm font-semibold text-amber-700 group-hover:text-amber-800">
                  {t("commonNeedsCta")} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* What inspectors check — the numbered list from the inspection-prep
          page, ending in the readiness test. The highest-intent entry point. */}
      <section className="bg-white pb-16">
        <Container>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              {t("inspectionListEyebrow")}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {t("inspectionListTitle")}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">
              {t("inspectionListSubtitle")}
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {checklist.map((item, i) => (
                <li key={item.id}>
                  <Link
                    href={`/uslugi/${item.slug}`}
                    className="flex h-full gap-4 rounded-2xl border border-amber-100 bg-white p-4 transition-colors hover:border-amber-300"
                  >
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-900"
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-slate-900">{item[locale].title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                        {item[locale].text}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <LinkButton href="/proverka-ot-pozharnata#test">{t("inspectionBannerCta")}</LinkButton>
              <p className="text-sm leading-relaxed text-slate-700 sm:flex-1">
                {t("inspectionBannerText")}{" "}
                <Link href="/proverka-ot-pozharnata" className="font-semibold text-amber-800 hover:text-amber-900">
                  {t("inspectionListMore")} &rarr;
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How we work — three steps, each with what the client gets. */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("howTitle")} subtitle={t("howSubtitle")} align="center" />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {([1, 2, 3] as const).map((n) => (
              <li key={n} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                  {locale === "bg" ? `Стъпка ${n}` : `Step ${n}`}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{t(`how${n}Title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t(`how${n}Text`)}</p>
                <p className="mt-5 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t("howGetLabel")}
                  </span>
                  {t(`how${n}Get`)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Three ways to work together, then the free first call for anyone
          who cannot tell which one fits. No prices: none are confirmed. */}
      <section className="bg-white py-20">
        <Container>
          <SectionHeading title={t("waysTitle")} subtitle={t("waysSubtitle")} align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(
              [
                { n: 1, href: "/uslugi" },
                { n: 2, href: "/uslugi/podarzhka-i-kontrol" },
                { n: 3, href: "/uslugi/konsultatsii-po-pozharna-bezopasnost" },
              ] as const
            ).map(({ n, href }) => (
              <div key={n} className="flex flex-col rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900">{t(`way${n}Title`)}</h3>
                <p className="mt-1 text-sm font-medium text-amber-700">{t(`way${n}For`)}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-700">
                  {([1, 2, 3] as const).map((i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="text-amber-600">✓</span>
                      {t(`way${n}Item${i}`)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className="mt-6 text-sm font-semibold text-slate-900 hover:text-amber-700"
                >
                  {t(`way${n}Cta`)} &rarr;
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl bg-slate-900 p-8 text-center text-white sm:flex-row sm:text-left">
            <div className="flex-1">
              <h3 className="text-lg font-bold">{t("freeCallTitle")}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{t("freeCallText")}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
              >
                {t("heroCall")} {siteConfig.phone}
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {tCommon("whatsapp")}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick match */}
      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            title={t("quickMatchTitle")}
            subtitle={t("quickMatchSubtitle")}
            align="center"
          />
          <div className="mt-10">
            <SectorQuickMatch />
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("whyUsTitle")} subtitle={t("whyUsSubtitle")} align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <WhyUsCard
              icon={icons.shield}
              title={t("whyUsLicensedTitle")}
              text={t("whyUsLicensedText")}
            />
            <WhyUsCard
              icon={icons.map}
              title={t("whyUsCoverageTitle")}
              text={t("whyUsCoverageText")}
            />
            <WhyUsCard
              icon={icons.link}
              title={t("whyUsFullServiceTitle")}
              text={t("whyUsFullServiceText")}
            />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-16">
        <Container className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <StatCounter value={8} suffix="+" label={t("statYearsLabel")} />
          <StatCounter value={services.length} label={t("statServicesLabel")} />
          <StatCounter value={sectors.length} label={t("statSectorsLabel")} />
        </Container>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title={t("otherServicesTitle")} subtitle={t("otherServicesSubtitle")} />
            <Link
              href="/uslugi"
              className="text-sm font-semibold text-slate-900 hover:text-amber-700"
            >
              {tCommon("viewAllServices")} &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* Sectors */}
      <section className="py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title={t("sectorsTitle")} subtitle={t("sectorsSubtitle")} />
            <Link
              href="/sektori"
              className="text-sm font-semibold text-slate-900 hover:text-amber-700"
            >
              {tCommon("viewAllSectors")} &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.slice(0, 6).map((s) => (
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <Container>
          <SectionHeading title={t("testimonialsTitle")} align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title={t("faqTitle")} align="center" />
          <div className="mt-10">
            <Faq items={faqItems} />
          </div>
        </Container>
      </section>

      {/* CTA band */}
      <section className="bg-slate-900 py-16 text-white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("ctaBandTitle")}</h2>
          <p className="max-w-xl text-slate-300">{t("ctaBandSubtitle")}</p>
          <LinkButton href="/kontakti">{t("heroCta")}</LinkButton>
        </Container>
      </section>
    </>
  );
}
