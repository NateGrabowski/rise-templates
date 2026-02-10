import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { BentoFeatures } from "@/components/marketing/BentoFeatures";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { CTASection } from "@/components/marketing/CTASection";
import { FEATURES } from "@/lib/constants";
import { SectionHeading } from "@/components/motion";

export const metadata: Metadata = {
  title: "Features — RISE",
  description:
    "Explore RISE features: regional tracking, analytics, real-time pipeline, security clearance monitoring, and more.",
};

export default function FeaturesPage() {
  return (
    <>
      <Hero
        background="spotlight"
        title="Powerful Features"
        subtitle="Everything you need to manage workforce pipelines across regions, from requisition to onboarding."
      />

      <BentoFeatures />

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="Full Suite"
            title="All Features"
            subtitle="A comprehensive toolkit built for government workforce operations."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                animated
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="See It In Action"
        subtitle="Schedule a demo to experience RISE firsthand."
        ctaText="Request Demo"
      />
    </>
  );
}
