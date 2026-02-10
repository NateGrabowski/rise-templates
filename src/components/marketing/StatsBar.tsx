"use client";

import { HERO_STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { BlurFade } from "@/components/magicui/blur-fade";

function parseStatValue(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { value: 0, suffix: "" };
  return { value: parseInt(match[1], 10), suffix: match[2] };
}

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {HERO_STATS.map((stat, i) => {
        const { value, suffix } = parseStatValue(stat.value);
        return (
          <BlurFade key={stat.label} delay={i * 0.15} inView>
            <div className="glass-panel-md border-t-2 border-t-brand-400 p-6 text-center">
              <p className="font-mono text-3xl font-bold tabular-nums text-brand-400 sm:text-4xl">
                <AnimatedCounter value={value} suffix={suffix} />
              </p>
              <p className="micro-label mt-2">{stat.label}</p>
            </div>
          </BlurFade>
        );
      })}
    </div>
  );
}
