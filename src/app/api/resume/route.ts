import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import rateLimit from '@/lib/rate-limit';
import { getClientIp, rejectDisallowedOrigin } from '@/lib/request-guard';
import { createToken } from '@/lib/resume-token';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  const originError = rejectDisallowedOrigin(request);
  if (originError) return originError;

  const ip = getClientIp(request);
  try {
    await limiter.check(60, 'global');
    await limiter.check(5, ip);
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    let body: { email?: unknown; name?: unknown };
    try {
      body = (await request.json()) as { email?: unknown; name?: unknown };
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email, name } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 },
      );
    }

    if (
      name !== undefined &&
      (typeof name !== 'string' || name.trim().length > MAX_NAME_LENGTH)
    ) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
    }

    const trimmedName =
      typeof name === 'string' && name.trim().length > 0 ? name.trim() : undefined;
    const token = createToken(email.trim(), trimmedName, ip);
    const baseUrl = request.headers.get('x-forwarded-proto')
      ? `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}`
      : new URL(request.url).origin;
    const downloadUrl = `${baseUrl}/api/resume/download?token=${token}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Steven Nguyen <steven@xosnos.com>',
      to: email.trim(),
      subject: "Your Download Link for Steven Nguyen's Resume",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px;">
          <h2 style="margin: 0 0 16px; font-size: 20px; color: #111;">Thanks for your interest${trimmedName ? `, ${escapeHtml(trimmedName)}` : ''}!</h2>
          <p style="margin: 0 0 24px; color: #444; line-height: 1.6;">
            Click the button below to download my resume. This link expires in 24 hours.
          </p>
          <a href="${downloadUrl}" style="display: inline-block; padding: 12px 28px; background-color: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
            Download Resume
          </a>
          <p style="margin: 32px 0 0; font-size: 12px; color: #999;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending resume email:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
