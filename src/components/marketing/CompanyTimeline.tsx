"use client";

import { COMPANY_TIMELINE } from "@/lib/constants";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/motion";

export function CompanyTimeline() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          label="Our Journey"
          title="Building the Future of Workforce Management"
        />
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[2.25rem] top-0 hidden h-full w-px bg-brand-500/20 sm:block" />

          <div className="space-y-12">
            {COMPANY_TIMELINE.map((milestone, i) => (
              <BlurFade key={milestone.year} delay={0.1 + i * 0.15} inView>
                <div className="flex gap-6">
                  {/* Year badge + dot */}
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-xl bg-brand-600 font-mono text-sm font-bold text-white shadow-lg shadow-brand-500/25">
                      {milestone.year}
                    </div>
                    {/* Glow dot on line */}
                    <div className="absolute top-[2.25rem] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] sm:block" />
                  </div>
                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="font-display text-lg font-semibold">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
