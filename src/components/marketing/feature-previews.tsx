"use client";

import { Shield } from "lucide-react";

/* ── Region Map ───────────────────────────────── */

const REGIONS = [
  { name: "Northeast", count: "2,847", fill: 92 },
  { name: "Southeast", count: "1,923", fill: 78 },
  { name: "Central", count: "2,156", fill: 85 },
  { name: "Southwest", count: "1,654", fill: 71 },
  { name: "Northwest", count: "1,420", fill: 67 },
];

function MapPreview() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {REGIONS.map((r) => (
        <div
          key={r.name}
          className="rounded-lg bg-white/[0.03] p-3 ring-1 ring-white/[0.04]"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
            <span className="text-xs text-white/40">{r.name}</span>
          </div>
          <p className="font-mono text-lg font-bold text-blue-400">{r.count}</p>
          <div className="mt-1.5 h-1 rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-blue-500/60"
              style={{ width: `${r.fill}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Analytics Chart ──────────────────────────── */

function AnalyticsPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-3xl font-bold text-cyan-400">91%</span>
        <span className="text-sm text-white/40">fill rate</span>
        <span className="ml-auto rounded bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
          +4.2%
        </span>
      </div>
      <svg
        viewBox="0 0 200 80"
        className="h-32 w-full lg:h-40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="showcase-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C20,55 40,45 60,38 C80,30 100,25 130,18 C160,12 180,8 200,4 L200,80 L0,80 Z"
          fill="url(#showcase-fill)"
        />
        <path
          d="M0,60 C20,55 40,45 60,38 C80,30 100,25 130,18 C160,12 180,8 200,4"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
        />
        {[
          [0, 60],
          [60, 38],
          [130, 18],
          [200, 4],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" />
        ))}
      </svg>
      <div className="mt-3 flex gap-4 text-xs text-white/30">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span className="ml-auto">Apr</span>
      </div>
    </div>
  );
}

/* ── Pipeline Funnel ──────────────────────────── */

const PIPELINE = [
  {
    stage: "Requisition",
    count: 94,
    pct: 100,
    color: "from-emerald-500 to-emerald-400/60",
  },
  {
    stage: "Screening",
    count: 71,
    pct: 76,
    color: "from-emerald-500/80 to-emerald-400/50",
  },
  {
    stage: "Interview",
    count: 47,
    pct: 50,
    color: "from-emerald-500/60 to-emerald-400/40",
  },
  {
    stage: "Offer",
    count: 31,
    pct: 33,
    color: "from-emerald-500/50 to-emerald-400/30",
  },
  {
    stage: "Onboarding",
    count: 24,
    pct: 26,
    color: "from-emerald-500/40 to-emerald-400/20",
  },
];

function PipelinePreview() {
  return (
    <div className="space-y-3">
      {PIPELINE.map((p) => (
        <div key={p.stage} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-xs text-white/40">{p.stage}</span>
          <div className="h-3 flex-1 rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${p.color}`}
              style={{ width: `${p.pct}%` }}
            />
          </div>
          <span className="w-8 text-right font-mono text-sm font-semibold text-emerald-400">
            {p.count}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Security & Training ──────────────────────── */

const CLEARANCES = [
  { label: "TS/SCI Processing", status: "Active", pct: 78 },
  { label: "Secret Clearance", status: "On Track", pct: 92 },
  { label: "Orientation Schedule", status: "Active", pct: 65 },
  { label: "Training Compliance", status: "Review", pct: 88 },
  { label: "Badge Issuance", status: "On Track", pct: 71 },
];

function SecurityPreview() {
  return (
    <div className="space-y-2">
      {CLEARANCES.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2 ring-1 ring-white/[0.04]"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15">
            <Shield className="h-3.5 w-3.5 text-violet-400" />
          </div>
          <span className="flex-1 text-sm text-white/60">{item.label}</span>
          <span className="text-xs text-violet-400/60">{item.status}</span>
          <span className="font-mono text-xs font-semibold text-violet-400">
            {item.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Exported Switch ──────────────────────────── */

export function PreviewContent({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <MapPreview />;
    case 1:
      return <AnalyticsPreview />;
    case 2:
      return <PipelinePreview />;
    case 3:
      return <SecurityPreview />;
    default:
      return null;
  }
}
