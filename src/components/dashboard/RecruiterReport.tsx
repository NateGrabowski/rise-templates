"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recruiterChartConfig } from "@/lib/chart-config";
import { RECRUITER_METRICS } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const data = RECRUITER_METRICS.map((r) => ({
  name: r.name.split(" ")[0],
  filled: r.filled,
}));

const topFilled = Math.max(...RECRUITER_METRICS.map((r) => r.filled));

export function RecruiterReport() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h3 className="font-display text-lg font-semibold">
          Recruiter Performance
        </h3>
        <ChartContainer
          config={recruiterChartConfig}
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
            <Bar
              dataKey="filled"
              fill="var(--color-brand-500)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="glass-panel p-6">
        <h3 className="font-display text-lg font-semibold">Leaderboard</h3>
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-xs">Rank</TableHead>
                <TableHead className="text-xs">Name</TableHead>
                <TableHead className="text-xs">Filled</TableHead>
                <TableHead className="text-xs">Avg Days</TableHead>
                <TableHead className="text-xs">Satisfaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...RECRUITER_METRICS]
                .sort((a, b) => b.filled - a.filled)
                .map((r, i) => (
                  <TableRow
                    key={r.name}
                    className={cn(
                      "border-white/5 hover:bg-white/5",
                      r.filled === topFilled && "bg-brand-500/5",
                    )}
                  >
                    <TableCell className="font-mono">#{i + 1}</TableCell>
                    <TableCell
                      className={cn(
                        "font-medium",
                        r.filled === topFilled && "text-brand-400",
                      )}
                    >
                      {r.name}
                    </TableCell>
                    <TableCell className="font-mono tabular-nums">
                      {r.filled}
                    </TableCell>
                    <TableCell className="font-mono tabular-nums">
                      {r.avgDays}d
                    </TableCell>
                    <TableCell className="font-mono tabular-nums">
                      {r.satisfaction}%
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
