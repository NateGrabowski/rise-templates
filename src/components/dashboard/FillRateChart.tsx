"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fillRateChartConfig } from "@/lib/chart-config";
import { MONTHLY_METRICS } from "@/data/dashboard";

const data = MONTHLY_METRICS.map((m) => ({
  month: m.month,
  fillRate: m.fillRate,
}));

export function FillRateChart() {
  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-lg font-semibold">Fill Rate Trend</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        12-month fill rate performance
      </p>
      <ChartContainer
        config={fillRateChartConfig}
        className="mt-4 h-[280px] w-full"
      >
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="fillRateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-brand-500)"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="var(--color-brand-500)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[75, 100]}
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="fillRate"
            stroke="var(--color-brand-500)"
            strokeWidth={2}
            fill="url(#fillRateGradient)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
