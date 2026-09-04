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

Most site copy lives in typed data files under `src/data/`. Skills badges are defined in `src/data/skills.ts` and synced to the GitHub README via `bun run sync:readme-skills`. When editing content that appears on both surfaces (bio, projects, skills), update the canonical source and keep both in sync.

| Content | Canonical source |
| --- | --- |
| Projects, experience, education, about, hero, contact | `src/data/*.ts` |
| Skills badges | [`src/data/skills.ts`](src/data/skills.ts) (sync to root [`README.md`](README.md) with `bun run sync:readme-skills`) |
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

- Use bun for all package management and scripts.
- After every set of changes, run `bun run lint` and `bun run typecheck` to validate the changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->