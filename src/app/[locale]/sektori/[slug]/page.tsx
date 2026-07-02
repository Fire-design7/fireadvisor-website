import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { LinkButton } from "@/components/Button";
import { Link } from "@/i18n/navigation";
import { sectors, getSectorBySlug } from "@/content/sectors";
import { services } from "@/content/services";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return {};
  const content = sector[locale];
  return {
    title: content.title,
    description: content.short,
    alternates: pageAlternates(locale, `/sektori/${slug}`),
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const t = await getTranslations("sectors");
  const tCommon = await getTranslations("common");
  const content = sector[locale];
  const relevantServices = services.filter((s) =>
    sector.relevantServiceSlugs.includes(s.slug)
  );

  return (
    <>
      <PageHero title={content.title} subtitle={content.short} />
      <Container className="py-16">
        <Link
          href="/sektori"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          &larr; {tCommon("viewAllSectors")}
        </Link>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
          {content.body}
        </p>

        {relevantServices.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900">
              {t("relevantServices")}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relevantServices.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <LinkButton href="/kontakti">{tCommon("requestQuote")}</LinkButton>
        </div>
      </Container>
    </>
  );
}

export const dynamicParams = false;
