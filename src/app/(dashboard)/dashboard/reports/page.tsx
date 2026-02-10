import type { Metadata } from "next";
import { ReportTabs } from "@/components/dashboard/ReportTabs";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="micro-label mb-2">Analytics</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
        <p className="mt-1 text-muted-foreground">
          Operational reports and data-driven insights across all regions
        </p>
      </div>

      {/* Report Tabs */}
      <ReportTabs />
    </div>
  );
}
