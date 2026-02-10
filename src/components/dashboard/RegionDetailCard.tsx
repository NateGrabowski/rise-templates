"use client";

import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { BlurFade } from "@/components/magicui/blur-fade";

interface RegionDetailCardProps {
  name: string;
  code: string;
  states: number;
  openPositions: number;
  fillRate: number;
  avgDaysOpen: number;
  trend: readonly number[];
  topRole: string;
  totalFilled: number;
  index?: number;
}

const BORDER_COLORS: Record<string, string> = {
  NE: "border-l-brand-500",
  SE: "border-l-cyan-400",
  MW: "border-l-status-success",
  SW: "border-l-status-warning",
  W: "border-l-violet-400",
};

function MiniSparkline({ data }: { data: readonly number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="text-brand-400">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RegionDetailCard({
  name,
  code,
  states,
  openPositions,
  fillRate,
  avgDaysOpen,
  trend,
  topRole,
  totalFilled,
  index = 0,
}: RegionDetailCardProps) {
  return (
    <BlurFade delay={index * 0.08} inView>
      <div
        className={`glass-panel border-l-2 p-5 transition-all hover:border-brand-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] ${BORDER_COLORS[code] || "border-l-brand-500"}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-display font-semibold">{name}</h4>
            <p className="text-xs text-muted-foreground">
              {states} states | {totalFilled} filled
            </p>
          </div>
          <MiniSparkline data={trend} />
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <AnimatedCounter
            value={openPositions}
            className="font-mono text-2xl font-bold tabular-nums"
          />
          <span className="text-sm text-muted-foreground">open</span>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Fill rate</span>
            <span className="font-mono font-medium">{fillRate}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${fillRate}%` }}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Avg {avgDaysOpen}d open</span>
          <span className="truncate pl-2 font-medium text-foreground">
            {topRole}
          </span>
        </div>
      </div>
    </BlurFade>
  );
}
