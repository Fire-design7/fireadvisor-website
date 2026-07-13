import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { pageAlternates } from "@/lib/seo";
import { siteConfig } from "@/content/site-config";
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
            <table className="w-full text-sm not-prose mb-8 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-900">Име</th>
                  <th className="text-left p-3 font-semibold text-slate-900">Цел</th>
                  <th className="text-left p-3 font-semibold text-slate-900">Тип / срок</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-mono text-xs">NEXT_LOCALE</td>
                  <td className="p-3">Запомня избрания от вас език (български/английски)</td>
                  <td className="p-3">Строго необходима, сесийна</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">cookie-consent</td>
                  <td className="p-3">Запомня избора ви за/против аналитични бисквитки, за да не ви питаме отново</td>
                  <td className="p-3">Строго необходима, до 12 месеца</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">_ga, _ga_*</td>
                  <td className="p-3">Google Analytics — анонимизирана статистика за посещенията (кои страници, откъде идват посетителите)</td>
                  <td className="p-3">Изисква съгласие, до 24 месеца</td>
                </tr>
              </tbody>
            </table>

            <p>
              <code>NEXT_LOCALE</code> запомня избрания от вас език и се
              поставя само след като сами изберете език чрез превключвателя.{" "}
              <code>cookie-consent</code> запомня само избора ви на банера за
              бисквитки по-долу. И двете са <strong>строго необходими</strong>{" "}
              за работата на функция, която сте заявили изрично, и не
              изискват предварително съгласие.
            </p>

            <p>
              Съхранението на информация в крайното ви устройство (каквато е
              бисквитка) се урежда от чл. 4а от Закона за електронната
              търговия, който транспонира изискванията на Директива
              2002/58/ЕО (ePrivacy директивата) за съгласие при използване на
              бисквитки. Строго необходимите бисквитки по-горе попадат в
              изключението по чл. 4а, ал. 4 от същия закон, чиято единствена
              цел е предоставяне на услуга на информационното общество,
              изрично поискана от потребителя — и не изискват вашето
              предварително съгласие.
            </p>

            <p>
              Сайтът използва <strong>Google Analytics</strong> за анонимизирана
              статистика на посещенията (кои страници се разглеждат, откъде
              идват посетителите), но <strong>само след като изрично
              се съгласите</strong> чрез банера, който се показва при първо
              посещение. Ако не изберете &bdquo;Приемам&ldquo; или изберете
              &bdquo;Само необходими&ldquo;, бисквитките на Google Analytics
              изобщо не се поставят. Можете да промените избора си по всяко
              време, като изчистите бисквитките на браузъра си за този сайт.
            </p>

            <p>
              За въпроси относно тази политика, пишете ни на{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. За
              информация как обработваме личните ви данни вижте нашата{" "}
              <Link href="/politika-za-poveritelnost">
                Политика за поверителност
              </Link>
              .
            </p>
          </>
        ) : (
          <>
            <table className="w-full text-sm not-prose mb-8 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-900">Name</th>
                  <th className="text-left p-3 font-semibold text-slate-900">Purpose</th>
                  <th className="text-left p-3 font-semibold text-slate-900">Type / duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-mono text-xs">NEXT_LOCALE</td>
                  <td className="p-3">Remembers your chosen language (Bulgarian/English)</td>
                  <td className="p-3">Strictly necessary, session-only</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">cookie-consent</td>
                  <td className="p-3">Remembers your choice for/against analytics cookies, so we don't ask again</td>
                  <td className="p-3">Strictly necessary, up to 12 months</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">_ga, _ga_*</td>
                  <td className="p-3">Google Analytics — anonymized visit statistics (which pages, where visitors come from)</td>
                  <td className="p-3">Requires consent, up to 24 months</td>
                </tr>
              </tbody>
            </table>

            <p>
              <code>NEXT_LOCALE</code> remembers your language choice and is
              only set after you actively choose a language via the site's
              switcher. <code>cookie-consent</code> only remembers your
              choice on the cookie banner below. Both are{" "}
              <strong>strictly necessary</strong> for a feature you
              explicitly requested, and don't require prior consent.
            </p>

            <p>
              Storing information on your device (such as a cookie) is
              governed by Article 4a of the Bulgarian Electronic Commerce Act
              (Закон за електронната търговия), which transposes the consent
              requirements of the ePrivacy Directive (2002/58/EC). The
              strictly necessary cookies above fall under the exemption in
              Article 4a(4) of that Act, which covers storage whose sole
              purpose is to provide an information society service
              explicitly requested by the recipient — and don't require your
              prior consent.
            </p>

            <p>
              The site uses <strong>Google Analytics</strong> for anonymized
              visit statistics (which pages are viewed, where visitors come
              from), but <strong>only after you explicitly consent</strong>{" "}
              via the banner shown on your first visit. If you don't select
              &ldquo;Accept&rdquo;, or select &ldquo;Necessary only&rdquo;,
              Google Analytics cookies are never set at all. You can change
              your choice at any time by clearing this site's cookies in
              your browser.
            </p>

            <p>
              For questions about this policy, email us at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              For details on how we handle personal data, see our{" "}
              <Link href="/politika-za-poveritelnost">Privacy Policy</Link>.
            </p>
          </>
        )}
      </Container>
    </>
  );
}
