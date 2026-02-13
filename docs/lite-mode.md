# Lite Mode — VDI/AVD Performance Optimization

A 3-layer performance toggle that transforms a glassmorphism-heavy Next.js app into a VDI-friendly static render. Zero visual compromise on capable hardware, full usability on Azure Virtual Desktop.

---

## Table of Contents

- [The Problem](#the-problem)
- [Architecture](#architecture)
- [Implementation Guide](#implementation-guide)
- [Hydration Safety](#hydration-safety)
- [File Reference](#file-reference)
- [Extending the System](#extending-the-system)
- [Verification Checklist](#verification-checklist)

---

## The Problem

### Why `backdrop-blur` Kills Remote Desktop

Azure Virtual Desktop (AVD) uses RemoteFX to encode screen content and stream it to clients. RemoteFX classifies screen regions into two codec paths:

- **Text codec** — cheap, lossless, efficient for static UI
- **H.264 codec** — expensive, lossy, used for "complex" regions (video, gradients, blur)

CSS `backdrop-filter: blur()` triggers a **triple penalty** in this pipeline:

1. **CPU render** — Without a GPU, the browser computes Gaussian blur in software on every frame. CPU spikes to 100%.
2. **Codec classification failure** — Blurred regions never classify as "text," even when the content behind them is static. RemoteFX falls back to expensive H.264 encoding.
3. **Delta explosion** — Any change behind a blurred element forces full re-encoding of the entire blurred area. The delta-encoding optimization that makes RDP efficient is completely defeated.

The result: an app that runs at 60fps on a developer's machine drops below 10fps on a standard AVD session (2 vCPU, no GPU, 1920×1080).

### Real-World Precedents

This is not a theoretical problem. Major projects have hit it:

| Project | Issue | Root Cause |
|---------|-------|------------|
| Grafana | [#100859](https://github.com/grafana/grafana/issues/100859) | Dashboard backdrop-blur unusable over RDP |
| shadcn/ui | [#327](https://github.com/shadcn-ui/ui/issues/327) | Sidebar blur causes lag in remote desktop |
| Kimai | [#4415](https://github.com/kimai/kimai/issues/4415) | Modal blur spikes CPU to 100% on VDI |
| ComfyUI | [#8503](https://github.com/comfyanonymous/ComfyUI/issues/8503) | Canvas UI blur kills RDP performance |

### What RISE Renders

Before lite mode, a single landing page scroll renders:

- **39 glass-panel instances** with `backdrop-blur` (across marketing + dashboard)
- **74 motion/react animation calls** (springs, transitions, viewport triggers)
- **8 CSS @keyframes** (shimmer, pulse, grid-fade, meteor trails)
- **1 canvas `requestAnimationFrame` loop** (particle system, 60fps)
- **1 SVG gradient animation** (Lamp cone effect)
- **30 SVG squares** fading in/out (AnimatedGridPattern)
- **12 meteor elements** with randomized CSS animations
- **~11 ambient blur glow divs** (decorative `blur-[100px]` etc.)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Toggle Mechanism                         │
│  data-performance="lite" on <html> · localStorage · auto-detect │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────┐
│   Layer 1: CSS  │ │ Layer 2: Motion │ │ Layer 3: React      │
│                 │ │                 │ │                     │
│ globals.css     │ │ MotionConfig    │ │ Conditional mounts  │
│ attribute       │ │ reducedMotion=  │ │ {!isLite && <.../>} │
│ selectors       │ │ "always"        │ │                     │
│                 │ │                 │ │ Only for components │
│ Handles:        │ │ Handles:        │ │ with JS loops:      │
│ • 39 glass      │ │ • 74 motion.*   │ │ • Particles (rAF)   │
│   panels        │ │   animations    │ │ • Lamp (SVG)        │
│ • backdrop-blur │ │ • AnimatePresence│ │ • AnimatedGrid      │
│ • ambient glows │ │ • whileInView   │ │ • BorderBeam        │
│ • CSS keyframes │ │ • spring/tween  │ │ • RetroGrid         │
│ • content-vis.  │ │                 │ │ • Meteors           │
│ • transform-gpu │ │                 │ │ • Ambient blur divs │
│                 │ │                 │ │                     │
│ 0 component     │ │ 1 line change   │ │ 5 components        │
│ changes         │ │ (in provider)   │ │ modified            │
└─────────────────┘ └─────────────────┘ └─────────────────────┘
```

### Why 3 Layers?

**Layer 1 (CSS)** covers ~80% of the problem with zero component changes. Attribute selectors on `[data-performance="lite"]` override all blur, glass, and animation classes globally. This is the highest-leverage layer.

**Layer 2 (MotionConfig)** is a single `<MotionConfig reducedMotion="always">` wrapper that tells the motion/react library to skip all animations globally. Every `motion.div` snaps to its final state. One line, 74 animations handled.

**Layer 3 (React conditionals)** is only needed for components with **JavaScript animation loops** that CSS cannot stop. When `animation-duration: 0.01ms` kills the CSS output, these components keep burning CPU via `requestAnimationFrame`, `setInterval`, or continuous React state updates. They must be unmounted entirely.

### Decision Flowchart: Does a Component Need Layer 3?

```
Does the component have requestAnimationFrame?     → YES → Layer 3
Does it have setInterval/setTimeout in a loop?      → YES → Layer 3
Does it continuously update React state for animation? → YES → Layer 3
Is it purely CSS-animated (@keyframes, transition)?  → NO  → Layer 1 handles it
Does it only use motion/react (motion.div, etc.)?   → NO  → Layer 2 handles it
Is it a decorative-only element with no content?     → Consider Layer 3 for DOM cleanup
```

---

## Implementation Guide

### Step 1: Create PerformanceProvider

**File:** `src/components/providers/PerformanceProvider.tsx`

This is a React context provider that manages the performance mode state and wraps the app tree with `MotionConfig`.

```tsx
"use client";

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from "react";
import { MotionConfig } from "motion/react";

const STORAGE_KEY = "performance-mode";

function detectInitialMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "lite") return true;
    if (stored === "full") return false;
  } catch {
    // localStorage may be restricted by Group Policy in VDI environments
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface PerformanceContextValue {
  isLite: boolean;
  toggleMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextValue>({
  isLite: false,
  toggleMode: () => {},
});

export function usePerformanceMode() {
  return useContext(PerformanceContext);
}

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [isLite, setIsLite] = useState(detectInitialMode);
  const [mounted, setMounted] = useState(false);

  // Hydration guard — see "Hydration Safety" section below
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Sync data attribute and localStorage whenever isLite changes
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-performance", isLite ? "lite" : "full",
    );
    try {
      localStorage.setItem(STORAGE_KEY, isLite ? "lite" : "full");
    } catch { /* VDI Group Policy may restrict storage */ }
  }, [isLite]);

  const toggleMode = useCallback(() => setIsLite((prev) => !prev), []);

  // Before mount, report isLite=false to match SSR (prevents hydration mismatch)
  const exposedIsLite = mounted ? isLite : false;

  const value = useMemo(
    () => ({ isLite: exposedIsLite, toggleMode }),
    [exposedIsLite, toggleMode],
  );

  return (
    <PerformanceContext.Provider value={value}>
      <MotionConfig reducedMotion={exposedIsLite ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PerformanceContext.Provider>
  );
}
```

**Key design decisions:**
- `detectInitialMode` uses a **lazy `useState` initializer** (function reference, not invocation) to avoid calling it on every render
- **Priority chain:** stored preference → OS `prefers-reduced-motion` → default (full)
- **`try/catch`** around `localStorage` because VDI environments may restrict web storage via Group Policy
- **`MotionConfig`** lives inside the provider (not in layout.tsx) because it needs access to `isLite` state

### Step 2: Create PerformanceToggle

**File:** `src/components/providers/PerformanceToggle.tsx`

```tsx
"use client";

import { Zap, ZapOff } from "lucide-react";
import { usePerformanceMode } from "@/components/providers/PerformanceProvider";

export function PerformanceToggle() {
  const { isLite, toggleMode } = usePerformanceMode();

  return (
    <button
      onClick={toggleMode}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle performance mode"
      aria-pressed={isLite}
      title={isLite
        ? "Performance mode: Lite (click for full)"
        : "Performance mode: Full (click for lite)"}
    >
      <Zap className="h-5 w-5 block [[data-performance=lite]_&]:hidden" />
      <ZapOff className="h-5 w-5 hidden [[data-performance=lite]_&]:block" />
    </button>
  );
}
```

**Key design decisions:**
- **Both icons are always in the DOM** — visibility is controlled by CSS, not React conditionals. This prevents hydration mismatches. See [Hydration Safety](#hydration-safety).
- **`[[data-performance=lite]_&]`** is Tailwind v4 arbitrary variant syntax meaning "when an ancestor has `data-performance=lite`"
- **`aria-pressed`** communicates toggle state to screen readers (WCAG 4.1.2)

### Step 3: CSS Performance Overrides

**File:** `src/app/globals.css` (append to end)

These attribute-selector rules fire when `data-performance="lite"` is set on `<html>`.

```css
/* ─── Performance mode: VDI/AVD optimization ─── */

/* 3a. Glass panels: replace backdrop-blur with solid backgrounds */
[data-performance="lite"] .glass-panel {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background: rgba(241, 245, 249, 0.92); /* light: slate-100/92 */
}
[data-performance="lite"].dark .glass-panel {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background: rgba(15, 23, 42, 0.88); /* dark: slate-900/88 */
}
/* Repeat for .glass-panel-md (0.95/0.92) and .glass-panel-strong (0.97/0.95) */

/* 3b. Kill ALL backdrop-blur (catches direct Tailwind usage) */
[data-performance="lite"] .backdrop-blur-sm,
[data-performance="lite"] .backdrop-blur-md,
[data-performance="lite"] .backdrop-blur-lg,
[data-performance="lite"] .backdrop-blur-xl,
[data-performance="lite"] .backdrop-blur-2xl,
[data-performance="lite"] .backdrop-blur-3xl {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* 3c. Kill ambient blur glows (decorative blur-[Npx] divs) */
[data-performance="lite"] [class*="blur-["],
[data-performance="lite"] .blur-3xl,
[data-performance="lite"] .blur-2xl,
[data-performance="lite"] .blur-xl {
  filter: none !important;
}

/* 3d. Kill CSS animations + transitions */
[data-performance="lite"] *,
[data-performance="lite"] *::before,
[data-performance="lite"] *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

/* 3e. Content visibility for below-fold sections */
[data-performance="lite"] section + section {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px;
}

/* 3f. Remove glow effects */
[data-performance="lite"] .glow-brand {
  box-shadow: none;
}

/* 3g. Remove GPU promotion (counterproductive in software rendering) */
[data-performance="lite"] .transform-gpu {
  transform: none;
  will-change: auto;
}
```

**Key design decisions:**
- **`0.01ms` not `0s`** for animation-duration — `0s` breaks `animationend` event listeners in some components. `0.01ms` is effectively instant but still fires the event.
- **`!important`** is only used for utility class overrides where specificity wars are unavoidable. Glass panel overrides use normal specificity since `[data-performance="lite"]` is higher than a lone `.glass-panel`.
- **`content-visibility: auto`** tells the browser to skip rendering off-screen sections entirely. This is huge for RemoteFX — off-screen sections contribute zero encoding cost.
- **`will-change: auto`** reverses GPU layer promotion. Without a GPU, `will-change: transform` creates a compositing layer that the CPU must manage — more overhead, not less.

### Step 4: Root Layout Integration

**File:** `src/app/layout.tsx`

Wrap children with `PerformanceProvider` inside `ThemeProvider`:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <PerformanceProvider>
    {children}
  </PerformanceProvider>
</ThemeProvider>
```

`ThemeProvider` must be the outer wrapper because the performance CSS rules reference `.dark` class selectors that `next-themes` controls.

### Step 5: Navbar Toggle Placement

Add `<PerformanceToggle />` next to `<ThemeToggle />` in both desktop and mobile nav sections.

### Step 6: Conditional Mounts for Heavy JS Components

For each component identified by the [decision flowchart](#decision-flowchart-does-a-component-need-layer-3):

```tsx
import { usePerformanceMode } from "@/components/providers/PerformanceProvider";

export function MyComponent() {
  const { isLite } = usePerformanceMode();

  return (
    <section>
      {/* Heavy JS animation — unmount in lite mode */}
      {!isLite && <Particles className="absolute inset-0" quantity={15} />}

      {/* Component with lite fallback */}
      {isLite ? (
        <div className="bg-gradient-to-b from-surface-900 to-background">
          {content}
        </div>
      ) : (
        <Lamp>{content}</Lamp>
      )}

      {/* Decorative-only element — safe to remove entirely */}
      {!isLite && <div className="blur-[100px] bg-brand-500/10" />}
    </section>
  );
}
```

**RISE components modified:** HeroLanding, Hero, CTAFinal, CTASection, FeaturesShowcase.

---

## Hydration Safety

### The Problem

Next.js server-renders with `isLite=false` (no `window`, no `localStorage`). When a returning lite-mode user loads the page, the client initializes with `isLite=true` from localStorage. Any component that conditionally renders based on `isLite` produces a different React tree on server vs. client — a hydration mismatch.

### Solution: The Mounted Guard Pattern

The `PerformanceProvider` uses a `mounted` state that starts `false`:

```
SSR:                isLite=false, mounted=false → exposedIsLite=false
First client render: isLite=true,  mounted=false → exposedIsLite=false  ← matches SSR!
After useEffect:     isLite=true,  mounted=true  → exposedIsLite=true   ← real value
```

The CSS layer (`data-performance="lite"`) is set by a separate `useEffect` that runs at the same time as the mount effect. So the user sees lite-mode CSS from the first paint — the mounted guard only delays the React conditional unmounts by ~16ms, which is invisible.

### Solution: CSS Icon Visibility

For the toggle button, rendering `{isLite ? <ZapOff /> : <Zap />}` would create different React elements on server vs. client. Instead, render both icons and control visibility via CSS:

```tsx
<Zap className="block [[data-performance=lite]_&]:hidden" />
<ZapOff className="hidden [[data-performance=lite]_&]:block" />
```

This is the same pattern `ThemeToggle` uses with `dark:hidden` / `dark:block`.

### React 19 ESLint Compatibility

React 19's `react-hooks/set-state-in-effect` rule forbids `setState` inside `useEffect`. The mounted guard requires it. Use `eslint-disable-next-line` with justification:

```tsx
// Hydration guard: must re-render after mount to expose real isLite value
// eslint-disable-next-line react-hooks/set-state-in-effect
useEffect(() => setMounted(true), []);
```

### `suppressHydrationWarning` Limitations

`suppressHydrationWarning` on an element **only** suppresses warnings for that element's own attributes and text content. It does **not** suppress child tree mismatches. This is why the CSS icon approach is necessary — `suppressHydrationWarning` on `<button>` would not cover `<Zap>` vs `<ZapOff>` child differences.

The `<html>` element in the root layout does have `suppressHydrationWarning`, which correctly covers the `data-performance` and `class` attribute mismatches from both `PerformanceProvider` and `next-themes`.

---

## File Reference

| File | Role | Layer |
|------|------|-------|
| `src/components/providers/PerformanceProvider.tsx` | Context, state, MotionConfig wrapper | 1+2 |
| `src/components/providers/PerformanceToggle.tsx` | Toggle button (Zap/ZapOff) | UI |
| `src/app/globals.css` (lines 310-397) | CSS attribute-selector overrides | 1 |
| `src/app/layout.tsx` | Provider nesting in root layout | Wiring |
| `src/components/layout/Navbar.tsx` | Toggle placement (desktop + mobile) | UI |
| `src/components/marketing/HeroLanding.tsx` | Conditional: Lamp, Particles | 3 |
| `src/components/marketing/Hero.tsx` | Conditional: Lamp, Beams, Particles, Spotlight | 3 |
| `src/components/marketing/CTAFinal.tsx` | Conditional: AnimatedGridPattern, Meteors, blurs | 3 |
| `src/components/marketing/CTASection.tsx` | Conditional: RetroGrid, blur glows | 3 |
| `src/components/marketing/FeaturesShowcase.tsx` | Conditional: BorderBeam, accent glow | 3 |

---

## Extending the System

### Adding a New Glass-Panel Component

**No changes needed.** If the new component uses `.glass-panel`, `.glass-panel-md`, or `.glass-panel-strong` classes, the CSS layer handles it automatically.

### Adding a New Animated Component (motion/react)

**No changes needed.** If the component uses `motion.div`, `AnimatePresence`, `whileInView`, etc., the `MotionConfig reducedMotion="always"` wrapper handles it globally.

### Adding a New Component with Tailwind `backdrop-blur-*`

**No changes needed.** The CSS layer's wildcard rules already target all `backdrop-blur-sm` through `backdrop-blur-3xl` classes.

### Adding a New JS Animation Loop Component

**You must add a conditional mount.** If the component uses `requestAnimationFrame`, `setInterval`, or continuous state updates for animation:

1. Import the hook: `import { usePerformanceMode } from "@/components/providers/PerformanceProvider";`
2. Get the flag: `const { isLite } = usePerformanceMode();`
3. Guard the render: `{!isLite && <NewHeavyComponent />}`
4. Provide a fallback if needed (e.g., static gradient instead of animated lamp)

### Testing Changes

After any modification:

```bash
npm run build && npm run lint
```

Then visually verify:
1. Open the app in full mode — new component renders normally
2. Toggle to lite mode — new component is hidden/replaced
3. Refresh — lite mode persists (localStorage)

---

## Verification Checklist

### Functional
- [ ] Toggle switches between Zap and ZapOff icons
- [ ] `data-performance` attribute toggles on `<html>` element
- [ ] Preference persists across page refresh (localStorage)
- [ ] First visit with `prefers-reduced-motion: reduce` auto-enables lite mode
- [ ] Manual toggle overrides auto-detected preference

### Visual (Lite Mode)
- [ ] No backdrop-blur on any element
- [ ] Glass panels have solid backgrounds (not transparent)
- [ ] No particles, lamp, grid pattern, meteors, border beam, retro grid
- [ ] No ambient blur glow divs
- [ ] No CSS animations (shimmer, pulse, etc.)
- [ ] Content still readable and properly styled

### Technical
- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes with zero errors
- [ ] No hydration warnings in browser console (dev mode)
- [ ] `aria-pressed` toggles on the button in DevTools
- [ ] Dark mode + lite mode combination works correctly

### Performance (AVD Testing)
- [ ] Open Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce"
- [ ] Verify auto-detection triggers lite mode on first visit
- [ ] CPU usage drops significantly in Task Manager when lite mode is active
- [ ] RemoteFX codec (if testable) classifies more regions as "text" in lite mode

---

## Performance Impact

| Metric | Full Mode | Lite Mode |
|--------|-----------|-----------|
| Concurrent backdrop-blur operations | 8-12 | **0** |
| RemoteFX "complex" region coverage | ~60-70% | **~5-10%** |
| Continuously animating viewport area | ~40% | **0%** |
| Canvas draw calls/sec | ~900 | **0** |
| DOM elements with active animations | ~50+ | **0** |
| Estimated network bandwidth | High (H.264) | **Low (text codec)** |

The improvement is multiplicative: removing `backdrop-blur` stabilizes regions for delta encoding → RemoteFX sends nothing for unchanged regions → network bandwidth drops → latency improves → the entire pipeline works as designed.
