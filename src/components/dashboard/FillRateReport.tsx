"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fillRateChartConfig } from "@/lib/chart-config";
import { MONTHLY_METRICS } from "@/data/dashboard";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

const data = MONTHLY_METRICS.map((m) => ({
  month: m.month,
  fillRate: m.fillRate,
}));

const currentRate = data[data.length - 1].fillRate;
const avgRate = Math.round(
  data.reduce((s, d) => s + d.fillRate, 0) / data.length,
);
const bestMonth = data.reduce((best, d) =>
  d.fillRate > best.fillRate ? d : best,
);

export function FillRateReport() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h3 className="font-display text-lg font-semibold">
          Fill Rate Over Time
        </h3>
        <ChartContainer
          config={fillRateChartConfig}
          className="mt-4 h-[360px] w-full"
        >
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="fillReportGrad" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#fillReportGrad)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="glass-panel p-5">
          <p className="text-sm text-muted-foreground">Current Rate</p>
          <AnimatedCounter
            value={currentRate}
            suffix="%"
            className="mt-1 font-mono text-2xl font-bold"
          />
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-muted-foreground">12-Month Avg</p>
          <AnimatedCounter
            value={avgRate}
            suffix="%"
            className="mt-1 font-mono text-2xl font-bold"
          />
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-muted-foreground">Best Month</p>
          <p className="mt-1 font-mono text-2xl font-bold">
            {bestMonth.month} {bestMonth.fillRate}%
          </p>
        </div>
      </div>
    </div>
  );
}
