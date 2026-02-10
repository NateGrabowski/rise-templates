import type { Metadata } from "next";
import { HeroLanding } from "@/components/marketing/HeroLanding";
import { FeaturesShowcase } from "@/components/marketing/FeaturesShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CTAFinal } from "@/components/marketing/CTAFinal";

export const metadata: Metadata = {
  title: "RISE — Operational Visibility. Elevated.",
  description:
    "Regional Information System Enterprise. Real-time operational visibility across all task order regions.",
};

export default function HomePage() {
  return (
    <>
      <HeroLanding />
      <FeaturesShowcase />
      <HowItWorks />
      <CTAFinal />
    </>
  );
}
