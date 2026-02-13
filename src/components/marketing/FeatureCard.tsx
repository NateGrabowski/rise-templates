"use client";

import { useState } from "react";
import {
  Map,
  BarChart3,
  Activity,
  Shield,
  GraduationCap,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";
import { InView } from "@/components/motion/InView";
import { usePerformanceMode } from "@/components/providers/PerformanceProvider";

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
  animated?: boolean;
}

function FeatureCardInner({
  title,
  description,
  icon,
  className,
}: Omit<FeatureCardProps, "animated">) {
  const [hovered, setHovered] = useState(false);
  const { isLite } = usePerformanceMode();
  const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] ?? Activity;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative glass-panel p-6 transition-all duration-300 ease-out hover:border-brand-500/30 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/10",
        className,
      )}
    >
      {hovered && !isLite && (
        <BorderBeam
          colorFrom="#3b82f6"
          colorTo="#22d3ee"
          size={80}
          duration={4}
          borderWidth={2}
        />
      )}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function FeatureCard({ animated, ...props }: FeatureCardProps) {
  if (animated) {
    return (
      <InView direction="up" duration={0.5}>
        <FeatureCardInner {...props} />
      </InView>
    );
  }
  return <FeatureCardInner {...props} />;
}
