import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Sector } from "@/content/sectors";
import type { Locale } from "@/i18n/routing";

export function SectorCard({ sector }: { sector: Sector }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const content = sector[locale];

  return (
    <Link
      href={`/sektori/${sector.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg hover:shadow-slate-900/5"
    >
      <h3 className="text-lg font-semibold text-slate-900">{content.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {content.short}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-amber-700">
        {t("learnMore")}
        <span aria-hidden>&rarr;</span>
      </span>
    </Link>
  );
}
