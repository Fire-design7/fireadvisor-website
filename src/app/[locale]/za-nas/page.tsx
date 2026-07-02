import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: pageAlternates(locale, "/za-nas"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const credentials = [
    { title: t("credKiipTitle"), text: t("credKiipText") },
    { title: t("credGdpznTitle"), text: t("credGdpznText") },
    { title: t("credExperienceTitle"), text: t("credExperienceText") },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">{t("introTitle")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {t("introText")}
            </p>

            <div className="mt-10 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-400">
              {t("teamPhotoPlaceholder")}
            </div>

            <h2 className="mt-12 text-xl font-bold text-slate-900">
              {t("philosophyTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {t("philosophyText")}
            </p>
          </div>

          <aside>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("credentialsTitle")}
            </h2>
            <div className="mt-4 space-y-4">
              {credentials.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <h3 className="font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
