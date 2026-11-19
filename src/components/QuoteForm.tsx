"use client";

import { FormEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getServiceBySlug, mainServiceSlugs } from "@/content/services";
import {
  FIRE_ALARM_SLUG,
  NOT_SURE,
  buildingTypes,
  fireAlarmScopeLabels,
  fireAlarmScopes,
  isFireAlarmScope,
  mainServiceLabels,
  notSureLabel,
  validateInquiry,
  type InquiryField,
  type InquiryFieldError,
} from "@/content/inquiry-options";
import { getAttribution, markInquirySent } from "@/lib/attribution";

type Status = "idle" | "submitting" | "error";
type FieldKey = InquiryField;
type Errors = Partial<Record<FieldKey, InquiryFieldError>>;

const errorMessageKey: Record<InquiryFieldError, string> = {
  nameRequired: "errorNameRequired",
  contactRequired: "errorContactRequired",
  emailInvalid: "errorEmailInvalid",
  phoneInvalid: "errorPhoneInvalid",
  serviceRequired: "errorServiceRequired",
  messageRequired: "errorMessageRequired",
  messageTooShort: "errorMessageTooShort",
};

const buildingTypeKey: Record<(typeof buildingTypes)[number], string> = {
  industrial: "buildingTypeIndustrial",
  commercial: "buildingTypeCommercial",
  warehouse: "buildingTypeWarehouse",
  hospitality: "buildingTypeHospitality",
  healthcare: "buildingTypeHealthcare",
  public: "buildingTypePublic",
  other: "buildingTypeOther",
};

export function QuoteForm({
  preselectedService = "",
  preselectedScope = "",
}: {
  preselectedService?: string;
  preselectedScope?: string;
}) {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const router = useRouter();

  // A service page links here with ?service=<slug>. Main directions map to
  // their own option; any other existing service gets an extra option so
  // the visitor still sees what they came for — and can change it.
  const preselected = getServiceBySlug(preselectedService);
  const isMain = (mainServiceSlugs as readonly string[]).includes(preselectedService);
  const extraService = preselected && !isMain ? preselected : undefined;
  const initialService =
    preselected || preselectedService === NOT_SURE ? preselectedService : "";

  const [service, setService] = useState(initialService);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  // React state updates (and therefore the disabled= attribute) only take
  // effect on the next render, which leaves a window for a fast double-click
  // to fire two overlapping submissions. A ref is checked synchronously.
  const submittingRef = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — bots tend to fill every field, humans never see this one.
    // Redirect as if it succeeded rather than revealing the detection, but
    // without setting the conversion flag.
    if (formData.get("company_website")) {
      router.push("/blagodarim");
      return;
    }

    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const found = validateInquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      focusFirstError(form, found);
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    const scope = formData.get("scope");
    const attribution = getAttribution();
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      service: values.service,
      scope: values.service === FIRE_ALARM_SLUG && isFireAlarmScope(scope) ? scope : undefined,
      buildingType: formData.get("buildingType") || undefined,
      message: values.message.trim(),
      locale,
      sourcePage: window.location.pathname,
      landingPage: attribution.landingPage,
      ...attribution.params,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 400) {
        const body = await res.json().catch(() => null);
        if (body?.errors && Object.keys(body.errors).length > 0) {
          setErrors(body.errors);
          setStatus("idle");
          submittingRef.current = false;
          focusFirstError(form, body.errors);
          return;
        }
      }
      if (!res.ok) throw new Error("Request failed");

      // Only now — after the server confirmed it accepted the inquiry — is
      // the conversion flagged for the thank-you page to report (once).
      markInquirySent(values.service);
      form.reset();
      // A real page navigation gives Google Ads a distinct URL as well.
      router.push("/blagodarim");
    } catch {
      // Keep everything the visitor typed so they can simply retry.
      setStatus("error");
      submittingRef.current = false;
    }
  }

  const err = (key: FieldKey) => (errors[key] ? t(errorMessageKey[errors[key]!]) : null);
  const contactError = err("contact");

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field — hidden from real users via CSS, bots fill it in. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field label={t("serviceLabel")} htmlFor="service" error={err("service")}>
        <select
          id="service"
          name="service"
          className="input"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
          }}
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined}
        >
          <option value="" disabled>
            {t("servicePlaceholder")}
          </option>
          {mainServiceSlugs.map((slug) => (
            <option key={slug} value={slug}>
              {mainServiceLabels[slug][locale]}
            </option>
          ))}
          {extraService && (
            <option value={extraService.slug}>{extraService[locale].title}</option>
          )}
          <option value={NOT_SURE}>{notSureLabel[locale]}</option>
        </select>
      </Field>

      {service === FIRE_ALARM_SLUG && (
        <fieldset className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-900">
            {t("scopeLabel")}{" "}
            <span className="font-normal text-slate-500">{t("optional")}</span>
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {fireAlarmScopes.map((scope) => (
              <label
                key={scope}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 has-[:checked]:border-amber-400 has-[:checked]:bg-amber-50"
              >
                <input
                  type="radio"
                  name="scope"
                  value={scope}
                  defaultChecked={scope === preselectedScope}
                  className="accent-amber-500"
                />
                {fireAlarmScopeLabels[scope][locale]}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <Field label={t("nameLabel")} htmlFor="name" error={err("name")}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="input"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>

      <div>
        <p id="contact-hint" className={`text-sm ${contactError ? "font-medium text-red-600" : "text-slate-600"}`}>
          {contactError ?? t("contactHint")}
        </p>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <Field label={t("phoneLabel")} htmlFor="phone" error={err("phone")}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="input"
              aria-invalid={!!(errors.phone || errors.contact)}
              aria-describedby={errors.phone ? "phone-error contact-hint" : "contact-hint"}
            />
          </Field>
          <Field label={t("emailLabel")} htmlFor="email" error={err("email")}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="input"
              aria-invalid={!!(errors.email || errors.contact)}
              aria-describedby={errors.email ? "email-error contact-hint" : "contact-hint"}
            />
          </Field>
        </div>
      </div>

      <Field label={t("buildingTypeLabel")} htmlFor="buildingType" optional={t("optional")}>
        <select id="buildingType" name="buildingType" className="input" defaultValue="">
          <option value="">{t("buildingTypePlaceholder")}</option>
          {buildingTypes.map((type) => (
            <option key={type} value={type}>
              {t(buildingTypeKey[type])}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t("messageLabel")} htmlFor="message" error={err("message")}>
        <p id="message-hint" className="-mt-0.5 mb-1.5 text-sm text-slate-600">
          {t("messageHint")}
        </p>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="input"
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error message-hint" : "message-hint"}
          onChange={() => {
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
        />
      </Field>

      {Object.values(errors).some(Boolean) && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {t("errorSummary")}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {t("errorText")}
        </p>
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

function focusFirstError(form: HTMLFormElement, errors: Errors) {
  const order: Array<[FieldKey, string]> = [
    ["service", "service"],
    ["name", "name"],
    ["contact", "phone"],
    ["phone", "phone"],
    ["email", "email"],
    ["message", "message"],
  ];
  for (const [key, id] of order) {
    if (errors[key]) {
      (form.querySelector(`#${id}`) as HTMLElement | null)?.focus();
      return;
    }
  }
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | null;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-900">
        {label}
        {optional && <span className="ml-1 font-normal text-slate-500">{optional}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
