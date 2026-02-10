"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICING_TIERS } from "@/lib/constants";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Button } from "@/components/ui/button";

function parsePrice(price: string): number | null {
  const match = price.replace(/,/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

export function PricingCards() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-3">
        {PRICING_TIERS.map((tier, i) => {
          const numericPrice = parsePrice(tier.price);
          return (
            <BlurFade key={tier.name} delay={i * 0.15}>
              <div
                className={cn(
                  "glass-panel relative flex flex-col overflow-hidden p-8",
                  tier.highlighted && "scale-105 z-10",
                )}
              >
                {tier.highlighted && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-1 w-full bg-gradient-to-r from-brand-500 to-cyan-400" />
                    <BorderBeam
                      colorFrom="#3b82f6"
                      colorTo="#22d3ee"
                      duration={8}
                      size={80}
                    />
                  </>
                )}

                {/* Header */}
                <div className="text-center">
                  {tier.highlighted && (
                    <div className="mb-4 flex justify-center">
                      <span className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs">
                        <AnimatedShinyText shimmerWidth={80}>
                          Most Popular
                        </AnimatedShinyText>
                      </span>
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline justify-center gap-1">
                    {numericPrice !== null ? (
                      <>
                        <AnimatedCounter
                          value={numericPrice}
                          prefix="$"
                          className="font-display text-4xl font-bold"
                        />
                        <span className="text-muted-foreground">/mo</span>
                      </>
                    ) : (
                      <span className="font-display text-4xl font-bold">
                        Custom
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature, fi) => (
                    <BlurFade key={feature} delay={i * 0.15 + fi * 0.04}>
                      <li className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-status-success" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    </BlurFade>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  {tier.highlighted ? (
                    <Link href="/contact" className="block">
                      <ShimmerButton
                        className="w-full"
                        background="rgba(37, 99, 235, 1)"
                      >
                        <span className="text-sm font-medium">{tier.cta}</span>
                      </ShimmerButton>
                    </Link>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">{tier.cta}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
