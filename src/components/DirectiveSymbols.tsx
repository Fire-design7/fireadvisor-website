import Image from "next/image";
import { getLocale } from "next-intl/server";

// The fire-fighting pictograms shown in Annex II of Directive 92/58/EEC next to
// their EN ISO 7010 equivalents. The directive drawings are the EUR-Lex
// originals as published on Wikimedia Commons ("© European Union,
// eur-lex.europa.eu"); reuse requires that acknowledgement, hence the credit
// line under the grid.
const pairs = [
  {
    directive: "/blog/iso7010/dir-fire-hose.svg",
    iso: "/blog/iso7010/F002.svg",
    code: "F002",
    bg: "Вътрешен пожарен кран",
    en: "Fire hose reel",
  },
  {
    directive: "/blog/iso7010/dir-ladder.svg",
    iso: "/blog/iso7010/F003.svg",
    code: "F003",
    bg: "Пожарна стълба",
    en: "Fire ladder",
  },
  {
    directive: "/blog/iso7010/dir-fire-extinguisher.svg",
    iso: "/blog/iso7010/F001.svg",
    code: "F001",
    bg: "Пожарогасител",
    en: "Fire extinguisher",
  },
  {
    directive: "/blog/iso7010/dir-fire-telephone.svg",
    iso: "/blog/iso7010/F006.svg",
    code: "F006",
    bg: "Пожарен телефон",
    en: "Fire emergency telephone",
  },
] as const;

export async function DirectiveSymbols() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const t =
    lang === "en"
      ? {
          directive: "Directive 92/58/EEC",
          iso: "EN ISO 7010",
          arrow: "“This way” arrow",
          arrowNote: "Only in the Directive — not in EN ISO 7010",
          credit: "Directive symbols: © European Union.",
        }
      : {
          directive: "Директива 92/58/ЕИО",
          iso: "EN ISO 7010",
          arrow: "Стрелка „насам“",
          arrowNote: "Само в директивата — няма в EN ISO 7010",
          credit: "Символите от директивата: © Европейски съюз.",
        };

  return (
    <div className="not-prose my-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {pairs.map((p) => (
          <div
            key={p.code}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-center">
                <Image
                  src={p.directive}
                  alt={`${t.directive} — ${p[lang]}`}
                  width={72}
                  height={72}
                  unoptimized
                  className="h-[72px] w-[72px]"
                />
                <span className="mt-1 text-[11px] font-semibold text-slate-500">{t.directive}</span>
              </div>
              <span aria-hidden className="text-xl text-slate-400">→</span>
              <div className="flex flex-col items-center">
                <Image
                  src={p.iso}
                  alt={`${t.iso} ${p.code} — ${p[lang]}`}
                  width={72}
                  height={72}
                  unoptimized
                  className="h-[72px] w-[72px]"
                />
                <span className="mt-1 text-[11px] font-semibold text-slate-500">
                  {t.iso} · {p.code}
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-slate-900">{p[lang]}</p>
          </div>
        ))}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/blog/iso7010/dir-arrow-right.svg"
              alt={`${t.directive} — ${t.arrow}`}
              width={72}
              height={72}
              unoptimized
              className="h-[72px] w-[72px]"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">{t.arrow}</p>
              <p className="text-xs text-slate-600">{t.arrowNote}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">{t.credit}</p>
    </div>
  );
}
