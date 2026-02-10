"use client";

import { Users, Clock, UserPlus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

const ICON_MAP = { Users, Clock, UserPlus, TrendingUp } as const;

const ACCENT_COLORS: Record<string, string> = {
  Users: "border-t-brand-400",
  Clock: "border-t-cyan-400",
  UserPlus: "border-t-emerald-400",
  TrendingUp: "border-t-violet-400",
};

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: string;
  delay?: number;
}

function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  return { num: 0, suffix: value };
}

export function StatCard({
  label,
  value,
  change,
  icon,
  delay = 0,
}: StatCardProps) {
  const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] ?? TrendingUp;
  const isPositive = change.startsWith("+");
  const { num, suffix } = parseValue(value);

  return (
    <FadeIn direction="up" delay={delay}>
      <div
        className={cn(
          "group glass-panel border-t-2 p-6 transition-all duration-300 ease-out hover:border-brand-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
          ACCENT_COLORS[icon] || "border-t-brand-400",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <AnimatedCounter
          value={num}
          suffix={suffix}
          className="mt-3 font-mono text-3xl font-bold tabular-nums"
        />
        <p
          className={cn(
            "mt-1 text-sm font-medium",
            isPositive ? "text-status-success" : "text-status-error",
          )}
        >
          {change} from last month
        </p>
      </div>
    </FadeIn>
  );
}
