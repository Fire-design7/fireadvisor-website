// Generates one illustrated image per service (public/services/<slug>.jpg),
// used on the service cards, the service pages and as the social preview.
// Text-free on purpose, so the same image works for both languages.
// Run: node scripts/generate-service-images.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const out = path.join(root, "public", "services");
fs.mkdirSync(out, { recursive: true });

const W = 1200, H = 630;
const AMBER = "#F59E0B", RED = "#EF4444", GREEN = "#22C55E", BLUE = "#60A5FA", SLATE = "#CBD5E1", MID = "#94A3B8", DIM = "#475569", WHITE = "#F8FAFC";

const data = (rel, mime) => `data:${mime};base64,` + fs.readFileSync(path.join(root, "public", rel)).toString("base64");
const sym = (name) => data(`blog/iso7010/${name}.svg`, "image/svg+xml");
const ex = (name) => data(`blog/iso16069/${name}.svg`, "image/svg+xml");
const image = (href, x, y, w, h) => `<image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const flame = (x, y, s = 1, c1 = "#F97316", c2 = "#FBBF24") =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -70 C20 -40 38 -28 38 0 C38 22 20 36 0 36 C-20 36 -38 22 -38 0 C-38 -18 -26 -26 -18 -42 C-12 -28 -4 -34 0 -70 Z" fill="${c1}"/><path d="M0 -30 C10 -14 20 -8 20 8 C20 20 10 28 0 28 C-10 28 -20 20 -20 8 C-20 -2 -12 -6 0 -30 Z" fill="${c2}"/></g>`;
const cloud = (x, y, s = 1, c = "#64748B", o = 0.9) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><circle cx="0" cy="0" r="34"/><circle cx="38" cy="8" r="28"/><circle cx="-36" cy="10" r="26"/><circle cx="12" cy="-22" r="26"/></g>`;
const check = (x, y, s = 1, c = GREEN, w = 8) =>
  `<path d="M${x - 14 * s} ${y} L${x - 4 * s} ${y + 11 * s} L${x + 15 * s} ${y - 12 * s}" fill="none" stroke="${c}" stroke-width="${w * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
const magnifier = (x, y, r, c = AMBER) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(15,23,42,0.35)" stroke="${c}" stroke-width="${r / 6}"/><line x1="${x + r * 0.72}" y1="${y + r * 0.72}" x2="${x + r * 1.6}" y2="${y + r * 1.6}" stroke="${c}" stroke-width="${r / 4}" stroke-linecap="round"/>`;

const base = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1220"/><stop offset="1" stop-color="#1E293B"/></linearGradient>
<radialGradient id="glow" cx="0.82" cy="0.05" r="0.6"><stop offset="0" stop-color="#F59E0B" stop-opacity="0.28"/><stop offset="1" stop-color="#F59E0B" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="14" cy="14" r="1.2" fill="#FFFFFF" fill-opacity="0.09"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#dots)"/><rect width="${W}" height="${H}" fill="url(#glow)"/>
${inner}
<rect y="${H - 10}" width="${W}" height="10" fill="${AMBER}"/>
</svg>`;

const scenes = {};

// 1 - fire safety part of a design project: floor plan with fire compartments
scenes["chast-pozharna-bezopasnost"] = () => {
  const x0 = 170, y0 = 90, w = 860, h = 430;
  return `
