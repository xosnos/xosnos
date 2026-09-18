# Steven Nguyen's portfolio

This repository contains the Next.js portfolio deployed at [xosnos.com](https://www.xosnos.com). Use this guide to run, validate, and navigate the website codebase.

## Features

The website combines typed portfolio content with optional server integrations:

- **AI assistant**: floating Google Gemini chat that streams answers about Steven's experience, projects, and skills through `/api/chat`
- **Projects and education**: cards with interactive detail modals
- **Experience**: work, volunteer, and project history with publication filtering, sorted newest first
- **Skills**: primary-stack chips and domain chips at the top of the section, plus the full badge list sourced from [`src/data/skills.ts`](../src/data/skills.ts) and synced to the GitHub profile README
- **Resume gate**: expiring, token-based download links sent through Resend, with the PDF stored in Google Drive and access logged to Google Sheets
- **Contact link**: opens the visitor's email client through a `mailto:` URL
- **Motion and theming**: page, section, and modal animations with a system-aware light and dark theme
- **Observability and metadata**: Vercel Analytics, Speed Insights, semantic HTML, Accessible Rich Internet Applications (ARIA) attributes, and search metadata

The repository also contains an unmounted music player and its API routes. `/api/music/now-playing` reads Apple Music's most recently played track, then falls back to Spotify's short-term top track. The homepage does not render this player or call the route.

## Tech stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, Lucide React, next-themes, Google Gemini (`@google/genai`), Google APIs, Resend, Vercel Analytics, and Speed Insights.

## Getting started

Install Node.js 20.9 or newer and [Bun](https://bun.sh/) before you start.

```bash
git clone https://github.com/xosnos/xosnos.git
cd xosnos
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local`, then configure the integrations you need. The AI assistant returns a not-configured response without Gemini credentials. The dormant music API returns an unavailable response without provider credentials. Resume email and download requests require the complete Resend, token, Google Drive, and Google Sheets configuration.

### Build for production

```bash
bun run build
bun run start
```

### Validate

```bash
bun run format
bun run lint
bun run typecheck
bun run test:e2e
```

After you change [`src/data/skills.ts`](../src/data/skills.ts), run `bun run check:readme-skills` to confirm the GitHub profile README still matches, and `bun run sync:readme-skills` to update it.

Playwright manages its own server: [`playwright.config.ts`](../playwright.config.ts) runs `bun run dev` on port 3000 and reuses a server that is already running outside CI. Tests run in Chromium only, with two retries and one worker in CI.

### Continuous integration

[`.github/workflows/pr-checks.yml`](../.github/workflows/pr-checks.yml) runs on every pull request and cancels a superseded run. Three jobs share the same Bun setup and `node_modules` cache: `lint` runs `bun run lint` and then `bun run check:readme-skills`, `typecheck` runs `bun run typecheck`, and `e2e` installs Chromium and runs `bun run test:e2e`.

### Amp orbs

Executable [`.agents/setup`](../.agents/setup) uses the orb's preinstalled Bun and
Node.js, installs dependencies from `bun.lock`, and caches Playwright's Chromium
browsers and system dependencies. Amp can reuse the prepared project snapshot;
when setup runs again, installed packages and browser downloads are reused.
[`.agents/resume`](../.agents/resume) does not install anything on wake.

Start the supervised development server and obtain its authenticated preview URL:

```bash
amp orb services ensure
```

The service is declared in [`.amp/services.yaml`](../.amp/services.yaml) on port
3000, matching the Playwright tests. Setup never starts a server. No database or
environment file is needed for basic development or the tests. Configure optional
integration credentials through Amp runtime secrets or an untracked `.env.local`;
setup never writes credentials or overwrites that file. Generated portal links
are ignored by Git.

## Documentation

Use these references when you change the website:

- [Architecture](ARCHITECTURE.md): App Router composition, directories, API routes, and security
- [Environment variable reference](../.env.example): configuration for optional integrations
- [Customize portfolio content](CUSTOMIZE.md): projects, experience, education, skills, and theme tokens
- [Design system](DESIGN.md): colors, typography, breakpoints, motion, accessibility, and performance measures

## License

MIT.

## Contact

- **Email**: [steven@xosnos.com](mailto:steven@xosnos.com)
- **GitHub**: [@xosnos](https://github.com/xosnos)
- **LinkedIn**: [/in/xosnos](https://linkedin.com/in/xosnos)
- **X**: [@xosnos](https://x.com/xosnos)
