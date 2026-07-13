"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, getStoredConsent, type ConsentValue } from "./CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Loaded only after the visitor explicitly accepts analytics cookies via
// CookieConsent — Google Analytics sets non-essential cookies, which
// require prior consent under GDPR/ePrivacy, not an opt-out banner.
export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function apply(value: ConsentValue | null) {
      setEnabled(value === "granted");
    }
    apply(getStoredConsent());

    function onChange(e: Event) {
      apply((e as CustomEvent<ConsentValue>).detail);
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
