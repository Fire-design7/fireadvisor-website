import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { servicesByPillar } from "@/content/services";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("hubTitle"),
    description: t("hubSubtitle"),
    alternates: pageAlternates(locale, "/uslugi"),
  };
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const pillars = [
    { key: "design" as const, title: t("pillarDesign") },
    { key: "consulting" as const, title: t("pillarConsulting") },
    { key: "review" as const, title: t("pillarReview") },
    { key: "evacuation" as const, title: t("pillarEvacuation") },
    { key: "documentation" as const, title: t("pillarDocumentation") },
  ];

  return (
    <>
      <PageHero title={t("hubTitle")} subtitle={t("hubSubtitle")} />
      <Container className="space-y-16 py-16">
        {pillars.map((pillar) => {
          const items = servicesByPillar(pillar.key);
          if (items.length === 0) return null;
          return (
            <div key={pillar.key}>
              <h2 className="text-xl font-bold text-slate-900">{pillar.title}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
}
