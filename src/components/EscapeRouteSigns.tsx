import Image from "next/image";
import { getLocale } from "next-intl/server";

// The eight escape-route signs (EN ISO 7010 exit symbol + ISO 3864-3 arrow) and
// what each means as seen from in front of the sign, following ISO 16069.
// SVGs are from Wikimedia Commons ("ISO Exit - …", CC0).
const signs = [
  {
    file: "exit-up",
    bg: {
      name: "Нагоре (напред)",
      meanings: [
        "Продължете напред оттук.",
        "Продължете напред и през вратата — когато знакът е над врата.",
        "Продължете напред и нагоре — смяна на нивото.",
      ],
    },
    en: {
      name: "Up (straight on)",
      meanings: [
        "Proceed forward from here.",
        "Proceed forward and through — when the sign is above a door.",
        "Proceed forward and up — change of level.",
      ],
    },
  },
  {
    file: "exit-up-right",
    bg: {
      name: "Нагоре надясно",
      meanings: [
        "Качвайте се нагоре надясно — смяна на нивото.",
        "Продължете напред и надясно оттук — когато сте в открито пространство.",
      ],
    },
    en: {
      name: "Up to the right",
      meanings: [
        "Proceed up to the right — change of level.",
        "Proceed forward and across to the right — when in an open area.",
      ],
    },
  },
  {
    file: "exit-right",
    bg: { name: "Надясно", meanings: ["Продължете надясно оттук."] },
    en: { name: "To the right", meanings: ["Proceed to the right from here."] },
  },
  {
    file: "exit-down-right",
    bg: {
      name: "Надолу надясно",
      meanings: ["Слизайте надолу надясно — смяна на нивото."],
    },
    en: {
      name: "Down to the right",
      meanings: ["Proceed down to the right — change of level."],
    },
  },
  {
    file: "exit-down",
    bg: {
      name: "Надолу",
      meanings: ["Слизайте надолу — смяна на нивото (не „напред“)."],
    },
    en: {
      name: "Down",
      meanings: ["Proceed down — change of level (not “straight on”)."],
    },
  },
  {
    file: "exit-down-left",
    bg: {
      name: "Надолу наляво",
      meanings: ["Слизайте надолу наляво — смяна на нивото."],
    },
    en: {
      name: "Down to the left",
      meanings: ["Proceed down to the left — change of level."],
    },
  },
  {
    file: "exit-left",
    bg: { name: "Наляво", meanings: ["Продължете наляво оттук."] },
    en: { name: "To the left", meanings: ["Proceed to the left from here."] },
  },
  {
    file: "exit-up-left",
    bg: {
      name: "Нагоре наляво",
      meanings: [
        "Качвайте се нагоре наляво — смяна на нивото.",
        "Продължете напред и наляво оттук — когато сте в открито пространство.",
      ],
    },
    en: {
      name: "Up to the left",
      meanings: [
        "Proceed up to the left — change of level.",
        "Proceed forward and across to the left — when in an open area.",
      ],
    },
  },
] as const;

export async function EscapeRouteSigns() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";

  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      {signs.map((s) => (
        <div
          key={s.file}
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
        >
          <Image
            src={`/blog/iso16069/${s.file}.svg`}
            alt={`${s[lang].name}`}
            width={150}
            height={78}
            unoptimized
            className="h-auto w-[120px] shrink-0 sm:w-[130px]"
          />
          <div>
            <p className="text-sm font-bold text-slate-900">{s[lang].name}</p>
            <ul className="mt-1 space-y-1 text-sm leading-snug text-slate-600">
              {s[lang].meanings.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// "Right vs wrong" pair for the most common mounting mistake: the down arrow
// above an exit door instead of the up arrow.
export async function ArrowMistake() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const t =
    lang === "en"
      ? {
          okTitle: "Correct",
          okText: "Above the door: up arrow — “go through the door”.",
          badTitle: "Wrong",
          badText: "Down arrow above the door — it means “go down”, not “go through”.",
        }
      : {
          okTitle: "Правилно",
          okText: "Над вратата: стрелка нагоре — „минете през вратата“.",
          badTitle: "Грешно",
          badText: "Стрелка надолу над вратата — значи „слизайте“, не „минете през нея“.",
        };

  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border-2 border-emerald-300 bg-white p-4 text-center">
        <Image
          src="/blog/iso16069/exit-up.svg"
          alt={t.okTitle}
          width={150}
          height={78}
          unoptimized
          className="mx-auto h-auto w-[150px]"
        />
        <p className="mt-3 text-sm font-bold text-emerald-700">✓ {t.okTitle}</p>
        <p className="mt-1 text-sm text-slate-600">{t.okText}</p>
      </div>
      <div className="rounded-xl border-2 border-red-300 bg-white p-4 text-center">
        <Image
          src="/blog/iso16069/exit-down.svg"
          alt={t.badTitle}
          width={150}
          height={78}
          unoptimized
          className="mx-auto h-auto w-[150px]"
        />
        <p className="mt-3 text-sm font-bold text-red-700">✗ {t.badTitle}</p>
        <p className="mt-1 text-sm text-slate-600">{t.badText}</p>
      </div>
    </div>
  );
}
