# Steven Nguyen's Portfolio

A modern, responsive portfolio site built with Next.js 16, React 19, TypeScript, and
Tailwind CSS 4.

## Features

- **AI Assistant** — floating chat widget powered by Google Gemini that streams answers
  about Steven's experience, projects, and skills (`/api/chat`)
- **Now Playing** — Apple Music primary with Spotify fallback (`/api/music/now-playing`)
- **Projects & Education** — interactive modals for deep dives
- **Experience** — work and volunteer history with published/unpublished filtering
- **Skills** — badge categories defined in `src/data/skills.ts`
- **Resume Gate** — token-based access for resume downloads
- **Contact Form** — email via Resend
- **Animations** — scroll-reveal, page transitions, and modal animations via Motion
- **Theming** — dark/light toggle via next-themes
- **Built-in** — Vercel Analytics & Speed Insights, semantic HTML, ARIA, and SEO metadata

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion (Framer Motion) ·
Lucide React · next-themes · Google Gemini (`@google/genai`) · googleapis · Resend ·
Vercel Analytics & Speed Insights

## Getting started

**Prerequisites:** Node.js 20.9+ (Next.js 16) and [Bun](https://bun.sh/).

```bash
git clone https://github.com/xosnos/xosnos.com.git
cd xosnos.com
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Add the variables for the features you want to enable to `.env.local` — see
[Configuration](documentation/configuration.md). Every feature degrades gracefully when
its keys are absent.

### Build for production

```bash
bun run build
bun start
```

### Validate

```bash
bun run lint
bun run typecheck
bun run test:e2e
```

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

- [Architecture](documentation/architecture.md) — App Router layout, directories, API routes
- [Configuration](documentation/configuration.md) — environment variables per feature
- [Customization](documentation/customization.md) — projects, experience, skills, colors
- [Design System](documentation/design-system.md) — colors, typography, breakpoints, performance

## License

MIT.

## Contact

- **Email**: [steven@xosnos.com](mailto:steven@xosnos.com)
- **GitHub**: [@xosnos](https://github.com/xosnos)
- **LinkedIn**: [/in/xosnos](https://linkedin.com/in/xosnos)
- **Twitter**: [@xosnos](https://twitter.com/xosnos)
