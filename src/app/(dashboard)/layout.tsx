import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-surface-900">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DashboardTopbar />
        <main className="relative flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-grid-dots pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative">{children}</div>
        </main>
      </div>
    </div>
  );
}
