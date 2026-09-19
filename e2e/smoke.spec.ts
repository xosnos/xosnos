import { expect, test } from '@playwright/test';

test('homepage loads and shows converting hero', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Steven Nguyen' })).toBeVisible();
  await expect(page.locator('[aria-live="polite"]')).toContainText('Software Engineer');
  await expect(
    page.locator('#page-top').getByText('San Francisco Bay Area'),
  ).toBeVisible();
  await expect(page.getByText(/end-to-end/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
    'href',
    'mailto:steven@xosnos.com',
  );
  await expect(page.getByText(/iced matcha lattes/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'View resume' })).toBeVisible();
});
