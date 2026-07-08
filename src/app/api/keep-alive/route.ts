import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// Supabase's free tier pauses a project after 7 days without database
// activity, and resuming it requires a manual click in the dashboard — it
// does not auto-wake on the next request. A daily cron hit here (see
// vercel.json) keeps the project active so the contact form's backup
// record never silently breaks between real inquiries.
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from("inquiries").select("id").limit(1);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Keep-alive ping failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
