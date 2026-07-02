import { ReactNode } from "react";
import { Container } from "./Container";

export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 bg-slate-900 py-16 text-white sm:py-20">
      <Container>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
    </div>
  );
}
