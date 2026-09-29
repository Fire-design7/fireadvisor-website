import { NextRequest, NextResponse } from "next/server";
import { forwardLead, isValidEmail } from "@/lib/leads";

export const runtime = "nodejs";

// Same lightweight per-instance rate limit as the other lead-capture routes.
const submissionsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { email, locale } = body;

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const safeLocale = locale === "en" ? "en" : "bg";

  const result = await forwardLead({
    type: "бюлетин",
    email,
    locale: safeLocale,
    source: request.headers.get("referer") ?? "",
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Could not save lead" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, duplicate: result.duplicate === true });
}
