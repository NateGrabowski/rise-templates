import type { Metadata } from "next";
import { Map } from "lucide-react";
import { REGIONS } from "@/lib/constants";
import { RegionCard } from "@/components/dashboard/RegionCard";

export const metadata: Metadata = { title: "Regions" };

export default function RegionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Regional Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Monitor staffing status and open positions across all task order
          regions
        </p>
      </div>

      {/* Region Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Interactive Map Placeholder */}
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
          <Map className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Interactive Map</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Coming soon — real-time regional activity visualization
        </p>
      </div>
    </div>
  );
}
