import { expect, test } from '@playwright/test';

test('GET /llms.txt returns 200 with text/plain and the expected H1', async ({
  request,
}) => {
  const response = await request.get('/llms.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/plain');

  const body = await response.text();
  expect(body.startsWith('# Steven Nguyen')).toBe(true);
  expect(body).toContain('/llms-full.txt');
});

test('GET /llms-full.txt returns 200 with text/plain and the full profile', async ({
  request,
}) => {
  const response = await request.get('/llms-full.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/plain');

  const body = await response.text();
  expect(body.startsWith('# Steven Nguyen')).toBe(true);
  expect(body).toContain('## Experience');
});
