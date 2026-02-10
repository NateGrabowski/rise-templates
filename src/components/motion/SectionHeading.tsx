"use client";

import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label && (
        <BlurFade delay={0}>
          <p className="micro-label mb-4">{label}</p>
        </BlurFade>
      )}
      <BlurFade delay={0.1}>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
      </BlurFade>
      {subtitle && (
        <BlurFade delay={0.2}>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </BlurFade>
      )}
    </div>
  );
}
