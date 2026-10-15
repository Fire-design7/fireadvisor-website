// Draws the text-free sprinkler illustration used on the "Fire suppression
// systems" service cover: two pendant sprinklers spraying over a fire.
// Output: public/services/covers/_feature-gasitelni-instalatsii.png
// Run: node scripts/draw-sprinkler-diagram.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");

let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

const flame = (x, y, s = 1) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 -78 C22 -46 42 -32 42 0 C42 26 22 40 0 40 C-22 40 -42 26 -42 0 C-42 -20 -28 -30 -20 -48 C-13 -32 -4 -38 0 -78 Z" fill="#F97316"/>
  <path d="M0 -34 C11 -16 22 -9 22 9 C22 22 11 31 0 31 C-11 31 -22 22 -22 9 C-22 -2 -13 -7 0 -34 Z" fill="#FBBF24"/>
  <path d="M0 -6 C6 4 12 8 12 17 C12 24 6 28 0 28 C-6 28 -12 24 -12 17 C-12 10 -6 6 0 -6 Z" fill="#FEF3C7"/>
</g>`;

const spray = (cx, y0, y1, spread) => {
  let out = `<path d="M${cx - 30} ${y0} L${cx - spread} ${y1} L${cx + spread} ${y1} L${cx + 30} ${y0} Z" fill="url(#water)"/>`;
  for (let i = 0; i < 70; i++) {
    const t = rnd();
    const y = y0 + 8 + t * (y1 - y0 - 10);
    const half = 30 + (spread - 30) * t;
    const x = cx + (rnd() * 2 - 1) * half;
    const r = 2.4 + rnd() * 4.2;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${rnd() > 0.5 ? "#38BDF8" : "#7DD3FC"}"/>`;
  }
  for (let i = 0; i < 16; i++) {
    const t = 0.1 + rnd() * 0.8;
    const y = y0 + t * (y1 - y0);
    const half = (30 + (spread - 30) * t) * 0.95;
    const x = cx + (rnd() * 2 - 1) * half;
    out += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + (x - cx) * 0.06).toFixed(1)}" y2="${(y + 22).toFixed(1)}" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" opacity="0.7"/>`;
  }
  return out;
};

const sprinkler = (cx) => `
<!-- pipe stub -->
<rect x="${cx - 14}" y="44" width="28" height="48" fill="url(#pipe)"/>
<!-- escutcheon -->
<ellipse cx="${cx}" cy="96" rx="104" ry="22" fill="url(#chrome)" stroke="#94A3B8" stroke-width="2"/>
<ellipse cx="${cx}" cy="94" rx="64" ry="12" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.8"/>
<!-- body -->
<path d="M${cx - 24} 100 H${cx + 24} L${cx + 17} 166 H${cx - 17} Z" fill="url(#metal)" stroke="#6B7280" stroke-width="2"/>
<rect x="${cx - 24}" y="130" width="48" height="8" fill="#B58A2A" opacity="0.9"/>
<!-- frame arms -->
<path d="M${cx - 22} 160 C${cx - 38} 190 ${cx - 28} 220 ${cx - 14} 246" fill="none" stroke="#7B8794" stroke-width="13" stroke-linecap="round"/>
<path d="M${cx + 22} 160 C${cx + 38} 190 ${cx + 28} 220 ${cx + 14} 246" fill="none" stroke="#7B8794" stroke-width="13" stroke-linecap="round"/>
<!-- glass bulb -->
<rect x="${cx - 11}" y="150" width="22" height="72" rx="11" fill="#EF4444"/>
<rect x="${cx - 6}" y="156" width="5" height="48" rx="2.5" fill="#FCA5A5" opacity="0.8"/>
<rect x="${cx - 9}" y="206" width="18" height="22" rx="6" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5"/>
<!-- deflector -->
<ellipse cx="${cx}" cy="250" rx="52" ry="11" fill="#9CA3AF" stroke="#6B7280" stroke-width="2"/>
${[-44, -30, -16, 0, 16, 30, 44].map((dx) => `<rect x="${cx + dx - 3}" y="254" width="6" height="9" rx="2" fill="#9CA3AF"/>`).join("")}
${spray(cx, 262, 548, 210)}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 640" width="1000" height="640">
<defs>
  <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#F3F4F6"/><stop offset="0.5" stop-color="#CBD5E1"/><stop offset="1" stop-color="#94A3B8"/>
  </linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#6B7280"/><stop offset="0.45" stop-color="#E5E7EB"/><stop offset="1" stop-color="#6B7280"/>
  </linearGradient>
  <linearGradient id="pipe" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#64748B"/><stop offset="0.45" stop-color="#CBD5E1"/><stop offset="1" stop-color="#64748B"/>
  </linearGradient>
  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#BAE6FD" stop-opacity="0.75"/><stop offset="1" stop-color="#BAE6FD" stop-opacity="0.12"/>
  </linearGradient>
</defs>
<rect width="1000" height="640" fill="#FFFFFF"/>
<!-- main pipe -->
<rect x="0" y="22" width="1000" height="32" fill="url(#pipe)"/>
<rect x="0" y="22" width="1000" height="6" fill="#FFFFFF" opacity="0.35"/>
<!-- floor -->
<rect x="0" y="584" width="1000" height="26" fill="#475569"/>
${sprinkler(280)}
${sprinkler(720)}
${flame(500, 538, 1.15)}
</svg>`;

(async () => {
  const out = path.join(root, "public", "services", "covers", "_feature-gasitelni-instalatsii.png");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("ok", out);
})();
