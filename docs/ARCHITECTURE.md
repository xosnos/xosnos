# Architecture

The website uses the Next.js App Router for a single-page portfolio and server-side API routes. This reference identifies the main ownership boundaries and request handlers.

## Page composition

[`src/app/page.tsx`](../src/app/page.tsx) composes the section components. There is no page-level motion wrapper, so each section owns its own animation. `Projects` and `Education` are client components that render their Motion reveals and modals directly. `Experience` and `Hero` are server components that delegate to client islands: `Experience` wraps its cards in `ScrollReveal` and `ScrollRevealItem`, and `Hero` renders `RotatingRoleTitle` and `HeroActions`. `Skills`, `About`, and `Footer` ship no client JavaScript.

The homepage renders sections in this order:

1. Hero
2. Projects
3. Experience
4. Skills (primary stack, domains, and full badge list)
5. Education
6. About

`Navigation` appears before the main content, and `Footer` appears after it. [`src/app/layout.tsx`](../src/app/layout.tsx) owns the metadata and social cards, the Montserrat and Lato font loaders, the skip-to-content link, the theme provider, `FloatingActions` (the AI assistant plus the mobile scroll-to-top action), Vercel Analytics, and Speed Insights around every page. Interactive overlays (project and education modals, resume gate, and the AI assistant) use [`useDialog`](../src/hooks/useDialog.ts) for Escape handling, focus trapping, and body scroll lock.

## Directories

The source tree separates routes, presentation, content, and shared application logic:

| Path | Responsibility |
| --- | --- |
| `src/app/` | App Router entry points, layout, and API routes |
| `src/components/` | UI section and widget components |
| `src/data/` | Typed content separated from presentation |
| `src/lib/` | Shared utilities for AI context assembly, animation variants, Apple Music, date sorting, Gemini, rate limiting, origin and client-IP guards, resume gate events, resume tokens, and Spotify |
| `src/hooks/` | Reusable React hooks: `useDialog` and `useScrollThreshold` |
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
| `spotify/auth`, `spotify/callback` | Local Spotify OAuth setup at `127.0.0.1:3000`; returns 404 in production |
| `spotify/top-track` | Returns the configured Spotify account's short-term top track |
| `resume` | Validates a request and emails a 24-hour signed download link through Resend |
| `resume/download` | Verifies the token, logs access to Google Sheets, and downloads the PDF from Google Drive |

For Spotify setup, register `http://127.0.0.1:3000/api/spotify/callback`, visit `/api/spotify/auth` in development, and copy the logged refresh token to `SPOTIFY_REFRESH_TOKEN`. The callback cookie is not used by the music routes.

See [`.env.example`](../.env.example) for every route's environment variables.

## Security

- [`next.config.ts`](../next.config.ts) sets `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, and `Permissions-Policy` headers on every response.
- API routes enforce rate limits and verify secrets before streaming or emailing. In production, [`src/lib/request-guard.ts`](../src/lib/request-guard.ts) returns 403 when a mutating request has a missing or disallowed `Origin`.
- Resume download links use HMAC-signed tokens that expire after 24 hours instead of a public file URL.
- Spotify OAuth setup routes return 404 in production.
- Environment variables are read only on the server.
