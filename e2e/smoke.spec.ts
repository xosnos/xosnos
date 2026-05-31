import { test, expect } from '@playwright/test';

test('homepage loads and shows key text', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Steven Nguyen' })).toBeVisible();
  await expect(page.getByText('Software Engineer & Builder')).toBeVisible();
  await expect(page.getByText('Explore My Work')).toBeVisible();
});
