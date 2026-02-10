import type { Metadata } from "next";
import { TrendingUp, BarChart3, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Reports" };

const REPORT_CARDS = [
  {
    title: "Fill Rate Trends",
    description: "Track position fill rates over time",
    icon: TrendingUp,
  },
  {
    title: "Regional Comparison",
    description: "Compare metrics across regions",
    icon: BarChart3,
  },
  {
    title: "Clearance Pipeline",
    description: "Monitor security clearance processing",
    icon: Shield,
  },
  {
    title: "Recruiter Performance",
    description: "Analyze recruiter efficiency metrics",
    icon: Users,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
        <p className="mt-1 text-muted-foreground">
          Operational reports and data-driven insights across all regions
        </p>
      </div>

      {/* Report Cards 2x2 Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {REPORT_CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-brand-500/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <card.icon className="h-5 w-5" />
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Power BI Note */}
      <p className="text-center text-sm text-muted-foreground">
        Power BI integration coming soon for advanced analytics.
      </p>
    </div>
  );
}
