import { expect, test } from '@playwright/test';

test('skills section displays badges from site data', async ({ page }) => {
  await page.goto('/');
  await page.locator('#skills').scrollIntoViewIfNeeded();

  await expect(page.getByText('⌨️ Languages')).toBeVisible();
  await expect(page.getByText('🖥️ Frontend')).toBeVisible();

  const badgeImages = page.locator('#skills img[alt="Python"]');
  await expect(badgeImages.first()).toBeVisible();
});
