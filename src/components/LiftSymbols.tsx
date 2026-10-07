import Image from "next/image";
import { getLocale } from "next-intl/server";

// Side-by-side of the two different firefighters' lift symbols: the EN 81-72
// symbol that Наредба № 8121з-647 prescribes (appendix 6, point III, in force
// since 29.06.2025) and EN ISO 7010 F017 (Wikimedia Commons, CC0).
export async function LiftSymbols() {
  const locale = await getLocale();
  const en = locale === "en";

  const items = [
    {
      src: "/blog/iso7010/lift-naredba-647.png",
      title: en ? "Regulation № 8121з-647 (EN 81-72)" : "Наредба № 8121з-647 (EN 81-72)",
      text: en
        ? "Lift car with a person, a firefighter's helmet and flames"
        : "Асансьор с човек, пожарникарска каска и пламъци",
    },
    {
      src: "/blog/iso7010/F017.svg",
      title: "EN ISO 7010 — F017",
      text: en
        ? "Lift car with a firefighter's head in a helmet, and a flame"
        : "Асансьор с глава на пожарникар в каска и пламък",
    },
  ];

  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <figure
          key={item.src}
          className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-5 text-center"
        >
          <Image
            src={item.src}
            alt={`${item.title} — ${item.text}`}
            width={160}
            height={160}
            unoptimized
            className="h-40 w-40"
          />
          <figcaption className="mt-3">
            <span className="block text-sm font-bold text-slate-900">{item.title}</span>
            <span className="mt-1 block text-xs leading-snug text-slate-600">{item.text}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
