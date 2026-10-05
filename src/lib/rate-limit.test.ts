import { afterEach, describe, expect, setSystemTime, test } from 'bun:test';
import rateLimit from './rate-limit';

afterEach(() => {
  setSystemTime();
});

describe('rateLimit', () => {
  test('allows requests up to the limit, then rejects', async () => {
    const limiter = rateLimit({ interval: 60_000 });

    await limiter.check(3, 'client');
    await limiter.check(3, 'client');
    await limiter.check(3, 'client');
    await expect(limiter.check(3, 'client')).rejects.toBeUndefined();
  });

  test('tracks each token separately', async () => {
    const limiter = rateLimit();

    await limiter.check(1, 'a');
    await expect(limiter.check(1, 'a')).rejects.toBeUndefined();
    await expect(limiter.check(1, 'b')).resolves.toBeUndefined();
  });

  test('allows requests again after the window passes', async () => {
    const start = new Date('2026-01-01T00:00:00Z');
    setSystemTime(start);
    const limiter = rateLimit({ interval: 1_000 });

    await limiter.check(1, 'client');
    await expect(limiter.check(1, 'client')).rejects.toBeUndefined();

    setSystemTime(new Date(start.getTime() + 1_001));
    await expect(limiter.check(1, 'client')).resolves.toBeUndefined();
  });

  test('evicts the oldest token when the cache exceeds its size', async () => {
    const limiter = rateLimit({ uniqueTokenPerInterval: 2 });

    await limiter.check(1, 'first');
    await limiter.check(1, 'second');
    await limiter.check(1, 'third');

    // 'first' was evicted, so its earlier request no longer counts.
    await expect(limiter.check(1, 'first')).resolves.toBeUndefined();
    await expect(limiter.check(1, 'third')).rejects.toBeUndefined();
  });
});
