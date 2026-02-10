import {
  Map,
  BarChart3,
  Activity,
  Shield,
  GraduationCap,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  Map,
  BarChart3,
  Activity,
  Shield,
  GraduationCap,
  Plane,
} as const;

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] ?? Activity;

  return (
    <div
      className={cn(
        "group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
