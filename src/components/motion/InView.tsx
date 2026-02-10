"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DIRECTION_VARIANTS, scaleIn } from "./variants";

interface InViewProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function InView({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  threshold = 0.2,
}: InViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants =
    direction === "scale" ? scaleIn : DIRECTION_VARIANTS[direction];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
