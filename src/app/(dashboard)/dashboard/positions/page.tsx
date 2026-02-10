import type { Metadata } from "next";
import { PipelineFunnel } from "@/components/dashboard/PipelineFunnel";
import { PositionTable } from "@/components/dashboard/PositionTable";

export const metadata: Metadata = { title: "Positions" };

const POSITION_STATS = [
  { label: "Total Positions", value: 96 },
  { label: "Interviews This Week", value: 12 },
  { label: "Offers Pending", value: 8 },
];

export default function PositionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="micro-label mb-2">Personnel</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Position Tracker
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track open positions, interviews, and offers across the pipeline
        </p>
      </div>

      {/* Mini Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {POSITION_STATS.map((stat) => (
          <div key={stat.label} className="glass-panel p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 font-mono text-3xl font-bold tabular-nums">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pipeline Funnel */}
      <PipelineFunnel />

      {/* Positions Table */}
      <PositionTable />
    </div>
  );
}
