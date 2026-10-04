import { mock } from 'node:test';
import { expect, test } from '@playwright/test';
import { NextRequest } from 'next/server';
import { GET as spotifyCallback } from '../src/app/api/spotify/callback/route';
import { getAppleNowPlaying } from '../src/lib/apple-music';
import { logger } from '../src/lib/logger';
import { getAccessToken } from '../src/lib/spotify';

test.afterEach(() => mock.restoreAll());

test('writes one JSON record with severity, timestamp, event, and context', () => {
  const output = mock.method(console, 'info', () => {});
  const before = Date.now();

  logger.info('spotify.authorization_succeeded', {
    route: '/api/spotify/callback',
    provider: 'spotify',
    operation: 'exchange_code',
    status: 200,
  });

  expect(output.mock.callCount()).toBe(1);
  const args = output.mock.calls[0].arguments;
  expect(args).toHaveLength(1);
  const record = JSON.parse(args[0]);
  expect(record).toEqual({
    timestamp: expect.any(String),
    level: 'info',
    event: 'spotify.authorization_succeeded',
    route: '/api/spotify/callback',
    provider: 'spotify',
    operation: 'exchange_code',
    status: 200,
  });
  expect(new Date(record.timestamp).toISOString()).toBe(record.timestamp);
  expect(Date.parse(record.timestamp)).toBeGreaterThanOrEqual(before);
  expect(Date.parse(record.timestamp)).toBeLessThanOrEqual(Date.now());
});

test('preserves error diagnostics without SDK attachments or extra context fields', () => {
  const output = mock.method(console, 'error', () => {});
  const error = Object.assign(new TypeError('upstream failed\nretry later'), {
    request: { headers: { authorization: 'secret-header' } },
    cause: { access_token: 'secret-cause' },
  });
  const context = { route: '/api/chat', error, token: 'secret-context' };

  logger.error('chat.stream_failed', context);

  expect(output.mock.callCount()).toBe(1);
  const [line] = output.mock.calls[0].arguments;
  expect(line).not.toContain('\n');
  expect(line).not.toContain('secret-');
  expect(JSON.parse(line)).toEqual({
    timestamp: expect.any(String),
    level: 'error',
    event: 'chat.stream_failed',
    route: '/api/chat',
    error: {
      name: 'TypeError',
      message: 'upstream failed\nretry later',
      stack: expect.stringContaining('TypeError: upstream failed'),
    },
  });
});

test('handles string, null, and circular thrown values without serializing objects', () => {
  const output = mock.method(console, 'error', () => {});
  const circular = { token: 'secret', self: {} };
  circular.self = circular;

  for (const error of ['stream stopped', null, circular]) {
    logger.error('chat.stream_failed', { error });
  }

  expect(
    output.mock.calls.map(({ arguments: [line] }) => JSON.parse(line).error),
  ).toEqual([
    { name: 'NonError', message: 'stream stopped' },
    { name: 'NonError', message: 'Unknown thrown value' },
    { name: 'NonError', message: 'Unknown thrown value' },
  ]);
});

test('logs upstream status without the Apple Music response body', async () => {
  const output = mock.method(console, 'error', () => {});
  mock.method(globalThis, 'fetch', async () =>
    Response.json({ token: 'secret-response' }, { status: 403 }),
  );

  await expect(
    getAppleNowPlaying({ developerToken: 'secret-dev', userToken: 'secret-user' }),
  ).rejects.toThrow('Apple Music API error: 403');

  expect(output.mock.callCount()).toBe(1);
  expect(JSON.parse(output.mock.calls[0].arguments[0])).toEqual({
    timestamp: expect.any(String),
    level: 'error',
    event: 'music.upstream_failed',
    provider: 'apple',
    operation: 'recent_tracks',
    status: 403,
  });
});

test.describe('Spotify logging', () => {
  let originalEnv: NodeJS.ProcessEnv;

  test.beforeEach(() => {
    originalEnv = { ...process.env };
    Object.assign(process.env, {
      NODE_ENV: 'development',
      SPOTIFY_CLIENT_ID: 'test-client',
      SPOTIFY_CLIENT_SECRET: 'secret-client',
      SPOTIFY_REFRESH_TOKEN: 'secret-refresh',
    });
  });

  test.afterEach(() => {
    for (const key of [
      'NODE_ENV',
      'SPOTIFY_CLIENT_ID',
      'SPOTIFY_CLIENT_SECRET',
      'SPOTIFY_REFRESH_TOKEN',
    ]) {
      if (originalEnv[key] === undefined) delete process.env[key];
      else process.env[key] = originalEnv[key];
    }
  });

  test('refresh failures do not put provider response data in logs or thrown errors', async () => {
    const output = mock.method(console, 'error', () => {});
    mock.method(globalThis, 'fetch', async () =>
      Response.json({ error_description: 'secret-response' }, { status: 401 }),
    );

    await expect(getAccessToken()).rejects.toThrow(
      /^Failed to refresh Spotify access token: 401$/,
    );
    expect(output.mock.callCount()).toBe(1);
    expect(JSON.parse(output.mock.calls[0].arguments[0])).toEqual({
      timestamp: expect.any(String),
      level: 'error',
      event: 'spotify.token_refresh_failed',
      provider: 'spotify',
      operation: 'refresh_token',
      status: 401,
    });
  });

  test('callback logs success without tokens and retains the HttpOnly setup cookie', async () => {
    const info = mock.method(console, 'info', () => {});
    const rawLog = mock.method(console, 'log', () => {});
    const errors = mock.method(console, 'error', () => {});
    mock.method(globalThis, 'fetch', async () =>
      Response.json({ access_token: 'secret-access', refresh_token: 'secret-refresh' }),
    );

    const response = await spotifyCallback(
      new NextRequest(
        'http://127.0.0.1:3000/api/spotify/callback?code=test&state=match',
        {
          headers: { cookie: 'spotify_auth_state=match' },
        },
      ),
    );

    expect(response.status).toBe(200);
    expect(await response.text()).not.toContain('secret-');
    expect(response.cookies.get('spotify_refresh_token')).toMatchObject({
      value: 'secret-refresh',
      httpOnly: true,
    });
    expect(rawLog.mock.callCount()).toBe(0);
    expect(errors.mock.callCount()).toBe(0);
    expect(info.mock.callCount()).toBe(1);
    expect(JSON.parse(info.mock.calls[0].arguments[0])).toEqual({
      timestamp: expect.any(String),
      level: 'info',
      event: 'spotify.authorization_succeeded',
      route: '/api/spotify/callback',
    });
  });
});
