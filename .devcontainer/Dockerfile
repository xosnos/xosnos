# Debian with Node.js 24 (Next.js 16 needs 20.9+), git, and a non-root `node` user.
FROM mcr.microsoft.com/devcontainers/typescript-node:24-bookworm

# Bun runs every script in this repo (see AGENTS.md). Copying the binary from the
# official image pins the exact version without a curl-to-shell install.
COPY --from=oven/bun:1.4.2 /usr/local/bin/bun /usr/local/bin/bun
RUN ln -s /usr/local/bin/bun /usr/local/bin/bunx
