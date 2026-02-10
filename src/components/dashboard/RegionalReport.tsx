"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { regionChartConfig } from "@/lib/chart-config";
import { REGION_DETAILS } from "@/data/dashboard";

const data = REGION_DETAILS.map((r) => ({
  name: r.code,
  openPositions: r.openPositions,
  fillRate: r.fillRate,
}));

export function RegionalReport() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h3 className="font-display text-lg font-semibold">
          Regional Performance
        </h3>
        <ChartContainer
          config={regionChartConfig}
          className="mt-4 h-[360px] w-full"
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
      <div className="glass-panel p-6">
        <h3 className="font-display text-lg font-semibold">Region Details</h3>
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-xs">Region</TableHead>
                <TableHead className="text-xs">States</TableHead>
                <TableHead className="text-xs">Open</TableHead>
                <TableHead className="text-xs">Fill Rate</TableHead>
                <TableHead className="text-xs">Avg Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REGION_DETAILS.map((r) => (
                <TableRow
                  key={r.code}
                  className="border-white/5 hover:bg-white/5"
                >
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="tabular-nums">{r.states}</TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {r.openPositions}
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {r.fillRate}%
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {r.avgDaysOpen}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
