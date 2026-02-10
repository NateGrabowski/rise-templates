"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/motion";

const STEPS = [
  {
    step: 1,
    title: "Connect Data",
    description:
      "Integrate your existing HR and staffing systems in minutes with our secure API connectors.",
  },
  {
    step: 2,
    title: "Track Real-Time",
    description:
      "Monitor positions, clearances, and onboarding across every region from a single dashboard.",
  },
  {
    step: 3,
    title: "Optimize Operations",
    description:
      "Use analytics and trend data to reduce time-to-fill and improve workforce readiness.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="How It Works" title="Three Steps to Clarity" />
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting lines between circles */}
          <div
            className="absolute top-6 left-[calc(16.67%+1.5rem)] hidden h-px md:block"
            style={{
              width: "calc(66.66% - 3rem)",
              background:
                "linear-gradient(to right, var(--color-brand-500), var(--color-brand-500) 45%, transparent 50%, var(--color-brand-500) 55%, var(--color-brand-500))",
              opacity: 0.3,
            }}
          />

          {STEPS.map((item, i) => (
            <BlurFade key={item.step} delay={0.1 + i * 0.15} inView>
              <div className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 font-mono text-lg font-bold text-white shadow-lg shadow-brand-500/25 ring-4 ring-brand-500/20">
                  {item.step}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
