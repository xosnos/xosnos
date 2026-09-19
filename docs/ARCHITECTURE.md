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

| Route | Method | Purpose |
| --- | --- | --- |
| `chat` | POST | Validates, rate-limits, and streams Google Gemini answers as plain text |
| `music/now-playing` | GET | Returns an Apple Music recently played track or a Spotify short-term top track; no mounted component currently calls it |
| `spotify/auth`, `spotify/callback` | GET | Local Spotify OAuth setup at `127.0.0.1:3000`; returns 404 in production |
| `spotify/top-track` | GET | Returns the configured Spotify account's short-term top track |
| `resume` | POST | Validates a request and emails a 24-hour signed download link through Resend |
| `resume/download` | GET | Verifies the token, logs access to Google Sheets, and downloads the PDF from Google Drive |

For Spotify setup, register `http://127.0.0.1:3000/api/spotify/callback`, then visit `http://127.0.0.1:3000/api/spotify/auth` in development. Use `127.0.0.1`, not `localhost`, so the callback receives the OAuth state cookie. Copy the refresh token from the development server log to `SPOTIFY_REFRESH_TOKEN`; the music routes do not use the callback's refresh-token cookie.

See [`.env.example`](../.env.example) for every route's environment variables.

## AI context and request limits

[`src/lib/ai-context.ts`](../src/lib/ai-context.ts) builds the assistant's system instruction from portfolio data. Projects and experience use their published-item helpers; education reads `educationItems` directly. [`src/lib/gemini.ts`](../src/lib/gemini.ts) owns the model selection and streaming call. There is no separate knowledge store to update.

The chat request body contains a required `message` and optional `history`. Messages allow 1,000 characters; history allows 20 turns, 2,000 characters per turn, and 20,000 characters total. Each turn has a `user` or `model` role and a `text` field. The resume request body requires an email and accepts an optional name of up to 120 trimmed characters.

## Security

- [`next.config.ts`](../next.config.ts) sets `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, and `Permissions-Policy` headers on every response.
- In production, chat and resume POST handlers use [`src/lib/request-guard.ts`](../src/lib/request-guard.ts) to allow only `https://xosnos.com` and `https://www.xosnos.com`. Missing origins and preview domains return 403. Development mode skips the origin check.
- [`src/lib/rate-limit.ts`](../src/lib/rate-limit.ts) stores limits in memory per route instance, not across the deployment. Chat allows 10 requests per IP per minute and a 120-request instance budget. Resume email allows 5 requests per IP per minute and a 60-request instance budget for valid submissions. Music and Spotify top-track routes each allow 20 requests per forwarded-IP value per minute; Spotify auth allows 5 per IP per minute. The callback and resume download handlers have no rate limiter.
- Resume download links use HMAC-signed tokens that expire after 24 hours instead of a public file URL. Tokens are reusable until expiry, not single-use or IP-bound. Their payload contains the requester's email, optional name, and original IP; signing does not encrypt that data. Treat download URLs as private credentials.
- Resume downloads fetch the PDF and append a Sheets log in parallel. Failure of either operation prevents PDF delivery; a log row can exist even when the Drive fetch fails.
- Spotify OAuth setup routes return 404 in production.
- Environment variables are read only on the server.
