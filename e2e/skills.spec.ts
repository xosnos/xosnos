import { test, expect } from '@playwright/test';

test('local skills data displays badges', async ({ page }) => {
  await page.goto('/');
  await page.locator('#skills').scrollIntoViewIfNeeded();

  await expect(page.getByText('⌨️ Languages')).toBeVisible();
  await expect(page.getByText('🖥️ Frontend')).toBeVisible();

  const badgeImages = page.locator('#skills img[alt="Python"]');
  await expect(badgeImages.first()).toBeVisible();
});
