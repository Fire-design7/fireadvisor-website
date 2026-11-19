import { Resend } from "resend";

import { getServiceBySlug } from "@/content/services";
import {
  NOT_SURE,
  fireAlarmScopeLabels,
  isMainServiceSlug,
  mainServiceLabels,
  notSureLabel,
  type FireAlarmScope,
} from "@/content/inquiry-options";

export interface InquiryEmailData {
  name: string;
  // At least one of email / phone is always present (validated in the API).
  email?: string;
  phone?: string;
  service: string;
  scope?: FireAlarmScope;
  buildingType?: string;
  message?: string;
  locale: "bg" | "en";
  sourcePage?: string;
  landingPage?: string;
  utm?: Record<string, string>;
  submittedAt: Date;
}

// The owner reads these in Bulgarian regardless of the visitor's language.
function serviceLabel(slug: string) {
  if (slug === NOT_SURE) return notSureLabel.bg;
  if (isMainServiceSlug(slug)) return mainServiceLabels[slug].bg;
  return getServiceBySlug(slug)?.bg.title ?? slug;
}

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const ownerEmail = process.env.RESEND_OWNER_EMAIL;

  if (!apiKey || !fromEmail || !ownerEmail) {
    throw new Error(
      "Missing Resend environment variables (RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_OWNER_EMAIL)."
    );
  }

  // Customer confirmation is opt-in via env var, not inferred from which
  // sender address happens to be configured — a verified domain doesn't by
  // itself mean the sender has enough sending reputation yet to auto-resume
  // mailing real customers. This needs a deliberate flip, not a side effect.
  const customerConfirmationEnabled = process.env.RESEND_CUSTOMER_CONFIRMATION === "true";
  const usingSandboxSender = fromEmail.includes("onboarding@resend.dev");

  // Diagnostic only — no API keys or message content, safe to log.
  console.log(
    `[email] sender=${fromEmail} owner=${ownerEmail} sandboxSender=${usingSandboxSender} customerConfirmation=${customerConfirmationEnabled}`
  );

  return { client: new Resend(apiKey), fromEmail, ownerEmail, customerConfirmationEnabled };
}

function fmtUtm(utm: Record<string, string> | undefined) {
  if (!utm || Object.keys(utm).length === 0) return null;
  return Object.entries(utm)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

export async function sendInquiryEmails(data: InquiryEmailData) {
  const { client, fromEmail, ownerEmail, customerConfirmationEnabled } = getClient();

  const service = serviceLabel(data.service);
  const scope = data.scope ? fireAlarmScopeLabels[data.scope].bg : null;
  const ownerSubject = `Ново запитване от сайта Fire Advisor — ${service}${scope ? ` (${scope})` : ""} — ${data.name}`;

  const timestamp = data.submittedAt.toLocaleString("bg-BG", {
    timeZone: "Europe/Sofia",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const utmBlock = fmtUtm(data.utm);

  const ownerFields: Array<[string, string]> = [
    ["Име", data.name],
    ["Телефон", data.phone || "-"],
    ["Имейл", data.email || "- (няма — свържете се по телефона)"],
    ["Услуга", service],
    ...(scope ? ([["Пожароизвестяване — уточнение", scope]] as Array<[string, string]>) : []),
    ["Тип обект", data.buildingType || "-"],
    ["Съобщение", data.message || "-"],
    ["Език на сайта", data.locale.toUpperCase()],
    ["Страница на подаване", data.sourcePage || "-"],
    ["Входна страница", data.landingPage || "-"],
    ["UTM / GCLID", utmBlock || "-"],
    ["Дата и час", timestamp],
  ];

  const footerHtml = "Това съобщение е изпратено чрез контактната форма на fireadvisor.eu.";

  const ownerHtml = `
    <h2>${escapeHtml(ownerSubject)}</h2>
    ${ownerFields
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong><br/>${escapeHtml(value).replace(/\n/g, "<br/>")}</p>`
      )
      .join("\n")}
    <hr/>
    <p style="color:#64748b;font-size:12px;">${escapeHtml(footerHtml)}</p>
  `;

  const ownerText =
    ownerFields.map(([label, value]) => `${label}: ${value}`).join("\n") + `\n\n${footerHtml}`;

  // The Resend SDK does NOT throw on failure — it returns { data, error }.
  // An unchecked error here silently "succeeds" while nothing is sent.
  const ownerResult = await client.emails.send({
    from: fromEmail,
    to: [ownerEmail],
    subject: ownerSubject,
    html: ownerHtml,
    text: ownerText,
    // Phone-only inquiries have no address to reply to.
    ...(data.email ? { replyTo: data.email } : {}),
  });
  if (ownerResult.error) {
    throw new Error(`Resend failed to send owner notification: ${ownerResult.error.message}`);
  }

  if (!customerConfirmationEnabled || !data.email) {
    return;
  }

  const customerSubject =
    data.locale === "bg"
      ? "Получихме вашето запитване — Fire Advisor"
      : "We received your inquiry — Fire Advisor";

  const customerHtml =
    data.locale === "bg"
      ? `<p>Здравейте, ${escapeHtml(data.name)},</p>
         <p>Благодарим ви за запитването. Получихме го и ще се свържем с вас възможно най-скоро.</p>
         <p>Екипът на Fire Advisor</p>`
      : `<p>Hello ${escapeHtml(data.name)},</p>
         <p>Thank you for your inquiry. We've received it and will get back to you shortly.</p>
         <p>The Fire Advisor team</p>`;

  const customerText =
    data.locale === "bg"
      ? `Здравейте, ${data.name},\n\nБлагодарим ви за запитването. Получихме го и ще се свържем с вас възможно най-скоро.\n\nЕкипът на Fire Advisor`
      : `Hello ${data.name},\n\nThank you for your inquiry. We've received it and will get back to you shortly.\n\nThe Fire Advisor team`;

  // The customer confirmation is best-effort — the inquiry already reached
  // the owner, so a failure here (e.g. a bad customer address) shouldn't
  // fail the whole submission.
  const customerResult = await client.emails.send({
    from: fromEmail,
    to: [data.email],
    subject: customerSubject,
    html: customerHtml,
    text: customerText,
  });
  if (customerResult.error) {
    console.error("Resend failed to send customer confirmation", customerResult.error);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
