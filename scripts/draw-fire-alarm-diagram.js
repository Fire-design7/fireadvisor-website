// Draws the text-free fire alarm system diagram used on the "Fire detection
// systems" service cover: detectors and manual call points on a loop, the
// control panel, the alarm outputs and the fire-protection control functions.
// Output: public/services/covers/_feature-pozharoizvestyavane.png
// Run: node scripts/draw-fire-alarm-diagram.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const ARROW = "#F59E0B";
const GREY = "#CBD5E1";
const DARK = "#475569";
const RED = "#DC2626";

const arrowHead = (x, y, dir) => {
  const d = { r: [-12, -8, -12, 8], l: [12, -8, 12, 8], d: [-8, -12, 8, -12], u: [-8, 12, 8, 12] }[dir];
  return `<path d="M${x + d[0]} ${y + d[1]} L${x} ${y} L${x + d[2]} ${y + d[3]}" fill="none" stroke="${ARROW}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const line = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ARROW}" stroke-width="5" stroke-linecap="round"/>`;

// ceiling smoke detector, seen from the side
const detector = (x, y) => `
<g transform="translate(${x} ${y})">
  <ellipse cx="0" cy="10" rx="40" ry="11" fill="#94A3B8"/>
  <path d="M-40 10 V2 Q-40 -8 -22 -10 H22 Q40 -8 40 2 V10 Q40 22 0 22 Q-40 22 -40 10 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
  <rect x="-24" y="-2" width="48" height="6" rx="3" fill="#CBD5E1"/>
</g>`;

// manual call point
const callPoint = (x, y) => `
<g transform="translate(${x} ${y})">
  <rect x="-38" y="-38" width="76" height="76" rx="6" fill="${RED}" stroke="#7F1D1D" stroke-width="3"/>
  <rect x="-26" y="-26" width="52" height="52" rx="3" fill="#FEE2E2" stroke="#FFFFFF" stroke-width="3"/>
  <circle cx="0" cy="0" r="12" fill="${RED}"/>
</g>`;

const smallPanel = (x, y, lamps) => `
<g transform="translate(${x} ${y})">
  <rect x="-40" y="-34" width="80" height="68" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="3"/>
  ${lamps}
</g>`;
const dot = (x, y, c) => `<circle cx="${x}" cy="${y}" r="6" fill="${c}" stroke="#475569" stroke-width="1.5"/>`;

const horn = (x, y) => `
<g transform="translate(${x} ${y})">
  <path d="M-34 -16 H-6 L30 -40 V40 L-6 16 H-34 Z" fill="${RED}" stroke="#7F1D1D" stroke-width="3" stroke-linejoin="round"/>
  <path d="M40 -22 Q54 0 40 22 M52 -34 Q74 0 52 34" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>
</g>`;

const beacon = (x, y) => `
<g transform="translate(${x} ${y})">
  <path d="M-30 30 V4 Q-30 -34 0 -34 Q30 -34 30 4 V30 Z" fill="${RED}" stroke="#7F1D1D" stroke-width="3"/>
  <rect x="-40" y="30" width="80" height="12" rx="3" fill="#475569"/>
  <path d="M-52 -26 L-40 -18 M52 -26 L40 -18 M0 -52 V-42" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="0" cy="-6" r="9" fill="#FECACA"/>
</g>`;

const warning = (x, y) => `
<g transform="translate(${x} ${y})">
  <path d="M0 -34 L38 30 H-38 Z" fill="#FBBF24" stroke="#92400E" stroke-width="4" stroke-linejoin="round"/>
  <path d="M0 -12 V8" stroke="#1E293B" stroke-width="6" stroke-linecap="round"/>
  <circle cx="0" cy="19" r="3.5" fill="#1E293B"/>
</g>`;

const indicator = (x, y) => smallPanel(x, y, `
  <rect x="-28" y="-24" width="56" height="24" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
  <circle cx="-14" cy="14" r="5" fill="${RED}"/><circle cx="2" cy="14" r="5" fill="#16A34A"/>`);
const operating = (x, y) => smallPanel(x, y, `
  <rect x="-24" y="-22" width="48" height="26" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
  <circle cx="-14" cy="18" r="6" fill="#94A3B8"/><circle cx="6" cy="18" r="6" fill="#94A3B8"/><circle cx="24" cy="18" r="3" fill="${RED}"/>`);
const keyDepot = (x, y) => `
<g transform="translate(${x} ${y})">
  <rect x="-36" y="-36" width="72" height="72" rx="6" fill="#64748B" stroke="#334155" stroke-width="3"/>
  <circle cx="0" cy="-6" r="9" fill="#1E293B"/><rect x="-3" y="0" width="6" height="18" fill="#1E293B"/>
</g>`;

const person = (x, y) => `<circle cx="${x}" cy="${y - 14}" r="7" fill="#64748B"/><path d="M${x - 10} ${y + 22} V${y - 2} Q${x - 10} ${y - 6} ${x - 5} ${y - 6} H${x + 5} Q${x + 10} ${y - 6} ${x + 10} ${y - 2} V${y + 22} Z" fill="#64748B"/>`;
const lift = (x, y) => `
<g transform="translate(${x} ${y})">
  <rect x="-52" y="-52" width="104" height="104" rx="6" fill="#F8FAFC" stroke="#475569" stroke-width="4"/>
  <path d="M-30 -34 V-44 M-36 -38 L-30 -45 L-24 -38 M30 -44 V-34 M24 -40 L30 -33 L36 -40" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
  ${person(-26, 14)}${person(0, 14)}${person(26, 14)}
</g>`;
const smoke = (x, y) => `
<g transform="translate(${x} ${y})">
  <rect x="-52" y="-52" width="104" height="104" rx="6" fill="#F8FAFC" stroke="#475569" stroke-width="4"/>
  <circle cx="0" cy="-8" r="28" fill="#E2E8F0" stroke="#475569" stroke-width="3"/>
  <path d="M0 -8 L0 -32 M0 -8 L24 4 M0 -8 L-24 4" stroke="#475569" stroke-width="7" stroke-linecap="round"/>
  <circle cx="0" cy="-8" r="5" fill="#475569"/>
  <ellipse cx="-24" cy="36" rx="16" ry="9" fill="#94A3B8" opacity="0.7"/><ellipse cx="6" cy="40" rx="20" ry="10" fill="#94A3B8" opacity="0.6"/><ellipse cx="34" cy="34" rx="12" ry="8" fill="#94A3B8" opacity="0.5"/>
</g>`;
const door = (x, y) => `
<g transform="translate(${x} ${y})">
  <rect x="-52" y="-52" width="104" height="104" rx="6" fill="#F8FAFC" stroke="#475569" stroke-width="4"/>
  <rect x="-24" y="-40" width="48" height="84" fill="#E2E8F0" stroke="#475569" stroke-width="4"/>
  <path d="M24 -40 L44 -30 V34 L24 44 Z" fill="#CBD5E1" stroke="#475569" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-34 6 H-10 M-18 -4 L-8 6 L-18 16" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</g>`;

// control panel
const panel = `
<g>
  <rect x="440" y="100" width="260" height="400" rx="10" fill="#E2E8F0" stroke="#64748B" stroke-width="5"/>
  <rect x="462" y="124" width="216" height="130" rx="4" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>
  ${[0, 1, 2, 3, 4, 5].map((r) => `<line x1="470" y1="${140 + r * 18}" x2="670" y2="${140 + r * 18}" stroke="#CBD5E1" stroke-width="2"/>`).join("")}
  ${[0, 1, 2, 3, 4].map((c) => `<line x1="${490 + c * 40}" y1="130" x2="${490 + c * 40}" y2="248" stroke="#CBD5E1" stroke-width="2"/>`).join("")}
  <rect x="470" y="140" width="40" height="14" fill="#CBD5E1"/><rect x="590" y="176" width="40" height="14" fill="#CBD5E1"/>
  ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${478 + i * 26}" cy="276" r="7" fill="${i === 0 ? "#16A34A" : i === 1 ? "#FBBF24" : "#94A3B8"}" stroke="#64748B" stroke-width="1.5"/>`).join("")}
  <rect x="462" y="300" width="216" height="168" rx="6" fill="#CBD5E1"/>
  ${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => `<rect x="${478 + c * 40}" y="${316 + r * 34}" width="30" height="22" rx="4" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5"/>`).join("")).join("")}
  <circle cx="660" cy="484" r="5" fill="#475569"/>