<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="rgba(248,250,252,0.05)" stroke="${MID}" stroke-width="5"/>
<rect x="${x0}" y="${y0}" width="300" height="330" fill="rgba(96,165,250,0.22)"/>
<rect x="${x0 + 300}" y="${y0}" width="280" height="330" fill="rgba(245,158,11,0.22)"/>
<rect x="${x0 + 580}" y="${y0}" width="280" height="330" fill="rgba(167,139,250,0.22)"/>
<rect x="${x0}" y="${y0 + 330}" width="${w}" height="100" fill="rgba(248,250,252,0.08)"/>
<line x1="${x0 + 300}" y1="${y0}" x2="${x0 + 300}" y2="${y0 + 330}" stroke="${RED}" stroke-width="9"/>
<line x1="${x0 + 580}" y1="${y0}" x2="${x0 + 580}" y2="${y0 + 330}" stroke="${RED}" stroke-width="9"/>
<line x1="${x0}" y1="${y0 + 330}" x2="${x0 + w}" y2="${y0 + 330}" stroke="${MID}" stroke-width="4"/>
<g stroke="${DIM}" stroke-width="3"><line x1="${x0 + 150}" y1="${y0}" x2="${x0 + 150}" y2="${y0 + 120}"/><line x1="${x0 + 440}" y1="${y0 + 120}" x2="${x0 + 580}" y2="${y0 + 120}"/><line x1="${x0 + 720}" y1="${y0}" x2="${x0 + 720}" y2="${y0 + 160}"/></g>
<g fill="${GREEN}"><rect x="${x0 + 100}" y="${y0 + 326}" width="60" height="9"/><rect x="${x0 + 400}" y="${y0 + 326}" width="60" height="9"/><rect x="${x0 + 680}" y="${y0 + 326}" width="60" height="9"/></g>
${image(sym("F007"), x0 + 262, y0 + 120, 76, 76)}
${image(sym("F007"), x0 + 542, y0 + 120, 76, 76)}
<g stroke="${GREEN}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M${x0 + 60} ${y0 + 380} H${x0 + 790}"/><path d="M${x0 + 765} ${y0 + 362} L${x0 + 792} ${y0 + 380} L${x0 + 765} ${y0 + 398}"/></g>
${image(ex("exit-right"), x0 + w - 120, y0 + h + 12, 100, 52)}
${image(sym("F001"), x0 + 110, y0 + 190, 64, 64)}
${image(sym("F005"), x0 + 460, y0 + 200, 64, 64)}
<g stroke="${SLATE}" stroke-width="2"><line x1="${x0}" y1="${y0 - 28}" x2="${x0 + w}" y2="${y0 - 28}"/><line x1="${x0}" y1="${y0 - 38}" x2="${x0}" y2="${y0 - 18}"/><line x1="${x0 + w}" y1="${y0 - 38}" x2="${x0 + w}" y2="${y0 - 18}"/></g>`;
};

// 2 - fire detection: ceiling detectors, signal waves, panel, call point
scenes["pozharoizvestyavane"] = () => {
  const det = (x) => `<g><rect x="${x - 6}" y="130" width="12" height="18" fill="${MID}"/><ellipse cx="${x}" cy="156" rx="46" ry="14" fill="${WHITE}"/><ellipse cx="${x}" cy="152" rx="26" ry="7" fill="#E2E8F0"/><circle cx="${x + 30}" cy="158" r="4" fill="${RED}"/>
<path d="M${x - 60} 196 Q${x} 226 ${x + 60} 196" fill="none" stroke="${AMBER}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 92} 214 Q${x} 262 ${x + 92} 214" fill="none" stroke="${AMBER}" stroke-width="5" stroke-linecap="round" opacity="0.6"/><path d="M${x - 124} 232 Q${x} 298 ${x + 124} 232" fill="none" stroke="${AMBER}" stroke-width="5" stroke-linecap="round" opacity="0.3"/></g>`;
  return `
