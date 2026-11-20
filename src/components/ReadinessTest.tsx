"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { QuoteForm } from "./QuoteForm";
import type { Locale } from "@/i18n/routing";

type Answer = "yes" | "no" | "unsure";
type Gtag = (...args: unknown[]) => void;

// Self-check against the points an inspection under Regulation № 8121з-647
// typically covers. Questions only ask about the visitor's own facility —
// no deadlines, fines or legal periods are stated, so nothing here is a
// normative claim. Every gap links to the service that covers it.
const questions: {
  id: string;
  href: string;
  bg: { q: string; gap: string };
  en: { q: string; gap: string };
}[] = [
  {
    id: "dosie",
    href: "/uslugi/pozharno-dosie",
    bg: {
      q: "Имате ли пожарно досие на обекта, актуализирано след последните промени (персонал, дейност, преустройство)?",
      gap: "Пожарно досие",
    },
    en: {
      q: "Do you have a fire safety file for the facility, updated after the latest changes (staff, activity, refurbishment)?",
      gap: "Fire safety file",
    },
  },
  {
    id: "zapovedi",
    href: "/uslugi/pozharno-dosie",
    bg: {
      q: "Има ли заповеди за пожарна безопасност и определени отговорни лица?",
      gap: "Заповеди и отговорни лица",
    },
    en: {
      q: "Are there fire safety orders in place, with responsible persons appointed?",
      gap: "Orders and responsible persons",
    },
  },
  {
    id: "instruktazh",
    href: "/uslugi/pozharno-dosie",
    bg: {
      q: "Провеждан ли е инструктаж на персонала по пожарна безопасност и записан ли е?",
      gap: "Инструктаж на персонала",
    },
    en: {
      q: "Has staff fire safety training been carried out and recorded?",
      gap: "Staff training",
    },
  },
  {
    id: "shemi",
    href: "/uslugi/evakuatsionni-shemi",
    bg: {
      q: "Поставени ли са схеми за евакуация, които отговарят на сегашното разположение на обекта?",
      gap: "Схеми за евакуация",
    },
    en: {
      q: "Are evacuation plans displayed, matching the facility's current layout?",
      gap: "Evacuation plans",
    },
  },
  {
    id: "patishta",
    href: "/uslugi/odit-i-pregled",
    bg: {
      q: "Свободни ли са евакуационните пътища и изходи, и отключват ли се вратите лесно?",
      gap: "Евакуационни пътища и изходи",
    },
    en: {
      q: "Are escape routes and exits clear, and do the doors unlock easily?",
      gap: "Escape routes and exits",
    },
  },
  {
    id: "pozharogasiteli",
    href: "/uslugi/odit-i-pregled",
    bg: {
      q: "Пожарогасителите на място ли са, достъпни ли са и минали ли са техническо обслужване (ТО) в срок?",
      gap: "Пожарогасители и ТО",
    },
    en: {
      q: "Are the fire extinguishers in place, accessible and serviced on time?",
      gap: "Fire extinguishers and servicing",
    },
  },
  {
    id: "vpk",
    href: "/uslugi/podarzhka-i-kontrol",
    bg: {
      q: "Ако има вътрешни пожарни кранове (ВПК) — проверени ли са и имате ли протокол?",
      gap: "Вътрешни пожарни кранове (ВПК)",
    },
    en: {
      q: "If there are internal fire hydrants — have they been tested, with a record?",
      gap: "Internal fire hydrants",
    },
  },
  {
    id: "izvestyavane",
    href: "/uslugi/pozharoizvestyavane#poddrazhka",
    bg: {
      q: "Ако има пожароизвестяване — работи ли без грешки и има ли договор за поддръжка с протоколи?",
      gap: "Поддръжка на пожароизвестяването",
    },
    en: {
      q: "If there is a fire alarm system — does it work without faults, with a maintenance contract and records?",
      gap: "Fire alarm maintenance",
    },
  },
  {
    id: "osvetlenie",
    href: "/uslugi/evakuatsionno-osvetlenie",
    bg: {
      q: "Светят ли евакуационното осветление и указателните знаци при спиране на тока?",
      gap: "Евакуационно осветление",
    },
    en: {
      q: "Do the emergency lighting and exit signs work during a power cut?",
      gap: "Emergency lighting",
    },
  },
  {
    id: "protokoli",
    href: "/uslugi/podarzhka-i-kontrol",
    bg: {
      q: "Имате ли протоколи от периодичното обслужване на всички системи на обекта?",
      gap: "Протоколи от обслужване",
    },
    en: {
      q: "Do you have records of the periodic servicing of every system on site?",
      gap: "Servicing records",
    },
  },
];

