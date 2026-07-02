"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: "bg" | "en") {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-300 p-1 text-xs font-semibold">
      <button
        onClick={() => switchTo("bg")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "bg" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
        }`}
        aria-current={locale === "bg"}
      >
        BG
      </button>
      <button
        onClick={() => switchTo("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "en" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
        }`}
        aria-current={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
