import { Resend } from "resend";

export interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  buildingType: string;
  serviceSlug?: string;
  message?: string;
  locale: "bg" | "en";
  sourcePage?: string;
  utm?: Record<string, string>;
  submittedAt: Date;
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

  const ownerSubject =
    data.locale === "bg"
      ? `Ново запитване от сайта Fire Advisor — ${data.name}`
      : `New inquiry from the Fire Advisor site — ${data.name}`;

  const timestamp = data.submittedAt.toLocaleString(data.locale === "bg" ? "bg-BG" : "en-GB", {
    timeZone: "Europe/Sofia",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const utmBlock = fmtUtm(data.utm);

  const ownerFields: Array<[string, string]> = [
    [data.locale === "bg" ? "Име" : "Name", data.name],
    [data.locale === "bg" ? "Имейл" : "Email", data.email],
    [data.locale === "bg" ? "Телефон" : "Phone", data.phone || "-"],
    [data.locale === "bg" ? "Тип запитване" : "Inquiry type", data.inquiryType],
    [data.locale === "bg" ? "Тип обект" : "Building type", data.buildingType],
    [data.locale === "bg" ? "Услуга" : "Service", data.serviceSlug || "-"],
    [data.locale === "bg" ? "Съобщение" : "Message", data.message || "-"],
    [data.locale === "bg" ? "Страница на подаване" : "Source page", data.sourcePage || "-"],
    ["UTM", utmBlock || "-"],
    [data.locale === "bg" ? "Дата и час" : "Timestamp", timestamp],
  ];

  const footerHtml =
    data.locale === "bg"
      ? "Това съобщение е изпратено чрез контактната форма на fireadvisor.eu."
      : "This message was sent via the contact form on fireadvisor.eu.";

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
    replyTo: data.email,
  });
  if (ownerResult.error) {
    throw new Error(`Resend failed to send owner notification: ${ownerResult.error.message}`);
  }

  if (!customerConfirmationEnabled) {
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
