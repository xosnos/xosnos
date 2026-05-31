import { NextResponse, NextRequest } from 'next/server';
import { getAccessToken, getTopTrack } from '../../../../lib/spotify';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  try {
    await limiter.check(20, ip); // 20 requests per minute
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const accessToken = await getAccessToken();
    const topTrack = await getTopTrack(accessToken);

    if (!topTrack) {
      return NextResponse.json(
        { error: 'No top track found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: topTrack.id,
      name: topTrack.name,
      artists: topTrack.artists.map(artist => artist.name).join(', '),
      album: topTrack.album.name,
      image: topTrack.album.images[0]?.url || null,
      spotifyUrl: topTrack.external_urls.spotify,
      previewUrl: topTrack.preview_url,
      duration: topTrack.duration_ms,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top track' },
      { status: 500 }
    );
  }
}