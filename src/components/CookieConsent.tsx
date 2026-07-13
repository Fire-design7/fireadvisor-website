"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const CONSENT_STORAGE_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-changed";

export type ConsentValue = "granted" | "denied";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function setConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(value: ConsentValue) {
    setConsent(value);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-700 bg-slate-900 px-4 py-5 text-white shadow-2xl shadow-black/30 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-300">
          {t("text")}{" "}
          <Link
            href="/cookies-policy"
            className="underline hover:text-white"
          >
            {t("linkText")}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex items-center justify-center rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
