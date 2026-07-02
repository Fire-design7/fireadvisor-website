import { routing } from "@/i18n/routing";

/**
 * Builds correct per-page hreflang + canonical metadata. `path` must be
 * locale-agnostic and start with "/", e.g. "/uslugi/pozharoizvestyavane" or
 * "" for the homepage.
 */
export function pageAlternates(locale: string, path: string) {
  const bgUrl = path || "/";
  const enUrl = `/en${path}`;
  const canonical = locale === "en" ? enUrl : bgUrl;

  return {
    canonical,
    languages: {
      bg: bgUrl,
      en: enUrl,
      "x-default": bgUrl,
    } satisfies Record<string, string>,
  };
}

export const locales = routing.locales;
