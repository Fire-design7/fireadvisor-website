import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { BlogFigure } from "@/components/BlogFigure";
import { Link } from "@/i18n/navigation";
import { services, getServiceBySlug } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { pageAlternates, pageSocial } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

// Section anchor → inquiry-form refinement, so "request design" on the fire
// alarm page arrives at the form with that option already ticked.
const sectionScope: Record<string, string> = {
  proektirane: "design",
  izgrazhdane: "installation",
  poddrazhka: "maintenance",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const content = service[locale];
  return {
    title: content.title,
    // The visible lead text, so search snippets match the page.
    description: content.short,
    alternates: pageAlternates(locale, `/uslugi/${slug}`),
    ...pageSocial(locale, content.title, content.short),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const content = service[locale];
  const faqs = service.faqs.map((f) => f[locale]);
  const base = locale === "en" ? `${siteConfig.url}/en` : siteConfig.url;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: locale === "bg" ? "Начало" : "Home", item: base },
            { "@type": "ListItem", position: 2, name: t("hubTitle"), item: `${base}/uslugi` },
            { "@type": "ListItem", position: 3, name: content.title, item: `${base}/uslugi/${service.slug}` },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: content.title,
          description: content.body,
          url: `${base}/uslugi/${service.slug}`,
          areaServed: "BG",
          provider: {
            "@type": "ProfessionalService",
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.phone,
          },
          ...(content.sections
            ? {
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: content.title,
                  itemListElement: content.sections.map((section) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: section.title,
                      description: section.body,
                      url: `${base}/uslugi/${service.slug}#${section.id}`,
                    },
                  })),
                },
              }
            : {}),
        }}
      />
      {faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}

      <PageHero title={content.title} subtitle={content.short} />

      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Link
            href="/uslugi"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            &larr; {tCommon("backToServices")}
          </Link>

          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            {content.body}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
            {tCommon("applicableStandard")}: {service.standard}
          </div>

          {service.image && (
            <BlogFigure
              src={service.image.src}
              alt={service.image[locale].alt}
              width={service.image.width}
              height={service.image.height}
              caption={service.image[locale].caption}
              fullSizeLabel={locale === "en" ? "Open full size" : "Отвори в пълен размер"}
            />
          )}

          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">
              {content.situations ? t("forWhomTitle") : t("whenNeededTitle")}
            </h2>
            {content.situations && (
              <ul className="mt-3 space-y-2">
                {content.situations.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                    <span aria-hidden className="mt-0.5 text-amber-600">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-base leading-relaxed text-slate-700">{content.whenNeeded}</p>
          </div>

          {content.sections && (
            <div className="mt-10 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">{t("whatIncludesTitle")}</h2>
              <nav aria-label={t("whatIncludesTitle")} className="flex flex-wrap gap-2">
                {content.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-amber-300 hover:bg-amber-50"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              {content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="text-base font-bold text-slate-900">{section.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{section.body}</p>
                  <ul className="mt-3 space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                        <span aria-hidden className="mt-0.5 text-amber-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {sectionScope[section.id] && (
                    <Link
                      href={`/kontakti?service=${service.slug}&scope=${sectionScope[section.id]}`}
                      className="mt-4 inline-flex text-sm font-semibold text-slate-900 hover:text-amber-700"
                    >
                      {t("sectionCta", { section: section.title.toLowerCase() })} &rarr;
                    </Link>
                  )}
                </section>
              ))}
            </div>
          )}

          <div className={`mt-10 grid gap-10 ${content.sections ? "" : "sm:grid-cols-2"}`}>
            {!content.sections && (
              <div>
                <h2 className="text-lg font-bold text-slate-900">{t("whatIncludesTitle")}</h2>
                <ul className="mt-3 space-y-2">
                  {content.whatIncludes.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                      <span aria-hidden className="mt-0.5 text-amber-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t("infoNeededTitle")}</h2>
              <ul className="mt-3 space-y-2">
                {content.infoNeeded.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                    <span aria-hidden className="mt-0.5 text-amber-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900">{t("processTitle")}</h2>
            <ol className="mt-4 space-y-4">
              {content.process.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-amber-400">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-relaxed text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">{t("faqTitle")}</h2>
              <div className="mt-6">
                <Faq items={faqs} />
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 h-fit">
          <h3 className="text-lg font-semibold text-slate-900">{t("ctaTitle")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{t("ctaText")}</p>
          <LinkButton
            href={`/kontakti?service=${service.slug}`}
            className="mt-6 w-full"
          >
            {tCommon("sendInquiry")}
          </LinkButton>
          <a
            href={siteConfig.phoneHref}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            {tCommon("call")}: {siteConfig.phone}
          </a>
        </aside>
      </Container>
    </>
  );
}

export const dynamicParams = false;
