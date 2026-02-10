import { Users, Clock, UserPlus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = { Users, Clock, UserPlus, TrendingUp } as const;

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: string;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] ?? TrendingUp;
  const isPositive = change.startsWith("+");

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 font-mono text-3xl font-bold">{value}</p>
      <p
        className={cn(
          "mt-1 text-sm font-medium",
          isPositive ? "text-status-success" : "text-status-error",
        )}
      >
        {change} from last month
      </p>
    </div>
  );
}
