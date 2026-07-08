import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-slate-900 px-6 text-center text-white">
      <Image
        src="/logo-icon-light.png"
        alt=""
        width={22}
        height={32}
        className="h-10 w-[27px]"
      />
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          Страницата не е намерена
        </h1>
        <p className="mt-3 max-w-md text-slate-300">
          Възможно е връзката да е остаряла или адресът да е сгрешен.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
        >
          Начало
        </Link>
        <Link
          href="/uslugi"
          className="inline-flex items-center justify-center rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Услуги
        </Link>
        <Link
          href="/kontakti"
          className="inline-flex items-center justify-center rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Контакти
        </Link>
      </div>
    </div>
  );
}