<rect x="60" y="100" width="1080" height="30" fill="rgba(248,250,252,0.12)"/>
${det(260)}${det(560)}
<path d="M560 148 H880 V320" fill="none" stroke="${MID}" stroke-width="4" stroke-dasharray="10 8"/>
<path d="M260 148 V120 H880" fill="none" stroke="${MID}" stroke-width="4" stroke-dasharray="10 8"/>
<rect x="800" y="320" width="160" height="200" rx="12" fill="#0F172A" stroke="${SLATE}" stroke-width="5"/>
<rect x="824" y="346" width="112" height="56" rx="6" fill="#064E3B"/><g fill="${GREEN}"><rect x="836" y="360" width="60" height="6"/><rect x="836" y="376" width="84" height="6"/></g>
<circle cx="840" cy="440" r="11" fill="${GREEN}"/><circle cx="880" cy="440" r="11" fill="${AMBER}"/><circle cx="920" cy="440" r="11" fill="${RED}"/>
<rect x="824" y="468" width="112" height="22" rx="4" fill="#1E293B"/>
${image(sym("F005"), 1010, 340, 110, 110)}
${cloud(330, 430, 1.2, "#64748B", 0.75)}${cloud(450, 470, 0.8, "#64748B", 0.6)}
${flame(170, 520, 0.9)}`;
};

// 3 - fire suppression: sprinkler pipes and spray over a flame
scenes["gasitelni-instalatsii"] = () => {
  const head = (x) => {
    const drops = [-1, -0.5, 0, 0.5, 1].map((k, i) => `<circle cx="${x + k * 90}" cy="${300 + (i % 2) * 28}" r="7" fill="${BLUE}"/><circle cx="${x + k * 60}" cy="${380 + (i % 2) * 24}" r="6" fill="${BLUE}" opacity="0.7"/>`).join("");
    return `<rect x="${x - 6}" y="130" width="12" height="46" fill="${MID}"/><rect x="${x - 22}" y="176" width="44" height="12" rx="3" fill="${RED}"/><path d="M${x} 188 L${x - 120} 470 L${x + 120} 470 Z" fill="${BLUE}" opacity="0.17"/>${drops}`;
  };
  return `
<rect x="60" y="106" width="1080" height="26" rx="6" fill="${MID}"/><rect x="60" y="112" width="1080" height="6" fill="rgba(255,255,255,0.35)"/>
${head(300)}${head(600)}${head(900)}
<rect x="60" y="500" width="1080" height="14" fill="${DIM}"/>
${flame(600, 492, 1.4)}`;
};

// 4 - fire safety file: folder, documents, checks
scenes["pozharno-dosie"] = () => {
  const doc = (x, y, r, c) => `<g transform="rotate(${r} ${x + 130} ${y + 160})"><rect x="${x}" y="${y}" width="260" height="330" rx="8" fill="${c}" stroke="#CBD5E1" stroke-width="3"/><g fill="#94A3B8"><rect x="${x + 28}" y="${y + 40}" width="140" height="12"/><rect x="${x + 28}" y="${y + 74}" width="200" height="8"/><rect x="${x + 28}" y="${y + 98}" width="190" height="8"/><rect x="${x + 28}" y="${y + 122}" width="200" height="8"/><rect x="${x + 28}" y="${y + 146}" width="150" height="8"/></g></g>`;
  return `
${doc(290, 80, -6, "#E2E8F0")}${doc(400, 70, 4, "#F1F5F9")}${doc(500, 90, 12, WHITE)}
<path d="M250 240 H520 L560 200 H860 Q880 200 880 220 V500 Q880 520 860 520 H270 Q250 520 250 500 Z" fill="${AMBER}"/>
<path d="M250 260 H880 V500 Q880 520 860 520 H270 Q250 520 250 500 Z" fill="#FBBF24"/>
<g fill="${RED}"><path d="M565 330 L615 350 V390 C615 420 590 438 565 450 C540 438 515 420 515 390 V350 Z"/></g>
${flame(565, 410, 0.42, "#FDE68A", "#FFFFFF")}
<g><circle cx="960" cy="200" r="34" fill="rgba(34,197,94,0.18)"/>${check(960, 200, 1.1)}<circle cx="960" cy="300" r="34" fill="rgba(34,197,94,0.18)"/>${check(960, 300, 1.1)}<circle cx="960" cy="400" r="34" fill="rgba(34,197,94,0.18)"/>${check(960, 400, 1.1)}</g>
<g fill="${MID}"><rect x="1020" y="194" width="110" height="12" rx="6"/><rect x="1020" y="294" width="110" height="12" rx="6"/><rect x="1020" y="394" width="110" height="12" rx="6"/></g>`;
};

// 5 - audit and review of an existing facility
scenes["odit-i-pregled"] = () => {
  const win = [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${330 + c * 80}" y="${190 + r * 70}" width="46" height="40" rx="4" fill="${r === 1 && c === 2 ? "rgba(239,68,68,0.55)" : "rgba(251,191,36,0.55)"}"/>`).join("")).join("");
  return `
<rect x="290" y="150" width="270" height="350" fill="${DIM}" stroke="${MID}" stroke-width="4"/><rect x="278" y="136" width="294" height="24" fill="${MID}"/>${win}
<rect x="390" y="440" width="70" height="60" fill="#0F172A"/>
${magnifier(560, 290, 96)}
<rect x="780" y="120" width="330" height="400" rx="14" fill="${WHITE}" stroke="${SLATE}" stroke-width="4"/><rect x="880" y="104" width="130" height="36" rx="8" fill="${AMBER}"/>
${[0, 1, 2, 3, 4].map((i) => `${i === 2 ? `<circle cx="830" cy="${215 + i * 60}" r="20" fill="rgba(239,68,68,0.15)"/><path d="M820 ${205 + i * 60} L840 ${225 + i * 60} M840 ${205 + i * 60} L820 ${225 + i * 60}" stroke="${RED}" stroke-width="7" stroke-linecap="round"/>` : `<circle cx="830" cy="${215 + i * 60}" r="20" fill="rgba(34,197,94,0.15)"/>${check(830, 215 + i * 60, 0.8)}`}<rect x="870" y="${209 + i * 60}" width="190" height="12" rx="6" fill="#CBD5E1"/>`).join("")}`;
};

