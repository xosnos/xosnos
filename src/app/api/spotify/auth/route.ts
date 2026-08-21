import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/lib/rate-limit';
import { getClientIp, rejectProductionSetupRoute } from '@/lib/request-guard';
import { REDIRECT_URI, SPOTIFY_AUTH_URL } from '../../../../lib/spotify';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function GET(request: NextRequest) {
  const setupBlocked = rejectProductionSetupRoute();
  if (setupBlocked) return setupBlocked;

  const ip = getClientIp(request);
  try {
    await limiter.check(5, ip); // 5 requests per minute
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;

  const scope = 'user-top-read';

  if (!client_id) {
    return NextResponse.json({ error: 'Missing Spotify client ID' }, { status: 500 });
  }

  const state = crypto.randomBytes(16).toString('hex');

  const authUrl = new URL(SPOTIFY_AUTH_URL);
  authUrl.searchParams.append('client_id', client_id);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('show_dialog', 'true');
  authUrl.searchParams.append('state', state);

  const response = NextResponse.redirect(authUrl.toString());

  response.cookies.set('spotify_auth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 3600, // 1 hour
  });

  return response;
}
