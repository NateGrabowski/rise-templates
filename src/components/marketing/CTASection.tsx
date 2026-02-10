"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { InView } from "@/components/motion/InView";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTASection({
  title,
  subtitle,
  ctaText = "Get Started",
  ctaHref = "/contact",
}: CTASectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <InView direction="up" duration={0.6}>
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-700 via-brand-600 to-brand-900 px-4 py-20 sm:px-6 lg:px-8">
        <RetroGrid opacity={0.15} darkLineColor="#3b82f6" />

        <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2
            className={cn(
              "font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl",
            )}
          >
            {shouldReduceMotion ? (
              title
            ) : (
              <TextAnimate animation="slideUp" by="word" as="span">
                {title}
              </TextAnimate>
            )}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-brand-100">{subtitle}</p>
          )}
          <div className="mt-8">
            <Link href={ctaHref}>
              <ShimmerButton
                shimmerColor="#ffffff"
                background="rgba(255,255,255,0.15)"
                className="px-8 py-3 text-base font-semibold text-white"
              >
                {ctaText}
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>
    </InView>
  );
}
