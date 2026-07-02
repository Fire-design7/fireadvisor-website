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
  const t = await getTranslations({ locale, namespace: "footer" });
  return {
    title: t("cookies"),
    alternates: pageAlternates(locale, "/cookies-policy"),
  };
}

export default async function CookiesPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("footer");

  const isBg = locale === "bg";

  return (
    <>
      <PageHero title={t("cookies")} />
      <Container className="prose prose-slate max-w-3xl py-16">
        {isBg ? (
          <>
            <p>
              [ПОДЛЕЖИ НА ЗАМЯНА] Този сайт използва бисквитки за осигуряване на
              основната функционалност и за анализ на трафика. Продължавайки да
              използвате сайта, вие се съгласявате с използването на бисквитки.
            </p>
            <p>
              За въпроси относно тази политика, свържете се с нас на посочения
              в страница &quot;Контакти&quot; имейл адрес.
            </p>
          </>
        ) : (
          <>
            <p>
              [PLACEHOLDER] This site uses cookies to provide core
              functionality and to analyze traffic. By continuing to use the
              site, you agree to the use of cookies.
            </p>
            <p>
              For questions about this policy, contact us at the email
              address listed on the Contact page.
            </p>
          </>
        )}
      </Container>
    </>
  );
}
