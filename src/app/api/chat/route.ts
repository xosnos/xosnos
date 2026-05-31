import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/lib/rate-limit';
import { isAIConfigured, streamChat, type ChatTurn } from '@/lib/gemini';

// Use Node.js runtime (not Edge) so we share the same in-memory rate limiter
// shape as other routes (e.g. /api/skills) and keep @google/genai compatibility.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 20;
const MAX_TURN_LENGTH = 2000;
const MAX_TOTAL_HISTORY_CHARS = 20_000;

const ALLOWED_ORIGINS = new Set([
  'https://xosnos.com',
  'https://www.xosnos.com',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : []),
]);

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

interface ChatRequestBody {
  history?: unknown;
  message?: unknown;
}

const isValidTurn = (value: unknown): value is ChatTurn => {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    (v.role === 'user' || v.role === 'model') &&
    typeof v.text === 'string' &&
    v.text.length <= MAX_TURN_LENGTH
  );
};

// Vercel appends the client IP to X-Forwarded-For, so the *last* value is the
// hardest for a client to spoof. Fall back to x-real-ip and finally a constant.
const getClientIp = (request: NextRequest): string => {
  const xff = request.headers.get('x-forwarded-for') ?? '';
  const last = xff.split(',').map((s) => s.trim()).filter(Boolean).pop();
  return last || request.headers.get('x-real-ip') || '127.0.0.1';
};

export async function POST(request: NextRequest) {
  // Reject cross-origin requests in production. Browsers always send Origin on
  // the widget's POST fetch, so a missing or unlisted Origin is rejected to
  // protect against runaway spend. localhost stays allowed only in development.
  if (process.env.NODE_ENV === 'production') {
    const origin = request.headers.get('origin');
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Per-IP rate limit (10/min) plus a coarse per-instance global cap (120/min)
  // to bound runaway spend if the IP token gets bypassed.
  const ip = getClientIp(request);
  try {
    await limiter.check(120, 'global');
    await limiter.check(10, ip);
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { history, message } = body;
  const parsedHistory = history === undefined ? [] : history;

  if (typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must be at most ${MAX_MESSAGE_LENGTH} characters` },
      { status: 400 },
    );
  }
  if (!Array.isArray(parsedHistory) || !parsedHistory.every(isValidTurn)) {
    return NextResponse.json({ error: 'Invalid history' }, { status: 400 });
  }
  if (parsedHistory.length > MAX_HISTORY_TURNS) {
    return NextResponse.json(
      { error: `History must be at most ${MAX_HISTORY_TURNS} turns` },
      { status: 400 },
    );
  }
  const totalHistoryChars = (parsedHistory as ChatTurn[]).reduce(
    (n, t) => n + t.text.length,
    0,
  );
  if (totalHistoryChars > MAX_TOTAL_HISTORY_CHARS) {
    return NextResponse.json(
      { error: 'History payload too large' },
      { status: 400 },
    );
  }

  if (!isAIConfigured()) {
    return NextResponse.json(
      { error: 'AI assistant is not configured' },
      { status: 503 },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamChat(parsedHistory as ChatTurn[], message)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        console.error('Gemini stream error:', err);
        // If we haven't sent anything yet, this surfaces as a network error
        // on the client; if mid-stream, we close gracefully.
        controller.error(err);
        return;
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
