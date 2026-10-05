import { afterEach, beforeEach, describe, expect, setSystemTime, test } from 'bun:test';
import { createToken, verifyToken } from './resume-token';

const originalSecret = process.env.RESUME_TOKEN_SECRET;

beforeEach(() => {
  process.env.RESUME_TOKEN_SECRET = 'test-secret';
});

afterEach(() => {
  setSystemTime();
  if (originalSecret === undefined) delete process.env.RESUME_TOKEN_SECRET;
  else process.env.RESUME_TOKEN_SECRET = originalSecret;
});

function encode(value: unknown): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

describe('resume tokens', () => {
  test('round-trips the payload', () => {
    const token = createToken('ada@example.com', 'Ada', '203.0.113.7');

    expect(verifyToken(token)).toMatchObject({
      email: 'ada@example.com',
      name: 'Ada',
      ip: '203.0.113.7',
    });
  });

  test('expires after 24 hours', () => {
    const start = new Date('2026-01-01T00:00:00Z');
    setSystemTime(start);
    const token = createToken('ada@example.com', undefined, '203.0.113.7');

    setSystemTime(new Date(start.getTime() + 24 * 60 * 60 * 1000));
    expect(verifyToken(token)).not.toBeNull();

    setSystemTime(new Date(start.getTime() + 24 * 60 * 60 * 1000 + 1));
    expect(verifyToken(token)).toBeNull();
  });

  test('rejects a tampered payload', () => {
    const token = createToken('ada@example.com', 'Ada', '203.0.113.7');
    const [, signature] = token.split('.');
    const forged = encode({
      email: 'mallory@example.com',
      ip: '203.0.113.7',
      exp: Date.now() + 60_000,
    });

    expect(verifyToken(`${forged}.${signature}`)).toBeNull();
  });

  test('rejects a token signed with a different secret', () => {
    const token = createToken('ada@example.com', 'Ada', '203.0.113.7');
    process.env.RESUME_TOKEN_SECRET = 'rotated-secret';

    expect(verifyToken(token)).toBeNull();
  });

  test('rejects malformed tokens', () => {
    for (const token of ['', 'no-dot', '.signature', 'data.', 'data.short']) {
      expect(verifyToken(token)).toBeNull();
    }
  });

  test('requires a configured secret', () => {
    delete process.env.RESUME_TOKEN_SECRET;

    expect(() => createToken('ada@example.com', 'Ada', '203.0.113.7')).toThrow(
      'RESUME_TOKEN_SECRET is not configured',
    );
    expect(verifyToken('data.signature')).toBeNull();
  });
});
