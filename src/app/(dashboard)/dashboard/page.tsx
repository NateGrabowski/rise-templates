import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import { DASHBOARD_STATS, REGIONS } from "@/lib/constants";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RegionCard } from "@/components/dashboard/RegionCard";

export const metadata: Metadata = { title: "Dashboard" };

const UPCOMING_EVENTS = [
  { title: "Security Clearance Briefing", date: "Feb 12, 2026" },
  { title: "New Hire Orientation", date: "Feb 15, 2026" },
  { title: "Quarterly Training Review", date: "Feb 20, 2026" },
  { title: "Regional Travel Planning", date: "Mar 1, 2026" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-muted-foreground">
          Real-time operational metrics across all regions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Activity + Regions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Regions</h2>
          {REGIONS.map((region) => (
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

      {/* Upcoming Events */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <div className="mt-4 space-y-4">
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.title} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{event.title}</p>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">
                {event.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
