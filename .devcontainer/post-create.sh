#!/usr/bin/env bash
# Dev container post-create: install locked dependencies and the Playwright
# Chromium browser so lint, typecheck, unit, and E2E checks run immediately.
# Runs from the workspace root as the `node` user. Safe to re-run.
set -euo pipefail

echo "[devcontainer] Node $(node --version), Bun $(bun --version)"
node -e 'const [maj, min] = process.versions.node.split(".").map(Number); if (maj < 20 || (maj === 20 && min < 9)) { throw new Error("Next.js requires Node.js 20.9+"); }'

# Docker creates the node_modules volume root-owned on first mount.
sudo chown "$(id -u):$(id -g)" node_modules

echo "[devcontainer] Installing locked dependencies"
bun install --frozen-lockfile

echo "[devcontainer] Installing Playwright Chromium and system libraries"
bunx --no-install playwright install --with-deps chromium

# Optional integrations read secrets from an untracked .env.local; never create
# or overwrite it here. The app runs without one.
echo "[devcontainer] Ready. Start the dev server with: bun run dev"
