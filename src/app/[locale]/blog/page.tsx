import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/blog";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: pageAlternates(locale, "/blog"),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getAllPosts(locale);

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <Container className="py-16">
        {posts.length === 0 ? (
          <p className="text-slate-500">{t("emptyState")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <time className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {post.date}
                </time>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
