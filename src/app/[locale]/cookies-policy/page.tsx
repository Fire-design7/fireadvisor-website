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
              </tbody>
            </table>

            <p>
              Към момента този сайт използва <strong>само една бисквитка</strong> —
              <code>NEXT_LOCALE</code> — която запомня избрания от вас език при
              превключване между български и английски. Тя не проследява
              поведението ви, не идентифицира вас лично и не се използва за
              реклама или анализ. Поставя се само след като вие сами изберете
              език чрез превключвателя в сайта.
            </p>

            <p>
              Съхранението на информация в крайното ви устройство (каквато е
              бисквитка) се урежда от чл. 4а от Закона за електронната
              търговия, който транспонира изискванията на Директива
              2002/58/ЕО (ePrivacy директивата) за съгласие при използване на
              бисквитки. Тъй като <code>NEXT_LOCALE</code> е{" "}
              <strong>строго необходима</strong> за работата на функция,
              която сте заявили изрично (промяна на езика), тя попада в
              изключението по чл. 4а, ал. 4 от същия закон за бисквитки,
              чиято единствена цел е осъществяване на пренос на съобщение по
              електронна съобщителна мрежа или предоставяне на услуга на
              информационното общество, изрично поискана от потребителя — и
              не изисква вашето предварително съгласие.
            </p>

            <p>
              Сайтът не използва бисквитки за анализ на трафика (напр. Google
              Analytics), реклама или проследяване между сайтове. Ако това се
              промени в бъдеще (например при добавяне на инструменти за
              анализ), тази страница ще бъде актуализирана и ще добавим банер
              за съгласие, където е необходимо.
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
              </tbody>
            </table>

            <p>
              This site currently uses <strong>only one cookie</strong> —{" "}
              <code>NEXT_LOCALE</code> — which remembers your language choice
              when switching between Bulgarian and English. It does not track
              your behavior, does not identify you personally, and is not
              used for advertising or analytics. It is only set after you
              actively choose a language via the site&apos;s switcher.
            </p>

            <p>
              Storing information on your device (such as a cookie) is
              governed by Article 4a of the Bulgarian Electronic Commerce Act
              (Закон за електронната търговия), which transposes the consent
              requirements of the ePrivacy Directive (2002/58/EC). Because{" "}
              <code>NEXT_LOCALE</code> is <strong>strictly necessary</strong>{" "}
              for a feature you explicitly requested (changing the
              language), it falls under the exemption in Article 4a(4) of
              that Act, which covers storage or access whose sole purpose is
              to carry out the transmission of a message over an electronic
              communications network, or to provide an information society
              service explicitly requested by the recipient — and does not
              require your prior consent.
            </p>

            <p>
              The site does not use cookies for traffic analysis (e.g. Google
              Analytics), advertising, or cross-site tracking. If this
              changes in the future (for example, if analytics tools are
              added), this page will be updated and a consent banner will be
              added where required.
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
