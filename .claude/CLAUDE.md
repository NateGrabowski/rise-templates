# RISE — Claude Code Directives

> This file supplements `AGENTS.md` at the project root. Read that first for full project context.

### Install → Stage → Comply → Move

Registry components ship without project-specific policies. **Never install directly into `src/components/`.** Use a staging folder, apply project compliance, then move into place.


## Testing

### Motion

- Use Motion library (`motion/react`) for all React animations
- One well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions
- Dramatic reveals: summoning circle animations, stone-carving effects, hieroglyph materialization
- All animations MUST respect `prefers-reduced-motion`

- **Smoke tests only:** boot check, routes render, no console errors


## Sub-Agent Model Policy

**All sub-agents MUST use Opus.** When spawning agents via the Task tool, always set `model: "opus"`. Never use `"sonnet"` or `"haiku"` for sub-agents — this applies to exploration agents, plan agents, code-review agents, and all superpowers skill agents. Quality over speed.

```bash
# 1. STAGE — install to temp directory
mkdir -p src/components/_staging

# Animate UI
pnpm dlx shadcn@2.3.0 add "https://animate-ui.com/r/<component>" --path src/components/_staging

# Motion Primitives
npx motion-primitives@latest add <component> --path src/components/_staging

# Magic UI
pnpm dlx shadcn@2.3.0 add "https://magicui.design/r/<component>" --path src/components/_staging

# 2. COMPLY — apply project policies before moving (see checklist below)
# 3. MOVE — into final location (e.g., src/components/magicui/, src/components/motion-primitives/)
```


## LSP Mandatory Gate
GUESS = BUG. LSP = TRUTH.

### Pre-Write Checklist
Before modifying any shared file:
- `findReferences` — check what depends on what you're changing
- `goToDefinition` — verify imports before using them
- `hover` — check types before assuming

### Post-Create Checklist
After creating any new file:
- `documentSymbol` — verify exports are correct
- `goToDefinition` — verify all imports resolve

## Sub-Agent Policy
- All sub-agents MUST use Opus model
- Quality over speed, always

## Parallel Agent Protocol
When running multiple agents:
1. Orchestrator creates shared files first (constants, utilities, types)
2. Each agent gets an explicit write scope (list of files they may create/edit)
3. Agents have READ-ONLY access to shared files
4. Each agent runs `npm run lint` on their files before returning

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

## TypeScript LSP — MANDATORY GATE

**The LSP tool reads installed code. Your training data is stale. LSP is truth.**

This is a GATE, not a suggestion. You MUST use LSP before writing code in the situations below. Skipping LSP because you "feel confident" is the same rationalization as skipping verification. If you catch yourself thinking "I know this API" — that's the trigger to use LSP, not skip it.

### Before WRITING any file (pre-write checklist):

- [ ] **Modifying files in `components/ui/`, `lib/`, or `data/`** → `findReferences` first. Know what depends on what you're changing.
- [ ] **Modifying any shared file** (`layout.tsx`, `navigation.tsx`, `globals.css`, `tailwind.config.ts`) → `findReferences` on exports/symbols you're changing.
- [ ] **Importing from a module you haven't verified this session** → `goToDefinition` or `hover` to confirm the export exists and its shape.
- [ ] **Using any Motion API beyond `motion.div`, `animate`, `initial`, `transition`** → `hover` or `goToDefinition` to verify it exists in the installed version. This includes: `useReducedMotion`, `AnimatePresence`, `useAnimate`, `useScroll`, `filter`, `willChange`, layout animations.
- [ ] **Using React APIs that may have changed** (FormEvent, ref callbacks, use() hook) → `hover` to check for deprecation notices.

### After CREATING any file:

- [ ] **New component file** → `documentSymbol` to confirm exports are correct.
- [ ] **New file that imports from existing modules** → `goToDefinition` on at least one import to verify resolution.
- [ ] **After installing a registry/shadcn component** → `documentSymbol` on the new file to learn its API before using it.

### The rule:

```
GUESS = BUG. LSP = TRUTH. ONE CALL PREVENTS ONE HOUR OF DEBUGGING.
```

NEVER guess at export shapes, component props, API signatures, or deprecation status when LSP can answer in one call. The cost is 2 seconds. The cost of guessing wrong is a broken build, a console warning, or a subtle runtime bug.
