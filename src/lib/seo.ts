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

/**
 * Per-page Open Graph / Twitter card overrides. Without this, pages inherit
 * the root layout's generic site-wide og:title/og:description regardless of
 * what the page is actually about — which is what was happening before this
 * existed (every service/sector/blog page shared the homepage's OG tags).
 */
export function pageSocial(
  locale: string,
  title: string,
  description: string,
  type: "website" | "article" = "website"
) {
  return {
    openGraph: {
      type,
      locale: locale === "en" ? "en_US" : "bg_BG",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
