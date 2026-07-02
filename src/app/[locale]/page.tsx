import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { SectorCard } from "@/components/SectorCard";
import { PhaseCard } from "@/components/PhaseCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Faq } from "@/components/Faq";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { WhyUsCard, icons } from "@/components/WhyUsCard";
import { StatCounter } from "@/components/StatCounter";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  const faqItems =
    locale === "bg"
      ? [
          {
            q: "Колко бързо можете да проектирате система за пожарна безопасност?",
            a: "Сроковете зависят от сложността на обекта, но обичайно изготвяме първоначална оферта в рамките на няколко работни дни след оглед.",
          },
          {
            q: "Работите ли извън София?",
            a: "Да, работим по обекти в цялата страна.",
          },
          {
            q: "Предлагате ли абонаментна поддръжка?",
            a: "Да — предлагаме абонаментна поддръжка на всички системи, които изграждаме, включително периодични проверки и водене на пожарно досие.",
          },
        ]
      : [
          {
            q: "How quickly can you design a fire safety system?",
            a: "Timelines depend on the complexity of the building, but we typically provide an initial quote within a few business days after a site visit.",
          },
          {
            q: "Do you work outside the capital?",
            a: "Yes, we work on projects across the whole country.",
          },
          {
            q: "Do you offer subscription maintenance?",
            a: "Yes — we offer subscription maintenance for every system we install, including periodic inspections and fire safety file management.",
          },
        ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: siteConfig.name,
          url: siteConfig.url,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          areaServed: "BG",
          address: { "@type": "PostalAddress", addressCountry: "BG" },
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
        <Container className="relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            {t("heroEyebrow")}
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/kontakti" variant="primary">
              {t("heroCta")}
            </LinkButton>
            <LinkButton href="/uslugi" variant="ghost" className="!border-slate-500 !text-white hover:!bg-white/10">
              {t("heroCtaSecondary")}
            </LinkButton>
          </div>
          <div className="mt-12 max-w-2xl">
            <TrustBadges />
          </div>
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

      {/* Phases */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("phasesTitle")} align="center" />
          <div className="relative mt-12">
            <div
              aria-hidden
              className="absolute top-5 left-[16.5%] right-[16.5%] hidden h-px bg-slate-300 sm:block"
            />
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
              <PhaseCard number="1" title={t("phaseDesignTitle")} text={t("phaseDesignText")} />
              <PhaseCard number="2" title={t("phaseBuildTitle")} text={t("phaseBuildText")} />
              <PhaseCard number="3" title={t("phaseMaintainTitle")} text={t("phaseMaintainText")} />
            </div>
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
            <SectionHeading title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
            <Link
              href="/uslugi"
              className="text-sm font-semibold text-slate-900 hover:text-amber-600"
            >
              {tCommon("viewAllServices")} &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
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
              className="text-sm font-semibold text-slate-900 hover:text-amber-600"
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
          <div className="mt-10 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-6 text-center text-sm font-medium text-amber-800">
            {t("testimonialsPlaceholder")}
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
