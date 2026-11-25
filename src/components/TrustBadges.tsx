import { useTranslations } from "next-intl";

const iconPaths = {
  years: (
    <>
      <circle cx="12" cy="12" r="8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
    </>
  ),
  kiip: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5l7 2.5v5.2c0 4.6-3 8.3-7 9.3-4-1-7-4.7-7-9.3V6l7-2.5z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.2l2 2 4-4.2" />
    </>
  ),
  gdpzn: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3.5h7l3 3v14a.5.5 0 01-.5.5h-9.5a.5.5 0 01-.5-.5v-16.5a.5.5 0 01.5-.5z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  standard: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 3.5h8l3 3v14h-11z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6M9 13.5h6M9 17h3.5" />
    </>
  ),
  coverage: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1113 0c0 5.4-6.5 11-6.5 11z"
      />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  projects: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 20.5V6l7-2.5 7 2.5v14.5"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.5h15M9 20.5V15h5v5.5M9 9h.01M13 9h.01M9 12.2h.01M13 12.2h.01" />
    </>
  ),
} as const;

export function TrustBadges() {
  const t = useTranslations("home");
  // Only facts the owner has confirmed. The years/projects badges stay
  // defined (trustYears, trustProjects) but are not shown until confirmed.
  const items: { key: keyof typeof iconPaths; label: string }[] = [
    { key: "kiip", label: t("credKiip") },
    { key: "gdpzn", label: t("credGdpzn") },
    { key: "standard", label: t("credStandard") },
    { key: "coverage", label: t("credCoverage") },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/10"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden
            >
              {iconPaths[item.key]}
            </svg>
          </span>
          <span className="text-sm font-semibold text-white">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
