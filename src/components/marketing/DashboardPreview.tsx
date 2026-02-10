import { cn } from "@/lib/utils";

/** Static CSS mockup of the RISE dashboard — used as a hero product shot. */
export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/[0.08] bg-surface-900 shadow-2xl",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <div className="ml-4 h-5 w-48 rounded-md bg-white/[0.06]" />
      </div>

      <div className="flex">
        {/* Mini sidebar */}
        <div className="hidden w-40 shrink-0 border-r border-white/[0.06] p-3 sm:block">
          <div className="mb-4 h-5 w-16 rounded bg-brand-500/30" />
          {[true, false, false, false].map((active, i) => (
            <div
              key={i}
              className={cn(
                "mb-1.5 flex items-center gap-2 rounded-md px-2 py-1.5",
                active && "bg-brand-500/15",
              )}
            >
              <div
                className={cn(
                  "h-3 w-3 rounded",
                  active ? "bg-brand-500" : "bg-white/10",
                )}
              />
              <div
                className={cn(
                  "h-2.5 rounded",
                  active ? "w-16 bg-brand-400/60" : "w-12 bg-white/10",
                )}
              />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 sm:p-4">
          {/* Stat cards row */}
          <div className="mb-4 grid grid-cols-4 gap-2">
            {[
              {
                val: "96",
                label: "Open",
                color: "from-brand-500/20 to-brand-600/10",
              },
              {
                val: "14",
                label: "Avg Days",
                color: "from-cyan-500/20 to-cyan-600/10",
              },
              {
                val: "43",
                label: "Hires",
                color: "from-emerald-500/20 to-emerald-600/10",
              },
              {
                val: "91%",
                label: "Fill Rate",
                color: "from-brand-400/20 to-cyan-400/10",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={cn(
                  "rounded-lg border border-white/[0.06] bg-gradient-to-br p-2 sm:p-3",
                  s.color,
                )}
              >
                <p className="font-mono text-sm font-bold text-white sm:text-lg">
                  {s.val}
                </p>
                <p className="text-[9px] tracking-wider text-white/40 uppercase sm:text-[10px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            {/* Mini pipeline chart */}
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="mb-2 text-[10px] font-medium tracking-wider text-white/50 uppercase">
                Pipeline
              </p>
              <div className="flex flex-col gap-1.5">
                {[85, 68, 45, 28, 18].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mini area chart (SVG) */}
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="mb-2 text-[10px] font-medium tracking-wider text-white/50 uppercase">
                Fill Rate Trend
              </p>
              <svg
                viewBox="0 0 200 60"
                className="w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 C20,42 40,38 60,35 C80,32 100,28 120,25 C140,22 160,18 180,15 L200,12 L200,60 L0,60 Z"
                  fill="url(#chart-fill)"
                />
                <path
                  d="M0,45 C20,42 40,38 60,35 C80,32 100,28 120,25 C140,22 160,18 180,15 L200,12"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Activity feed */}
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="mb-2 text-[10px] font-medium tracking-wider text-white/50 uppercase">
              Recent Activity
            </p>
            {[
              { dot: "bg-emerald-400", w1: "w-32", w2: "w-20" },
              { dot: "bg-brand-400", w1: "w-28", w2: "w-16" },
              { dot: "bg-cyan-400", w1: "w-36", w2: "w-12" },
            ].map((item, i) => (
              <div key={i} className="mb-1.5 flex items-center gap-2 last:mb-0">
                <div className={cn("h-2 w-2 rounded-full", item.dot)} />
                <div className={cn("h-2 rounded bg-white/10", item.w1)} />
                <div
                  className={cn("ml-auto h-2 rounded bg-white/[0.06]", item.w2)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
