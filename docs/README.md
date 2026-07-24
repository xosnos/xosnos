# Steven Nguyen's Portfolio

A modern, responsive portfolio site built with Next.js 16, React 19, TypeScript, and
Tailwind CSS 4.

## Features

- **AI Assistant** — floating chat widget powered by Google Gemini that streams answers
  about Steven's experience, projects, and skills (`/api/chat`)
- **Now Playing** — Apple Music primary with Spotify fallback (`/api/music/now-playing`)
- **Projects & Education** — interactive modals for deep dives
- **Experience** — work and volunteer history with published/unpublished filtering
- **Skills** — badge grid from [`src/data/skills.ts`](../src/data/skills.ts), synced to the GitHub profile README
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

Copy `.env.example` to `.env.local` and add the variables for the features you want to
enable. Inline comments in `.env.example` document each variable. Every feature degrades
gracefully when its keys are absent.

### Build for production

```bash
bun run build
bun start
```

### Validate

```bash
bun run lint      # check formatting, lint rules, and import order (read-only)
bun run format    # apply formatting, safe fixes, and import sorting
bun run typecheck
bun run test:e2e
```

## Documentation

- [Architecture](documentation/architecture.md) — App Router layout, directories, API routes
- [`.env.example`](../.env.example) — environment variables and inline docs per feature
- [Customization](documentation/customization.md) — projects, experience, skills, colors
- [Design System](documentation/design-system.md) — colors, typography, breakpoints, performance

## License

MIT.

## Contact

- **Email**: [steven@xosnos.com](mailto:steven@xosnos.com)
- **GitHub**: [@xosnos](https://github.com/xosnos)
- **LinkedIn**: [/in/xosnos](https://linkedin.com/in/xosnos)
- **Twitter**: [@xosnos](https://twitter.com/xosnos)
