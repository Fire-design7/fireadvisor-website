import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { getAllPostSlugs, getPost } from "@/lib/blog";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://fireadvisor.eu";

function localizedPath(path: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

function alternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedPath(path, locale)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/uslugi",
    "/sektori",
    "/za-nas",
    "/resursi",
    "/blog",
    "/proverka-ot-pozharnata",
    "/kontakti",
    "/politika-za-poveritelnost",
    "/cookies-policy",
    "/usloviya-za-polzvane",
  ];

  const servicePaths = services.map((s) => `/uslugi/${s.slug}`);
  const sectorPaths = sectors.map((s) => `/sektori/${s.slug}`);
  const blogPaths = Array.from(
    new Set(
      routing.locales.flatMap((locale) =>
        getAllPostSlugs(locale).map((slug) => `/blog/${slug}`)
      )
    )
  );

  // lastmod is only emitted where it is genuinely known (blog posts carry a
  // publish/update date). A blanket "now" on every URL is not a real modification
  // date and teaches crawlers to ignore the field.
  const lastModifiedByPath = new Map<string, Date>();
  for (const locale of routing.locales) {
    for (const slug of getAllPostSlugs(locale)) {
      const post = getPost(locale, slug);
      if (!post) continue;
      const date = new Date(post.updated ?? post.date);
      const key = `/blog/${slug}`;
      const prev = lastModifiedByPath.get(key);
      if (!prev || date > prev) lastModifiedByPath.set(key, date);
    }
  }

  const allPaths = [...staticPaths, ...servicePaths, ...sectorPaths, ...blogPaths];

  return routing.locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: localizedPath(path, locale),
      lastModified: lastModifiedByPath.get(path),
      alternates: { languages: alternates(path) },
    }))
  );
}
