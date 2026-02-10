# RISE — Claude Code Directives

> This file supplements `AGENTS.md` at the project root. Read that first for full project context.

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
