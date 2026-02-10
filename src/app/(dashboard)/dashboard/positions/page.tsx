import type { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = { title: "Positions" };

const POSITION_STATS = [
  { label: "Total Positions", value: "96" },
  { label: "Interviews This Week", value: "12" },
  { label: "Offers Pending", value: "8" },
];

export default function PositionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Position Tracker</h1>
        <p className="mt-1 text-muted-foreground">
          Track open positions, interviews, and offers across the pipeline
        </p>
      </div>

      {/* Mini Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {POSITION_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 font-mono text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Position Management Table Placeholder */}
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
          <Users className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">
          Position Management Table
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Coming soon — full pipeline tracking with filters and search
        </p>
      </div>
    </div>
  );
}
