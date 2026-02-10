"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Particles } from "@/components/magicui/particles";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";

const STATS = [
  { value: 10000, suffix: "+", label: "Positions Tracked" },
  { value: 5, suffix: "", label: "CONUS Regions" },
  { value: 91, suffix: "%", label: "Fill Rate" },
  { value: 50, suffix: "+", label: "Agency Partners" },
] as const;

export function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-surface-900 via-brand-950/50 to-surface-900"
    >
      {/* Ambient layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_var(--color-brand-500),_transparent_60%)] opacity-[0.12]" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-500/[0.07] blur-[120px]" />
      <BackgroundBeams />
      <Particles className="absolute inset-0" color="#3b82f6" quantity={30} />

      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-8 sm:px-6 sm:pt-36 lg:px-8">
        {/* Badge */}
        <BlurFade delay={0}>
          <div className="mb-8 flex justify-center">
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
          <h1 className="mx-auto max-w-4xl text-center font-display text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] sm:text-6xl lg:text-7xl xl:text-8xl">
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
            Real-time workforce intelligence for government contractors.
            Pipeline tracking, regional staffing, and operational readiness —
            unified in one command center.
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.4}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <ShimmerButton
                shimmerColor="#60a5fa"
                background="rgba(59, 130, 246, 0.15)"
                borderRadius="12px"
                className="px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25"
              >
                View Live Dashboard
              </ShimmerButton>
            </Link>
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

        {/* Inline stats */}
        <BlurFade delay={0.55}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex items-baseline gap-2",
                  i < STATS.length - 1 &&
                    "sm:border-r sm:border-white/10 sm:pr-10",
                )}
              >
                <span className="font-mono text-2xl font-bold tabular-nums text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs tracking-wider text-white/40 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* 3D Dashboard Preview */}
        <div className="mt-16 sm:mt-20" style={{ perspective: "1200px" }}>
          <motion.div
            style={shouldReduceMotion ? {} : { rotateX, scale, opacity }}
            className="relative"
          >
            {/* Glow underneath */}
            <div className="absolute -inset-x-10 -bottom-10 h-40 bg-[radial-gradient(ellipse_at_center,_var(--color-brand-500)_0%,_transparent_70%)] opacity-30 blur-2xl" />

            {/* The mockup */}
            <div className="relative">
              <BorderBeam
                colorFrom="#3b82f6"
                colorTo="#22d3ee"
                size={200}
                duration={8}
                borderWidth={1.5}
              />
              <DashboardPreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
