import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { serviceImageSrc, type Service } from "@/content/services";
import type { Locale } from "@/i18n/routing";

export function ServiceCard({ service }: { service: Service }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const content = service[locale];

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg hover:shadow-slate-900/5"
    >
      <Image
        src={serviceImageSrc(service.slug)}
        alt=""
        width={1200}
        height={630}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[1200/630] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
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
