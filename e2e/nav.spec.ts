import { expect, test } from '@playwright/test';

test('primary nav follows the hiring order', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation', { name: 'Primary' });
  const links = nav.locator('a');
  await expect(links.nth(1)).toHaveText('Projects');
  await expect(links.nth(2)).toHaveText('Experience');
  await expect(links.nth(3)).toHaveText('Skills');
  await expect(links.nth(4)).toHaveText('Education');
  await expect(links.nth(5)).toHaveText('About');

  await nav.getByRole('link', { name: 'Projects' }).click();
  await expect(page.locator('#projects')).toBeInViewport();
});
