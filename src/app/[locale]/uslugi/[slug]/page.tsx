import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { services, getServiceBySlug } from "@/content/services";
import { pageAlternates, pageSocial } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const content = service[locale];
  return {
    title: content.title,
    description: content.short,
    alternates: pageAlternates(locale, `/uslugi/${slug}`),
    ...pageSocial(locale, content.title, content.short),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const content = service[locale];
  const faqs = service.faqs.map((f) => f[locale]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: content.title,
          description: content.body,
          areaServed: "BG",
          provider: { "@type": "ProfessionalService", name: "Fire Advisor" },
        }}
      />
      {faqs.length > 0 && (
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
      )}

      <PageHero title={content.title} subtitle={content.short} />

      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Link
            href="/uslugi"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            &larr; {tCommon("backToServices")}
          </Link>

          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            {content.body}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
            {tCommon("applicableStandard")}: {service.standard}
          </div>

          {faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">{t("faqTitle")}</h2>
              <div className="mt-6">
                <Faq items={faqs} />
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 h-fit">
          <h3 className="text-lg font-semibold text-slate-900">{t("ctaTitle")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{t("ctaText")}</p>
          <LinkButton
            href={`/kontakti?service=${service.slug}`}
            className="mt-6 w-full"
          >
            {tCommon("requestQuote")}
          </LinkButton>
        </aside>
      </Container>
    </>
  );
}

export const dynamicParams = false;
