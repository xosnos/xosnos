import { expect, test } from '@playwright/test';

test('skills strip shows curated tools instead of a badge wall', async ({ page }) => {
  await page.goto('/');
  await page.locator('#skills').scrollIntoViewIfNeeded();

  await expect(page.getByRole('heading', { name: 'Tools I ship with' })).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'TypeScript' }).first(),
  ).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Supabase' })).toBeVisible();
  await expect(page.getByText('Full-Stack Web Development')).toBeVisible();

  await expect(page.getByText('⌨️ Languages')).not.toBeVisible();
  await expect(page.locator('#skills img[alt="Python"]')).toHaveCount(0);
});
