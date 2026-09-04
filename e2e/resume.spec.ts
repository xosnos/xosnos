import { expect, test } from '@playwright/test';

test('resume APIs reject invalid requests', async ({ request }) => {
  const missingEmail = await request.post('/api/resume', { data: {} });
  expect(missingEmail.status()).toBe(400);

  const invalidEmail = await request.post('/api/resume', {
    data: { email: 'not-an-email' },
  });
  expect(invalidEmail.status()).toBe(400);

  const invalidJson = await request.post('/api/resume', {
    headers: { 'Content-Type': 'application/json' },
    data: 'not-json',
  });
  expect(invalidJson.status()).toBe(400);

  const missingToken = await request.get('/api/resume/download');
  expect(missingToken.status()).toBe(400);

  const invalidToken = await request.get('/api/resume/download?token=not.a.token');
  expect(invalidToken.status()).toBe(403);
});

test('resume gate dialog opens from the hero CTA', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'View resume' }).click();
  await expect(page.getByRole('dialog', { name: 'Download Resume' })).toBeVisible();
  await expect(page.getByLabel('Email address')).toBeVisible();
});
