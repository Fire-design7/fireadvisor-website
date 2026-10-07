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

export async function CorridorLux() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const t =
    lang === "en"
      ? {
          title: "Corridor up to 2 m wide, seen from above",
          width: "up to 2 m wide",
          min: "at least 1 lx",
          centre: "Centreline of the floor: at least 1 lx",
          band: "Central band (at least half of the width): at least 0.5 lx",
          lum: "Emergency luminaire",
          ratio: "Maximum to minimum illuminance: up to 40 : 1",
        }
      : {
          title: "Коридор до 2 m ширина, изглед отгоре",
          width: "до 2 m ширина",
          min: "поне 1 lx",
          centre: "Осова линия на пода: поне 1 lx",
          band: "Централна лента (поне половината от ширината): поне 0,5 lx",
          lum: "Евакуационно осветително тяло",
          ratio: "Съотношение между най-високата и най-ниската осветеност: до 40 : 1",
        };

  const xs = [130, 340, 550];

  return (
    <figure className="not-prose my-8 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <svg viewBox="0 0 680 190" role="img" className="h-auto w-full" aria-label={t.title}>
        <title>{t.title}</title>
        <defs>
          <radialGradient id="cl-glow">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#FBBF24" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
          <clipPath id="cl-clip">
            <rect x={20} y={20} width={640} height={130} />
          </clipPath>
        </defs>
        <rect x={20} y={20} width={640} height={130} fill="#F1F5F9" stroke={WALL} strokeWidth={3} />
        <g clipPath="url(#cl-clip)">
          <rect x={20} y={52} width={640} height={66} fill="#FEF3C7" opacity={0.7} />
          {xs.map((x) => (
            <ellipse key={x} cx={x} cy={85} rx={150} ry={62} fill="url(#cl-glow)" />
          ))}
        </g>
        <line
          x1={20}
          y1={85}
          x2={660}
          y2={85}
          stroke="#1E293B"
          strokeWidth={2}
          strokeDasharray="9 6"
        />
        {xs.map((x) => (
          <circle key={x} cx={x} cy={85} r={10} fill={AMBER} stroke={AMBER_DARK} strokeWidth={1.5} />
        ))}
        {[235, 445].map((x) => (
          <g key={x}>
            <circle cx={x} cy={85} r={4} fill="#1E293B" />
            <rect x={x - 38} y={96} width={76} height={22} rx={4} fill="#FFFFFF" stroke="#1E293B" strokeWidth={1} />
            <text x={x} y={107} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700} fill="#1E293B">
              {t.min}
            </text>
          </g>
        ))}
        <text x={32} y={40} fontSize={13} fill="#475569">{t.width}</text>
      </svg>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        <li className="flex items-start gap-3">
          <svg width="32" height="10" aria-hidden className="mt-1.5 shrink-0">
            <line x1="0" y1="5" x2="32" y2="5" stroke="#1E293B" strokeWidth="2" strokeDasharray="7 4" />
          </svg>
          <span>{t.centre}</span>
        </li>
        <li className="flex items-start gap-3">
          <span aria-hidden className="mt-1 h-3.5 w-8 shrink-0 bg-amber-100 ring-1 ring-amber-300" />
          <span>{t.band}</span>
        </li>
        <li className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0 rounded-full"
            style={{ background: AMBER, border: `1.5px solid ${AMBER_DARK}`, margin: "2px 8px 0" }}
          />
          <span>{t.lum}</span>
        </li>
        <li className="pl-14 text-slate-600">{t.ratio}</li>
      </ul>
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

// Three tasks of emergency lighting, as small plan drawings with the key value.
export async function LightingTasks() {
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "bg";
  const cards =
    lang === "en"
      ? [
          { t: "Escape routes", v: "1 lx", d: "On the centreline of the floor; at least 0.5 lx in the central band of routes up to 2 m wide." },
          { t: "Open areas", v: "0.5 lx", d: "Areas over 60 m², ignoring a 0.5 m strip along the walls. Max : min up to 40 : 1." },
          { t: "High-risk task areas", v: "15 lx", d: "At least 10% of the normal illuminance, but not less than 15 lx." },
        ]
      : [
          { t: "Път за евакуация", v: "1 lx", d: "По осовата линия на пода; поне 0,5 lx в централната лента при път до 2 m ширина." },
          { t: "Открити пространства", v: "0,5 lx", d: "Над 60 m², без 0,5 m покрай стените. Съотношение max : min до 40 : 1." },
          { t: "Зони с висок риск", v: "15 lx", d: "Най-малко 10% от нормалната осветеност, но не по-малко от 15 lx." },
        ];

  const drawings = [
    <svg key="a" viewBox="0 0 160 80" className="h-auto w-full" aria-hidden>
      <rect x="6" y="26" width="148" height="28" fill="#FEF3C7" stroke={WALL} strokeWidth="2" />
      <line x1="6" y1="40" x2="154" y2="40" stroke="#1E293B" strokeWidth="1.6" strokeDasharray="6 4" />
      {[32, 80, 128].map((x) => (
        <circle key={x} cx={x} cy="40" r="5" fill={AMBER} stroke={AMBER_DARK} strokeWidth="1.2" />
      ))}
    </svg>,
    <svg key="b" viewBox="0 0 160 80" className="h-auto w-full" aria-hidden>
      <rect x="20" y="8" width="120" height="64" fill="#FFFFFF" stroke={WALL} strokeWidth="2" />
      <rect x="28" y="16" width="104" height="48" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.2" strokeDasharray="4 3" />
      {[56, 104].map((x) =>
        [32, 52].map((y) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" fill={AMBER} stroke={AMBER_DARK} strokeWidth="1.2" />
        )),
      )}
    </svg>,
    <svg key="c" viewBox="0 0 160 80" className="h-auto w-full" aria-hidden>
      <rect x="20" y="8" width="120" height="64" fill="#FFFFFF" stroke={WALL} strokeWidth="2" />
      <rect x="52" y="22" width="56" height="36" rx="3" fill="#FEE2E2" stroke="#A52019" strokeWidth="1.5" />
      <rect x="40" y="14" width="80" height="52" rx="6" fill="none" stroke="#B45309" strokeWidth="1.2" strokeDasharray="4 3" />
      <circle cx="36" cy="12" r="4.5" fill={AMBER} stroke={AMBER_DARK} strokeWidth="1.2" />
      <circle cx="124" cy="68" r="4.5" fill={AMBER} stroke={AMBER_DARK} strokeWidth="1.2" />
    </svg>,
  ];

  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-3">
      {cards.map((c, i) => (
        <div key={c.t} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="rounded-lg bg-slate-50 p-2">{drawings[i]}</div>
          <p className="mt-3 flex items-baseline justify-between gap-2">
            <span className="text-sm font-bold text-slate-900">{c.t}</span>
            <span className="text-lg font-bold" style={{ color: AMBER_DARK }}>{c.v}</span>
          </p>
          <p className="mt-1 text-sm leading-snug text-slate-600">{c.d}</p>
        </div>
      ))}
    </div>
  );
}
