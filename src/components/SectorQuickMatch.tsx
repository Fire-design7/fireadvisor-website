"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sectors } from "@/content/sectors";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";

const sectorIcons: Record<string, React.ReactNode> = {
  "promishlenost-i-proizvodstvo": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.5 20.5V11l5 3.5V11l5 3.5V11l5 3.5v6h-15z M3.5 20.5h17"
    />
  ),
  "targovski-obekti": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 9.5l1-5h14l1 5M4 9.5a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0M5 9.5V20.5h14V9.5"
    />
  ),
  "skladove-i-logistika": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 20.5V9.5L12 6l7.5 3.5v11h-15zM4.5 9.5L12 13l7.5-3.5M12 13v7.5"
    />
  ),
  "hoteli-i-hospitality": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 20.5V6.5M4 13h16v7.5M4 13V9.5h6V13M10 9.5h4a2 2 0 012 2V13"
    />
  ),
  "zdravni-zavedeniya": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15M4.5 12h15M4 4.5h5.5a1 1 0 011 1V9M20 19.5h-5.5a1 1 0 01-1-1V15"
    />
  ),
  "obshtestveni-sgradi": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 20.5h16M5.5 20.5V9L12 5l6.5 4v11.5M9 20.5v-5h6v5"
    />
  ),
};

export function SectorQuickMatch() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const [selected, setSelected] = useState<string | null>(null);

  const activeSector = sectors.find((s) => s.slug === selected);
  const matchedServices = activeSector
    ? services.filter((sv) =>
        activeSector.relevantServiceSlugs.includes(sv.slug)
      )
    : [];
  const primaryServiceSlug = matchedServices[0]?.slug;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {sectors.map((sector) => {
          const isActive = sector.slug === selected;
          return (
            <button
              key={sector.slug}
              type="button"
              onClick={() => setSelected(sector.slug)}
              aria-pressed={isActive}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors ${
                isActive
                  ? "border-amber-400 bg-amber-50"
                  : "border-slate-200 bg-white hover:border-amber-300"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`h-7 w-7 ${isActive ? "text-amber-700" : "text-slate-500"}`}
                stroke="currentColor"
                strokeWidth={1.6}
                aria-hidden
              >
                {sectorIcons[sector.slug]}
              </svg>
              <span className="text-xs font-semibold text-slate-900 sm:text-sm">
                {sector[locale].title}
              </span>
            </button>
          );
        })}
      </div>

      {activeSector && (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            {activeSector[locale].title}
          </p>
          <p className="mt-2 text-slate-700">{activeSector[locale].short}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {matchedServices.map((sv) => (
              <span
                key={sv.slug}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {sv[locale].title}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={
                primaryServiceSlug
                  ? `/kontakti?service=${primaryServiceSlug}`
                  : "/kontakti"
              }
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
            >
              {tCommon("requestQuote")}
            </Link>
            <Link
              href={`/sektori/${activeSector.slug}`}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              {t("quickMatchMore")} &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
