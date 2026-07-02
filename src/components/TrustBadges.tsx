import { useTranslations } from "next-intl";

const icons = {
  years: "⏱",
  kiip: "🛡",
  gdpzn: "📋",
  projects: "🏢",
} as const;

export function TrustBadges() {
  const t = useTranslations("home");
  const items: { key: keyof typeof icons; label: string }[] = [
    { key: "years", label: t("trustYears") },
    { key: "kiip", label: t("trustKiip") },
    { key: "gdpzn", label: t("trustGdpzn") },
    { key: "projects", label: t("trustProjects") },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.key}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center"
        >
          <div className="text-xl" aria-hidden>
            {icons[item.key]}
          </div>
          <dd className="mt-1 text-sm font-semibold text-slate-900">
            {item.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
