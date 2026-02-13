import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { PricingCards } from "@/components/marketing/PricingCards";
import { PricingFAQ } from "@/components/marketing/PricingFAQ";
import { ConditionalRetroGrid } from "@/components/marketing/ConditionalRetroGrid";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing — RISE",
  description:
    "Simple, transparent pricing for RISE. Choose the plan that fits your operational scope.",
};

export default function PricingPage() {
  return (
    <>
      <Hero
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that matches your operational scope. No hidden fees, no surprises."
        gradient
      />

      <PricingCards />

      <PricingFAQ />

      {/* Bottom CTA */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <ConditionalRetroGrid className="opacity-30" />
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="glass-panel-md p-12">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Talk to our sales team
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
