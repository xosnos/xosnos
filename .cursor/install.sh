#!/usr/bin/env bash
# Cloud Agent install: provision Bun, project dependencies, and the Playwright
# Chromium browser. Runs from the repo root after checkout. Must be idempotent.
set -euo pipefail

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

echo "[install] Node $(node --version)"
node -e 'const want = require("fs").readFileSync(".nvmrc", "utf8").trim(); if (process.versions.node.split(".")[0] !== want) throw new Error(`Expected Node.js ${want} from .nvmrc, found ${process.version}`);'

if ! command -v bun >/dev/null 2>&1; then
  echo "[install] Installing Bun"
  curl -fsSL https://bun.sh/install | bash
  export PATH="$BUN_INSTALL/bin:$PATH"
fi
echo "[install] Bun $(bun --version)"

echo "[install] Installing locked dependencies"
bun install --frozen-lockfile

echo "[install] Installing Playwright Chromium"
# Chrome ships in the base image, so browser-only install is enough; fall back
# to installing system libraries if they are ever missing.
bunx --no-install playwright install chromium \
  || bunx --no-install playwright install --with-deps chromium

echo "[install] Ready"
