import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/marketing/Hero";
import { StatsBar } from "@/components/marketing/StatsBar";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { CTASection } from "@/components/marketing/CTASection";
import { FEATURES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "RISE — Operational Visibility. Elevated.",
  description:
    "Regional Information System Enterprise. Real-time operational visibility across all task order regions.",
};

const STEPS = [
  {
    step: 1,
    title: "Connect Your Data",
    description:
      "Integrate your existing HR and staffing systems in minutes with our secure API connectors.",
  },
  {
    step: 2,
    title: "Track in Real-Time",
    description:
      "Monitor positions, clearances, and onboarding across every region from a single dashboard.",
  },
  {
    step: 3,
    title: "Optimize Operations",
    description:
      "Use analytics and trend data to reduce time-to-fill and improve workforce readiness.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="Operational Visibility. Elevated."
        subtitle="RISE gives government contractors real-time insight into workforce pipelines, regional staffing, and operational readiness — all in one platform."
        gradient
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/features">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Hero>

      {/* Stats Bar */}
      <section className="relative -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <StatsBar />
        </div>
      </section>

      {/* Trusted By */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by leading government contractors
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-28 rounded-lg bg-surface-700/50" />
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              From regional tracking to security clearance management, RISE
              provides a complete operational toolkit.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.slice(0, 3).map((feature) => (
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

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {/* Connecting line (hidden on mobile, visible on desktop for first two items) */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[calc(50%+3rem)] top-6 hidden h-0.5 w-[calc(100%-6rem)] bg-gradient-to-r from-brand-500 to-brand-500/20 md:block" />
                )}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 font-mono text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Rise?"
        subtitle="Join the agencies that trust RISE for operational visibility."
      />
    </>
  );
}
