"use client";

import { Map, BarChart3, Activity, Shield } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/motion";

function RegionalTrackingCell() {
  return (
    <BlurFade delay={0.1} inView>
      <div className="glass-panel-strong group h-full p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
          <Map className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">
          Regional Tracking
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Interactive US map with real-time status by region. Drill into
          state-level detail with a single click.
        </p>
        {/* Decorative mini map visualization */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {[
            "bg-brand-500",
            "bg-brand-400",
            "bg-cyan-400",
            "bg-brand-600",
            "bg-brand-300",
            "bg-brand-400/60",
            "bg-cyan-500",
            "bg-brand-500/40",
            "bg-brand-400",
            "bg-brand-600/60",
          ].map((color, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${color} opacity-60`}
            />
          ))}
        </div>
      </div>
    </BlurFade>
  );
}

function AnalyticsCell() {
  return (
    <BlurFade delay={0.2} inView>
      <div className="glass-panel-strong group h-full p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
          <BarChart3 className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">
          Analytics & Reports
        </h3>
        {/* Mock bar chart */}
        <div className="mt-6 flex items-end gap-2">
          {[40, 65, 50, 80].map((h, i) => (
            <div
              key={i}
              className="w-full rounded-t bg-gradient-to-t from-brand-600 to-brand-400 opacity-70"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    </BlurFade>
  );
}

function PipelineCell() {
  return (
    <BlurFade delay={0.3} inView>
      <div className="glass-panel-strong group h-full p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
          <Activity className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">
          Real-Time Pipeline
        </h3>
        {/* Mock pipeline columns */}
        <div className="mt-6 space-y-2">
          {["Requisition", "Interview", "Onboarding"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  i === 0
                    ? "bg-status-success"
                    : i === 1
                      ? "bg-status-warning"
                      : "bg-brand-400"
                }`}
              />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}

function SecurityCell() {
  return (
    <BlurFade delay={0.4} inView>
      <div className="glass-panel-strong group h-full p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
          <Shield className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">
          Security & Training
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Monitor clearance processing timelines, schedule orientations, and
          track training compliance across all regions.
        </p>
        <div className="mt-4 flex gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
            <Shield className="h-4 w-4" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <Shield className="h-4 w-4" />
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

export function BentoFeatures() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Capabilities" title="Everything You Need" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RegionalTrackingCell />
          </div>
          <div>
            <AnalyticsCell />
          </div>
          <div>
            <PipelineCell />
          </div>
          <div className="lg:col-span-2">
            <SecurityCell />
          </div>
        </div>
      </div>
    </section>
  );
}
