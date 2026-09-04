import { expect, test } from '@playwright/test';

test('homepage loads and shows converting hero', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Steven Nguyen' })).toBeVisible();
  await expect(page.getByText('Software Engineer').first()).toBeVisible();
  await expect(page.getByText('Co-founding Terraces · previously Workday')).toBeVisible();
  await expect(page.getByText(/end-to-end/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get in touch' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'View resume' })).toBeVisible();
});
