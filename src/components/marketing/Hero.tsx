"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Particles } from "@/components/magicui/particles";
import { Spotlight } from "@/components/aceternity/spotlight";
import { Lamp } from "@/components/aceternity/lamp";

type BackgroundType = "beams" | "particles" | "spotlight" | "lamp" | "none";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  background?: BackgroundType;
  /** @deprecated Use `background` instead */
  gradient?: boolean;
  className?: string;
}

function HeroBackground({ bg }: { bg: BackgroundType }) {
  switch (bg) {
    case "beams":
      return <BackgroundBeams />;
    case "particles":
      return (
        <Particles className="absolute inset-0" color="#3b82f6" quantity={40} />
      );
    case "spotlight":
      return <Spotlight fill="#3b82f6" />;
    case "lamp":
    case "none":
      return null;
  }
}

export function Hero({
  title,
  subtitle,
  children,
  background,
  gradient,
  className,
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  // Backward compat: gradient=true maps to "beams"
  const bg: BackgroundType = background ?? (gradient ? "beams" : "none");
  const hasGradient = bg !== "none";

  if (bg === "lamp") {
    return (
      <section className={cn("relative overflow-hidden", className)}>
        <Lamp>
          <h1 className="font-display text-5xl font-extrabold tracking-[-0.04em] text-gradient-hero sm:text-6xl lg:text-7xl xl:text-8xl">
            {shouldReduceMotion ? (
              title
            ) : (
              <TextAnimate animation="slideUp" by="word" as="span">
                {title}
              </TextAnimate>
            )}
          </h1>
          {subtitle && (
            <BlurFade delay={0.4}>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-light leading-relaxed text-white/70 sm:text-xl">
                {subtitle}
              </p>
            </BlurFade>
          )}
          {children && (
            <BlurFade delay={0.6}>
              <div className="mt-10">{children}</div>
            </BlurFade>
          )}
        </Lamp>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative min-h-[60vh] overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36",
        hasGradient
          ? "bg-gradient-to-br from-surface-900 via-brand-950 to-surface-900 text-white dark:from-surface-900 dark:via-brand-950 dark:to-surface-900"
          : "bg-gradient-to-b from-slate-50 to-white dark:from-surface-900 dark:to-surface-900",
        className,
      )}
    >
      {/* Ambient gradient layers */}
      {hasGradient && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-brand-500)_0%,_transparent_50%)] opacity-15" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        </>
      )}

      {/* Dynamic background effect */}
      <HeroBackground bg={bg} />

      <div className="relative mx-auto max-w-4xl text-center">
        <h1
          className={cn(
            "font-display text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-8xl",
            hasGradient && "text-gradient-hero",
          )}
        >
          {shouldReduceMotion ? (
            title
          ) : (
            <TextAnimate animation="slideUp" by="word" as="span">
              {title}
            </TextAnimate>
          )}
        </h1>
        {subtitle && (
          <BlurFade delay={shouldReduceMotion ? 0 : 0.4}>
            <p
              className={cn(
                "mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed sm:text-xl",
                hasGradient ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {subtitle}
            </p>
          </BlurFade>
        )}
        {children && (
          <BlurFade delay={shouldReduceMotion ? 0 : 0.6}>
            <div className="mt-10">{children}</div>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
