import { NextRequest, NextResponse } from 'next/server';

export const ALLOWED_ORIGINS = new Set([
  'https://xosnos.com',
  'https://www.xosnos.com',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : []),
]);

// Vercel appends the client IP to X-Forwarded-For, so the *last* value is the
// hardest for a client to spoof. Fall back to x-real-ip and finally a constant.
export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for') ?? '';
  const last = xff
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .pop();
  return last || request.headers.get('x-real-ip') || '127.0.0.1';
}

/** Reject cross-origin POSTs in production. Missing Origin is treated as forbidden. */
export function rejectDisallowedOrigin(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== 'production') return null;

  const origin = request.headers.get('origin');
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}

/** Hide local setup routes (Spotify OAuth) from production. */
export function rejectProductionSetupRoute(): NextResponse | null {
  if (process.env.NODE_ENV !== 'production') return null;
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