const text = {
  bg: {
    yes: "Да",
    no: "Не",
    unsure: "Не знам",
    progress: (n: number, total: number) => `Отговорени: ${n} от ${total}`,
    resultTitle: (ok: number, total: number) => `Резултат: ${ok} от ${total} точки са в ред`,
    allGood:
      "Отговорихте „Да“ на всичко — отлично. Ако искате да сте напълно сигурни, можем да направим предварителна проверка на място.",
    gapsIntro:
      "Тези точки вероятно ще бъдат прегледани при проверка. „Не знам“ е също сигнал — по-добре е да се провери предварително:",
    seeService: "Как помагаме",
    formTitle: "Искате да ги оправим преди проверката?",
    formText:
      "Резултатът от теста вече е попълнен в съобщението — добавете само вида на обекта и как да се свържем с вас.",
    messageHeader: "Резултат от теста за готовност",
    messageNo: "Не",
    messageUnsure: "Не знам",
    restart: "Започни отначало",
  },
  en: {
    yes: "Yes",
    no: "No",
    unsure: "Not sure",
    progress: (n: number, total: number) => `Answered: ${n} of ${total}`,
    resultTitle: (ok: number, total: number) => `Result: ${ok} of ${total} points in order`,
    allGood:
      "You answered \"Yes\" to everything — great. If you want to be completely sure, we can do an on-site pre-inspection check.",
    gapsIntro:
      "These points are likely to be looked at during an inspection. \"Not sure\" is a signal too — better to check in advance:",
    seeService: "How we help",
    formTitle: "Want them sorted before the inspection?",
    formText:
      "Your test result is already filled in the message — just add the type of facility and how to reach you.",
    messageHeader: "Readiness test result",
    messageNo: "No",
    messageUnsure: "Not sure",
    restart: "Start over",
  },
};

export function ReadinessTest({ locale }: { locale: Locale }) {
  const tx = text[locale];
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const answered = Object.keys(answers).length;
  const done = answered === questions.length;

  function answer(id: string, value: Answer) {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    if (Object.keys(next).length === questions.length && !done) {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag === "function") {
        gtag("event", "readiness_test_complete", {
          score: Object.values(next).filter((a) => a === "yes").length,
          total: questions.length,
        });
      }
    }
  }

  const gaps = questions.filter((q) => answers[q.id] && answers[q.id] !== "yes");
  const ok = questions.length - gaps.length;
  const message = gaps.length
    ? `${tx.messageHeader} (${ok}/${questions.length}):\n` +
      gaps
        .map((q) => `- ${q[locale].gap}: ${answers[q.id] === "no" ? tx.messageNo : tx.messageUnsure}`)
        .join("\n")
    : `${tx.messageHeader}: ${ok}/${questions.length}.`;

  const options: Answer[] = ["yes", "no", "unsure"];

  return (
    <div>
      <ol className="space-y-4">
        {questions.map((q, i) => (
          <li key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="flex gap-3 text-sm font-semibold leading-relaxed text-slate-900">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-amber-400">
                {i + 1}
              </span>
              <span>{q[locale].q}</span>
            </p>
            <div role="radiogroup" aria-label={q[locale].q} className="mt-4 grid grid-cols-3 gap-2 sm:ml-9 sm:max-w-sm">
              {options.map((value) => {
                const selected = answers[q.id] === value;
                const tone =
                  value === "yes"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : value === "no"
                      ? "border-red-400 bg-red-50 text-red-800"
                      : "border-amber-400 bg-amber-50 text-amber-800";
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => answer(q.id, value)}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold transition-colors ${
                      selected ? tone : "border-slate-200 text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {tx[value]}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {!done && (
        <p className="mt-4 text-sm text-slate-500" aria-live="polite">
          {tx.progress(answered, questions.length)}
        </p>
      )}

      {done && (
        <div className="mt-8 space-y-8" aria-live="polite">
          <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <p className="text-xl font-bold">{tx.resultTitle(ok, questions.length)}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${(ok / questions.length) * 100}%` }}
              />
            </div>
            {gaps.length === 0 ? (
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{tx.allGood}</p>
            ) : (
              <>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{tx.gapsIntro}</p>
                <ul className="mt-4 space-y-2">
                  {gaps.map((q) => (
                    <li key={q.id} className="flex items-start gap-3 text-sm">
                      <span
                        aria-hidden
                        className={`w-3 shrink-0 ${answers[q.id] === "no" ? "text-red-300" : "text-amber-300"}`}
                      >
                        {answers[q.id] === "no" ? "✕" : "?"}
                      </span>
                      <span>
                        <span className="font-semibold">{q[locale].gap}</span>
                        {" · "}
                        <Link href={q.href} className="whitespace-nowrap text-amber-400 underline hover:text-amber-300">
                          {tx.seeService}
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button
              type="button"
              onClick={() => setAnswers({})}
              className="mt-6 text-sm font-semibold text-slate-300 underline hover:text-white"
            >
              {tx.restart}
            </button>
          </div>

          <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900">{tx.formTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{tx.formText}</p>
            <div className="mt-6">
              {/* key: re-seed the message if the answers change after completion */}
              <QuoteForm key={message} preselectedService="odit-i-pregled" initialMessage={message} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