</g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 70 1140 660" width="1140" height="660">
<rect y="70" width="1140" height="660" fill="#FFFFFF"/>

<!-- detection loop -->
<path d="M120 170 C16 170 16 300 120 300" fill="none" stroke="${ARROW}" stroke-width="5" stroke-linecap="round"/>
${line(120, 170, 440, 170)}${arrowHead(440, 170, "r")}
${line(120, 300, 331, 300)}
${line(349, 300, 440, 300)}${arrowHead(440, 300, "r")}
<circle cx="340" cy="300" r="9" fill="#FFFFFF" stroke="${ARROW}" stroke-width="5"/>
${line(340, 382, 340, 309)}${arrowHead(340, 309, "u")}
${line(120, 420, 302, 420)}
${detector(130, 150)}${detector(260, 150)}${detector(380, 150)}
${detector(130, 280)}${callPoint(270, 300)}
${detector(130, 400)}${callPoint(340, 420)}

<!-- panel -->
${panel}

<!-- alarm outputs -->
${line(700, 170, 820, 170)}${arrowHead(820, 170, "r")}
${horn(900, 170)}${line(960, 170, 1010, 170)}${arrowHead(1010, 170, "r")}${beacon(1080, 170)}
${line(700, 300, 880, 300)}${arrowHead(880, 300, "r")}
${smallPanel(950, 300, `${dot(-12, -12, RED)}${dot(12, -12, "#94A3B8")}${dot(-12, 12, "#94A3B8")}${dot(12, 12, "#94A3B8")}`)}
${line(700, 420, 880, 420)}${arrowHead(880, 420, "r")}
${warning(950, 420)}

<!-- control functions -->
${line(570, 500, 570, 540)}
${line(120, 540, 1010, 540)}
${[120, 270, 420, 640, 810, 980].map((x) => `${line(x, 540, x, 574)}${arrowHead(x, 574, "d")}`).join("")}
${indicator(120, 640)}${operating(270, 640)}${keyDepot(420, 640)}${lift(640, 640)}${smoke(810, 640)}${door(980, 640)}
</svg>`;

(async () => {
  const out = path.join(root, "public", "services", "covers", "_feature-pozharoizvestyavane.png");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("ok", out);
})();
