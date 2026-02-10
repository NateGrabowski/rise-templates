"use client";

import { TRUSTED_BY } from "@/lib/constants";
import { Marquee } from "@/components/magicui/marquee";
import { InView } from "@/components/motion";

function TrustedCard({ name }: { name: string }) {
  return (
    <div className="glass-panel-md flex items-center justify-center px-6 py-3">
      <span className="font-display text-lg font-bold tracking-wide text-muted-foreground/70">
        {name}
      </span>
    </div>
  );
}

const firstRow = TRUSTED_BY.slice(0, Math.ceil(TRUSTED_BY.length / 2));
const secondRow = TRUSTED_BY.slice(Math.ceil(TRUSTED_BY.length / 2));

export function TrustedByMarquee() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <InView direction="up">
          <p className="micro-label">
            Trusted by leading government contractors
          </p>
        </InView>
        <div className="relative mt-8 flex flex-col gap-4 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((name) => (
              <TrustedCard key={name} name={name} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="[--duration:30s]">
            {secondRow.map((name) => (
              <TrustedCard key={name} name={name} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
