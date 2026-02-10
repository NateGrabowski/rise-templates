import { cn } from "@/lib/utils";

interface RegionCardProps {
  name: string;
  states: number;
  status: "high" | "medium" | "low";
  openPositions: number;
  fillRate?: number;
}

const STATUS_STYLES = {
  high: "bg-status-error/10 text-status-error",
  medium: "bg-status-warning/10 text-status-warning",
  low: "bg-status-success/10 text-status-success",
} as const;

const STATUS_BORDERS = {
  high: "border-l-2 border-l-status-error",
  medium: "border-l-2 border-l-status-warning",
  low: "border-l-2 border-l-status-success",
} as const;

const STATUS_BAR_COLORS = {
  high: "bg-status-error",
  medium: "bg-status-warning",
  low: "bg-status-success",
} as const;

const FILL_RATES: Record<string, number> = {
  Northeast: 92,
  Southeast: 88,
  Midwest: 94,
  Southwest: 82,
  West: 90,
};

export function RegionCard({
  name,
  states,
  status,
  openPositions,
  fillRate,
}: RegionCardProps) {
  const rate = fillRate ?? FILL_RATES[name] ?? 85;

  return (
    <div
      className={cn(
        "glass-panel p-5 transition-all hover:border-brand-500/30",
        STATUS_BORDERS[status],
      )}
    >
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
        <span className="font-mono font-medium tabular-nums text-foreground">
          {openPositions} open
        </span>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Fill rate</span>
          <span className="font-mono">{rate}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              STATUS_BAR_COLORS[status],
            )}
            style={{ width: `${rate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
