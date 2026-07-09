"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { siteConfig } from "@/content/site-config";

const navItems = [
  { href: "/", key: "home" },
  { href: "/uslugi", key: "services" },
  { href: "/proverka-ot-pozharnata", key: "inspectionPrep" },
  { href: "/sektori", key: "sectors" },
  { href: "/za-nas", key: "about" },
  { href: "/resursi", key: "resources" },
  { href: "/blog", key: "blog" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[var(--background)]/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <Image
            src="/logo-icon-dark.png"
            alt=""
            width={22}
            height={32}
            className="h-8 w-[22px]"
            priority
          />
          <span className="text-lg tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            {siteConfig.phone}
          </a>
          <LocaleSwitcher />
          <Link
            href="/kontakti"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
          >
            {t("cta")}
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 lg:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-slate-900" />
            <span className="block h-0.5 w-5 bg-slate-900" />
            <span className="block h-0.5 w-5 bg-slate-900" />
          </div>
        </button>
      </Container>

      {open && (
        <div className="border-t border-slate-200 bg-[var(--background)] lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 px-2">
              <LocaleSwitcher />
              <a
                href={siteConfig.phoneHref}
                className="text-sm font-semibold text-slate-700"
              >
                {siteConfig.phone}
              </a>
            </div>
            <Link
              href="/kontakti"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              {t("cta")}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
