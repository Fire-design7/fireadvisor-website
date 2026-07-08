import { useLocale, useTranslations } from "next-intl";
import { getServiceBySlug } from "@/content/services";
import type { Locale } from "@/i18n/routing";

const rowSlugs = [
  "pozharno-dosie",
  "odit-i-pregled",
  "evakuatsionni-shemi",
  "podarzhka-i-kontrol",
] as const;

function CheckIcon({ delay }: { delay: number }) {
  return (
    <span
      className="animate-check-pop flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-slate-900" strokeWidth={2.5}>
        <path d="M3 8.5L6.2 11.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function HeroStatusPanel() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");
  const rows = rowSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="relative hidden lg:block">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-transparent to-transparent blur-2xl"
      />
      <div className="animate-float relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            {t("statusPanelTitle")}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
            {t("statusPanelCaption")}
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          {rows.map((service, i) => (
            <div
              key={service.slug}
              className="animate-row-in flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <CheckIcon delay={0.3 + i * 0.12} />
              <span className="text-sm font-medium text-white">
                {service[locale].title}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-slate-400">{t("statusPanelFooter")}</span>
          <span className="text-xs font-semibold text-emerald-400">
            {rows.length}/{rows.length}
          </span>
        </div>
      </div>
    </div>
  );
}
