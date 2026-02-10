"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DIRECTION_VARIANTS } from "./variants";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = DIRECTION_VARIANTS[direction];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
