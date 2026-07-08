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
    title: t("privacy"),
    alternates: pageAlternates(locale, "/politika-za-poveritelnost"),
  };
}

export default async function PrivacyPolicyPage({
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
      <PageHero title={t("privacy")} />
      <Container className="prose prose-slate max-w-3xl py-16">
        <p className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm not-prose">
          {isBg
            ? "[ПОДЛЕЖИ НА ПРАВЕН ПРЕГЛЕД] Този текст е изготвен като разумна отправна точка въз основа на реално обработваните на сайта данни, но не замества преглед от юрист. Остава да се потвърди точният срок на съхранение (т. 6) — той зависи от решение на управителя, не от правна норма."
            : "[PENDING LEGAL REVIEW] This text is a reasonable starting point based on the data this site actually processes, but it does not replace review by a lawyer. Still to confirm: the exact retention period (section 6) — this is a business decision, not a legal citation."}
        </p>

        {isBg ? (
          <>
            <h2>1. Администратор на лични данни</h2>
            <p>
              {siteConfig.legalName} (&bdquo;ние&ldquo;, &bdquo;нас&ldquo;), с адрес на управление гр.
              Пловдив, България, ЕИК {siteConfig.eik}, е администратор на личните
              данни, които обработва чрез сайта fireadvisor.eu.
            </p>

            <h2>2. Какви данни събираме</h2>
            <p>
              Когато попълните формата за запитване на страница &bdquo;Контакти&ldquo;,
              събираме доброволно предоставените от вас: име, имейл адрес, телефон
              (незадължително), тип запитване, тип обект и съдържанието на съобщението
              ви. Не събираме данни за плащания и не изискваме регистрация в сайта.
            </p>

            <h2>3. За какви цели използваме данните</h2>
            <p>
              Използваме предоставените данни единствено за да отговорим на
              запитването ви, да подготвим оферта или консултация, и при нужда да се
              свържем с вас по телефон или имейл във връзка с проекта ви.
            </p>

            <h2>4. Правно основание</h2>
            <p>
              Обработваме данните ви на основание чл. 6, ал. 1, буква &bdquo;б&ldquo; от
              Общия регламент за защита на данните (GDPR) — предприемане на стъпки по
              ваше искане преди сключване на договор, както и на основание легитимен
              интерес да отговорим на отправено запитване.
            </p>

            <h2>5. С кого споделяме данните</h2>
            <p>
              Данните от формата се съхраняват в база данни, предоставяна от Supabase,
              и се изпращат като имейл известие чрез доставчика Resend. И двамата
              доставчици действат като обработващи данните от наше име, съгласно
              сключени с тях условия за обработка на данни. Не продаваме и не
              споделяме данните ви с трети страни за маркетингови цели.
            </p>

            <h2>6. Срок на съхранение</h2>
            <p>
              Съхраняваме данните от запитването толкова дълго, колкото е необходимо
              за обработка на вашата заявка и последваща комуникация, но не по-дълго
              от [срок — попълнете, напр. 2 години от последния контакт], освен ако
              между нас възникне договорно отношение, за което важат отделни срокове
              по счетоводното законодателство.
            </p>

            <h2>7. Вашите права</h2>
            <p>Съгласно GDPR имате право на:</p>
            <ul>
              <li>достъп до личните ви данни;</li>
              <li>коригиране на неточни данни;</li>
              <li>изтриване на данните (&bdquo;право да бъдеш забравен&ldquo;);</li>
              <li>ограничаване на обработването;</li>
              <li>преносимост на данните;</li>
              <li>възражение срещу обработването;</li>
              <li>подаване на жалба до Комисията за защита на личните данни (КЗЛД).</li>
            </ul>
            <p>
              За да упражните тези права, пишете ни на{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>8. Бисквитки</h2>
            <p>
              Информация за бисквитките, които сайтът използва, ще намерите в нашите{" "}
              <Link href="/cookies-policy">Условия за ползване на бисквитки</Link>.
            </p>

            <h2>9. Автоматизирано вземане на решения</h2>
            <p>
              Не извършваме автоматизирано вземане на решения или профилиране въз
              основа на предоставените от вас данни.
            </p>

            <h2>10. Промени в тази политика</h2>
            <p>
              Можем да актуализираме тази политика периодично. Последната версия
              винаги е достъпна на тази страница.
            </p>
          </>
        ) : (
          <>
            <h2>1. Data Controller</h2>
            <p>
              {siteConfig.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;), registered in
              Plovdiv, Bulgaria, company registration number (ЕИК) {siteConfig.eik}, is the
              controller of the personal data processed through fireadvisor.eu.
            </p>

            <h2>2. What Data We Collect</h2>
            <p>
              When you submit the inquiry form on the Contact page, we collect the
              information you voluntarily provide: name, email address, phone number
              (optional), inquiry type, building type, and the content of your
              message. We do not collect payment data or require account
              registration.
            </p>

            <h2>3. Purpose of Processing</h2>
            <p>
              We use the data solely to respond to your inquiry, prepare a quote or
              consultation, and contact you by phone or email regarding your project
              if needed.
            </p>

            <h2>4. Legal Basis</h2>
            <p>
              We process your data under Article 6(1)(b) GDPR — taking steps at your
              request prior to entering into a contract — and under our legitimate
              interest in responding to inquiries submitted to us.
            </p>

            <h2>5. Who We Share Data With</h2>
            <p>
              Form submissions are stored in a database provided by Supabase and sent
              as an email notification via Resend. Both providers act as data
              processors on our behalf under data processing terms. We do not sell or
              share your data with third parties for marketing purposes.
            </p>

            <h2>6. Retention Period</h2>
            <p>
              We retain inquiry data for as long as necessary to process your request
              and any follow-up communication, but no longer than [retention period —
              to be defined, e.g. 2 years from last contact], unless a contractual
              relationship arises between us, in which case separate statutory
              retention periods apply.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul>
              <li>access your personal data;</li>
              <li>correct inaccurate data;</li>
              <li>request erasure (&ldquo;right to be forgotten&rdquo;);</li>
              <li>restrict processing;</li>
              <li>data portability;</li>
              <li>object to processing;</li>
              <li>
                lodge a complaint with the Bulgarian Commission for Personal Data
                Protection (CPDP).
              </li>
            </ul>
            <p>
              To exercise these rights, email us at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Information about the cookies this site uses is available in our{" "}
              <Link href="/cookies-policy">Cookie Policy</Link>.
            </p>

            <h2>9. Automated Decision-Making</h2>
            <p>
              We do not carry out automated decision-making or profiling based on the
              data you provide.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The latest version is
              always available on this page.
            </p>
          </>
        )}
      </Container>
    </>
  );
}
