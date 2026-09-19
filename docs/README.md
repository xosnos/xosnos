# Steven Nguyen's portfolio

This repository contains the Next.js portfolio deployed at [xosnos.com](https://www.xosnos.com). Use this guide to run, validate, and navigate the website codebase.

The root [`README.md`](../README.md) is the public GitHub profile, not the website setup guide. Website content lives in [`src/data/`](../src/data/); see [customization](CUSTOMIZE.md) for keeping both surfaces consistent.

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
bun install --frozen-lockfile
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment file is required to browse the portfolio or run the tests. To enable integrations, copy [`.env.example`](../.env.example) to `.env.local` and configure only the services you need. Never commit credentials.

### Configure optional integrations

Use the environment template for variable names and these requirements for service setup:

| Integration | Requirements | Behavior without configuration |
| --- | --- | --- |
| AI assistant | `GEMINI_API_KEY` | The widget renders; valid chat requests return 503 |
| Resume email | `RESEND_API_KEY`, `RESUME_TOKEN_SECRET`, and a verified Resend sender for `steven@xosnos.com` | Valid submissions cannot send a download link |
| Resume download | The same token secret plus all four Google variables in `.env.example` | A signed link alone cannot deliver the PDF |
| Music API | Both Apple Music tokens, or all three Spotify credentials | `/api/music/now-playing` returns 503; the player remains unmounted |

For resume downloads, enable the Google Drive and Sheets APIs for the service account's project. Share the resume PDF with the service account as a viewer and the logging spreadsheet as an editor. Create a sheet tab named `Downloads`; the route appends email, name, timestamp, and the original request IP to columns A–D. Both the Drive fetch and Sheets append must succeed before the route returns the PDF.

Keep `RESUME_TOKEN_SECRET` stable across instances. Changing it invalidates existing download links. For local Spotify authorization, follow the [OAuth setup instructions](ARCHITECTURE.md#api-routes).

### Build for production

```bash
bun run build
bun run start
```

Production-mode chat and resume POST requests accept only the two public site origins. Local production builds and preview domains return 403 for these requests unless you update the [origin allowlist](../src/lib/request-guard.ts). Development mode skips this check.

### Validate

Install Playwright's Chromium browser before the first test run, and again after a Playwright upgrade:

```bash
bunx --no-install playwright install chromium
```

On Linux, add `--with-deps` to install required system libraries. Then run the repository checks in order:

```bash
bun run format
bun run lint
bun run typecheck
bun run test:e2e
```

After you change [`src/data/skills.ts`](../src/data/skills.ts), run `bun run check:readme-skills` to confirm the GitHub profile README still matches, and `bun run sync:readme-skills` to update it.

Playwright manages its own server: [`playwright.config.ts`](../playwright.config.ts) runs `bun run dev` on port 3000 and reuses a server that is already running outside CI. Tests run in Chromium only, with two retries and one worker in CI.

The suite covers homepage content, navigation, skills, dialog behavior, invalid API requests, and a mocked resume submission. It does not verify live Gemini, Resend, Google, or music-provider calls, or production-only origin checks.

### Continuous integration

[`.github/workflows/pr-checks.yml`](../.github/workflows/pr-checks.yml) runs when a pull request opens, receives commits, or reopens, and cancels a superseded run. Three jobs use the same Bun setup and `node_modules` cache: `lint` runs `bun run lint` and then `bun run check:readme-skills`, `typecheck` runs `bun run typecheck`, and `e2e` installs Chromium and runs `bun run test:e2e`. The workflow does not run a production build.

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
