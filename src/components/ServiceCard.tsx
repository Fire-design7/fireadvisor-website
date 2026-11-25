import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/content/services";
import type { Locale } from "@/i18n/routing";

export function ServiceCard({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const content = service[locale];

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="reveal card-lift group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      {service.cover && (
        <div className="overflow-hidden">
          <Image
            src={`/services/covers/${locale}-${service.slug}.jpg`}
            alt=""
            width={1200}
            height={630}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[1200/630] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
      {/* Document names such as "Наредба № 8121з-647" keep their case:
          upper-casing turns "з" into a look-alike "З"/"3". */}
      <span
        className={`text-xs font-semibold tracking-wide text-amber-700 ${
          /\d/.test(service.standard) ? "" : "uppercase"
        }`}
      >
        {service.standard}
      </span>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">
        {content.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {content.short}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-amber-700">
        {t("learnMore")}
        <span aria-hidden>&rarr;</span>
      </span>
      </div>
    </Link>
  );
}
