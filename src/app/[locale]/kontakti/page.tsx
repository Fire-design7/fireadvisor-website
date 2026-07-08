import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/content/site-config";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: pageAlternates(locale, "/kontakti"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">{t("formTitle")}</h2>
          <div className="mt-6">
            <Suspense fallback={<div className="min-h-[542px]" />}>
              <QuoteForm />
            </Suspense>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("directContactTitle")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="font-semibold text-slate-900 hover:text-amber-700"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-slate-900 hover:text-amber-700"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </aside>
      </Container>
    </>
  );
}
