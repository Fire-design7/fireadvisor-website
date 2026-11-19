"use client";

import { useEffect } from "react";

type Gtag = (...args: unknown[]) => void;

// Mounted once in the locale layout: reports clicks on any tel:, mailto:,
// WhatsApp or Viber link (header, footer, contact page, service pages) as GA4
// events, so calls and chats started from the site can be imported into
// Google Ads as conversions next to `generate_lead`.
//
// gtag only exists after the visitor has accepted analytics cookies; without
// it the click is simply not reported.
export function ContactClickTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target instanceof Element ? e.target : null;
      const link = target?.closest<HTMLAnchorElement>(
        'a[href^="tel:"], a[href^="mailto:"], a[href^="https://wa.me/"], a[href^="viber:"]'
      );
      if (!link) return;

      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag !== "function") return;

      const href = link.getAttribute("href")!;
      const event = href.startsWith("tel:")
        ? "phone_click"
        : href.startsWith("mailto:")
          ? "email_click"
          : href.startsWith("viber:")
            ? "viber_click"
            : "whatsapp_click";
      gtag("event", event, {
        link_location: window.location.pathname,
        transport_type: "beacon",
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
