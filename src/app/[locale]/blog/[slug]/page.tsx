import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { getAllPostSlugs, getPost } from "@/lib/blog";
import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("blog");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
        }}
      />
      <PageHero title={post.title} subtitle={post.description} />
      <Container className="py-16">
        <Link
          href="/blog"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          &larr; {t("backToBlog")}
        </Link>
        <article className="prose prose-slate mt-6 max-w-3xl">
          <MDXRemote source={post.content} />
        </article>
      </Container>
    </>
  );
}

export const dynamicParams = false;
