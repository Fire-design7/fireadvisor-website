import { ReactNode } from "react";

export function WhyUsCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

export const icons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5l7 2.5v5.2c0 4.6-3 8.3-7 9.3-4-1-7-4.7-7-9.3V6l7-2.5z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.2l2 2 4-4.2" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1113 0c0 5.4-6.5 11-6.5 11z"
      />
      <circle cx="12" cy="10" r="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 14.5l5-5M8.5 16.2l-1.6 1.6a3.2 3.2 0 01-4.5-4.5l3-3a3.2 3.2 0 014.5 0M15.5 7.8l1.6-1.6a3.2 3.2 0 014.5 4.5l-3 3a3.2 3.2 0 01-4.5 0"
      />
    </svg>
  ),
};
