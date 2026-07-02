"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { services } from "@/content/services";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);

    // Honeypot — bots tend to fill every field, humans never see this one.
    if (formData.get("company_website")) {
      setStatus("success");
      return;
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      inquiryType: formData.get("inquiryType"),
      buildingType: formData.get("buildingType"),
      service: formData.get("service"),
      message: formData.get("message"),
      locale,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-emerald-900">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-emerald-800">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field — hidden from real users via CSS, bots fill it in. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <input type="hidden" name="service" value={preselectedService} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("nameLabel")} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input"
          />
        </Field>
        <Field label={t("emailLabel")} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
          />
        </Field>
      </div>

      <Field label={t("phoneLabel")} htmlFor="phone">
        <input id="phone" name="phone" type="tel" className="input" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("inquiryTypeLabel")} htmlFor="inquiryType">
          <select id="inquiryType" name="inquiryType" required className="input" defaultValue="">
            <option value="" disabled>
              {t("inquiryTypePlaceholder")}
            </option>
            <option value="new_design">{t("inquiryTypeNewDesign")}</option>
            <option value="installation">{t("inquiryTypeInstallation")}</option>
            <option value="maintenance">{t("inquiryTypeMaintenance")}</option>
            <option value="emergency">{t("inquiryTypeEmergency")}</option>
            <option value="risk_assessment">{t("inquiryTypeRiskAssessment")}</option>
            <option value="other">{t("inquiryTypeOther")}</option>
          </select>
        </Field>

        <Field label={t("buildingTypeLabel")} htmlFor="buildingType">
          <select id="buildingType" name="buildingType" required className="input" defaultValue="">
            <option value="" disabled>
              {t("buildingTypePlaceholder")}
            </option>
            <option value="industrial">{t("buildingTypeIndustrial")}</option>
            <option value="commercial">{t("buildingTypeCommercial")}</option>
            <option value="warehouse">{t("buildingTypeWarehouse")}</option>
            <option value="hospitality">{t("buildingTypeHospitality")}</option>
            <option value="healthcare">{t("buildingTypeHealthcare")}</option>
            <option value="public">{t("buildingTypePublic")}</option>
            <option value="other">{t("buildingTypeOther")}</option>
          </select>
        </Field>
      </div>

      {preselectedService && (
        <p className="text-sm text-slate-500">
          {t("serviceLabel")}:{" "}
          <span className="font-semibold text-slate-900">
            {services.find((s) => s.slug === preselectedService)?.[locale]
              .title ?? preselectedService}
          </span>
        </p>
      )}

      <Field label={t("messageLabel")} htmlFor="message">
        <textarea id="message" name="message" rows={5} className="input" />
      </Field>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{t("errorText")}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? t("submittingButton") : t("submitButton")}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-900">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
