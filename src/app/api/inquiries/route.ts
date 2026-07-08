import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendInquiryEmails } from "@/lib/email";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 2000;

// Simple in-memory rate limit — best-effort per server instance. Not a
// substitute for a proper edge/CAPTCHA solution, but stops naive bots.
const submissionsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

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

function isNonEmptyString(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, inquiryType, buildingType, service, message, locale } = body;

  if (!isNonEmptyString(name, 200) || !isValidEmail(email) || !isNonEmptyString(inquiryType, 100) || !isNonEmptyString(buildingType, 100)) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const safeLocale = locale === "en" ? "en" : "bg";
  const safePhone = typeof phone === "string" ? phone.slice(0, 50) : undefined;
  const safeService = typeof service === "string" && service.length > 0 ? service.slice(0, 100) : undefined;
  const safeMessage = typeof message === "string" ? message.slice(0, MAX_FIELD_LENGTH) : undefined;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      phone: safePhone,
      inquiry_type: inquiryType,
      building_type: buildingType,
      service_slug: safeService,
      message: safeMessage,
      locale: safeLocale,
    });
    if (error) throw error;
  } catch (err) {
    console.error("Failed to store inquiry", err);
    return NextResponse.json({ error: "Could not save inquiry" }, { status: 500 });
  }

  try {
    await sendInquiryEmails({
      name: name as string,
      email: email as string,
      phone: safePhone,
      inquiryType: inquiryType as string,
      buildingType: buildingType as string,
      serviceSlug: safeService,
      message: safeMessage,
      locale: safeLocale,
    });
  } catch (err) {
    // The inquiry is already saved in Supabase, so we don't fail the request
    // over an email hiccup — but we do want to know about it.
    console.error("Failed to send inquiry emails", err);
  }

  return NextResponse.json({ ok: true });
}
