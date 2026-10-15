// Draws the text-free emergency lighting illustration used on the "Emergency
// evacuation lighting" service cover: a dark corridor, an emergency luminaire,
// the cone of light on the floor, and an exit sign above the door.
// Output: public/services/covers/_feature-evakuatsionno-osvetlenie.png
// Run: node scripts/draw-escape-lighting-diagram.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const sign =
  "data:image/svg+xml;base64," +
  fs.readFileSync(path.join(root, "public", "blog", "iso16069", "exit-right.svg")).toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600">
<defs>
  <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.85"/>
    <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.3"/>
    <stop offset="1" stop-color="#FFFFFF" stop-opacity="0.16"/>
  </linearGradient>
  <radialGradient id="wallglow" cx="0.5" cy="0.35" r="0.65">
    <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.5"/>
    <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1F2937"/><stop offset="1" stop-color="#0B1220"/>
  </linearGradient>
</defs>

<!-- room -->
<rect width="1000" height="600" fill="#0B1220"/>
<polygon points="0,0 1000,0 700,170 300,170" fill="#0F172A"/>
<polygon points="0,0 300,170 300,380 0,600" fill="#1E293B"/>
<polygon points="1000,0 700,170 700,380 1000,600" fill="#1E293B"/>
<polygon points="300,380 700,380 1000,600 0,600" fill="url(#floor)"/>
<rect x="300" y="170" width="400" height="210" fill="#4B5563"/>
<rect x="300" y="170" width="400" height="210" fill="url(#wallglow)"/>
<g stroke="#64748B" stroke-width="2" fill="none" opacity="0.7">
  <polygon points="0,0 300,170 300,380 0,600"/><polygon points="1000,0 700,170 700,380 1000,600"/>
  <rect x="300" y="170" width="400" height="210"/>
</g>

<!-- light on the floor -->
<polygon points="470,186 530,186 800,600 200,600" fill="url(#cone)"/>
<polygon points="500,380 500,380 570,380 745,600 255,600 430,380" fill="#FFFFFF" opacity="0.1"/>

<!-- floor marks -->
<g stroke="#000000" stroke-width="6" stroke-linecap="round" opacity="0.9">
  <line x1="430" y1="384" x2="255" y2="598"/>
  <line x1="500" y1="384" x2="500" y2="598"/>
  <line x1="570" y1="384" x2="745" y2="598"/>
</g>

<!-- door -->
<rect x="452" y="236" width="96" height="144" fill="#D1D5DB" stroke="#9CA3AF" stroke-width="3"/>
<rect x="460" y="244" width="80" height="136" fill="#E5E7EB"/>
<circle cx="533" cy="318" r="4" fill="#6B7280"/>

<!-- exit sign and luminaire -->
<image href="${sign}" x="466" y="194" width="68" height="35"/>
<rect x="452" y="172" width="96" height="12" rx="6" fill="#FFFFFF"/>
<ellipse cx="500" cy="186" rx="60" ry="9" fill="#FFFFFF" opacity="0.5"/>
</svg>`;

(async () => {
  const out = path.join(root, "public", "services", "covers", "_feature-evakuatsionno-osvetlenie.png");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("ok", out);
})();
