import FormData from "form-data";
import Mailgun from "mailgun.js";

export interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  buildingType: string;
  serviceSlug?: string;
  message?: string;
  locale: "bg" | "en";
}

function getClient() {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const fromEmail = process.env.MAILGUN_FROM_EMAIL;
  const ownerEmail = process.env.MAILGUN_OWNER_EMAIL;

  if (!apiKey || !domain || !fromEmail || !ownerEmail) {
    throw new Error(
      "Missing Mailgun environment variables (MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM_EMAIL, MAILGUN_OWNER_EMAIL)."
    );
  }

  const mailgun = new Mailgun(FormData);
  const client = mailgun.client({
    username: "api",
    key: apiKey,
    url: process.env.MAILGUN_EU_REGION === "true" ? "https://api.eu.mailgun.net" : undefined,
  });

  return { client, domain, fromEmail, ownerEmail };
}

export async function sendInquiryEmails(data: InquiryEmailData) {
  const { client, domain, fromEmail, ownerEmail } = getClient();

  const ownerSubject =
    data.locale === "bg"
      ? `Ново запитване от ${data.name}`
      : `New inquiry from ${data.name}`;

  const ownerBody = `
    <h2>${ownerSubject}</h2>
    <p><strong>Име / Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Имейл / Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Телефон / Phone:</strong> ${escapeHtml(data.phone ?? "-")}</p>
    <p><strong>Тип запитване / Inquiry type:</strong> ${escapeHtml(data.inquiryType)}</p>
    <p><strong>Тип обект / Building type:</strong> ${escapeHtml(data.buildingType)}</p>
    <p><strong>Услуга / Service:</strong> ${escapeHtml(data.serviceSlug ?? "-")}</p>
    <p><strong>Съобщение / Message:</strong><br/>${escapeHtml(data.message ?? "-")}</p>
  `;

  const customerSubject =
    data.locale === "bg"
      ? "Получихме вашето запитване — Fire Advisor"
      : "We received your inquiry — Fire Advisor";

  const customerBody =
    data.locale === "bg"
      ? `<p>Здравейте, ${escapeHtml(data.name)},</p>
         <p>Благодарим ви за запитването. Получихме го и ще се свържем с вас възможно най-скоро.</p>
         <p>Екипът на Fire Advisor</p>`
      : `<p>Hello ${escapeHtml(data.name)},</p>
         <p>Thank you for your inquiry. We've received it and will get back to you shortly.</p>
         <p>The Fire Advisor team</p>`;

  await Promise.all([
    client.messages.create(domain, {
      from: fromEmail,
      to: [ownerEmail],
      subject: ownerSubject,
      html: ownerBody,
      "h:Reply-To": data.email,
    }),
    client.messages.create(domain, {
      from: fromEmail,
      to: [data.email],
      subject: customerSubject,
      html: customerBody,
    }),
  ]);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
