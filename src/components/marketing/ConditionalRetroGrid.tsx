"use client";

import { RetroGrid } from "@/components/magicui/retro-grid";
import { usePerformanceMode } from "@/components/providers/PerformanceProvider";

export function ConditionalRetroGrid({ className }: { className?: string }) {
  const { isLite } = usePerformanceMode();
  if (isLite) return null;
  return <RetroGrid className={className} />;
}
