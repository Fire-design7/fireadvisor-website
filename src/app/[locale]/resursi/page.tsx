import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { resources } from "@/content/resources";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resources");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <Container className="py-16">
        <p className="mb-10 rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          {t("placeholderNotice")}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {resources.map((r) => {
            const content = r[locale];
            return (
              <div
                key={r.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h2 className="text-lg font-semibold text-slate-900">
                  {content.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {content.description}
                </p>
                <a
                  href={r.fileHref}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  {t("downloadCta")}
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
