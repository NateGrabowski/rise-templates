"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { pipelineChartConfig } from "@/lib/chart-config";
import { PIPELINE_STAGES } from "@/data/dashboard";

const data = PIPELINE_STAGES.map((s) => ({
  stage: s.stage,
  count: s.count,
}));

export function PositionPipelineChart() {
  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-lg font-semibold">Position Pipeline</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Positions by recruitment stage
      </p>
      <ChartContainer
        config={pipelineChartConfig}
        className="mt-4 h-[280px] w-full"
      >
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            horizontal={false}
          />
          <XAxis
            type="number"
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="stage"
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={90}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--color-brand-500)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
