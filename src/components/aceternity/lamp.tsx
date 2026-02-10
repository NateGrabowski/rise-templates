"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface LampProps {
  children: ReactNode;
  className?: string;
}

export function Lamp({ children, className }: LampProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-surface-900",
        className,
      )}
    >
      {/* Lamp cone */}
      <div className="relative z-0 flex w-full flex-1 items-center justify-center">
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0.5, width: "15rem" }
              : { opacity: 0.5, width: "15rem" }
          }
          whileInView={
            shouldReduceMotion
              ? { opacity: 0.5, width: "15rem" }
              : { opacity: 1, width: "30rem" }
          }
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-cyan-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-surface-900 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-surface-900 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0.5, width: "15rem" }
              : { opacity: 0.5, width: "15rem" }
          }
          whileInView={
            shouldReduceMotion
              ? { opacity: 0.5, width: "15rem" }
              : { opacity: 1, width: "30rem" }
          }
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-brand-400 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-surface-900 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-surface-900 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        {/* Top gradient blur */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-surface-900 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        {/* Colored line */}
        <motion.div
          initial={shouldReduceMotion ? { width: "15rem" } : { width: "8rem" }}
          whileInView={
            shouldReduceMotion ? { width: "15rem" } : { width: "15rem" }
          }
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute inset-auto z-30 h-0.5 w-[15rem] -translate-y-[7rem] rounded-full bg-brand-400"
        />
        {/* Glow */}
        <motion.div
          initial={shouldReduceMotion ? { width: "30rem" } : { width: "15rem" }}
          whileInView={
            shouldReduceMotion ? { width: "30rem" } : { width: "30rem" }
          }
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute inset-auto z-50 h-36 w-[30rem] -translate-y-[8rem] rounded-full bg-brand-500 opacity-50 blur-3xl"
        />
      </div>
      {/* Content */}
      <div className="relative z-50 -mt-32 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
