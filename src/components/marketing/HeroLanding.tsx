"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { usePerformanceMode } from "@/components/providers/PerformanceProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";

import { Particles } from "@/components/magicui/particles";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Lamp } from "@/components/aceternity/lamp";

const STATS = [
  { value: 10000, suffix: "+", label: "Positions Tracked" },
  { value: 5, suffix: "", label: "CONUS Regions" },
  { value: 91, suffix: "%", label: "Fill Rate" },
  { value: 50, suffix: "+", label: "Agency Partners" },
] as const;

export function HeroLanding() {
  const shouldReduceMotion = useReducedMotion();
  const { isLite } = usePerformanceMode();

  const heroContent = (
    <>
      {/* Badge */}
      <BlurFade delay={0}>
        <div className="mb-8 mt-24 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-sm">
            <AnimatedShinyText className="text-sm font-medium">
              Now tracking 10,000+ positions across 5 regions
            </AnimatedShinyText>
            <ArrowRight className="ml-2 h-3.5 w-3.5 text-brand-400" />
          </div>
        </div>
      </BlurFade>

      {/* Headline */}
      <BlurFade delay={0.1}>
        <h1 className="mx-auto max-w-5xl text-center font-display text-6xl font-extrabold tracking-[-0.04em] leading-[1.05] sm:text-7xl lg:text-8xl xl:text-9xl">
          <span className="text-gradient-hero">Operational</span>
          <br className="sm:hidden" />{" "}
          <span className="text-gradient-hero">Visibility.</span>
          <br />
          <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-brand-400 bg-clip-text text-transparent">
            Elevated.
          </span>
        </h1>
      </BlurFade>

      {/* Subtitle */}
      <BlurFade delay={0.25}>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/60 sm:text-xl">
          Real-time workforce intelligence for government contractors. Pipeline
          tracking, regional staffing, and operational readiness — unified in
          one command center.
        </p>
      </BlurFade>

      {/* CTAs */}
      <BlurFade delay={0.4}>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600"
          >
            <Link href="/dashboard">View Live Dashboard</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <Link href="/features">
              Explore Features <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </BlurFade>

      {/* Stats row */}
      <BlurFade delay={0.55}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex items-baseline gap-2",
                i < STATS.length - 1 &&
                  "sm:border-r sm:border-white/10 sm:pr-10",
              )}
            >
              <span className="font-mono text-2xl font-bold">
                <NumberTicker
                  value={stat.value}
                  delay={0.3 + i * 0.1}
                  className="text-white"
                />
                {stat.suffix && (
                  <span className="text-brand-400">{stat.suffix}</span>
                )}
              </span>
              <span className="text-xs tracking-wider text-white/40 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </BlurFade>
    </>
  );

  return (
    <section className="relative overflow-hidden">
      {isLite ? (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-surface-900 via-brand-950/50 to-background">
          {heroContent}
        </div>
      ) : (
        <Lamp className="min-h-screen">{heroContent}</Lamp>
      )}

      {/* Particles — outside Lamp, subtle float */}
      {!shouldReduceMotion && !isLite && (
        <Particles
          className="absolute inset-0 z-40"
          color="#3b82f6"
          quantity={15}
        />
      )}
    </section>
  );
}
