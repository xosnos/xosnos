import { afterEach, describe, expect, test } from 'bun:test';
import { NextRequest } from 'next/server';
import {
  getClientIp,
  rejectDisallowedOrigin,
  rejectProductionSetupRoute,
} from './request-guard';

const env = process.env as Record<string, string | undefined>;
const originalNodeEnv = env.NODE_ENV;

afterEach(() => {
  env.NODE_ENV = originalNodeEnv;
});

function request(headers: Record<string, string> = {}): NextRequest {
  return new NextRequest('https://www.xosnos.com/api/chat', { method: 'POST', headers });
}

describe('getClientIp', () => {
  test('uses the last X-Forwarded-For entry, which the platform appends', () => {
    expect(
      getClientIp(request({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2 , 3.3.3.3' })),
    ).toBe('3.3.3.3');
  });

  test('ignores empty X-Forwarded-For entries', () => {
    expect(getClientIp(request({ 'x-forwarded-for': '1.1.1.1, ,' }))).toBe('1.1.1.1');
  });

  test('falls back to X-Real-IP, then localhost', () => {
    expect(getClientIp(request({ 'x-real-ip': '4.4.4.4' }))).toBe('4.4.4.4');
    expect(getClientIp(request({ 'x-forwarded-for': ' , ' }))).toBe('127.0.0.1');
    expect(getClientIp(request())).toBe('127.0.0.1');
  });
});

describe('rejectDisallowedOrigin', () => {
  test('allows any origin outside production', () => {
    env.NODE_ENV = 'development';
    expect(
      rejectDisallowedOrigin(request({ origin: 'https://evil.example' })),
    ).toBeNull();
  });

  test('allows the site origins in production', () => {
    env.NODE_ENV = 'production';
    expect(rejectDisallowedOrigin(request({ origin: 'https://xosnos.com' }))).toBeNull();
    expect(
      rejectDisallowedOrigin(request({ origin: 'https://www.xosnos.com' })),
    ).toBeNull();
  });

  test('rejects foreign or missing origins in production', async () => {
    env.NODE_ENV = 'production';

    const cases: Record<string, string>[] = [{ origin: 'https://evil.example' }, {}];
    for (const headers of cases) {
      const response = rejectDisallowedOrigin(request(headers));
      expect(response?.status).toBe(403);
      expect(await response?.json()).toEqual({ error: 'Forbidden' });
    }
  });
});

describe('rejectProductionSetupRoute', () => {
  test('hides setup routes only in production', async () => {
    env.NODE_ENV = 'development';
    expect(rejectProductionSetupRoute()).toBeNull();

    env.NODE_ENV = 'production';
    const response = rejectProductionSetupRoute();
    expect(response?.status).toBe(404);
    expect(await response?.json()).toEqual({ error: 'Not found' });
  });
});
