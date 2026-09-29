"use client";

import { FormEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Status = "idle" | "submitting" | "done" | "error";

export function ResourceDownloadForm({
  resourceTitle,
  fileHref,
}: {
  resourceTitle: string;
  fileHref: string;
}) {
  const t = useTranslations("resources");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
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
      const res = await fetch("/api/resource-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          resource: resourceTitle,
          locale,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      if (fileHref && fileHref !== "#") {
        window.open(fileHref, "_blank", "noopener,noreferrer");
      }
    } catch {
      setStatus("error");
      submittingRef.current = false;
    }
  }

  if (status === "done") {
    return (
      <p className="mt-4 text-sm font-medium text-emerald-700">
        {fileHref && fileHref !== "#" ? t("downloadStarted") : t("comingSoonThanks")}
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
      >
        {t("downloadCta")}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input
        name="name"
        type="text"
        required
        placeholder={t("namePlaceholder")}
        className="input w-full"
      />
      <input
        name="email"
        type="email"
        required
        placeholder={t("emailPlaceholder")}
        className="input w-full"
      />

      {status === "error" && (
        <p className="text-xs font-medium text-red-600">{t("errorText")}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
      >
        {status === "submitting" ? t("submittingButton") : t("confirmDownloadCta")}
      </button>

      <p className="text-xs leading-relaxed text-slate-500">
        {t("consentNotice")}{" "}
        <Link href="/politika-za-poveritelnost" className="underline hover:text-slate-700">
          {t("consentNoticeLinkText")}
        </Link>
        .
      </p>
    </form>
  );
}
