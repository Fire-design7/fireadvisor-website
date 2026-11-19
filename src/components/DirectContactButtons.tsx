import { siteConfig } from "@/content/site-config";

// Call / WhatsApp / Viber buttons. Clicks are reported to GA4 by
// ContactClickTracking (phone_click, whatsapp_click, viber_click).
//
// `message` pre-fills the WhatsApp chat so the visitor doesn't have to start
// from a blank screen — and the owner sees right away what it is about.
export function DirectContactButtons({
  labels,
  message,
  layout = "stack",
}: {
  labels: { call: string; whatsapp: string; viber: string };
  message?: string;
  layout?: "stack" | "row";
}) {
  const whatsappHref = message
    ? `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`
    : siteConfig.whatsappHref;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors";

  return (
    <div className={layout === "row" ? "flex flex-wrap gap-3" : "grid gap-3"}>
      <a
        href={siteConfig.phoneHref}
        className={`${base} border border-slate-300 bg-white text-slate-900 hover:bg-slate-100`}
      >
        <PhoneIcon />
        {labels.call}: {siteConfig.phone}
      </a>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-[#25D366] text-white hover:bg-[#1ebe5b]`}
        >
          <ChatIcon />
          {labels.whatsapp}
        </a>
        <a href={siteConfig.viberHref} className={`${base} bg-[#7360F2] text-white hover:bg-[#6150d8]`}>
          <ChatIcon />
          {labels.viber}
        </a>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.5 1.2l-1.6.8a11 11 0 0 0 5.8 5.8l.8-1.6a1 1 0 0 1 1.2-.5l3.3 1.1a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h8M8 14h5m-9 6 1.4-4.2A8 8 0 1 1 8.2 19L4 20Z"
      />
    </svg>
  );
}
