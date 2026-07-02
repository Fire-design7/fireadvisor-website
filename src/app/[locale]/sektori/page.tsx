import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectorCard } from "@/components/SectorCard";
import { sectors } from "@/content/sectors";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectors" });
  return { title: t("hubTitle"), description: t("hubSubtitle") };
}

export default async function SectorsHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sectors");

  return (
    <>
      <PageHero title={t("hubTitle")} subtitle={t("hubSubtitle")} />
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <SectorCard key={s.slug} sector={s} />
          ))}
        </div>
      </Container>
    </>
  );
}
