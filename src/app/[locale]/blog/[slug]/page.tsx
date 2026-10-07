import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { BlogFigure } from "@/components/BlogFigure";
import { FireSignsGrid } from "@/components/FireSignsGrid";
import { LiftSymbols } from "@/components/LiftSymbols";
import { DirectiveSymbols } from "@/components/DirectiveSymbols";
import { EscapeRouteSigns, ArrowMistake } from "@/components/EscapeRouteSigns";
import { SafetyColours } from "@/components/SafetyColours";
import { LuminaireMap, CorridorLux, LightingTimeline, LightingTasks } from "@/components/LightingDiagrams";
import { BlogCard } from "@/components/BlogCard";
import { Link } from "@/i18n/navigation";
import { getAllPostSlugs, getPost, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/content/site-config";
import { pageSocial } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

function blogPath(locale: string, slug: string) {
  return locale === "en" ? `/en/blog/${slug}` : `/blog/${slug}`;
}

function formatDate(value: string, locale: Locale) {
  return new Date(value).toLocaleDateString(locale === "bg" ? "bg-BG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};

  // Blog post slugs are written independently per language (content is
  // adapted, not translated 1:1 — see README), so the cross-language hreflang
  // pair is only declared when a post with the same slug really exists in the
  // other language. Otherwise only a self-referencing canonical is emitted.
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    if (getPost(l, slug)) languages[l] = blogPath(l, slug);
  }
  const canonical = blogPath(locale, slug);
  const alternates =
    Object.keys(languages).length > 1
      ? { canonical, languages: { ...languages, "x-default": languages[routing.defaultLocale] } }
      : { canonical };

  const social = pageSocial(locale, post.title, post.description, "article");
  const images = post.image ? [{ url: post.image, alt: post.imageAlt ?? post.title }] : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates,
    openGraph: {
      ...social.openGraph,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteConfig.name],
      tags: post.tags,
      images,
    },
    twitter: { ...social.twitter, images: post.image ? [post.image] : undefined },
  };
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
  const related = getRelatedPosts(locale, slug, post.tags);
  const base = locale === "en" ? `${siteConfig.url}/en` : siteConfig.url;
  const url = `${base}/blog/${slug}`;
  const modified = post.updated ?? post.date;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: modified,
          inLanguage: locale,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo-icon-dark.png` },
          },
          image: post.image ? `${siteConfig.url}${post.image}` : undefined,
          keywords: post.tags.join(", "),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: base },
            { "@type": "ListItem", position: 2, name: t("title"), item: `${base}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
      {post.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}

      <PageHero title={post.title} subtitle={post.description} />
      <Container className="py-16">
        <Link
          href="/blog"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          &larr; {t("backToBlog")}
        </Link>

        <p className="mt-6 max-w-3xl text-sm text-slate-500">
          {t("byline", { author: siteConfig.name })} ·{" "}
          {t("published")} <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          {post.updated && post.updated !== post.date && (
            <>
              {" "}· {t("updated")}{" "}
              <time dateTime={post.updated}>{formatDate(post.updated, locale)}</time>
            </>
          )}
        </p>

        <article className="prose prose-slate mt-4 max-w-3xl">
          <MDXRemote source={post.content} components={{ BlogFigure, FireSignsGrid, LiftSymbols, SafetyColours, DirectiveSymbols, EscapeRouteSigns, ArrowMistake, LuminaireMap, CorridorLux, LightingTimeline, LightingTasks }} />
        </article>

        {post.faq.length > 0 && (
          <section className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{t("faqTitle")}</h2>
            <div className="mt-6">
              <Faq items={post.faq} />
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900">{t("relatedTitle")}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} headingLevel="h3" />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}

export const dynamicParams = false;
