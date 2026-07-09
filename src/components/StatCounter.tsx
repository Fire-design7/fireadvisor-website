"use client";

import { useEffect, useRef, useState } from "react";

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Start at the final value, not 0 — this is what gets server-rendered and
  // what no-JS/pre-hydration visitors see. The animation resets to 0 and
  // counts back up only once the client has actually mounted and the
  // element is in view, so the "0" is never in the initial HTML.
  const [count, setCount] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setCount(0);

        const duration = 900;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {count}
        <span className="text-amber-400">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-slate-400">{label}</div>
    </div>
  );
}
