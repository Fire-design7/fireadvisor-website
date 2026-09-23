import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Self-contained static landing page (inline CSS/JS, no build step) for the
// 2026-10-28 Protecta/Polyseam webinar. Served as raw HTML via a route
// handler instead of a public/ file, since Next.js's static file serving
// has no directory-index fallback — public/seminar/index.html would only
// ever be reachable at the literal path /seminar/index.html, not /seminar.
const html = fs.readFileSync(
  path.join(process.cwd(), "src/app/seminar/page.html"),
  "utf-8"
);

export function GET() {
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
