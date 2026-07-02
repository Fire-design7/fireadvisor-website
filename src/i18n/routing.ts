import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bg", "en"],
  defaultLocale: "bg",
  localePrefix: "as-needed",
  // Bulgarian is the primary market — "/" must always render bg, regardless
  // of the visitor's browser language. Without this, Google (and visitors)
  // could see different content at the same URL depending on Accept-Language,
  // which hurts SEO consistency. Users can still switch language manually.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
