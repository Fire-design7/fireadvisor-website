import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { projects } from "@/content/projects";
import { getSectorBySlug } from "@/content/sectors";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <Container className="py-16">
        <p className="mb-10 rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          {t("placeholderNotice")}
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((p) => {
            const content = p[locale];
            const sector = getSectorBySlug(p.sectorSlug);
            return (
              <article
                key={p.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                {sector && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                    {sector[locale].title}
                  </span>
                )}
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  {content.title}
                </h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-slate-900">
                      {t("problemLabel")}
                    </dt>
                    <dd className="text-slate-600">{content.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">
                      {t("solutionLabel")}
                    </dt>
                    <dd className="text-slate-600">{content.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">
                      {t("resultLabel")}
                    </dt>
                    <dd className="text-slate-600">{content.result}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </Container>
    </>
  );
}
