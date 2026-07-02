import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { siteConfig } from "@/content/site-config";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-900 text-slate-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-slate-900">
              FA
            </span>
            <span className="text-lg tracking-tight">{siteConfig.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {t("footer.tagline")}
          </p>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-amber-400 hover:text-amber-300"
          >
            LinkedIn
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {t("footer.servicesTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/uslugi/${s.slug}`}
                  className="text-slate-400 hover:text-white"
                >
                  {s[locale].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {t("footer.companyTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/za-nas" className="text-slate-400 hover:text-white">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href="/proekti" className="text-slate-400 hover:text-white">
                {t("nav.projects")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-slate-400 hover:text-white">
                {t("nav.blog")}
              </Link>
            </li>
            <li>
              <Link href="/kontakti" className="text-slate-400 hover:text-white">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {t("footer.contactTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-800">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-400 sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
          </span>
          <Link href="/cookies-policy" className="hover:text-white">
            {t("footer.cookies")}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
