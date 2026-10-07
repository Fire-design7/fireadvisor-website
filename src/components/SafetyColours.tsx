import { getLocale } from "next-intl/server";

// Safety colours and what they mean. The RAL values are the commonly used
// reference shades for the ISO 3864 safety colours; the swatches on the page
// are only an illustration, not a colour-accurate reproduction.
const colours = [
  {
    ral: "RAL 3001",
    swatch: "#A52019",
    bg: { name: "Червен", meaning: "противопожарно оборудване и забрани" },
    en: { name: "Red", meaning: "fire-fighting equipment and prohibitions" },
  },
  {
    ral: "RAL 6032",
    swatch: "#237F52",
    bg: { name: "Зелен", meaning: "безопасни условия, евакуация и първа помощ" },
    en: { name: "Green", meaning: "safe conditions, evacuation and first aid" },
  },
  {
    ral: "RAL 1003",
    swatch: "#F9A800",
    bg: { name: "Жълт", meaning: "предупреждения" },
    en: { name: "Yellow", meaning: "warnings" },
  },
  {
    ral: "RAL 5005",
    swatch: "#154889",
    bg: { name: "Син", meaning: "задължителни действия" },
    en: { name: "Blue", meaning: "mandatory actions" },
  },
] as const;

export async function SafetyColours() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";

  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      {colours.map((c) => (
        <div
          key={c.ral}
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
        >
          <span
            aria-hidden
            className="h-12 w-12 shrink-0 rounded-lg border border-slate-200"
            style={{ backgroundColor: c.swatch }}
          />
          <div>
            <span className="block text-sm font-bold text-slate-900">
              {c[lang].name} <span className="font-normal text-slate-500">· {c.ral}</span>
            </span>
            <span className="block text-sm text-slate-600">{c[lang].meaning}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