// 6 - smoke and heat extraction ventilation
scenes["vsodt"] = () => `
<path d="M180 220 H420 L470 160 H730 L780 220 H1020 V520 H180 Z" fill="${DIM}" stroke="${MID}" stroke-width="5"/>
<rect x="470" y="150" width="260" height="14" fill="${AMBER}"/>
<path d="M500 160 L470 112 L560 112 L540 160 Z" fill="${MID}"/><path d="M700 160 L730 112 L640 112 L660 160 Z" fill="${MID}"/>
${cloud(560, 330, 1.6, "#94A3B8", 0.55)}${cloud(690, 280, 1.2, "#94A3B8", 0.5)}
<g fill="none" stroke="${AMBER}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M520 320 V150"/><path d="M495 180 L520 148 L545 180"/><path d="M660 320 V150"/><path d="M635 180 L660 148 L685 180"/></g>
${cloud(520, 80, 0.9, "#94A3B8", 0.5)}${cloud(660, 60, 0.8, "#94A3B8", 0.4)}
<line x1="180" y1="380" x2="1020" y2="380" stroke="${MID}" stroke-width="3"/>
${flame(330, 506, 1.1)}
<rect x="880" y="420" width="70" height="100" fill="#0F172A"/>${image(ex("exit-up"), 868, 372, 94, 49)}`;

// 7 - emergency lighting: reuse the plan drawing
scenes["evakuatsionno-osvetlenie"] = () => `
<rect x="130" y="70" width="940" height="425" rx="10" fill="${WHITE}"/>
${image(data("blog/covers/_feature-evacuation-lighting.png", "image/png"), 140, 80, 920, 415)}`;

// 8 - evacuation schemes: the sample scheme on a card
scenes["evakuatsionni-shemi"] = () => `
<g transform="rotate(-2 600 315)"><rect x="170" y="62" width="860" height="508" rx="8" fill="${WHITE}"/>
${image(data("blog/evakuatsionna-shema-primer.jpg", "image/jpeg"), 178, 70, 844, 492)}</g>`;

