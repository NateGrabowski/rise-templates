"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { regionChartConfig } from "@/lib/chart-config";
import { REGION_DETAILS } from "@/data/dashboard";

const data = REGION_DETAILS.map((r) => ({
  name: r.code,
  openPositions: r.openPositions,
  fillRate: r.fillRate,
}));

export function RegionComparisonChart() {
  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-lg font-semibold">
        Regional Comparison
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Open positions and fill rates across regions
      </p>
      <ChartContainer
        config={regionChartConfig}
        className="mt-4 h-[320px] w-full"
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
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
            dataKey="openPositions"
            fill="var(--color-brand-500)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="fillRate"
            fill="var(--color-cyan-400)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
