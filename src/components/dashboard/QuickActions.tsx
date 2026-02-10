import { Plus, Download, Calendar, GitBranch } from "lucide-react";

const ACTIONS = [
  { label: "New Position", icon: Plus, description: "Create a new opening" },
  { label: "Export Report", icon: Download, description: "Download as PDF" },
  {
    label: "Schedule Briefing",
    icon: Calendar,
    description: "Set up a meeting",
  },
  {
    label: "View Pipeline",
    icon: GitBranch,
    description: "Full pipeline view",
  },
] as const;

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {ACTIONS.map((action) => (
        <button
          key={action.label}
          className="glass-panel flex flex-col items-center gap-3 p-6 text-center transition-all duration-200 hover:border-brand-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
            <action.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">{action.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {action.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
