# Architecture

The app uses the **Next.js App Router** with a single-page layout.

## Page composition

Section components (`Hero`, `Projects`, `Experience`, `Skills`, `Education`, `About`,
`Contact`) are composed in [`src/app/page.tsx`](../src/app/page.tsx) and wrapped in a
`PageTransition` fade-in. Scroll-reveal animations are applied per-section via reusable
`ScrollReveal` and `ScrollRevealItem` wrappers backed by shared animation variants in
[`src/lib/animations.ts`](../src/lib/animations.ts).

The homepage renders sections in this order:

1. Hero (Name / Now Playing)
2. Projects
3. Experience
4. Skills
5. Education
6. About
7. Contact

## Directories

| Path | Responsibility |
| --- | --- |
| `src/app/` | App Router entry points, layout, and API routes |
| `src/components/` | UI section and widget components |
| `src/data/` | Typed content separated from presentation |
| `src/lib/` | Shared utilities (Apple Music, Spotify, GitHub README parsing, rate limiting, resume tokens, Gemini) |
| `src/hooks/` | Reusable React hooks |

Content is separated from presentation via typed data files in `src/data/`, so updating
copy rarely means touching component code.

## API routes

All routes live under [`src/app/api/`](../src/app/api/).

| Route | Purpose |
| --- | --- |
| `chat` | Streams AI Assistant answers via Google Gemini |
| `music/now-playing` | Now Playing — Apple Music primary with Spotify fallback |
| `spotify/auth`, `spotify/callback` | Spotify OAuth flow for refresh-token setup |
| `spotify/top-track` | Spotify top-track lookup |
| `skills` | Fetches and parses skill badges from a GitHub README |
| `resume`, `resume/download` | Token-gated resume access backed by Google Drive/Sheets |

See [`.env.example`](../.env.example) for the environment variables each route needs.
