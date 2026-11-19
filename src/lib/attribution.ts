import { ATTRIBUTION_KEYS } from "@/content/inquiry-options";

// Browser-only helpers. Ad clicks usually land on the homepage or a service
// page, not on /kontakti — so UTM/GCLID are captured on landing and kept for
// the rest of the visit (sessionStorage: this tab only, cleared when it
// closes), then attached to the inquiry when it is sent.

const STORAGE_KEY = "fa_attribution";
const LEAD_FLAG_KEY = "fa_inquiry_sent";

export interface Attribution {
  params: Record<string, string>;
  landingPage?: string;
}

function readParams(search: string) {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) result[key] = value.slice(0, 200);
  }
  return result;
}

function safeGet(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage blocked (private mode, strict settings) — the current URL is
    // still read at submit time, so only the cross-page carry-over is lost.
  }
}

function safeRemove(key: string) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {}
}

/** Call once per full page load. A new ad click replaces the earlier one. */
export function captureAttribution() {
  const params = readParams(window.location.search);
  if (Object.keys(params).length === 0) return;
  const data: Attribution = { params, landingPage: window.location.pathname };
  safeSet(STORAGE_KEY, JSON.stringify(data));
}

/** Stored landing attribution merged with whatever is in the current URL. */
export function getAttribution(): Attribution {
  let stored: Attribution = { params: {} };
  const raw = safeGet(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.params) stored = parsed;
    } catch {}
  }
  const current = readParams(window.location.search);
  if (Object.keys(current).length > 0) {
    return { params: current, landingPage: stored.landingPage ?? window.location.pathname };
  }
  return stored;
}

/** Marks that the server accepted an inquiry, for the thank-you page. */
export function markInquirySent(service: string) {
  safeSet(LEAD_FLAG_KEY, JSON.stringify({ service, at: Date.now() }));
}

/**
 * Returns the pending conversion (once) and clears it, so reloading the
 * thank-you page, going back to it, or opening it directly never counts again.
 */
export function consumeInquirySent(): { service: string } | null {
  const raw = safeGet(LEAD_FLAG_KEY);
  if (!raw) return null;
  safeRemove(LEAD_FLAG_KEY);
  try {
    const parsed = JSON.parse(raw);
    // Ignore a stale flag (e.g. left behind if the redirect never happened).
    if (typeof parsed?.at === "number" && Date.now() - parsed.at < 10 * 60 * 1000) {
      return { service: String(parsed.service ?? "") };
    }
  } catch {}
  return null;
}
