// Composes the "Fire risk assessment" cover image: a photo of red fire
// extinguishers with a clipboard holding a risk checklist laid over it.
// The photo is Pexels 29106030 (free licence), stored as
// public/services/covers/_photo-risk-extinguishers.jpg.
// Output: public/services/covers/_feature-otsenka-na-risk.png
// Run: node scripts/compose-risk-assessment-image.js
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const dir = path.join(root, "public", "services", "covers");
const W = 1200, H = 630;

const check = (x, y) => `<path d="M${x - 8} ${y} L${x - 2} ${y + 7} L${x + 9} ${y - 8}" fill="none" stroke="#16A34A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;

// clipboard with a risk checklist, drawn in its own coordinate system and then rotated
const board = `
<g transform="translate(822 150) rotate(-7)">
  <rect x="0" y="0" width="330" height="440" rx="14" fill="url(#wood)" filter="url(#shadow)"/>
  <rect x="26" y="40" width="278" height="380" rx="3" fill="url(#paper)"/>
  <!-- clip -->
  <rect x="104" y="6" width="122" height="46" rx="8" fill="url(#metal)" stroke="#6B7280" stroke-width="2"/>
  <rect x="132" y="-6" width="66" height="22" rx="6" fill="url(#metal)" stroke="#6B7280" stroke-width="2"/>
  <!-- heading and rows -->
  <rect x="48" y="74" width="140" height="12" rx="3" fill="#374151"/>
  <rect x="48" y="96" width="210" height="6" rx="3" fill="#D1D5DB"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="50" y="${126 + i * 36}" width="18" height="18" rx="3" fill="#FFFFFF" stroke="#6B7280" stroke-width="2"/>${i < 3 ? check(59, 135 + i * 36) : ""}<rect x="82" y="${130 + i * 36}" width="${150 - (i % 2) * 34}" height="8" rx="3" fill="#9CA3AF"/><rect x="82" y="${142 + i * 36}" width="90" height="5" rx="2.5" fill="#D1D5DB"/>`).join("")}
  <!-- small risk matrix -->
  ${[["#16A34A", "#65A30D", "#CA8A04"], ["#65A30D", "#CA8A04", "#EA580C"], ["#CA8A04", "#EA580C", "#DC2626"]]
    .map((row, r) => row.map((c, k) => `<rect x="${56 + k * 44}" y="${284 + r * 40}" width="40" height="36" rx="3" fill="${c}"/>`).join("")).join("")}
  <circle cx="${56 + 2 * 44 + 20}" cy="${284 + 40 + 18}" r="10" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>
  <!-- pen -->
  <g transform="translate(262 330) rotate(24)">
    <rect x="-7" y="0" width="14" height="150" rx="7" fill="#111827"/><rect x="-7" y="0" width="14" height="30" rx="7" fill="#F59E0B"/>
    <polygon points="-5,150 5,150 0,166" fill="#9CA3AF"/>
  </g>
</g>`;

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B98A5A"/><stop offset="1" stop-color="#8F643A"/></linearGradient>
  <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF0F3"/></linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E5E7EB"/><stop offset="1" stop-color="#9CA3AF"/></linearGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="10" dy="16" stdDeviation="14" flood-color="#000000" flood-opacity="0.55"/></filter>
  <radialGradient id="vignette" cx="0.45" cy="0.5" r="0.8"><stop offset="0.5" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.55"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#vignette)"/>
${board}
</svg>`;

(async () => {
  const photo = await sharp(path.join(dir, "_photo-risk-extinguishers.jpg"))
    .resize(W, H, { fit: "cover", position: "left" })
    .modulate({ brightness: 1.15, saturation: 1.1 })
    .toBuffer();
  await sharp(photo)
    .composite([{ input: Buffer.from(overlay) }])
    .png()
    .toFile(path.join(dir, "_feature-otsenka-na-risk.png"));
  console.log("ok");
})();
