# RISE Ecosystem

## MCP Servers Available
| Server | Purpose | Priority |
|--------|---------|----------|
| Sequential Thinking | Complex architectural reasoning | P1 — Always |
| Context7 | Real-time framework docs | P1 — Always |
| Playwright MCP | Visual feedback, screenshots | P2 — When testing |
| GitHub MCP | Issues, PRs, repo management | P2 — When needed |
| Linear MCP | Issue tracking from CLI | P3 — On demand |

## Plugins
| Plugin | Purpose |
|--------|---------|
| frontend-design | Eliminates AI aesthetic slop for UI components |
| Superpowers | Planning, TDD, verification, debugging, parallel agents |

## Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.x | Framework |
| react | 19.x | UI library |
| tailwindcss | 4.x | Styling |
| shadcn/ui | latest | Component library |
| next-themes | 0.4.x | Dark mode |
| lucide-react | latest | Icons |
| clsx + tailwind-merge | latest | Class merging (cn utility) |

## Context Budget Warning
MCP tools consume significant context. Monitor with `/context`.
- P1 servers: Always loaded
- P2 servers: Load when actively needed
- P3 servers: Load on demand, unload after use
