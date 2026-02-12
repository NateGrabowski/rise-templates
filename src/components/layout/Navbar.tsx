"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  LayoutGroup,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PerformanceToggle } from "@/components/providers/PerformanceToggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] px-4 pt-4">
      <nav
        className={cn(
          "relative mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl px-4 transition-all duration-300",
          scrolled
            ? "glass-panel-md border-brand-500/20 shadow-lg shadow-brand-500/5"
            : "bg-surface-900/80 backdrop-blur-sm",
        )}
      >
        {/* Gradient bottom border on scroll */}
        {scrolled && (
          <div
            className="pointer-events-none absolute inset-x-4 -bottom-px h-px opacity-20"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--color-brand-500), transparent)",
            }}
          />
        )}

        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-brand-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]"
        >
          RISE
        </Link>

        {/* Desktop nav */}
        <LayoutGroup>
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-brand-500"
                      : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-brand-500/10"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 30 }
                      }
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="hidden items-center gap-2 md:flex">
          <PerformanceToggle />
          <ThemeToggle />
          <Link href="/dashboard">
            <Button className="h-9 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 px-4 text-sm font-medium text-white hover:from-brand-500 hover:to-brand-400">
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <PerformanceToggle />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, height: "auto" }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl glass-panel-md md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "bg-brand-500/10 text-brand-500"
                        : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/dashboard"
                onClick={closeMobile}
                className="mt-2 block"
              >
                <Button className="h-9 w-full rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-medium text-white hover:from-brand-500 hover:to-brand-400">
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
