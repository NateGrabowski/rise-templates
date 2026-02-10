# RISE — Claude Code Directives

## Project Context

**RISE** = Regional Information System Enterprise — a government contractor workforce tracking dashboard rebuilt as a Next.js 16 site. Dark-first glassmorphism design, blue accent palette (#3b82f6).

### Architecture
```
src/app/(public)/              — Marketing pages (Navbar+Footer layout)
src/app/(dashboard)/dashboard/ — Dashboard pages (Sidebar+Topbar layout)
```
Route groups `(public)` and `(dashboard)` share a root layout with ThemeProvider.

### Tech Stack
- Next.js 16.1.6 (App Router), React 19, TypeScript 5, Tailwind CSS v4
- shadcn/ui (new-york), next-themes, lucide-react, motion/react v12, recharts
- Magic UI, Aceternity UI (hand-crafted), Motion Primitives
- Fonts: Inter (sans) + JetBrains Mono (mono)

---

## Registry Install Protocol

### The Golden Rule
**NEVER use `shadcn@2.3.0`** — it cannot read components.json v3.8.4+. Always use `@latest`.

### Install → Stage → Comply → Move
Registry components ship without project-specific policies. **Never install directly into `src/components/`.** Use a staging folder, apply compliance, then move into place.

```bash
# 1. STAGE — install to temp directory
mkdir -p src/components/_staging

# shadcn/ui (base components — install directly, no staging needed)
npx shadcn@latest add tabs tooltip progress chart table avatar select

# Magic UI
pnpm dlx shadcn@latest add "https://magicui.design/r/<component>" --path src/components/_staging
# Some Magic UI components use @magicui/ format:
pnpm dlx shadcn@latest add "@magicui/magic-card" --path src/components/_staging

# Motion Primitives (--path flag DOES NOT WORK — installs to root components/)
npx motion-primitives@latest add <component>
# Then manually move:
mv components/motion-primitives/* src/components/motion-primitives/

# Animate UI
pnpm dlx shadcn@latest add "https://animate-ui.com/r/<component>" --path src/components/_staging

# 2. COMPLY — apply project policies (see checklist below)
# 3. MOVE — into final location (e.g., src/components/magicui/)
```

### Aceternity UI — NO REGISTRY
Aceternity has **no shadcn-compatible registry**. All `ui.aceternity.com/r/*` URLs fail.
- Hand-craft from their docs examples
- Components we've built: `spotlight.tsx`, `background-beams.tsx`, `lamp.tsx`
- Place in `src/components/aceternity/`

### Magic UI Known Gaps
- `word-pull-up` and `box-reveal` don't exist in the registry
- Use `text-animate` instead (from `@magicui/text-animate` or Magic UI URL)

### Post-Install Compliance Checklist
- [ ] Rewrite `framer-motion` imports → `motion/react`
- [ ] Ensure `@/*` import paths (not relative)
- [ ] Verify `"use client"` only where needed
- [ ] No `any` types
- [ ] Under 200 lines each
- [ ] `motion.create()` is deprecated → use `motion.span`, `motion.p` proxy access
- [ ] Test build: `npm run build`

---

## Motion & Animation

- Use Motion library (`motion/react`) for all React animations
- One well-orchestrated page load with staggered reveals > scattered micro-interactions
- BlurFade with staggered delays (0, 0.1, 0.25, 0.4, 0.55) creates a cascade
- `whileInView` for below-fold content
- All animations MUST respect `prefers-reduced-motion` — check with `useReducedMotion()`
- Server components by default — `"use client"` only for motion/interactivity

### React 19 + ESLint Compatibility
- **setState in useEffect** → Use lazy useState initializer or ref+callback
- **Exhaustive deps warnings** → Add `// eslint-disable-next-line` with justification
- **TS2698 spread on intrinsic elements** → Type generic: `React.isValidElement<Record<string, unknown>>(child)`
- **Unused vars** → Prefix with `_` (e.g., `_exitTransition`)

---

## Design Philosophy

### Core Goals
- DRAMATIC, modern, BOLD — not generic SaaS
- GRAB components from registries (shadcn, Aceternity, Magic UI, Motion Primitives, v0.dev) — don't hand-craft when a registry has it
- Template-ready, show-ready — like someone would BUY this design
- USE all tools: Context7, Sequential Thinking, Playwright, /frontend-design

### Component Registry Priority
1. **shadcn/ui** — base components (tabs, dialog, etc.)
2. **Magic UI** — animation components (blur-fade, shimmer-button, border-beam, etc.)
3. **Aceternity UI** — background effects (beams, spotlight, lamp — hand-craft)
4. **Motion Primitives** — scroll-triggered animations (in-view, text-effect, accordion)
5. **v0.dev** — full page blocks when you need a complete section fast
6. **Look for more** — check npm, GitHub, and other libraries for components before hand-crafting
7. **Hand-craft LAST** — only when no registry has what you need

---

## Testing

- **Smoke tests only:** boot check, routes render, no console errors

---

## Sub-Agent Model Policy

**All sub-agents MUST use Opus.** When spawning agents via the Task tool, always set `model: "opus"`. Never use `"sonnet"` or `"haiku"` for sub-agents — this applies to exploration agents, plan agents, code-review agents, and all superpowers skill agents. Quality over speed.

## Parallel Agent Protocol

### Optimal Setup
- **4-5 parallel agents** is the sweet spot — more causes cross-file conflicts
- Keep agent prompts concise — context runs out fast with 5+ agents

### Phase Structure
```
Phase 0: Infrastructure (SEQUENTIAL — blocks everything)
  - Install deps, registry components, shared utilities, mock data
  - MUST complete with `npm run build` passing before any agent starts

Phase 1-N: Parallel Agent Work
  - Each agent gets explicit WRITE SCOPE (list of files)
  - Agents have READ-ONLY access to shared files
  - Each agent runs `npm run build && npm run lint` before returning

Final Phase: Integration (SEQUENTIAL)
  - Consolidated build + lint
  - Visual verification with Playwright
  - Fix any cross-agent conflicts
```

### Agent Prompt Template
Give each agent ALL context in one prompt. They can't see other agents' work.
Include:
1. **Write scope** — exact files they may create/edit
2. **Read-only deps** — shared files they import from (with key exports listed)
3. **Design system** — CSS classes, color tokens, animation patterns
4. **Quality gates** — lint command, build command, max line counts
5. **Data sources** — mock data file paths and key exports

### Key Mistakes to Avoid
1. Don't let agents modify shared files — constants.ts, globals.css, layout.tsx go in Phase 0
2. Don't guess at component APIs — give agents the exact import path and prop types
3. Don't skip the barrel export check — if index.ts exports `SectionHeading`, the file must exist
4. Don't run agents without a build gate — Phase 0 must end with `npm run build` passing

---

## Playwright Visual Verification

### Workflow
```bash
# 1. Start dev server on a known port
npm run dev -- -p 3001 &

# 2. Open in Playwright
playwright-cli open http://localhost:3001

# 3. Verify page title matches RISE (not another project on the port)
playwright-cli eval "document.title"
```

### Screenshots
```bash
# Simple screenshot
playwright-cli screenshot

# Full-page screenshot to file (screenshot command doesn't accept paths)
playwright-cli run-code "async page => { await page.screenshot({ path: '/tmp/file.png', fullPage: true }); }"
```

### Triggering `whileInView` Animations
`fullPage: true` screenshots do NOT trigger viewport intersection observers. Must scroll first:
```bash
# Scroll incrementally to trigger animations
playwright-cli run-code "async page => {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 300) {
    await page.evaluate(pos => window.scrollTo(0, pos), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });
}"
```

---

## TypeScript LSP — MANDATORY GATE

**The LSP tool reads installed code. Your training data is stale. LSP is truth.**

This is a GATE, not a suggestion. You MUST use LSP before writing code in the situations below. Skipping LSP because you "feel confident" is the same rationalization as skipping verification.

### Before WRITING any file:
- [ ] **Modifying files in `components/ui/`, `lib/`, or `data/`** → `findReferences` first
- [ ] **Modifying any shared file** (`layout.tsx`, `globals.css`) → `findReferences` on exports you're changing
- [ ] **Importing from a module you haven't verified this session** → `goToDefinition` or `hover`
- [ ] **Using any Motion API beyond `motion.div`, `animate`, `initial`, `transition`** → `hover` or `goToDefinition` to verify. Includes: `useReducedMotion`, `AnimatePresence`, `useAnimate`, `useScroll`, `useTransform`
- [ ] **Using React APIs that may have changed** (FormEvent, ref callbacks, use() hook) → `hover`

### After CREATING any file:
- [ ] **New component file** → `documentSymbol` to confirm exports
- [ ] **New file importing from existing modules** → `goToDefinition` on at least one import
- [ ] **After installing a registry component** → `documentSymbol` to learn its API

```
GUESS = BUG. LSP = TRUTH. ONE CALL PREVENTS ONE HOUR OF DEBUGGING.
```

---

## Validation Checklist

Before claiming any task as done:

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All imports resolve (LSP verified)
- [ ] No `any` types without justification

### File Hygiene
- [ ] Max 200 lines per component
- [ ] `"use client"` only where required
- [ ] Named exports (except page/layout)
- [ ] `@/*` import paths

### Visual
- [ ] Dark mode works
- [ ] Responsive at 320px, 768px, 1280px
- [ ] No layout shifts

### Pre-Commit
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
