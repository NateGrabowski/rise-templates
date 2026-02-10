"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DASHBOARD_LINKS } from "@/lib/constants";

const ICON_MAP = {
  LayoutDashboard,
  Map,
  Users,
  BarChart3,
} as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-50 dark:bg-surface-800 lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight"
        >
          <span className="text-brand-500">RISE</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <p className="micro-label mb-3 px-3">Navigation</p>
        {DASHBOARD_LINKS.map((link) => {
          const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP];
          const isActive = pathname === link.href;
          const isReports = link.href === "/dashboard/reports";
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "border-l-2 border-l-brand-500 bg-brand-500/10 text-brand-500 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                  : "border-l-2 border-l-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
              {isReports && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-status-error text-[10px] font-bold text-white">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4">
        <div className="divider-gradient mb-4" />
        <div className="flex items-center gap-3 px-3">
          <div className="avatar-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
            JD
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">John Doe</p>
            <p className="truncate text-xs text-muted-foreground">
              Program Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
