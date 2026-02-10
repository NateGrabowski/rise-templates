import type { ChartConfig } from "@/components/ui/chart";

export const fillRateChartConfig = {
  fillRate: { label: "Fill Rate", color: "var(--color-brand-500)" },
} satisfies ChartConfig;

export const pipelineChartConfig = {
  count: { label: "Positions", color: "var(--color-brand-500)" },
} satisfies ChartConfig;

export const regionChartConfig = {
  openPositions: { label: "Open", color: "var(--color-brand-500)" },
  fillRate: { label: "Fill %", color: "var(--color-cyan-400)" },
} satisfies ChartConfig;

export const recruiterChartConfig = {
  filled: { label: "Filled", color: "var(--color-brand-500)" },
} satisfies ChartConfig;

export const clearanceChartConfig = {
  pending: { label: "Pending", color: "var(--color-status-warning)" },
  processing: { label: "Processing", color: "var(--color-brand-400)" },
  approved: { label: "Approved", color: "var(--color-status-success)" },
} satisfies ChartConfig;
