import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { servicesByPhase } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("hubTitle"), description: t("hubSubtitle") };
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const phases = [
    { key: "design" as const, title: t("phaseDesign") },
    { key: "build" as const, title: t("phaseBuild") },
    { key: "maintain" as const, title: t("phaseMaintain") },
  ];

  return (
    <>
      <PageHero title={t("hubTitle")} subtitle={t("hubSubtitle")} />
      <Container className="space-y-16 py-16">
        {phases.map((phase) => {
          const items = servicesByPhase(phase.key);
          if (items.length === 0) return null;
          return (
            <div key={phase.key}>
              <h2 className="text-xl font-bold text-slate-900">{phase.title}</h2>
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
