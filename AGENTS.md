# RISE — Regional Information System Enterprise

## Project Overview
RISE is a modern Next.js rebuild of a government contractor workforce tracking dashboard. The site has two faces:
- **Public marketing pages** at `(public)/` — hero-driven landing, features, pricing, blog, contact
- **Authenticated dashboard shell** at `(dashboard)/` — glassmorphism UI with stats, regions, positions, reports

## Stack
- **Framework**: Next.js 16 (App Router) — NEVER use Pages Router patterns
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (NOT v3 — no tailwind.config.js, use @theme inline in globals.css)
- **Components**: shadcn/ui (new-york style) — ALWAYS check existing components before creating new ones
- **Icons**: lucide-react — NEVER install other icon packages
- **Dark Mode**: next-themes with attribute="class"
- **Fonts**: Inter (sans) + JetBrains Mono (mono) via next/font/google
- **Package Manager**: npm — NEVER use yarn, pnpm, or bun

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Architecture
```
src/app/(public)/          # Marketing pages — Navbar + Footer layout
src/app/(dashboard)/       # Dashboard pages — Sidebar + Topbar layout
src/components/ui/         # shadcn/ui primitives
src/components/layout/     # Navbar, Footer, Sidebar, DashboardTopbar
src/components/theme/      # ThemeProvider, ThemeToggle
src/components/marketing/  # Hero, StatsBar, FeatureCard, CTASection
src/components/dashboard/  # StatCard, ActivityFeed, RegionCard
src/lib/constants.ts       # Nav links, site metadata, regions, stats
src/lib/utils.ts           # cn() helper (already exists)
```

## Version Locking
| Package | Version | Notes |
|---------|---------|-------|
| Next.js | 16.x | App Router only |
| React | 19.x | |
| TypeScript | 5.x | Strict mode |
| Tailwind CSS | 4.x | @theme inline, NOT tailwind.config |
| Node.js | 20 LTS | |

**Forbidden patterns:**
- Pages Router (`getServerSideProps`, `getStaticProps`, `pages/` directory)
- Tailwind v3 config files (`tailwind.config.js/ts`)
- CSS Modules for new components
- `any` type without explicit justification
- Default exports (except page.tsx, layout.tsx which Next.js requires)

## Server Component Defaults
Everything is a Server Component unless it needs:
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (window, document, localStorage)
- React hooks (useState, useEffect, useRef, etc.)
- Third-party client-only libraries

When `"use client"` is needed, add it as the FIRST line of the file.

## Code Style
- Named exports preferred (except Next.js page/layout convention)
- Max 200 lines per component — decompose if larger
- `@/*` import alias for all src/ imports
- Use `cn()` from `@/lib/utils` for conditional classes
- Descriptive component and variable names
- No inline styles — use Tailwind utilities

## Design Direction
- **Dark by default** — government dashboard aesthetic
- **Glassmorphism** — `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl`
- **Blue accent palette** — brand-500 (#3b82f6) primary, brand-400 highlights
- **Fonts** — Inter for UI, JetBrains Mono for data/numbers
- **Semantic colors** — green (success), amber (warning), red (error)
- **Dark surfaces** — surface-900 (#0f1419), surface-800 (#1a1f2e), surface-700 (#242b3d)
- **Generous spacing** — modern, airy layouts
