# Architecture

The website uses the Next.js App Router for a single-page portfolio and server-side API routes. This reference identifies the main ownership boundaries and request handlers.

## Page composition

[`src/app/page.tsx`](../src/app/page.tsx) composes the section components. Project and education grids still use Motion for one-time viewport reveals. Static sections (Hero, Experience, Skills, About, Contact, Footer) render on the server without a page-level motion wrapper.

The homepage renders sections in this order:

1. Hero
2. Experience
3. Skills (curated strip)
4. Projects
5. About
6. Education
7. Contact

`Navigation` appears before the main content, and `Footer` appears after it. [`src/app/layout.tsx`](../src/app/layout.tsx) adds the theme provider, AI assistant, mobile scroll-to-top action, Vercel Analytics, and Speed Insights around every page. Interactive overlays (project and education modals, resume gate, and the AI assistant) use a shared dialog hook for Escape handling, focus trapping, and body scroll lock.

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
| `spotify/auth`, `spotify/callback` | Local Spotify OAuth setup at `127.0.0.1:3000`; returns 404 in production |
| `spotify/top-track` | Returns the configured Spotify account's short-term top track |
| `resume` | Validates a request and emails a 24-hour signed download link through Resend |
| `resume/download` | Verifies the token, logs access to Google Sheets, and downloads the PDF from Google Drive |

For Spotify setup, register `http://127.0.0.1:3000/api/spotify/callback`, visit `/api/spotify/auth` in development, and copy the logged refresh token to `SPOTIFY_REFRESH_TOKEN`. The callback cookie is not used by the music routes.

See [`.env.example`](../.env.example) for every route's environment variables.
