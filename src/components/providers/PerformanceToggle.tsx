"use client";

import { Zap, ZapOff } from "lucide-react";
import { usePerformanceMode } from "@/components/providers/PerformanceProvider";

export function PerformanceToggle() {
  const { isLite, toggleMode } = usePerformanceMode();

  return (
    <button
      onClick={toggleMode}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle performance mode"
      aria-pressed={isLite}
      title={
        isLite
          ? "Performance mode: Lite (click for full)"
          : "Performance mode: Full (click for lite)"
      }
    >
      <Zap className="h-5 w-5 block [[data-performance=lite]_&]:hidden" />
      <ZapOff className="h-5 w-5 hidden [[data-performance=lite]_&]:block" />
    </button>
  );
}
