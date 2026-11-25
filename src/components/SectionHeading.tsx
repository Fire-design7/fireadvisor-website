export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {/* Same three-part accent as under the homepage hero title. */}
      <div aria-hidden className={`mt-4 flex gap-1.5 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-1 w-10 rounded-full bg-amber-500" />
        <span className="h-1 w-5 rounded-full bg-amber-300" />
        <span className="h-1 w-2.5 rounded-full bg-slate-300" />
      </div>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{subtitle}</p>
      )}
    </div>
  );
}
