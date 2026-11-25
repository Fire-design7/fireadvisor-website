"use client";

import { useEffect } from "react";

type Gtag = (...args: unknown[]) => void;

// Mounted once in the locale layout: reports clicks on any phone, email,
// WhatsApp or Viber link anywhere on the site (header, mobile menu, footer,
// floating button, contact page, service pages and their mobile bar, CTA
// blocks, thank-you page) as GA4 events, so calls and chats started from the
// site can be imported into Google Ads next to `generate_lead`.
//
// Privacy: only the contact method and the page path are sent — never the
// link itself, since tel:/wa.me/viber: links contain a phone number.
// Consent: gtag only exists after the visitor has accepted analytics cookies;
// without it the click is simply not reported.

const CONTACT_LINKS: { prefix: string; event: string; method: string }[] = [
  { prefix: "tel:", event: "phone_click", method: "phone" },
  { prefix: "mailto:", event: "email_click", method: "email" },
  { prefix: "https://wa.me/", event: "whatsapp_click", method: "whatsapp" },
  { prefix: "https://api.whatsapp.com/", event: "whatsapp_click", method: "whatsapp" },
  { prefix: "whatsapp:", event: "whatsapp_click", method: "whatsapp" },
  { prefix: "viber:", event: "viber_click", method: "viber" },
];

const SELECTOR = CONTACT_LINKS.map((l) => `a[href^="${l.prefix}"]`).join(", ");

// A double tap on the same button sends one event, not two.
const REPEAT_WINDOW_MS = 2000;

export function ContactClickTracking() {
  useEffect(() => {
    let last = { event: "", at: 0 };

    function onClick(e: MouseEvent) {
      const target = e.target instanceof Element ? e.target : null;
      const link = target?.closest<HTMLAnchorElement>(SELECTOR);
      if (!link) return;

      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag !== "function") return;

      const href = link.getAttribute("href") ?? "";
      const match = CONTACT_LINKS.find((l) => href.startsWith(l.prefix));
      if (!match) return;

      const now = Date.now();
      if (last.event === match.event && now - last.at < REPEAT_WINDOW_MS) return;
      last = { event: match.event, at: now };

      gtag("event", match.event, {
        contact_method: match.method,
        // origin + path only: query strings can carry ad click ids and are
        // not needed to tell which page the contact came from.
        page_location: window.location.origin + window.location.pathname,
        link_location: window.location.pathname,
        transport_type: "beacon",
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
