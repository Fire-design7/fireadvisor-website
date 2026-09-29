import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Same lightweight per-instance rate limit as /api/inquiries — best-effort,
// just enough to stop naive bots from spamming the leads sheet.
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

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isNonEmptyString(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const scriptUrl = process.env.RESOURCE_LEADS_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("[resource-leads] Missing RESOURCE_LEADS_SCRIPT_URL env var");
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, resource, locale } = body;

  if (!isNonEmptyString(name, 200) || !isValidEmail(email) || !isNonEmptyString(resource, 200)) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const safeLocale = locale === "en" ? "en" : "bg";

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        resource,
        locale: safeLocale,
        source: request.headers.get("referer") ?? "",
      }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!data.ok) {
      console.error("[resource-leads] Apps Script rejected submission", data.error);
      return NextResponse.json({ ok: false, error: "Could not save lead" }, { status: 502 });
    }
  } catch (err) {
    console.error("[resource-leads] Failed to reach Apps Script", err);
    return NextResponse.json({ ok: false, error: "Could not save lead" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
