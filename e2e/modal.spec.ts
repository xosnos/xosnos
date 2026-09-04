import { expect, test } from '@playwright/test';

test('project modal traps focus, locks scroll, and closes on Escape', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#projects').scrollIntoViewIfNeeded();

  const firstProject = page.locator('#projects button').first();
  await firstProject.click();

  const dialog = page.getByRole('dialog', { name: /Terraces|Project/ });
  await expect(dialog).toBeVisible();
  await expect(dialog).toBeFocused();

  const overflow = await page.evaluate(() => document.body.style.overflow);
  expect(overflow).toBe('hidden');

  await page.keyboard.press('Tab');
  const focusedInside = await page.evaluate(() => {
    const dialogEl = document.querySelector('[role="dialog"]');
    return Boolean(dialogEl?.contains(document.activeElement));
  });
  expect(focusedInside).toBe(true);

  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});

test('Escape closes only the topmost stacked dialog', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Open AI assistant' }).click();
  const assistant = page.getByRole('dialog', { name: 'Ask Steven' });
  await expect(assistant).toBeVisible();

  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.locator('#projects button').first().click();

  const project = page.getByRole('dialog', { name: /Terraces|Project/ });
  await expect(project).toBeVisible();
  await expect(assistant).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(project).toHaveCount(0);
  await expect(assistant).toBeVisible();
  await expect(assistant).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(assistant).toHaveCount(0);
});
