import { getLocale } from "next-intl/server";

// Own diagrams for the emergency-lighting article, drawn as inline SVG.
// Numbers and short labels only inside the drawings; the explanations are HTML
// so they stay readable on phones.

const AMBER = "#FBBF24";
const AMBER_DARK = "#B45309";
const WALL = "#475569";

function Lum({ x, y, n, r = 11 }: { x: number; y: number; n: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 3} fill="url(#lm-glow)" />
      <circle cx={x} cy={y} r={r} fill={AMBER} stroke={AMBER_DARK} strokeWidth={1.5} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight={700}
        fill="#1E293B"
      >
        {n}
      </text>
    </g>
  );
}

const places = {
  bg: [
    { t: "Над всеки евакуационен изход за повече от 50 човека" },
    {
      t: "За евакуационните стълбища — във и извън обема на сградата, така че да се осигурява осветяването им",
      d: "EN 1838: всяко стъпало получава директна светлина.",
    },
    { t: "В близост до площадките между етажите и междинните нива" },
    { t: "При всяка промяна в посоката на евакуационния път" },
    { t: "При промяна на котата на евакуационния път в проходи и коридори (стъпала)" },
    { t: "Във всяка пресечна точка на коридорите" },
    { t: "Извън и в близост до крайния евакуационен изход" },
    { t: "В санитарно-хигиенни помещения с обща площ над 25 m²" },
    {
      t: "В близост до местата за уредите за пожарогасене и за ръчните пожароизвестители",
      d: "EN 1838: 5 lx във вертикална равнина върху оборудването.",
    },
  ],
  en: [
    { t: "Above every evacuation exit for more than 50 people" },
    {
      t: "For evacuation stairs — inside and outside the building, so that they are lit",
      d: "EN 1838: every step receives direct light.",
    },
    { t: "Close to the landings between floors and intermediate levels" },
    { t: "At every change of direction of the evacuation route" },
    { t: "At a change of level of the route in passages and corridors (steps)" },
    { t: "At every intersection of corridors" },
    { t: "Outside and close to the final evacuation exit" },
    { t: "In sanitary rooms with a total area over 25 m²" },
    {
      t: "Close to fire-fighting equipment and manual call points",
      d: "EN 1838: 5 lx in the vertical plane on the equipment.",
    },
  ],
};