// 9 - consulting: two speech bubbles and a light bulb
scenes["konsultatsii-po-pozharna-bezopasnost"] = () => `
<path d="M180 140 H620 Q650 140 650 170 V340 Q650 370 620 370 H330 L250 440 V370 H210 Q180 370 180 340 Z" fill="${WHITE}"/>
<path d="M360 220 a50 50 0 1 1 70 46 c-14 8 -20 16 -20 34 M410 340 v10" fill="none" stroke="${AMBER}" stroke-width="22" stroke-linecap="round"/>
<path d="M560 290 H1020 Q1050 290 1050 320 V470 Q1050 500 1020 500 H980 V570 L900 500 H590 Q560 500 560 470 Z" fill="${AMBER}"/>
${check(805, 395, 2.6, "#0B1220", 16)}
<g transform="translate(940 130)"><circle cx="0" cy="40" r="44" fill="${AMBER}" opacity="0.2"/><path d="M0 0 a34 34 0 0 1 20 62 v18 h-40 v-18 a34 34 0 0 1 20 -62 z" fill="#FDE68A" stroke="${AMBER}" stroke-width="4"/><rect x="-18" y="86" width="36" height="8" rx="3" fill="${MID}"/></g>`;

// 10 - project review: drawings with a magnifier and revision marks
scenes["pregled-na-proekti"] = () => {
  const sheet = (x, y, r) => `<g transform="rotate(${r} ${x + 220} ${y + 160})"><rect x="${x}" y="${y}" width="440" height="320" rx="6" fill="#1D4ED8" opacity="0.9"/><g stroke="rgba(255,255,255,0.18)" stroke-width="1">${Array.from({ length: 10 }, (_, i) => `<line x1="${x + 40 * (i + 1)}" y1="${y}" x2="${x + 40 * (i + 1)}" y2="${y + 320}"/>`).join("")}${Array.from({ length: 7 }, (_, i) => `<line x1="${x}" y1="${y + 40 * (i + 1)}" x2="${x + 440}" y2="${y + 40 * (i + 1)}"/>`).join("")}</g><g fill="none" stroke="#DBEAFE" stroke-width="4"><rect x="${x + 50}" y="${y + 50}" width="190" height="130"/><line x1="${x + 145}" y1="${y + 50}" x2="${x + 145}" y2="${y + 180}"/><rect x="${x + 270}" y="${y + 60}" width="110" height="200"/><line x1="${x + 50}" y1="${y + 230}" x2="${x + 240}" y2="${y + 230}"/></g></g>`;
  return `
${sheet(160, 120, -5)}${sheet(400, 190, 4)}
<ellipse cx="740" cy="300" rx="70" ry="44" fill="none" stroke="${RED}" stroke-width="6" stroke-dasharray="12 8"/>
${magnifier(780, 330, 100)}
<g><circle cx="1010" cy="200" r="42" fill="rgba(34,197,94,0.2)"/>${check(1010, 200, 1.3)}</g>`;
};

// 11 - structural fireproofing: coated steel beam over flames
scenes["ognezashtita"] = () => `
<g><rect x="150" y="150" width="900" height="30" fill="${MID}"/>
<rect x="150" y="310" width="900" height="30" fill="${MID}"/><rect x="580" y="180" width="40" height="130" fill="${MID}"/>
<rect x="136" y="136" width="928" height="58" fill="none" stroke="${AMBER}" stroke-width="12" rx="10"/>
<rect x="136" y="296" width="928" height="58" fill="none" stroke="${AMBER}" stroke-width="12" rx="10"/>
<rect x="566" y="194" width="68" height="102" fill="none" stroke="${AMBER}" stroke-width="12"/></g>
${flame(260, 560, 1.5)}${flame(480, 570, 1.2)}${flame(720, 565, 1.4)}${flame(930, 570, 1.2)}
<path d="M150 420 Q330 390 520 430 T900 420 T1050 430" fill="none" stroke="${RED}" stroke-width="4" opacity="0.5" stroke-dasharray="14 10"/>`;

