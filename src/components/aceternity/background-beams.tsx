"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="beam-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="var(--color-brand-500)"
              stopOpacity="0"
            />
            <stop
              offset="50%"
              stopColor="var(--color-brand-400)"
              stopOpacity="0.12"
            />
            <stop
              offset="100%"
              stopColor="var(--color-cyan-400)"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="beam-gradient-2"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="var(--color-cyan-400)"
              stopOpacity="0"
            />
            <stop
              offset="50%"
              stopColor="var(--color-brand-500)"
              stopOpacity="0.08"
            />
            <stop
              offset="100%"
              stopColor="var(--color-brand-400)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`beam-a-${i}`}
            x1={`${i * 20}%`}
            y1="0%"
            x2={`${100 - i * 15}%`}
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={`beam-b-${i}`}
            x1={`${100 - i * 25}%`}
            y1="0%"
            x2={`${i * 20}%`}
            y2="100%"
            stroke="url(#beam-gradient-2)"
            strokeWidth="1"
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
