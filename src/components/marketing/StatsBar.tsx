import { HERO_STATS } from "@/lib/constants";

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {HERO_STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
        >
          <p className="font-mono text-3xl font-bold text-brand-400 sm:text-4xl">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
