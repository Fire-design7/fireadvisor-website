// Decorative dotted map of Bulgaria with a marker on Plovdiv, drawn behind
// the homepage hero ("we work across the whole country", shown, not said).
// The outline is a simplified border (longitude, latitude); dots are laid on
// a grid and kept when they fall inside it. Computed once at module load.

const border: [number, number][] = [
  [22.67, 44.22], [23.0, 43.85], [23.6, 43.8], [24.0, 43.7], [24.6, 43.7],
  [25.4, 43.62], [25.95, 43.85], [26.6, 44.03], [27.27, 44.12], [27.7, 43.95],
  [28.58, 43.74], [28.58, 43.42], [28.0, 43.25], [27.9, 42.9], [27.75, 42.7],
  [27.45, 42.48], [27.75, 42.25], [28.03, 41.98], [27.55, 42.0], [27.0, 42.05],
  [26.6, 41.95], [26.33, 41.72], [25.9, 41.35], [25.2, 41.25], [24.5, 41.55],
  [23.9, 41.45], [23.6, 41.38], [23.0, 41.33], [22.95, 41.6], [22.85, 42.0],
  [22.36, 42.32], [22.44, 42.8], [22.75, 43.0], [22.97, 43.2], [22.5, 43.45],
  [22.4, 43.8], [22.67, 44.22],
];

const LON_MIN = 22.3;
const LON_MAX = 28.7;
const LAT_MIN = 41.2;
const LAT_MAX = 44.3;
// Longitude degrees are shorter than latitude degrees at this latitude.
const X_SCALE = Math.cos((42.7 * Math.PI) / 180);
const UNIT = 100;
const WIDTH = (LON_MAX - LON_MIN) * X_SCALE * UNIT;
const HEIGHT = (LAT_MAX - LAT_MIN) * UNIT;
const STEP = 9;

function project(lon: number, lat: number): [number, number] {
  return [(lon - LON_MIN) * X_SCALE * UNIT, (LAT_MAX - lat) * UNIT];
}

const polygon = border.map(([lon, lat]) => project(lon, lat));

function inside(x: number, y: number) {
  let hit = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const dots: [number, number][] = [];
for (let y = STEP / 2; y < HEIGHT; y += STEP) {
  for (let x = STEP / 2; x < WIDTH; x += STEP) {
    if (inside(x, y)) dots.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }
}

const [plovdivX, plovdivY] = project(24.75, 42.15);

export function BulgariaDotMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${Math.round(WIDTH)} ${Math.round(HEIGHT)}`}
      className={className}
      aria-hidden
      focusable="false"
    >
      <g fill="currentColor">
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={2.1} />
        ))}
      </g>
      <circle cx={plovdivX} cy={plovdivY} r={14} className="fill-amber-400/25 motion-safe:animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <circle cx={plovdivX} cy={plovdivY} r={6} className="fill-amber-400" />
    </svg>
  );
}
