"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

// Mounted once in the locale layout: remembers UTM/GCLID from the landing URL
// so they still reach the inquiry after the visitor navigates to /kontakti.
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
