"use client";

import Link from "next/link";
import { Map, BarChart3, Activity, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/motion";

/* ── SVG Mini Visualizations ─────────────────────────────── */

function MiniMap() {
  return (
    <svg viewBox="0 0 240 100" className="h-full w-full">
      {[
        { cx: 180, cy: 30, r: 8, fill: "#3b82f6" },
        { cx: 170, cy: 65, r: 6, fill: "#22d3ee" },
        { cx: 120, cy: 45, r: 9, fill: "#3b82f6" },
        { cx: 70, cy: 60, r: 6, fill: "#22d3ee" },
        { cx: 40, cy: 35, r: 7, fill: "#3b82f6" },
      ].map((dot, i) => (
        <g key={i}>
          <circle {...dot} opacity={0.2} r={dot.r * 3} />
          <circle {...dot} opacity={0.8} />
        </g>
      ))}
      <line
        x1="180"
        y1="30"
        x2="120"
        y2="45"
        stroke="#3b82f6"
        strokeWidth="0.8"
        opacity="0.3"
      />
      <line
        x1="120"
        y1="45"
        x2="40"
        y2="35"
        stroke="#3b82f6"
        strokeWidth="0.8"
        opacity="0.3"
      />
      <line
        x1="170"
        y1="65"
        x2="70"
        y2="60"
        stroke="#22d3ee"
        strokeWidth="0.8"
        opacity="0.3"
      />
    </svg>
  );
}

function MiniChart() {
  return (
    <svg
      viewBox="0 0 200 90"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="bento-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,70 C20,65 40,55 60,48 C80,40 100,35 130,28 C160,20 180,16 200,12 L200,90 L0,90 Z"
        fill="url(#bento-fill)"
      />
      <path
        d="M0,70 C20,65 40,55 60,48 C80,40 100,35 130,28 C160,20 180,16 200,12"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
      />
      {[
        [0, 70],
        [60, 48],
        [130, 28],
        [200, 12],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#22d3ee" />
      ))}
    </svg>
  );
}

function MiniPipeline() {
  const stages = [
    { w: "92%", label: "94", color: "from-emerald-400 to-emerald-500/60" },
    { w: "72%", label: "71", color: "from-emerald-400/80 to-emerald-500/40" },
    { w: "52%", label: "47", color: "from-emerald-400/60 to-emerald-500/30" },
    { w: "32%", label: "24", color: "from-emerald-400/40 to-emerald-500/20" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div
            className={cn("h-4 rounded-full bg-gradient-to-r", s.color)}
            style={{ width: s.w }}
          />
          <span className="font-mono text-xs text-emerald-300/70">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Card Config ──────────────────────────────────────────── */

const CARDS = [
  {
    title: "Regional Command Map",
    desc: "Interactive status across all 5 CONUS regions. Drill from national overview to state-level detail in one click.",
    icon: Map,
    accent: "brand",
    gradient: "from-brand-500/15 via-brand-600/5 to-transparent",
    magicFrom: "#3b82f6",
    magicTo: "#60a5fa",
    visual: MiniMap,
    wide: true,
  },
  {
    title: "Analytics & Reports",
    desc: "Pipeline metrics, fill rates, trend analysis. Export to Power BI or download executive briefings as PDF.",
    icon: BarChart3,
    accent: "cyan",
    gradient: "from-cyan-500/15 via-cyan-600/5 to-transparent",
    magicFrom: "#22d3ee",
    magicTo: "#67e8f9",
    visual: MiniChart,
    wide: false,
  },
  {
    title: "Real-Time Pipeline",
    desc: "Track every position from requisition through onboarding. Automated status updates and recruiter assignment.",
    icon: Activity,
    accent: "emerald",
    gradient: "from-emerald-500/15 via-emerald-600/5 to-transparent",
    magicFrom: "#10b981",
    magicTo: "#34d399",
    visual: MiniPipeline,
    wide: false,
  },
  {
    title: "Security & Training",
    desc: "Monitor clearance processing timelines, schedule orientations, and track training compliance across all regions.",
    icon: Shield,
    accent: "violet",
    gradient: "from-violet-500/15 via-violet-600/5 to-transparent",
    magicFrom: "#8b5cf6",
    magicTo: "#a78bfa",
    visual: null,
    wide: true,
  },
] as const;

const ACCENT_COLORS = {
  brand: {
    icon: "bg-brand-500/15 text-brand-400",
    beam: ["#3b82f6", "#60a5fa"],
  },
  cyan: { icon: "bg-cyan-500/15 text-cyan-400", beam: ["#22d3ee", "#67e8f9"] },
  emerald: {
    icon: "bg-emerald-500/15 text-emerald-400",
    beam: ["#10b981", "#34d399"],
  },
  violet: {
    icon: "bg-violet-500/15 text-violet-400",
    beam: ["#8b5cf6", "#a78bfa"],
  },
} as const;

/* ── Component ────────────────────────────────────────────── */

export function BentoFeatures() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Capabilities"
          title="Built for Mission-Critical Workforce Ops"
          subtitle="Every feature designed for the speed and precision government contractors demand."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const colors = ACCENT_COLORS[card.accent];
            const Visual = card.visual;
            return (
              <div
                key={card.title}
                className={cn(card.wide && "lg:col-span-2")}
              >
                <BlurFade delay={0.1 + i * 0.1} inView>
                  <MagicCard
                    className="group h-full rounded-2xl"
                    gradientSize={300}
                    gradientFrom={card.magicFrom}
                    gradientTo={card.magicTo}
                    gradientColor="#1a1f2e"
                    gradientOpacity={0.2}
                  >
                    {card.wide && (
                      <BorderBeam
                        colorFrom={colors.beam[0]}
                        colorTo={colors.beam[1]}
                        size={120}
                        duration={8}
                        borderWidth={1.5}
                      />
                    )}
                    {/* Resting gradient backdrop */}
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-100",
                        card.gradient,
                      )}
                    />
                    <div className="relative flex h-full flex-col p-6">
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-white/[0.06]",
                          colors.icon,
                        )}
                      >
                        <card.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">
                        {card.desc}
                      </p>
                      {Visual && (
                        <div className="mt-auto pt-5">
                          <div className="h-24 overflow-hidden rounded-lg border border-white/[0.04] bg-surface-900/60 p-2">
                            <Visual />
                          </div>
                        </div>
                      )}
                    </div>
                  </MagicCard>
                </BlurFade>
              </div>
            );
          })}
        </div>
        <BlurFade delay={0.5} inView>
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
