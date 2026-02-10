"use client";

import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { PIPELINE_STAGES } from "@/data/dashboard";

const FUNNEL_COLORS = [
  "from-brand-400/60 to-brand-500/60",
  "from-brand-500/65 to-brand-600/65",
  "from-brand-600/70 to-brand-700/70",
  "from-brand-700/80 to-brand-800/80",
  "from-brand-800/90 to-brand-900/90",
];

export function PipelineFunnel() {
  const maxCount = PIPELINE_STAGES[0].count;

  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-lg font-semibold">
        Recruitment Pipeline
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Candidates flowing through each stage
      </p>
      <div className="mt-6 flex flex-col items-center gap-2">
        {PIPELINE_STAGES.map((stage, i) => {
          const widthPct = Math.max((stage.count / maxCount) * 100, 20);
          return (
            <div key={stage.stage} className="flex w-full items-center gap-4">
              <span className="w-24 text-right text-sm text-muted-foreground">
                {stage.stage}
              </span>
              <div className="relative flex-1">
                <div
                  className={`h-10 rounded-lg bg-gradient-to-r ${FUNNEL_COLORS[i]} flex items-center justify-end pr-4 transition-all duration-500`}
                  style={{ width: `${widthPct}%` }}
                >
                  <AnimatedCounter
                    value={stage.count}
                    className="font-mono text-sm font-bold text-white"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
