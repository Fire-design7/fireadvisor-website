// Draws the text-free smoke and heat ventilation diagram used on the ВСОДТ
// service cover: a fire under a smoke layer, hot gases leaving through roof
// vents and fresh air entering through low-level openings.
// Output: public/services/covers/_feature-vsodt.png
// Run: node scripts/draw-smoke-ventilation-diagram.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const WALL = "#475569";
const HOT = "#EF4444";
const COLD = "#38BDF8";

const flame = (x, y, s = 1) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 -78 C22 -46 42 -32 42 0 C42 26 22 40 0 40 C-22 40 -42 26 -42 0 C-42 -20 -28 -30 -20 -48 C-13 -32 -4 -38 0 -78 Z" fill="#F97316"/>
  <path d="M0 -34 C11 -16 22 -9 22 9 C22 22 11 31 0 31 C-11 31 -22 22 -22 9 C-22 -2 -13 -7 0 -34 Z" fill="#FBBF24"/>
  <path d="M0 -6 C6 4 12 8 12 17 C12 24 6 28 0 28 C-6 28 -12 24 -12 17 C-12 10 -6 6 0 -6 Z" fill="#FEF3C7"/>
</g>`;

// a hot-gas arrow rising through a roof vent
const hotArrow = (x) => `
<path d="M${x - 30} 270 C${x - 30} 210 ${x + 14} 190 ${x + 8} 130 C${x + 4} 100 ${x - 4} 90 ${x - 4} 66" fill="none" stroke="${HOT}" stroke-width="22" stroke-linecap="round"/>
<path d="M${x - 34} 78 L${x - 4} 34 L${x + 28} 78 Z" fill="${HOT}" stroke="${HOT}" stroke-width="6" stroke-linejoin="round"/>`;

// fresh air entering low in a wall
const coldArrow = (x, dir) => {
  const s = dir; // 1 = from the left, -1 = from the right
  const x0 = x, x1 = x + s * 130;
  return `
<path d="M${x0} 470 C${x0 + s * 50} 470 ${x0 + s * 80} 430 ${x1} 420" fill="none" stroke="${COLD}" stroke-width="20" stroke-linecap="round"/>
<path d="M${x1 + s * 4} 392 L${x1 + s * 34} 426 L${x1 - s * 6} 446 Z" fill="${COLD}" stroke="${COLD}" stroke-width="6" stroke-linejoin="round"/>`;
};

// smoke layer under the ceiling
const puffs = [];
for (let i = 0; i < 12; i++) {
  const x = 196 + i * 52;
  const r = 34 + ((i * 7) % 5) * 5;
  puffs.push(`<circle cx="${x}" cy="${262 + ((i * 11) % 4) * 6}" r="${r}" fill="${i % 2 ? "#9CA3AF" : "#B6BCC6"}"/>`);
}
for (let i = 0; i < 9; i++) {
  puffs.push(`<circle cx="${226 + i * 70}" cy="${236 + ((i * 5) % 3) * 4}" r="${28 + (i % 3) * 5}" fill="#6B7280" opacity="0.75"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 640" width="1000" height="640">
<defs>
  <linearGradient id="plume" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="#1F2937"/><stop offset="1" stop-color="#9CA3AF"/>
  </linearGradient>
</defs>
<rect width="1000" height="640" fill="#FFFFFF"/>

<!-- smoke layer and plume -->
${puffs.join("\n")}
<path d="M486 520 C478 440 450 400 440 330 C436 300 440 280 450 262 L560 262 C570 280 574 300 566 330 C556 400 526 440 514 520 Z" fill="url(#plume)"/>
<ellipse cx="500" cy="506" rx="24" ry="30" fill="#374151"/>
${flame(500, 534, 0.95)}

<!-- roof with three vents -->
<g fill="${WALL}">
  <rect x="140" y="200" width="160" height="26"/>
  <rect x="380" y="200" width="100" height="26"/>
  <rect x="560" y="200" width="100" height="26"/>
  <rect x="740" y="200" width="120" height="26"/>
</g>
<!-- open flaps -->
<g stroke="#9CA3AF" stroke-width="2">
  <polygon points="300,186 368,134 376,146 308,198" fill="#CBD5E1"/>
  <polygon points="480,186 548,134 556,146 488,198" fill="#CBD5E1"/>
  <polygon points="660,186 728,134 736,146 668,198" fill="#CBD5E1"/>
</g>
${hotArrow(340)}${hotArrow(520)}${hotArrow(700)}

<!-- walls and floor -->
<g fill="${WALL}">
  <rect x="140" y="200" width="26" height="150"/>
  <rect x="140" y="480" width="26" height="100"/>
  <rect x="834" y="200" width="26" height="150"/>
  <rect x="834" y="480" width="26" height="100"/>
  <rect x="140" y="560" width="720" height="26"/>
</g>
<!-- low-level openings with louvres -->
<g stroke="#9CA3AF" stroke-width="2">
  <polygon points="166,486 232,440 240,452 174,498" fill="#CBD5E1"/>
  <polygon points="834,486 768,440 760,452 826,498" fill="#CBD5E1"/>
</g>
${coldArrow(20, 1)}${coldArrow(980, -1)}
</svg>`;

(async () => {
  const out = path.join(root, "public", "services", "covers", "_feature-vsodt.png");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("ok", out);
})();
