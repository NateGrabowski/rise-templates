"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Map,
  Users,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DASHBOARD_LINKS } from "@/lib/constants";

const ICON_MAP = { LayoutDashboard, Map, Users, BarChart3 } as const;

export function DashboardTopbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-md dark:bg-surface-900/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        <div className="flex items-center gap-2 lg:hidden">
          <span className="text-lg font-bold text-brand-500">RISE</span>
        </div>

        {/* Desktop breadcrumb area */}
        <div className="hidden lg:block">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center text-sm font-medium text-brand-400">
            U
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-white dark:bg-surface-900 lg:hidden">
          <nav className="space-y-1 p-4">
            {DASHBOARD_LINKS.map((link) => {
              const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP];
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-500/10 text-brand-500"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
