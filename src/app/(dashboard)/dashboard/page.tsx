import type { Metadata } from "next";
import { DASHBOARD_STATS, REGIONS } from "@/lib/constants";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RegionCard } from "@/components/dashboard/RegionCard";
import { PositionPipelineChart } from "@/components/dashboard/PositionPipelineChart";
import { FillRateChart } from "@/components/dashboard/FillRateChart";
import { QuickActions } from "@/components/dashboard/QuickActions";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const topRegions = REGIONS.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="micro-label mb-2">Command Center</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-muted-foreground">
          Real-time operational metrics across all regions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {DASHBOARD_STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PositionPipelineChart />
        <FillRateChart />
      </div>

      {/* Activity + Regions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <ActivityFeed />
        <div className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Regions</h2>
          {topRegions.map((region) => (
            <RegionCard
              key={region.name}
              name={region.name}
              states={region.states}
              status={region.status}
              openPositions={region.openPositions}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
