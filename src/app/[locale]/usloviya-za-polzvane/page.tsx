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
    title: t("terms"),
    alternates: pageAlternates(locale, "/usloviya-za-polzvane"),
  };
}

export default async function TermsOfUsePage({
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
      <PageHero title={t("terms")} />
      <Container className="prose prose-slate max-w-3xl py-16">
        {isBg ? (
          <>
            <h2>1. Собственик на сайта</h2>
            <p>
              Сайтът fireadvisor.eu се управлява от {siteConfig.legalName}, ЕИК{" "}
              {siteConfig.eik}, {siteConfig.address}.
            </p>

            <h2>2. Предмет</h2>
            <p>
              Сайтът предоставя информация за дейността и услугите на
              компанията в областта на пожарната безопасност — проектиране,
              изграждане и поддръжка на системи за пожароизвестяване, гасене,
              евакуация, огнезащита и свързани консултантски услуги.
            </p>

            <h2>3. Информационен характер на съдържанието</h2>
            <p>
              Съдържанието на сайта има общ информационен характер. То не
              представлява индивидуално инженерно становище, проектантско
              решение или окончателна преценка за съответствието на
              конкретен обект с приложимите изисквания за пожарна
              безопасност. Конкретни технически решения се изготвят само
              след анализ на реалната документация, чертежи, предназначение
              и характеристики на съответния обект. Не следва да предприемате
              технически, строителни или инвестиционни действия единствено
              въз основа на общата информация в сайта — свържете се с нас за
              конкретна консултация.
            </p>

            <h2>4. Запитвания и оферти</h2>
            <p>
              Изпращането на запитване през сайта, по имейл или по телефон не
              създава автоматично договорни отношения. Такива възникват само
              след изрично потвърждение, приемане на оферта или подписване на
              договор между страните.
            </p>

            <h2>5. Авторски права</h2>
            <p>
              Текстовете, изображенията, графиките и структурата на сайта са
              защитени от авторско право. Не се допуска копиране,
              разпространение или използване за търговски цели без
              предварително писмено съгласие.
            </p>

            <h2>6. Ограничение на отговорността</h2>
            <p>
              Полагаме усилия информацията на сайта да бъде точна и
              актуална, но не гарантираме, че тя е приложима към всеки
              конкретен случай. Не носим отговорност за вреди, произтичащи от
              действия, предприети единствено въз основа на общата
              информация на сайта, без конкретна професионална консултация.
            </p>

            <h2>7. Външни връзки</h2>
            <p>
              Сайтът може да съдържа връзки към външни уебсайтове. Не носим
              отговорност за тяхното съдържание или политики за
              поверителност.
            </p>

            <h2>8. Приложимо право</h2>
            <p>
              За всички въпроси, свързани с използването на сайта, се прилага
              българското право.
            </p>

            <h2>9. Контакт</h2>
            <p>
              За въпроси относно тези условия пишете ни на{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              Вижте също нашата{" "}
              <Link href="/politika-za-poveritelnost">
                Политика за поверителност
              </Link>
              .
            </p>
          </>
        ) : (
          <>
            <h2>1. Site Owner</h2>
            <p>
              fireadvisor.eu is operated by {siteConfig.legalName},
              registration number (ЕИК) {siteConfig.eik}, {siteConfig.address}.
            </p>

            <h2>2. Scope</h2>
            <p>
              This site provides information about the company&apos;s
              activities and services in fire safety — design, installation
              and maintenance of fire detection, suppression, evacuation, and
              fireproofing systems, and related consulting services.
            </p>

            <h2>3. Informational Nature of the Content</h2>
            <p>
              The content on this site is general and informational. It does
              not constitute an individual engineering opinion, design
              solution, or a final determination of a specific building&apos;s
              compliance with applicable fire safety requirements. Specific
              technical solutions are prepared only after reviewing the
              actual documentation, drawings, purpose, and characteristics of
              the building in question. Do not take technical, construction,
              or investment action based solely on the general information on
              this site — contact us for a specific consultation.
            </p>

            <h2>4. Inquiries and Quotes</h2>
            <p>
              Submitting an inquiry through the site, by email, or by phone
              does not automatically create a contractual relationship. Such
              a relationship arises only after explicit confirmation,
              acceptance of a quote, or a signed agreement between the
              parties.
            </p>

            <h2>5. Copyright</h2>
            <p>
              The text, images, graphics, and structure of this site are
              protected by copyright. Copying, distribution, or commercial
              use without prior written consent is not permitted.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              We make an effort to keep the information on this site accurate
              and up to date, but we do not guarantee that it applies to
              every specific case. We are not liable for damages resulting
              from actions taken solely on the basis of the general
              information on this site, without a specific professional
              consultation.
            </p>

            <h2>7. External Links</h2>
            <p>
              This site may contain links to external websites. We are not
              responsible for their content or privacy practices.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              Bulgarian law applies to all matters related to the use of this
              site.
            </p>

            <h2>9. Contact</h2>
            <p>
              For questions about these terms, email us at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              See also our{" "}
              <Link href="/politika-za-poveritelnost">Privacy Policy</Link>.
            </p>
          </>
        )}
      </Container>
    </>
  );
}
