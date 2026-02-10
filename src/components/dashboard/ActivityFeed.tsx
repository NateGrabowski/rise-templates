import { RECENT_ACTIVITY } from "@/lib/constants";

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h3 className="text-lg font-semibold">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {RECENT_ACTIVITY.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.action}</p>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
