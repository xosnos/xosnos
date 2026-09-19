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

test('successful resume submission resets after closing and reopening', async ({
  page,
}) => {
  await page.route('**/api/resume', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'View resume' }).click();

  const dialog = page.getByRole('dialog', { name: 'Download Resume' });
  const email = dialog.getByLabel('Email address');
  await email.fill('steven@example.com');
  await dialog.getByRole('button', { name: 'Send Download Link' }).click();

  await expect(dialog.getByText('Check your email!')).toBeVisible();
  await expect(dialog.getByText('steven@example.com')).toBeVisible();

  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toHaveCount(0);

  await page.getByRole('button', { name: 'View resume' }).click();
  await expect(email).toBeVisible();
  await expect(email).toHaveValue('');
  await expect(dialog.getByLabel('Name (optional)')).toBeVisible();
  await expect(dialog.getByText('Check your email!')).toHaveCount(0);
});

test('closing the dialog mid-request discards the pending submission', async ({
  page,
}) => {
  let releaseRequest: () => void = () => {};
  let markRequestStarted: () => void = () => {};
  const requestReleased = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });
  const requestStarted = new Promise<void>((resolve) => {
    markRequestStarted = resolve;
  });

  await page.route('**/api/resume', async (route) => {
    markRequestStarted();
    await requestReleased;
    // The client aborts this request on close, which rejects fulfill().
    await route
      .fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
      .catch(() => {});
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'View resume' }).click();

  const dialog = page.getByRole('dialog', { name: 'Download Resume' });
  const email = dialog.getByLabel('Email address');
  await email.fill('steven@example.com');
  await dialog.getByRole('button', { name: 'Send Download Link' }).click();

  await requestStarted;
  await expect(dialog.getByText('Sending…')).toBeVisible();

  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toHaveCount(0);

  // Let the abandoned request settle before reopening so a stale state write
  // would have landed by the time the assertions below run.
  releaseRequest();
  await page.waitForTimeout(300);

  await page.getByRole('button', { name: 'View resume' }).click();
  await expect(email).toBeVisible();
  await expect(email).toHaveValue('');
  await expect(dialog.getByText('Check your email!')).toHaveCount(0);
  await expect(dialog.getByRole('alert')).toHaveCount(0);
  await expect(dialog.getByRole('button', { name: 'Send Download Link' })).toBeEnabled();
});
