"use client";

import { FormEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { services } from "@/content/services";

type Status = "idle" | "submitting" | "error";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

// Read once at submit time via window.location — not the useSearchParams()
// hook, which forces this whole component's tree to bail out to
// client-only rendering (no <input> fields in the server HTML at all).
// Since this is only used to enrich the submitted payload, not to render
// anything, an imperative read has no such cost.
function captureUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

export function QuoteForm({ preselectedService = "" }: { preselectedService?: string }) {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  // React state updates (and therefore the disabled= attribute) only take
  // effect on the next render, which leaves a window for a fast double-click
  // to fire two overlapping submissions — whichever resolves last then wins
  // the final status, regardless of which one actually succeeded. A ref is
  // checked synchronously, closing that window.
  const submittingRef = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — bots tend to fill every field, humans never see this one.
    // Redirect as if it succeeded rather than revealing the detection.
    if (formData.get("company_website")) {
      submittingRef.current = false;
      router.push("/blagodarim");
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
      ...captureUtmParams(),
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      // A real page navigation (rather than an inline success state) gives
      // Google Ads a distinct URL to fire a "page visited" conversion goal
      // on — an inline-only success message never changes the URL.
      router.push("/blagodarim");
    } catch {
      setStatus("error");
      submittingRef.current = false;
    }
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

      <p className="text-xs leading-relaxed text-slate-500">
        {t("consentNotice")}{" "}
        <Link
          href="/politika-za-poveritelnost"
          className="underline hover:text-slate-700"
        >
          {t("consentNoticeLinkText")}
        </Link>
        .
      </p>
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
