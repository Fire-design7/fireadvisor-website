export function PhaseCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-amber-400 ring-8 ring-[var(--background)]">
        {number}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}
