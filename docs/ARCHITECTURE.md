# Architecture

The website uses the Next.js App Router for a single-page portfolio and server-side API routes. This reference identifies the main ownership boundaries and request handlers.

## Page composition

[`src/app/page.tsx`](../src/app/page.tsx) composes the section components and wraps them in a `PageTransition` fade-in. `ScrollReveal` and `ScrollRevealItem` apply shared variants from [`src/lib/animations.ts`](../src/lib/animations.ts).

The homepage renders sections in this order:

1. Hero
2. Projects
3. Experience
4. Skills
5. Education
6. About
7. Contact

`Navigation` appears before the main content, and `Footer` appears after it. [`src/app/layout.tsx`](../src/app/layout.tsx) adds the theme provider, AI assistant, mobile scroll-to-top action, Vercel Analytics, and Speed Insights around every page.

## Directories

The source tree separates routes, presentation, content, and shared application logic:

| Path | Responsibility |
| --- | --- |
| `src/app/` | App Router entry points, layout, and API routes |
| `src/components/` | UI section and widget components |
| `src/data/` | Typed content separated from presentation |
| `src/lib/` | Apple Music, Spotify, Gemini, rate limiting, resume tokens, and shared utilities |
| `src/hooks/` | Reusable React hooks |
| `public/` | Images, icons, and the web manifest |
| `e2e/` | Playwright end-to-end tests |
| `scripts/` | Repository maintenance scripts, including README skill synchronization |

Typed files in `src/data/` own most visible copy. Components still own some presentation copy, so confirm the consuming component before assuming every exported field is rendered.

## API routes

All request handlers live under [`src/app/api/`](../src/app/api/):

| Route | Purpose |
| --- | --- |
| `chat` | Validates, rate-limits, and streams Google Gemini answers |
| `music/now-playing` | Returns an Apple Music recently played track or a Spotify short-term top track; no mounted component currently calls it |
| `spotify/auth`, `spotify/callback` | Runs the local Spotify OAuth setup flow at `127.0.0.1:3000` |
| `spotify/top-track` | Returns the configured Spotify account's short-term top track |
| `resume` | Validates a request and emails a 24-hour signed download link through Resend |
| `resume/download` | Verifies the token, logs access to Google Sheets, and downloads the PDF from Google Drive |

For Spotify setup, register `http://127.0.0.1:3000/api/spotify/callback`, visit `/api/spotify/auth` in development, and copy the logged refresh token to `SPOTIFY_REFRESH_TOKEN`. The callback cookie is not used by the music routes.

See [`.env.example`](../.env.example) for every route's environment variables.
