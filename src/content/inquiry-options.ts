import { mainServiceSlugs, type MainServiceSlug } from "./services";

// Shared by the inquiry form (client) and the inquiries API / owner email
// (server), so both sides agree on the allowed values and their labels.

export const NOT_SURE = "ne-znam";
export const FIRE_ALARM_SLUG: MainServiceSlug = "pozharoizvestyavane";

type Label = { bg: string; en: string };

// Short labels for the form and footer — the page titles are longer.
export const mainServiceLabels: Record<MainServiceSlug, Label> = {
  "evakuatsionni-shemi": { bg: "Схеми за евакуация", en: "Evacuation plans" },
  "pozharno-dosie": {
    bg: "Пожарно досие и вътрешни правила",
    en: "Fire safety file & internal rules",
  },
  pozharoizvestyavane: { bg: "Пожароизвестяване", en: "Fire alarm systems" },
  "gasitelni-instalatsii": { bg: "Пожарогасене", en: "Fire suppression" },
  "konsultatsii-po-pozharna-bezopasnost": {
    bg: "Пожарна безопасност / консултация",
    en: "Fire safety / consultation",
  },
};

export const notSureLabel: Label = {
  bg: "Не знам какво ми трябва",
  en: "I don't know what I need",
};

// Optional refinement shown only when "fire alarm systems" is selected.
// The keys double as the `scope` query parameter and the section anchors'
// meaning on the service page.
export const fireAlarmScopes = ["design", "installation", "maintenance", "consultation"] as const;
export type FireAlarmScope = (typeof fireAlarmScopes)[number];

export const fireAlarmScopeLabels: Record<FireAlarmScope, Label> = {
  design: { bg: "Проектиране", en: "Design" },
  installation: { bg: "Изграждане", en: "Installation" },
  maintenance: { bg: "Поддръжка", en: "Maintenance" },
  consultation: { bg: "Нужна ми е консултация", en: "I need a consultation" },
};

export function isMainServiceSlug(value: unknown): value is MainServiceSlug {
  return typeof value === "string" && (mainServiceSlugs as readonly string[]).includes(value);
}

export function isFireAlarmScope(value: unknown): value is FireAlarmScope {
  return typeof value === "string" && (fireAlarmScopes as readonly string[]).includes(value);
}

export const buildingTypes = [
  "industrial",
  "commercial",
  "warehouse",
  "hospitality",
  "healthcare",
  "public",
  "other",
] as const;

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

// --- Contact validation (same rules in the browser and on the server) ---

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

// Accepts the usual ways people type a phone number ("089 333 9296",
// "+359 (89) 333-92-96") and checks there are 6–15 digits in it.
export function isValidPhone(value: string) {
  const compact = value.trim().replace(/[\s\-().\/]/g, "");
  return /^\+?\d{6,15}$/.test(compact);
}

export type InquiryFieldError =
  | "nameRequired"
  | "contactRequired"
  | "emailInvalid"
  | "phoneInvalid"
  | "serviceRequired";

export function validateInquiry(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
}): Partial<Record<"name" | "email" | "phone" | "contact" | "service", InquiryFieldError>> {
  const errors: Partial<Record<"name" | "email" | "phone" | "contact" | "service", InquiryFieldError>> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();

  if (!name) errors.name = "nameRequired";
  if (!input.service.trim()) errors.service = "serviceRequired";
  if (!email && !phone) {
    errors.contact = "contactRequired";
  } else {
    if (email && !isValidEmail(email)) errors.email = "emailInvalid";
    if (phone && !isValidPhone(phone)) errors.phone = "phoneInvalid";
  }
  return errors;
}
