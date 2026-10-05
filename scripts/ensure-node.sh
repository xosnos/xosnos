#!/usr/bin/env bash
# Make the Node.js major version pinned in .nvmrc the `node` on PATH. On Linux,
# when another version is active (Amp orbs ship a newer Node.js), install the
# latest release of the pinned major from nodejs.org into /usr/local, the same
# layout the official Node.js Docker images use. Safe to re-run.
set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
want="$(tr -d '[:space:]' < .nvmrc)"
current_major() { node -p 'process.versions.node.split(".")[0]' 2>/dev/null || true; }

have="$(current_major)"
if [ "$have" = "$want" ]; then
  echo "[node] Using Node.js $(node --version)"
  exit 0
fi

if [ "$(uname -s)" != Linux ]; then
  echo "[node] Install Node.js $want (pinned in .nvmrc); found ${have:-none}" >&2
  exit 1
fi

case "$(uname -m)" in
  x86_64) arch=x64 ;;
  aarch64 | arm64) arch=arm64 ;;
  *)
    echo "[node] Unsupported architecture: $(uname -m)" >&2
    exit 1
    ;;
esac

base="https://nodejs.org/dist/latest-v${want}.x"
tmp="$(mktemp -d)"
trap 'rm -rf -- "$tmp"' EXIT

curl -fsSL "$base/SHASUMS256.txt" -o "$tmp/SHASUMS256.txt"
file="$(grep -o "node-v${want}\.[0-9.]*-linux-${arch}\.tar\.xz" "$tmp/SHASUMS256.txt" | head -n 1)"
dir="${file%.tar.xz}"
echo "[node] Installing ${dir} into /usr/local (found ${have:-none})"
curl -fsSL "$base/$file" -o "$tmp/$file"
(cd "$tmp" && grep " ${file}\$" SHASUMS256.txt | sha256sum -c --quiet -)

as_root=()
if [ "$(id -u)" -ne 0 ]; then
  as_root=(sudo -n)
fi
# Drop the previous npm, corepack, and headers so files from another major
# cannot linger next to the new ones.
"${as_root[@]}" rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
  /usr/local/include/node
"${as_root[@]}" tar -xJf "$tmp/$file" -C /usr/local --strip-components=1 --no-same-owner \
  --exclude="$dir/CHANGELOG.md" --exclude="$dir/LICENSE" --exclude="$dir/README.md"
hash -r

if [ "$(current_major)" != "$want" ]; then
  echo "[node] Installed ${dir}, but $(command -v node) still reports $(node --version)" >&2
  exit 1
fi
echo "[node] Using Node.js $(node --version)"
