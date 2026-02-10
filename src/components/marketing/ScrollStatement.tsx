"use client";

import { useReducedMotion } from "motion/react";
import { TextReveal } from "@/components/ui/text-reveal";

const STATEMENT =
  "You're tracking thousands of positions across five regions. Every clearance. Every pipeline stage. Every hire. One platform to see it all.";

export function ScrollStatement() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-surface-900 px-4">
        <p className="max-w-4xl text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl">
          {STATEMENT}
        </p>
      </section>
    );
  }

  return (
    <section className="relative bg-surface-900">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.04] blur-[120px]" />
      </div>
      <TextReveal>{STATEMENT}</TextReveal>
    </section>
  );
}
