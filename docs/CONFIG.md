# Configuration

Add the variables for the features you want to enable to `.env.local`. Every feature
degrades gracefully — for example, without `GEMINI_API_KEY` the AI Assistant widget still
renders but replies with a friendly "not configured" notice.

## AI Assistant (Google Gemini)

| Variable | Description |
| --- | --- |
| `GEMINI_API_KEY` | Google AI Studio key powering the `/api/chat` widget |

## Now Playing — Apple Music (primary)

| Variable | Description |
| --- | --- |
| `APPLE_MUSIC_DEVELOPER_TOKEN` | Apple Music developer token |
| `APPLE_MUSIC_USER_TOKEN` | Apple Music user (Music-User) token |
| `APPLE_MUSIC_STOREFRONT` | Storefront code (e.g. `us`) |

## Now Playing — Spotify (fallback)

| Variable | Description |
| --- | --- |
| `SPOTIFY_CLIENT_ID` | Spotify app client ID |
| `SPOTIFY_CLIENT_SECRET` | Spotify app client secret |
| `SPOTIFY_REFRESH_TOKEN` | Long-lived refresh token (obtain via `/api/spotify/auth`) |

## Contact form (Resend)

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for transactional email |

## Resume gate (Google Drive/Sheets)

| Variable | Description |
| --- | --- |
| `RESUME_TOKEN_SECRET` | Secret used to sign and verify resume-access tokens |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email |
| `GOOGLE_PRIVATE_KEY` | Service account private key |
| `GOOGLE_RESUME_FILE_ID` | Google Drive file ID for the resume |
| `GOOGLE_SHEET_ID` | Google Sheet ID for access logging |
