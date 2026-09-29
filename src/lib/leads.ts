// Shared helper for every "email capture" form on the site (resource
// downloads, newsletter signup, ...). All of them forward to the same
// Google Apps Script Web App, which appends a row to one Google Sheet —
// see D:\ПБ\site-leads-Code.gs for the script and setup instructions.

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isNonEmptyString(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

interface LeadPayload {
  type: string;
  name?: string;
  email: string;
  detail?: string;
  locale: string;
  source: string;
}

interface LeadResult {
  ok: boolean;
  duplicate?: boolean;
  error?: string;
}

export async function forwardLead(payload: LeadPayload): Promise<LeadResult> {
  const scriptUrl = process.env.LEADS_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("[leads] Missing LEADS_SCRIPT_URL env var");
    return { ok: false, error: "Not configured" };
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as LeadResult;
    if (!data.ok) {
      console.error("[leads] Apps Script rejected submission", data.error);
      return { ok: false, error: data.error };
    }
    return { ok: true, duplicate: data.duplicate };
  } catch (err) {
    console.error("[leads] Failed to reach Apps Script", err);
    return { ok: false, error: "unreachable" };
  }
}
