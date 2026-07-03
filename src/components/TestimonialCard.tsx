import type { Testimonial } from "@/content/testimonials";
import type { Locale } from "@/i18n/routing";

export function TestimonialCard({
  testimonial,
  locale,
}: {
  testimonial: Testimonial;
  locale: Locale;
}) {
  const content = testimonial[locale];

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <span aria-hidden className="text-3xl font-serif text-amber-400">
        &ldquo;
      </span>
      <blockquote className="flex-1 text-sm leading-relaxed text-slate-700">
        {content.quote}
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-slate-900">
        {content.attribution}
      </figcaption>
    </figure>
  );
}
