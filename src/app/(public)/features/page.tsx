import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { CTASection } from "@/components/marketing/CTASection";
import { FEATURES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  Map,
  BarChart3,
  Activity,
  Shield,
  GraduationCap,
  Plane,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — RISE",
  description:
    "Explore RISE features: regional tracking, analytics, real-time pipeline, security clearance monitoring, and more.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Map,
  BarChart3,
  Activity,
  Shield,
  GraduationCap,
  Plane,
};

const FEATURE_BULLETS: string[][] = [
  [
    "Interactive heat map with drill-down by state",
    "Color-coded status indicators for each region",
    "Export regional snapshots for stakeholder briefings",
  ],
  [
    "Customizable dashboards with drag-and-drop widgets",
    "Power BI integration for advanced visualizations",
    "Automated PDF report generation on schedule",
  ],
  [
    "Kanban-style pipeline view for every position",
    "Automated recruiter assignment based on workload",
    "Real-time status updates with email and Slack alerts",
  ],
];

export default function FeaturesPage() {
  const highlightedFeatures = FEATURES.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Hero
        title="Powerful Features"
        subtitle="Everything you need to manage workforce pipelines across regions, from requisition to onboarding."
        gradient
      />

      {/* Alternating Feature Rows */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-24">
          {highlightedFeatures.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? Activity;
            const bullets = FEATURE_BULLETS[i] ?? [];
            return (
              <div
                key={feature.title}
                className={`flex flex-col items-center gap-12 lg:flex-row ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text Block */}
                <div className="flex-1">
                  <Badge
                    variant="secondary"
                    className="mb-4 gap-1.5 bg-brand-500/10 text-brand-400"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {feature.title}
                  </Badge>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-status-success" />
                        <span className="text-sm text-muted-foreground">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Placeholder Image */}
                <div className="w-full flex-1">
                  <div className="aspect-video rounded-2xl bg-surface-700" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Feature Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            All Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            A comprehensive toolkit built for government workforce operations.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="See It In Action"
        subtitle="Schedule a demo to experience RISE firsthand."
        ctaText="Request Demo"
      />
    </>
  );
}
