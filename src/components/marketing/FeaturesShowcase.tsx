"use client";

import { useState } from "react";
import Link from "next/link";
import { Map, BarChart3, Activity, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePerformanceMode } from "@/components/providers/PerformanceProvider";
import { cn } from "@/lib/utils";
import { SHOWCASE_FEATURES } from "@/lib/constants";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SectionHeading } from "@/components/motion";
import { PreviewContent } from "@/components/marketing/feature-previews";

const ICON_MAP = { Map, BarChart3, Activity, Shield } as const;
const FEATURES = SHOWCASE_FEATURES.map((f) => ({
  ...f,
  icon: ICON_MAP[f.icon],
}));

/* ── Component ────────────────────────────────── */

export function FeaturesShowcase() {
  const [active, setActive] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const { isLite } = usePerformanceMode();
  const feat = FEATURES[active];

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Capabilities"
          title="Built for Mission-Critical Workforce Ops"
          subtitle="Every feature designed for the speed and precision government contractors demand."
        />

        <BlurFade delay={0.2} inView>
          <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
            {/* ── Left: Feature Tabs ── */}
            <div
              className="flex flex-row gap-2 overflow-x-auto pb-2 lg:col-span-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
              role="tablist"
              aria-label="Features"
            >
              {FEATURES.map((f, i) => (
                <button
                  key={f.title}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative min-w-[140px] shrink-0 rounded-xl px-4 py-3 text-left transition-colors lg:min-w-0",
                    active === i ? "bg-white/[0.04]" : "hover:bg-white/[0.02]",
                  )}
                >
                  {active === i && !shouldReduceMotion && (
                    <motion.div
                      layoutId="feature-tab-indicator"
                      className="absolute inset-0 rounded-xl ring-1 ring-white/[0.08]"
                      style={{
                        background: `linear-gradient(135deg, ${f.accent}08, transparent)`,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                  {/* Left accent bar (desktop only) */}
                  <div
                    className={cn(
                      "absolute left-0 top-3 hidden h-[calc(100%-24px)] w-0.5 rounded-full transition-opacity lg:block",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                    style={{ backgroundColor: f.accent }}
                  />
                  <div className="relative flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-white/[0.06]",
                        f.iconClass,
                      )}
                    >
                      <f.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          active === i ? "text-white" : "text-white/40",
                        )}
                      >
                        {f.title}
                      </h3>
                      {active === i && (
                        <motion.p
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, height: 0 }
                          }
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-1 hidden overflow-hidden text-xs leading-relaxed text-white/40 lg:block"
                        >
                          {f.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Right: Preview Panel ── */}
            <div className="relative lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-900/80 backdrop-blur-sm">
                {!isLite && (
                  <BorderBeam
                    colorFrom={feat.accent}
                    colorTo={feat.accentLight}
                    size={150}
                    duration={8}
                    borderWidth={1.5}
                  />
                )}
                {/* Accent glow */}
                {!isLite && (
                  <div
                    className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-30 blur-[80px]"
                    style={{ backgroundColor: feat.accent }}
                  />
                )}
                {/* Mock title bar */}
                <div className="flex items-center gap-2 border-b border-white/[0.04] px-5 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-white/25">
                    {feat.title.toLowerCase().replace(/ /g, "-")}
                  </span>
                </div>
                {/* Panel content */}
                <div className="p-5" role="tabpanel">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion ? undefined : { opacity: 0, y: -8 }
                      }
                      transition={{ duration: 0.25 }}
                      className="min-h-[220px] lg:min-h-[260px]"
                    >
                      <PreviewContent index={active} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* View All link */}
        <BlurFade delay={0.4} inView>
          <div className="mt-12 text-center">
            <Link
              href="/features"
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
            >
              View All Features
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
