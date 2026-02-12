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
      title={
        isLite
          ? "Performance mode: Lite (click for full)"
          : "Performance mode: Full (click for lite)"
      }
      suppressHydrationWarning
    >
      {isLite ? <ZapOff className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
    </button>
  );
}
