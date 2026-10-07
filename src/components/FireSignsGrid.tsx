import Image from "next/image";
import { getLocale } from "next-intl/server";

// EN ISO 7010 fire safety symbols (F-series) as listed in the public register
// at the time of writing. The SVGs in /public/blog/iso7010 come from Wikimedia
// Commons, where every F001–F019 file is marked public domain or CC0.
//
// `directive: true` marks the four pictograms that Directive 92/58/EEC itself
// shows in Annex II (hose, ladder, extinguisher, fire telephone).
const signs = [
  { code: "F001", bg: "Пожарогасител", en: "Fire extinguisher", directive: true },
  { code: "F002", bg: "Вътрешен пожарен кран", en: "Fire hose reel", directive: true },
  { code: "F003", bg: "Пожарна стълба", en: "Fire ladder", directive: true },
  { code: "F004", bg: "Комплект противопожарно оборудване", en: "Collection of firefighting equipment" },
  { code: "F005", bg: "Ръчен пожароизвестител", en: "Fire alarm call point" },
  { code: "F006", bg: "Пожарен телефон", en: "Fire emergency telephone", directive: true },
  { code: "F007", bg: "Противопожарна врата", en: "Fire protection door" },
  { code: "F008", bg: "Стационарна пожарогасителна батерия", en: "Fixed fire extinguishing battery" },
  { code: "F009", bg: "Возим пожарогасител", en: "Wheeled fire extinguisher" },
  { code: "F010", bg: "Преносим пенен апликатор", en: "Portable foam applicator unit" },
  { code: "F011", bg: "Апликатор за водна мъгла", en: "Water fog applicator" },
  { code: "F012", bg: "Стационарна пожарогасителна инсталация", en: "Fixed fire extinguishing installation" },
  { code: "F013", bg: "Стационарна пожарогасителна бутилка", en: "Fixed fire extinguishing bottle" },
  { code: "F014", bg: "Пост за дистанционно задействане", en: "Remote release station" },
  { code: "F015", bg: "Лафетен ствол", en: "Fire monitor" },
  { code: "F016", bg: "Противопожарно одеяло", en: "Fire blanket" },
  { code: "F017", bg: "Асансьор за пожарникари", en: "Firefighters' lift" },
  { code: "F018", bg: "Мигаща светлина за пожарна аларма", en: "Fire alarm flashing light" },
  { code: "F019", bg: "Несвързан пожарен шланг", en: "Unconnected fire hose" },
] as const;

export async function FireSignsGrid() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const badge = lang === "en" ? "In the Directive" : "В директивата";

  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {signs.map((s) => (
        <div
          key={s.code}
          className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center"
        >
          <Image
            src={`/blog/iso7010/${s.code}.svg`}
            alt={`${s.code} — ${s[lang]}`}
            width={72}
            height={72}
            unoptimized
            className="h-[72px] w-[72px]"
          />
          <span className="mt-3 text-sm font-bold text-slate-900">{s.code}</span>
          <span className="mt-1 text-xs leading-snug text-slate-600">{s[lang]}</span>
          {"directive" in s && s.directive && (
            <span className="mt-2 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
              {badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
