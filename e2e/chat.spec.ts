import { expect, test } from '@playwright/test';

test('chat API rejects invalid payloads before calling the model', async ({
  request,
}) => {
  const empty = await request.post('/api/chat', { data: { message: '' } });
  expect(empty.status()).toBe(400);

  const missing = await request.post('/api/chat', { data: {} });
  expect(missing.status()).toBe(400);

  const tooLong = await request.post('/api/chat', {
    data: { message: 'x'.repeat(1001) },
  });
  expect(tooLong.status()).toBe(400);

  const badHistory = await request.post('/api/chat', {
    data: { message: 'Hello', history: [{ role: 'system', text: 'nope' }] },
  });
  expect(badHistory.status()).toBe(400);

  const invalidJson = await request.post('/api/chat', {
    headers: { 'Content-Type': 'application/json' },
    data: 'not-json',
  });
  expect(invalidJson.status()).toBe(400);
});
