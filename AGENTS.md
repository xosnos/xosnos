# AGENTS.md

Personal brand repo for Steven Nguyen (xosnos): a Next.js 16 App Router portfolio site (`src/`, deployed to xosnos.com) plus the GitHub profile README at root `README.md`. Content edits visible on both surfaces must stay in sync — canonical source is `src/data/*.ts` (typed data files); skills badges sync via `bun run sync:readme-skills`. See `docs/ARCHITECTURE.md` and `docs/CUSTOMIZE.md`.

## Commands (use bun, not npm/yarn/pnpm)

- `bun run dev` / `build` / `start` — Next.js dev server and production build
- `bun run format` then `bun run lint` — Biome format + check (always run both, in that order)
- `bun run typecheck` — `tsc --noEmit`
- `bun run test` — Bun unit tests colocated as `src/**/*.test.ts`
- Single unit test: `bun test src/lib/dates.test.ts` (or `bun test -t "pattern"`)
- `bun run test:e2e` — Playwright; single spec: `bun run test:e2e e2e/smoke.spec.ts`
- Pre-commit (lefthook) runs Biome, typecheck, `bun test`, and `check:readme-skills` on staged files

## Architecture

- `src/app/` — layout, single homepage (`page.tsx` composes Hero → Projects → Experience → Skills → Education → About), and API routes under `src/app/api/`: `chat` (Gemini streaming), `mcp` (read-only MCP server from `src/lib/mcp/tools.ts`), `resume`, `music/now-playing`, `spotify` OAuth (local-only)
- `src/components/` — section components; interactive ones are client islands; overlays (modals, resume gate, AI assistant) use `src/hooks/useDialog.ts`
- `src/lib/` — AI context assembly, rate limiting, request guards, tokens, Gemini, Spotify, Apple Music; `src/data/` — typed content; `e2e/` — Playwright specs; `scripts/` — README sync

## Code style (Biome enforced; config in `biome.json`)

- 2-space indent, 90-char lines, LF endings, single quotes in JS/TS (double in JSX), semicolons, trailing commas
- Organize imports automatically; format before committing — don't hand-format
- Typed content in `src/data/` with exported `const` objects; colocate unit tests next to the code they cover
- Never commit secrets; optional integrations are configured via env vars (see `.env.example`)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
