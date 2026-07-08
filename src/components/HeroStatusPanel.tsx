import { useLocale, useTranslations } from "next-intl";
import { getServiceBySlug } from "@/content/services";
import type { Locale } from "@/i18n/routing";

const rowSlugs = [
  "pozharoizvestyavane",
  "gasitelni-instalatsii",
  "vsodt",
  "evakuatsionno-osvetlenie",
] as const;

function PingDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
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
          {rows.map((service) => (
            <div
              key={service.slug}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3"
            >
              <span className="text-sm font-medium text-white">
                {service[locale].title}
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <PingDot />
                {t("statusActive")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
