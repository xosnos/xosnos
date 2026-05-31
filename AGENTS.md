## Mission

Deliver correct, maintainable changes with minimal risk.

## Scope

- Respect repository architecture and conventions.
- Keep edits focused; avoid unrelated refactors.
- Never commit secrets.

## Engineering Rules

- Validate changes with relevant checks before final delivery.
- Surface assumptions and edge cases explicitly.
- Prefer reversible changes and deterministic outputs.

## MCP & Skills

- MCP server definitions: `.agents/agents.json`
- Local MCP overrides/secrets: `.agents/local.json`
- Project skills: `.agents/skills/*/SKILL.md`

## Workflow

1. Plan briefly.
2. Implement minimal viable change.
3. Validate (lint/tests/build/smoke as needed).
4. Report results and residual risks.

## Rules

- Use bun for all package management and scripts.
- After every set of changes, run `bun run lint` and `bun run typecheck` to validate the changes.