// 12 - passive fire protection: fire-rated wall, fire door, sealed penetrations
scenes["pasivna-pozharozashtita"] = () => {
  const bricks = Array.from({ length: 8 }, (_, r) => Array.from({ length: 12 }, (_, c) => `<rect x="${160 + c * 80 - (r % 2) * 40}" y="${100 + r * 52}" width="76" height="48" fill="#7F1D1D" opacity="0.65"/>`).join("")).join("");
  return `
<clipPath id="wall"><rect x="160" y="100" width="880" height="416"/></clipPath>
<g clip-path="url(#wall)">${bricks}</g>
<rect x="160" y="100" width="880" height="416" fill="none" stroke="${RED}" stroke-width="8"/>
<rect x="430" y="210" width="190" height="306" fill="#334155" stroke="${SLATE}" stroke-width="8"/><circle cx="590" cy="370" r="10" fill="${AMBER}"/>
${image(sym("F007"), 470, 240, 110, 110)}
<circle cx="860" cy="330" r="56" fill="#0F172A"/><circle cx="860" cy="330" r="38" fill="${DIM}" stroke="${MID}" stroke-width="6"/><circle cx="860" cy="330" r="62" fill="none" stroke="${AMBER}" stroke-width="12"/>
<circle cx="740" cy="430" r="40" fill="#0F172A"/><circle cx="740" cy="430" r="26" fill="${DIM}" stroke="${MID}" stroke-width="5"/><circle cx="740" cy="430" r="46" fill="none" stroke="${AMBER}" stroke-width="10"/>
<rect x="780" y="190" width="160" height="40" fill="${DIM}" stroke="${MID}" stroke-width="4"/><rect x="772" y="182" width="176" height="56" fill="none" stroke="${AMBER}" stroke-width="10"/>
${flame(100, 560, 0.9)}`;
};

// 13 - risk assessment: risk matrix with a marked cell
scenes["otsenka-na-risk"] = () => {
  const cols = [["#16A34A", "#65A30D", "#CA8A04"], ["#65A30D", "#CA8A04", "#EA580C"], ["#CA8A04", "#EA580C", "#DC2626"]];
  const cells = cols.map((row, r) => row.map((c, k) => `<rect x="${330 + k * 150}" y="${100 + r * 150}" width="140" height="140" rx="10" fill="${c}"/>`).join("")).join("");
  return `
${cells}
<circle cx="${330 + 2 * 150 + 70}" cy="${100 + 150 + 70}" r="40" fill="${WHITE}"/><circle cx="${330 + 2 * 150 + 70}" cy="${100 + 150 + 70}" r="22" fill="#0B1220"/>
<g fill="none" stroke="${SLATE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M250 520 V90"/><path d="M230 112 L250 86 L270 112"/><path d="M290 570 H810"/><path d="M784 550 L812 570 L784 590"/></g>
<g transform="translate(940 200)"><path d="M0 -60 L90 -30 V70 C90 130 50 160 0 190 C-50 160 -90 130 -90 70 V-30 Z" fill="${AMBER}"/>${flame(0, 70, 0.72, "#7C2D12", "#FDE68A")}</g>`;
};

// 14 - annual retainer: calendar, cycle arrows, extinguisher
scenes["podarzhka-i-kontrol"] = () => `
<rect x="220" y="130" width="460" height="380" rx="20" fill="${WHITE}"/><rect x="220" y="130" width="460" height="86" rx="20" fill="${AMBER}"/><rect x="220" y="190" width="460" height="26" fill="${AMBER}"/>
<g fill="${DIM}"><rect x="290" y="108" width="20" height="50" rx="8"/><rect x="590" y="108" width="20" height="50" rx="8"/></g>
${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${250 + c * 106}" y="${240 + r * 84}" width="90" height="68" rx="8" fill="#E2E8F0"/>`).join("")).join("")}
${[[0, 0], [1, 1], [2, 2]].map(([r, c]) => check(250 + c * 106 + 45, 240 + r * 84 + 36, 0.9, GREEN, 9)).join("")}
<g fill="none" stroke="${AMBER}" stroke-width="16" stroke-linecap="round"><path d="M820 220 A120 120 0 0 1 1000 150"/><path d="M1000 410 A120 120 0 0 1 820 480"/></g>
<g fill="${AMBER}"><path d="M1010 112 L1050 170 L976 176 Z"/><path d="M810 518 L770 460 L844 454 Z"/></g>
${image(sym("F001"), 860, 270, 130, 130)}`;

(async () => {
  for (const [slug, scene] of Object.entries(scenes)) {
    const svg = base(scene());
    await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(path.join(out, `${slug}.jpg`));
    console.log("service image", slug);
  }
})();
