"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { clearanceChartConfig } from "@/lib/chart-config";
import { CLEARANCE_PIPELINE } from "@/data/dashboard";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

const data = CLEARANCE_PIPELINE.map((c) => ({
  type: c.type,
  pending: c.pending,
  processing: c.processing,
  approved: c.approved,
}));

export function ClearanceReport() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h3 className="font-display text-lg font-semibold">
          Clearance Pipeline
        </h3>
        <ChartContainer
          config={clearanceChartConfig}
          className="mt-4 h-[360px] w-full"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="type"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="pending"
              fill="var(--color-status-warning)"
              stackId="stack"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="processing"
              fill="var(--color-brand-400)"
              stackId="stack"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="approved"
              fill="var(--color-status-success)"
              stackId="stack"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CLEARANCE_PIPELINE.map((c) => (
          <div key={c.type} className="glass-panel p-5">
            <p className="text-xs text-muted-foreground">{c.type}</p>
            <AnimatedCounter
              value={c.approved + c.processing + c.pending}
              className="mt-1 font-mono text-xl font-bold"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {c.avgDays}d avg processing
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
