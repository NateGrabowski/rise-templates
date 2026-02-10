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
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-white dark:bg-surface-800 lg:block">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-brand-500">RISE</span>
        </Link>
      </div>
      <nav className="space-y-1 p-4">
        {DASHBOARD_LINKS.map((link) => {
          const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP];
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
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
      </nav>
    </aside>
  );
}
