import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PositionStatus } from "@/data/dashboard";

const STATUS_STYLES: Record<PositionStatus, string> = {
  requisition: "bg-muted text-muted-foreground",
  screening: "bg-brand-500/10 text-brand-400",
  interview: "bg-cyan-400/10 text-cyan-400",
  offer: "bg-status-warning/10 text-status-warning",
  onboarding: "bg-status-success/10 text-status-success",
  filled: "bg-status-success/20 text-status-success",
};

interface PositionStatusBadgeProps {
  status: PositionStatus;
}

export function PositionStatusBadge({ status }: PositionStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent capitalize", STATUS_STYLES[status])}
    >
      {status}
    </Badge>
  );
}
