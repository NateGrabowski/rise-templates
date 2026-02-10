# RISE Playbook

## Operating Model
- **YOU**: Creative Director + QA + PM
- **CLAUDE**: Frontend Developer + DevOps

## Session Types

### 1. Build a Page
1. Brainstorm (superpowers:brainstorming)
2. Plan (superpowers:writing-plans)
3. Execute (superpowers:executing-plans)
4. Verify (superpowers:verification-before-completion)
5. Review (superpowers:requesting-code-review)

### 2. Parallel Build
1. Orchestrator creates shared infrastructure
2. Dispatch 2-3 agents with explicit write scopes
3. Each agent builds independently
4. Merge + verify

### 3. Polish
1. Visual review with Playwright screenshots
2. Identify issues
3. Fix systematically
4. Re-verify

### 4. Content Drop
1. Update data files in src/lib/constants.ts or src/data/
2. Verify rendering
3. Check responsive

## Quality Gates

### Component Level
- TypeScript compiles
- Renders in light + dark mode
- Responsive at 3 breakpoints

### Page Level
- All sections render
- Navigation works
- No console errors
- Lighthouse basics pass

### Milestone Level
- `npm run build` passes
- `npm run lint` passes
- All routes accessible
- Dark mode consistent across site

## Daily Rhythm
1. `/prime` — Load context
2. Pick a session type
3. Execute with quality gates
4. Commit when milestone reached
