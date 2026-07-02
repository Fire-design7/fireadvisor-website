"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/content/site-config";

export function FloatingContact() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/kontakti") return null;

  return (
    <div
      className={`fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 transition-all duration-300 sm:right-6 sm:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={siteConfig.phoneHref}
        aria-label={t("callNow")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20 transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.75}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 5.5c0-.6.4-1 1-1h2.4c.5 0 .9.3 1 .8l.8 3a1 1 0 01-.3 1L8 10.7a11 11 0 005.3 5.3l1.4-1.4a1 1 0 011-.3l3 .8c.5.1.8.5.8 1v2.4c0 .6-.4 1-1 1C10.5 19.5 4.5 13.5 4.5 5.5z"
          />
        </svg>
      </a>
      <Link
        href="/kontakti"
        className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-900/20 transition-transform hover:scale-105 hover:bg-amber-400"
      >
        {t("requestQuote")}
      </Link>
    </div>
  );
}
