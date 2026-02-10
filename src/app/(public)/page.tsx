import type { Metadata } from "next";
import { HeroLanding } from "@/components/marketing/HeroLanding";
import { TrustedByMarquee } from "@/components/marketing/TrustedByMarquee";
import { FeaturesPreview } from "@/components/marketing/FeaturesPreview";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "RISE — Operational Visibility. Elevated.",
  description:
    "Regional Information System Enterprise. Real-time operational visibility across all task order regions.",
};

export default function HomePage() {
  return (
    <>
      <HeroLanding />
      <TrustedByMarquee />
      <FeaturesPreview />
      <HowItWorks />

      <CTASection
        title="Ready to Rise?"
        subtitle="Join the agencies that trust RISE for operational visibility."
        ctaText="Get Started"
        ctaHref="/contact"
      />
    </>
  );
}
