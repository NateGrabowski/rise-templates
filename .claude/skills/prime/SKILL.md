---
name: prime
description: "Use when starting a session, before planning or implementation work. Loads project context and produces an Active Rules Checklist."
disable-model-invocation: true
allowed-tools:
  - Read
---

# Prime — Session Primer

Load project context and produce an Active Rules Checklist.

## Steps
1. Read `AGENTS.md` at project root
2. Read `docs/ecosystem.md`
3. Read `docs/playbook.md`

## Output Format
Produce an **Active Rules Checklist** grouped by:
- **Stack & Versions** — exact versions, forbidden patterns
- **Architecture & Routing** — route groups, component locations
- **Design & Aesthetic** — colors (hex codes), fonts, glassmorphism specs
- **Code Style** — exports, line limits, imports, client directives
- **Workflows & Tooling** — available MCP servers, hooks, skills

Rules must be specific and actionable — include exact versions, hex codes, font names, and forbidden patterns verbatim.
