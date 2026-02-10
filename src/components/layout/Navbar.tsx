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
} from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl px-4 transition-all duration-300",
          scrolled
            ? "glass-panel-md border-brand-500/20 shadow-lg shadow-brand-500/5"
            : "bg-transparent",
        )}
      >
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-brand-500"
        >
          RISE
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-brand-500/10 text-brand-500"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link href="/dashboard">
            <ShimmerButton
              shimmerColor="#60a5fa"
              background="rgba(59,130,246,0.9)"
              className="h-9 px-4 text-sm font-medium"
            >
              Dashboard
            </ShimmerButton>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
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
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-brand-500/10 text-brand-500"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/dashboard"
                onClick={closeMobile}
                className="block mt-2"
              >
                <ShimmerButton
                  shimmerColor="#60a5fa"
                  background="rgba(59,130,246,0.9)"
                  className="h-9 w-full text-sm font-medium"
                >
                  Dashboard
                </ShimmerButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
