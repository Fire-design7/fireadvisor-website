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

  return { client: new Resend(apiKey), fromEmail, ownerEmail };
}

export async function sendInquiryEmails(data: InquiryEmailData) {
  const { client, fromEmail, ownerEmail } = getClient();

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
    client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: ownerSubject,
      html: ownerBody,
      replyTo: data.email,
    }),
    client.emails.send({
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
