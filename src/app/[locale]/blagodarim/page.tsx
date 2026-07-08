import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "thankYou" });
  return {
    title: t("title"),
    // This is a post-submission confirmation page, not content worth
    // ranking — and indexing it could let people land here directly
    // without actually submitting the form.
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thankYou");

  return (
    <div className="bg-slate-900 py-24 text-white sm:py-32">
      <Container className="max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
          {t("eyebrow")}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-300">
          {t("text")}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          {t("urgent")}{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-amber-400 hover:text-amber-300">
            {siteConfig.phone}
          </a>
        </p>
        <div className="mt-8">
          <LinkButton href="/">{t("backHome")}</LinkButton>
        </div>
      </Container>
    </div>
  );
}
