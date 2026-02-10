import { cn } from "@/lib/utils";

interface RegionCardProps {
  name: string;
  states: number;
  status: "high" | "medium" | "low";
  openPositions: number;
}

const STATUS_STYLES = {
  high: "bg-status-error/10 text-status-error",
  medium: "bg-status-warning/10 text-status-warning",
  low: "bg-status-success/10 text-status-success",
} as const;

export function RegionCard({
  name,
  states,
  status,
  openPositions,
}: RegionCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:border-brand-500/30">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{name}</h4>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
            STATUS_STYLES[status],
          )}
        >
          {status}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
        <span>{states} states</span>
        <span className="font-mono font-medium text-foreground">
          {openPositions} open
        </span>
      </div>
    </div>
  );
}
