import type { Metadata } from "next";
import { REGION_DETAILS } from "@/data/dashboard";
import { RegionDetailCard } from "@/components/dashboard/RegionDetailCard";
import { RegionComparisonChart } from "@/components/dashboard/RegionComparisonChart";

export const metadata: Metadata = { title: "Regions" };

const totalPositions = REGION_DETAILS.reduce((s, r) => s + r.openPositions, 0);
const avgFillRate = Math.round(
  REGION_DETAILS.reduce((s, r) => s + r.fillRate, 0) / REGION_DETAILS.length,
);
const avgDaysOpen = Math.round(
  REGION_DETAILS.reduce((s, r) => s + r.avgDaysOpen, 0) / REGION_DETAILS.length,
);

const SUMMARY_STATS = [
  { label: "Total Positions", value: totalPositions },
  { label: "Avg Fill Rate", value: avgFillRate, suffix: "%" },
  { label: "Avg Days Open", value: avgDaysOpen },
];

export default function RegionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="micro-label mb-2">Regional Intel</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Regional Overview
        </h1>
        <p className="mt-1 text-muted-foreground">
          Monitor staffing status and open positions across all task order
          regions
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SUMMARY_STATS.map((stat) => (
          <div key={stat.label} className="glass-panel p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 font-mono text-3xl font-bold tabular-nums">
              {stat.value}
              {stat.suffix || ""}
            </p>
          </div>
        ))}
      </div>

      {/* Region Detail Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REGION_DETAILS.map((region, i) => (
          <RegionDetailCard
            key={region.code}
            name={region.name}
            code={region.code}
            states={region.states}
            openPositions={region.openPositions}
            fillRate={region.fillRate}
            avgDaysOpen={region.avgDaysOpen}
            trend={region.trend}
            topRole={region.topRole}
            totalFilled={region.totalFilled}
            index={i}
          />
        ))}
      </div>

      {/* Comparison Chart */}
      <RegionComparisonChart />
    </div>
  );
}
