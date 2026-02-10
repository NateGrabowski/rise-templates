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
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DASHBOARD_LINKS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { UserMenu } from "@/components/dashboard/UserMenu";

const ICON_MAP = { LayoutDashboard, Map, Users, BarChart3 } as const;

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  regions: "Regions",
  positions: "Positions",
  reports: "Reports",
};

export function DashboardTopbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: SEGMENT_LABELS[seg] || seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <header className="sticky top-0 z-50 shadow-[0_1px_0_0_rgba(59,130,246,0.12),0_1px_3px_0_rgba(59,130,246,0.06)] bg-white/80 backdrop-blur-md dark:bg-surface-900/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        <div className="flex items-center gap-2 lg:hidden">
          <span className="font-display text-lg font-bold text-brand-500">
            RISE
          </span>
        </div>

        {/* Desktop breadcrumb */}
        <div className="hidden items-center gap-1 text-sm lg:flex">
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {crumb.isLast ? (
                <span className="font-medium text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </>
              )}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search positions..."
              className="h-9 w-56 pl-9 text-sm"
            />
          </div>

          {/* Notifications */}
          <button
            className="relative rounded-md p-2 transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-status-error text-[9px] font-bold text-white">
              3
            </span>
          </button>

          <ThemeToggle />
          <UserMenu />
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "overflow-hidden bg-white dark:bg-surface-900 lg:hidden transition-all duration-300 ease-out",
          mobileOpen
            ? "max-h-[500px] border-t border-white/10 opacity-100"
            : "max-h-0 opacity-0",
        )}
      >
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
    </header>
  );
}