export async function LuminaireMap() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const t =
    lang === "en"
      ? {
          title: "Floor plan showing where emergency luminaires go",
          stair: "Stairs",
          hall: "Hall, 50+ people",
          office: "Office",
          wc: "Sanitary",
          wc2: "over 25 m²",
          room: "Room",
          corridor: "Corridor",
          outside: "Outside",
          legend: "Emergency luminaire",
        }
      : {
          title: "Етажен план: къде се слагат евакуационните осветителни тела",
          stair: "Стълбище",
          hall: "Зала над 50 души",
          office: "Офис",
          wc: "Санитарно",
          wc2: "над 25 m²",
          room: "Помещение",
          corridor: "Коридор",
          outside: "Навън",
          legend: "Евакуационно осветително тяло",
        };

  const room = { fill: "#FFFFFF", stroke: WALL, strokeWidth: 3 };
  const lbl = { fontSize: 13, fill: "#64748B", textAnchor: "middle" as const };
  const desk = { fill: "#E2E8F0", stroke: "#CBD5E1", strokeWidth: 1 };

  return (
    <figure className="not-prose my-8 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <svg viewBox="22 40 620 280" role="img" className="h-auto w-full" aria-label={t.title}>
        <title>{t.title}</title>
        <defs>
          <radialGradient id="lm-glow">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* corridors */}
        <rect x={40} y={170} width={520} height={40} fill="#FFF7E0" stroke={WALL} strokeWidth={3} />
        <rect x={300} y={210} width={40} height={90} fill="#FFF7E0" stroke={WALL} strokeWidth={3} />
        {/* rooms */}
        <rect x={40} y={60} width={90} height={110} {...room} />
        <rect x={140} y={60} width={170} height={110} {...room} />
        <rect x={320} y={60} width={120} height={110} {...room} />
        <rect x={450} y={60} width={110} height={110} {...room} />
        <rect x={140} y={210} width={150} height={90} {...room} />
        <rect x={350} y={210} width={210} height={90} {...room} />

        {/* furniture */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={152 + c * 36} y={98 + r * 13} width={26} height={9} rx={2} {...desk} />
          )),
        )}
        {[0, 1].map((c) => (
          <rect key={`o${c}`} x={336 + c * 48} y={72} width={34} height={12} rx={2} {...desk} />
        ))}
        <rect x={160} y={226} width={110} height={14} rx={2} {...desk} />
        <rect x={372} y={226} width={70} height={14} rx={2} {...desk} />
        <rect x={462} y={226} width={70} height={14} rx={2} {...desk} />

        {/* stair treads and landing */}
        <line x1={40} y1={128} x2={130} y2={128} stroke={WALL} strokeWidth={1.5} />
        {[88, 96, 104, 112, 120].map((y) => (
          <line key={y} x1={48} y1={y} x2={94} y2={y} stroke="#94A3B8" strokeWidth={1.5} />
        ))}
        <path d="M71 118 L71 92 M65 98 L71 91 L77 98" fill="none" stroke="#237F52" strokeWidth={1.8} />

        {/* steps in the corridor */}
        {[462, 470, 478].map((x) => (
          <line key={x} x1={x} y1={172} x2={x} y2={208} stroke="#94A3B8" strokeWidth={1.5} />
        ))}

        {/* doors (gaps in walls) */}
        <g fill="#FFF7E0">
          <rect x={206} y={168} width={28} height={5} />
          <rect x={56} y={168} width={30} height={5} />
          <rect x={336} y={168} width={26} height={5} />
          <rect x={480} y={168} width={30} height={5} />
          <rect x={558} y={176} width={5} height={28} />
        </g>
        <g fill="none" stroke={WALL} strokeWidth={1.2}>
          <path d="M206 170 L206 198 M206 198 A28 28 0 0 0 234 170" strokeDasharray="0" />
        </g>
        {/* final exit door */}
        <rect x={557} y={176} width={6} height={28} fill="#237F52" />

        {/* ISO 7010 symbols */}
        <image href="/blog/iso16069/exit-up.svg" x={207} y={141} width={46} height={24} />
        <image href="/blog/iso16069/exit-up.svg" x={504} y={174} width={46} height={24} />
        <image href="/blog/iso7010/F001.svg" x={364} y={176} width={22} height={22} />

        {/* way out */}
        <path d="M566 190 L592 190 M586 184 L593 190 L586 196" fill="none" stroke="#237F52" strokeWidth={2} />

        <text x={85} y={77} {...lbl}>{t.stair}</text>
        <text x={225} y={80} {...lbl}>{t.hall}</text>
        <text x={380} y={108} {...lbl}>{t.office}</text>
        <text x={505} y={86} {...lbl}>{t.wc}</text>
        <text x={505} y={103} {...lbl}>{t.wc2}</text>
        <text x={215} y={262} {...lbl}>{t.room}</text>
        <text x={455} y={265} {...lbl}>{t.room}</text>
        <text x={134} y={196} fontSize={13} fill="#64748B">{t.corridor}</text>
        <text x={610} y={224} {...lbl}>{t.outside}</text>

        <Lum x={220} y={190} n={1} />
        <Lum x={113} y={104} n={2} />
        <Lum x={85} y={150} n={3} />
        <Lum x={115} y={190} n={4} />
        <Lum x={440} y={190} n={5} />
        <Lum x={320} y={190} n={6} />
        <Lum x={612} y={190} n={7} />
        <Lum x={505} y={138} n={8} />
        <Lum x={410} y={192} n={9} />
      </svg>
      <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <span
          aria-hidden
          className="h-3 w-3 rounded-full"
          style={{ background: AMBER, border: `1.5px solid ${AMBER_DARK}` }}
        />
        {t.legend}
      </p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {places[lang].map((p, i) => (
          <li key={p.t} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-900"
              style={{ background: AMBER, border: `1.5px solid ${AMBER_DARK}` }}
            >
              {i + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold leading-snug text-slate-900">{p.t}</span>
              {"d" in p && p.d && (
                <span className="mt-0.5 block text-sm leading-snug text-slate-600">{p.d}</span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export async function LightingTimeline() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const rows =
    lang === "en"
      ? [
          { time: "within 5 s", text: "half of the required illuminance", level: 50 },
          { time: "within 60 s", text: "full illuminance", level: 100 },
          { time: "at least 1 hour", text: "minimum duration of operation", level: 100 },
        ]
      : [
          { time: "за 5 s", text: "половината от изискваната осветеност", level: 50 },
          { time: "за не повече от 60 s", text: "пълната осветеност", level: 100 },
          { time: "поне 1 час", text: "минимална продължителност на работа", level: 100 },
        ];

  return (
    <div className="not-prose my-8 space-y-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      {rows.map((r) => (
        <div key={r.time} className="grid items-center gap-x-4 gap-y-1 sm:grid-cols-[170px_1fr]">
          <p className="text-sm font-bold text-slate-900">{r.time}</p>
          <div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full" style={{ width: `${r.level}%`, background: AMBER }} />
            </div>
            <p className="mt-1 text-sm text-slate-600">{r.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
