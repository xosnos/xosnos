export type MusicProvider = 'apple' | 'spotify';

export interface MusicTrack {
  id: string;
  name: string;
  artist: string;
  album?: string;
  artworkUrl?: string | null;
  url?: string | null;
  previewUrl?: string | null;
  duration?: number | null;
  provider: MusicProvider;
}

function buildArtworkUrl(template?: string, size = 300): string | null {
  if (!template) return null;

  return template
    .replace('{w}', size.toString())
    .replace('{h}', size.toString())
    .replace('{c}', '')
    .replace('{f}', 'jpg');
}

export async function getAppleNowPlaying(params: {
  developerToken: string;
  userToken: string;
  storefront?: string;
}): Promise<MusicTrack | null> {
  const { developerToken, userToken, storefront = 'us' } = params;

  const response = await fetch(
    `https://api.music.apple.com/v1/me/recent/played/tracks?limit=1&l=en-US&platform=web&storefront=${storefront}`,
    {
      headers: {
        Authorization: `Bearer ${developerToken}`,
        'Music-User-Token': userToken,
      },
      cache: 'no-store',
    },
  );

  if (response.status === 204) {
    // No recent tracks
    return null;
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.error('Apple Music API error', response.status, errorBody);
    throw new Error(`Apple Music API error: ${response.status}`);
  }

  const payload = await response.json();
  const item = payload?.data?.[0];
  const attrs = item?.attributes;

  if (!attrs) {
    return null;
  }

  return {
    id: item.id,
    name: attrs.name,
    artist: attrs.artistName,
    album: attrs.albumName,
    artworkUrl: buildArtworkUrl(attrs.artwork?.url, 240),
    url: attrs.url ?? null,
    previewUrl: attrs.previews?.[0]?.url ?? null,
    duration: attrs.durationInMillis ?? null,
    provider: 'apple',
  };
}



