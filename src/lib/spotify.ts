// Constants
export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
export const REDIRECT_URI = 'http://127.0.0.1:3000/api/spotify/callback';

// Interfaces
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  duration_ms: number;
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
}

// Helper functions
export async function getAccessToken(): Promise<string> {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refresh_token || !client_id || !client_secret) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    console.error('Spotify token refresh error:', errorData);
    throw new Error(`Failed to refresh Spotify access token: ${errorData.error_description || errorData.error || response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function getTopTrack(accessToken: string): Promise<SpotifyTrack | null> {
  const response = await fetch(`${SPOTIFY_TOP_TRACKS_ENDPOINT}?limit=1&time_range=short_term`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top tracks from Spotify');
  }

  const data: SpotifyTopTracksResponse = await response.json();
  return data.items[0] || null;
}

export async function exchangeCodeForTokens(code: string) {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!client_id || !client_secret) {
        throw new Error('Missing Spotify credentials');
    }

    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Spotify token exchange error:', errorData);
        throw new Error('Failed to exchange code for tokens');
    }

    return await response.json();
}
