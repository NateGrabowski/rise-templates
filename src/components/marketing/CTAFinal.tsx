"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Meteors } from "@/components/magicui/meteors";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";

interface CTAFinalProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTAFinal({
  title = "Ready to Rise?",
  subtitle = "Join the agencies that trust RISE for operational visibility.",
  ctaText = "Get Started",
  ctaHref = "/contact",
}: CTAFinalProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-surface-900 px-4 py-24 sm:px-6 lg:px-8">
      {/* Animated grid background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.15}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "fill-brand-500/20 stroke-brand-500/10",
        )}
      />

      {/* Falling meteors */}
      {!shouldReduceMotion && (
        <Meteors number={12} minDuration={3} maxDuration={8} />
      )}

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.08] blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-cyan-400/[0.06] blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <BlurFade delay={0} inView>
          <p className="micro-label mb-4">Get Started</p>
        </BlurFade>

        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {shouldReduceMotion ? (
            title
          ) : (
            <TextAnimate animation="slideUp" by="word" as="span">
              {title}
            </TextAnimate>
          )}
        </h2>

        {subtitle && (
          <BlurFade delay={0.15} inView>
            <p className="mt-4 text-lg text-white/50">{subtitle}</p>
          </BlurFade>
        )}

        <BlurFade delay={0.3} inView>
          <div className="mt-8 flex justify-center">
            <Link href={ctaHref}>
              <ShimmerButton
                shimmerColor="#60a5fa"
                background="rgba(59, 130, 246, 0.15)"
                borderRadius="12px"
                className="px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25"
              >
                {ctaText}
              </ShimmerButton>
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
