"use client";

import Link from "next/link";
import { ArrowRight, Map, BarChart3, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SectionHeading } from "@/components/motion";

const FEATURES = [
  {
    title: "Regional Command Map",
    description:
      "Interactive status across all 5 CONUS regions. Drill from national overview to state-level detail in one click.",
    icon: Map,
    color: "from-brand-500/20 via-brand-600/10 to-transparent",
    accent: "bg-brand-500",
    visual: "map" as const,
  },
  {
    title: "Analytics & Reports",
    description:
      "Pipeline metrics, fill rates, trend analysis. Export to Power BI or download executive briefings as PDF.",
    icon: BarChart3,
    color: "from-cyan-500/20 via-cyan-600/10 to-transparent",
    accent: "bg-cyan-400",
    visual: "chart" as const,
  },
  {
    title: "Real-Time Pipeline",
    description:
      "Track every position from requisition through onboarding. Automated status updates and recruiter assignment.",
    icon: Activity,
    color: "from-emerald-500/20 via-emerald-600/10 to-transparent",
    accent: "bg-emerald-400",
    visual: "pipeline" as const,
  },
] as const;

function MiniMap() {
  return (
    <svg viewBox="0 0 160 80" className="w-full opacity-60">
      {/* Stylized US region dots */}
      {[
        { cx: 120, cy: 25, r: 6, fill: "#3b82f6" },
        { cx: 115, cy: 50, r: 5, fill: "#22d3ee" },
        { cx: 80, cy: 35, r: 7, fill: "#3b82f6" },
        { cx: 50, cy: 50, r: 5, fill: "#22d3ee" },
        { cx: 30, cy: 30, r: 6, fill: "#3b82f6" },
      ].map((dot, i) => (
        <g key={i}>
          <circle {...dot} opacity={0.3} r={dot.r * 2.5} />
          <circle {...dot} />
        </g>
      ))}
      {/* Connection lines */}
      <line
        x1="120"
        y1="25"
        x2="80"
        y2="35"
        stroke="#3b82f6"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="80"
        y1="35"
        x2="30"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="115"
        y1="50"
        x2="50"
        y2="50"
        stroke="#22d3ee"
        strokeWidth="0.5"
        opacity="0.3"
      />
    </svg>
  );
}

function MiniChart() {
  return (
    <svg
      viewBox="0 0 160 80"
      className="w-full opacity-60"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="feat-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 C15,55 30,50 50,42 C70,34 90,30 110,24 C130,18 150,14 160,10 L160,80 L0,80 Z"
        fill="url(#feat-fill)"
      />
      <path
        d="M0,60 C15,55 30,50 50,42 C70,34 90,30 110,24 C130,18 150,14 160,10"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
      />
      {/* Data points */}
      {[
        [0, 60],
        [50, 42],
        [110, 24],
        [160, 10],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" />
      ))}
    </svg>
  );
}

function MiniPipeline() {
  const stages = [
    { w: "90%", label: "94" },
    { w: "72%", label: "71" },
    { w: "50%", label: "47" },
    { w: "30%", label: "24" },
  ];
  return (
    <div className="flex flex-col gap-2 opacity-60">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500/50"
            style={{ width: s.w }}
          />
          <span className="font-mono text-[10px] text-emerald-300/60">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const VISUALS = { map: MiniMap, chart: MiniChart, pipeline: MiniPipeline };

export function FeaturesPreview() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Capabilities"
          title="Built for Mission-Critical Workforce Ops"
          subtitle="Every feature designed for the speed and precision government contractors demand."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Visual = VISUALS[feature.visual];
            return (
              <BlurFade key={feature.title} delay={0.1 + i * 0.12} inView>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-850/50 p-6 transition-all duration-500 hover:border-white/15 hover:bg-surface-800/60">
                  <BorderBeam
                    colorFrom="#3b82f6"
                    colorTo="#22d3ee"
                    size={100}
                    duration={6}
                    borderWidth={1.5}
                  />

                  {/* Gradient backdrop */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      feature.color,
                    )}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08]">
                      <feature.icon className="h-5 w-5 text-brand-400" />
                    </div>

                    {/* Mini visualization */}
                    <div className="mb-5 h-20 overflow-hidden rounded-lg border border-white/[0.04] bg-surface-900/50 p-2">
                      <Visual />
                    </div>

                    <h3 className="font-display text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade delay={0.5} inView>
          <div className="mt-12 text-center">
            <Link
              href="/features"
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
            >
              View All 6 Features
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
