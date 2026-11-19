"use client";

import { useEffect } from "react";
import { consumeInquirySent } from "@/lib/attribution";

type Gtag = (...args: unknown[]) => void;

// Rendered on the thank-you page. Sends one `generate_lead` event, only when
// the form has just been accepted by the server (flag set by QuoteForm after a
// 2xx response). The flag is cleared before sending, so a reload, a back
// navigation or a direct visit to the page doesn't count a second lead.
//
// gtag only exists after the visitor has accepted analytics cookies, and the
// script loads asynchronously — so wait briefly for it instead of dropping
// the event on a slow load.
export function LeadConversion() {
  useEffect(() => {
    const lead = consumeInquirySent();
    if (!lead) return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag === "function") {
        window.clearInterval(timer);
        gtag("event", "generate_lead", {
          form_name: "quote_form",
          service: lead.service || undefined,
        });
      } else if (++attempts >= 40) {
        window.clearInterval(timer);
      }
    }, 250);
    // No cleanup on purpose: the flag is already consumed, so a dev-mode
    // StrictMode remount must not cancel the only attempt to send the event.
    // The interval stops itself after ~10 s at most.
  }, []);

  return null;
}
