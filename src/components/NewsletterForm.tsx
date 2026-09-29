"use client";

import { FormEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Status = "idle" | "submitting" | "done" | "duplicate" | "error";

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<Status>("idle");
  const submittingRef = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — bots tend to fill every field, humans never see this one.
    if (formData.get("company_website")) {
      submittingRef.current = false;
      setStatus("done");
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email"), locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { duplicate?: boolean };
      form.reset();
      setStatus(data.duplicate ? "duplicate" : "done");
    } catch {
      setStatus("error");
      submittingRef.current = false;
    }
  }

  if (status === "done" || status === "duplicate") {
    return (
      <p className="mt-4 text-sm font-medium text-emerald-400">
        {status === "duplicate" ? t("alreadySubscribed") : t("subscribed")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <p className="text-sm font-semibold text-white">{t("title")}</p>
      <div className="mt-2 flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          className="input flex-1"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 disabled:opacity-60"
        >
          {status === "submitting" ? t("submitting") : t("subscribeCta")}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs font-medium text-red-400">{t("errorText")}</p>
      )}
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        {t("consentNotice")}{" "}
        <Link href="/politika-za-poveritelnost" className="underline hover:text-slate-300">
          {t("consentNoticeLinkText")}
        </Link>
        .
      </p>
    </form>
  );
}
