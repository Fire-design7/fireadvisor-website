import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendInquiryEmails } from "@/lib/email";
import { forwardLead, isValidEmail } from "@/lib/leads";
import { getServiceBySlug } from "@/content/services";
import {
  ATTRIBUTION_KEYS,
  FIRE_ALARM_SLUG,
  NOT_SURE,
  buildingTypes,
  isFireAlarmScope,
  validateInquiry,
} from "@/content/inquiry-options";

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

function str(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

  const name = str(body.name, 200);
  const email = str(body.email, 200);
  const phone = str(body.phone, 50);
  const service = str(body.service, 100);
  const message = str(body.message, MAX_FIELD_LENGTH);

  // Same rules as the form: a name, a service choice, a short description of
  // the request and at least one valid way to reach the person — phone or
  // email, either one is enough.
  const errors = validateInquiry({ name, email, phone, service, message });
  if (service && service !== NOT_SURE && !getServiceBySlug(service)) {
    errors.service = "serviceRequired";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid submission", errors }, { status: 400 });
  }

  const rawScope = body.scope;
  const scope = service === FIRE_ALARM_SLUG && isFireAlarmScope(rawScope) ? rawScope : undefined;
  const buildingType = (buildingTypes as readonly string[]).includes(str(body.buildingType, 50))
    ? str(body.buildingType, 50)
    : undefined;
  const safeLocale = body.locale === "en" ? "en" : "bg";
  const safeMessage = message;
  const safeSourcePage = str(body.sourcePage, 200) || undefined;
  const safeLandingPage = str(body.landingPage, 200) || undefined;

  const utm: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = str(body[key], 200);
    if (value) utm[key] = value;
  }

  // Email is the primary delivery path — it must not be blocked by Supabase
  // being unreachable (e.g. a paused free-tier project after 7 days of
  // inactivity). Supabase is a best-effort backup record, not a gate.
  try {
    await sendInquiryEmails({
      name,
      email: email || undefined,
      phone: phone || undefined,
      service,
      scope,
      buildingType,
      message: safeMessage,
      locale: safeLocale,
      sourcePage: safeSourcePage,
      landingPage: safeLandingPage,
      utm,
      submittedAt: new Date(),
    });
  } catch (err) {
    console.error("Failed to send inquiry emails", err);
    return NextResponse.json({ error: "Could not send inquiry" }, { status: 500 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("inquiries").insert({
      name,
      // The table's email/building_type columns are NOT NULL — an empty
      // string keeps phone-only inquiries storable without a migration.
      email: email || "",
      phone: phone || null,
      inquiry_type: scope ? `${service}:${scope}` : service,
      building_type: buildingType ?? "",
      service_slug: service === NOT_SURE ? null : service,
      message: safeMessage,
      locale: safeLocale,
    });
    if (error) throw error;
  } catch (err) {
    // The email already went out, so the inquiry reached the owner — a
    // failed backup record shouldn't fail the request for the visitor.
    console.error("Failed to store inquiry in Supabase", err);
  }

  // Newsletter opt-in from the form's (unticked by default) checkbox — the
  // same sheet the footer signup writes to. Best-effort: the inquiry is the
  // point of this request, so a failure here never fails it.
  if (body.newsletter === true && isValidEmail(email)) {
    const result = await forwardLead({
      type: "бюлетин",
      name,
      email,
      detail: "от формуляра за запитване",
      locale: safeLocale,
      source: safeSourcePage ?? request.headers.get("referer") ?? "",
    });
    if (!result.ok) console.error("Failed to add newsletter opt-in", result.error);
  }

  return NextResponse.json({ ok: true });
}
