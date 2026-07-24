# AGENTS.md

This repo is the single source of truth for **Steven Nguyen (xosnos)** personal brand and career presence. It powers two public surfaces and will grow to centralize all career, accomplishments, and branding work so updates stay consistent and fast to ship.

| Surface | What it is | Source |
| --- | --- | --- |
| **Portfolio website** | [xosnos.com](https://www.xosnos.com) — Next.js app with AI assistant, resume gate, and live integrations | `src/`, deployed from this repo |
| **GitHub profile** | Special repo README shown on [github.com/xosnos](https://github.com/xosnos) | [`README.md`](README.md) at repo root |

## Documentation map

- [`README.md`](README.md) — GitHub profile display (badges, bio, projects table). Not the website readme.
- [`docs/README.md`](docs/README.md) — Portfolio website readme (setup, features, local dev).
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — App Router layout, directories, API routes.
- [`docs/CUSTOMIZE.md`](docs/CUSTOMIZE.md) — Content edits (projects, experience, skills, colors).
- [`docs/DESIGN.md`](docs/DESIGN.md) — Colors, typography, breakpoints, performance targets.
- [`.env.example`](.env.example) — Environment variables for optional website features.

## Content sources

Most site copy lives in typed data files under `src/data/`. Skills badges sync from the GitHub README via `/api/skills`. When editing content that appears on both surfaces (bio, projects, skills), update the canonical source and keep both in sync.

| Content | Canonical source |
| --- | --- |
| Projects, experience, education, about, hero, contact | `src/data/*.ts` |
| Skills badges | Root [`README.md`](README.md) (see [`docs/CUSTOMIZE.md`](docs/CUSTOMIZE.md) for overrides) |
| GitHub profile bio and projects table | Root [`README.md`](README.md) |

## Mission

Deliver correct, maintainable changes with minimal risk.

## Scope

- Respect repository architecture and conventions.
- Keep edits focused; avoid unrelated refactors.
- Never commit secrets.
- Treat changes as brand-facing: this repo is how recruiters, collaborators, and visitors discover Steven's work.

## Engineering Rules

- Validate changes with relevant checks before final delivery.
- Surface assumptions and edge cases explicitly.
- Prefer reversible changes and deterministic outputs.

## Skills

Project-specific agent skills live in [`.agents/skills/`](.agents/skills/). Read the relevant `SKILL.md` before tasks involving Next.js patterns, Vercel deploy/optimize, view transitions, or UI review.

## Workflow

1. Plan briefly.
2. Implement minimal viable change.
3. Validate (lint/tests/build/smoke as needed).
4. Report results and residual risks.

## Rules

- Use **bun** for all package management and scripts.
- After every set of changes, validate in this order:
  1. `bun run format` — apply Biome formatting and safe fixes
  2. `bun run lint` — verify formatting, lint rules, and import order (read-only)
  3. `bun run typecheck` — TypeScript check
  4. `bun run test:e2e` — Playwright end-to-end tests
