import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { rejectProductionSetupRoute } from '@/lib/request-guard';
import { exchangeCodeForTokens } from '../../../../lib/spotify';

export async function GET(request: NextRequest) {
  const setupBlocked = rejectProductionSetupRoute();
  if (setupBlocked) return setupBlocked;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  // Get the state cookie to verify against the state query param (SBP-002)
  const storedState = request.cookies.get('spotify_auth_state')?.value;

  if (error) {
    return NextResponse.json(
      { error: `Spotify authorization error: ${error}` },
      { status: 400 },
    );
  }

  // Validate State
  if (!state || !storedState || state !== storedState) {
    return NextResponse.json(
      { error: 'State mismatch or missing state parameter' },
      { status: 400 },
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 },
    );
  }

  try {
    const tokenData = await exchangeCodeForTokens(code);

    // Tokens remain in the HttpOnly cookie, never in logs or the JSON response.
    logger.info('spotify.authorization_succeeded', { route: '/api/spotify/callback' });

    const response = NextResponse.json({
      message: 'Authorization successful! Tokens have been handled securely.',
    });

    // Clear the state cookie
    response.cookies.delete('spotify_auth_state');

    // Store the refresh token in an HttpOnly cookie
    response.cookies.set('spotify_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    logger.error('spotify.callback_failed', { route: '/api/spotify/callback', error });
    return NextResponse.json(
      { error: 'Internal server error during token exchange' },
      { status: 500 },
    );
  }
}
