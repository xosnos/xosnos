import { expect, test } from '@playwright/test';

async function hasHorizontalOverflow(page: {
  evaluate: (fn: () => boolean) => Promise<boolean>;
}) {
  return page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > root.clientWidth + 1;
  });
}

test('phone homepage keeps contact actions on the first screen', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Steven Nguyen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get in touch' })).toBeInViewport();
  await expect(page.getByRole('button', { name: 'View resume' })).toBeInViewport();
  expect(await hasHorizontalOverflow(page)).toBe(false);
});

test('phone navigation and assistant stay inside the viewport', async ({ page }) => {
  await page.goto('/');

  const menu = page.getByRole('button', { name: 'Toggle navigation' });
  await expect(menu).toBeVisible();
  await menu.click();

  const nav = page.getByRole('navigation', { name: 'Primary' });
  await nav.getByRole('link', { name: 'Projects' }).click();
  await expect(page.locator('#projects')).toBeInViewport();
  await expect(page.getByText('View Details').first()).toBeVisible();

  await page.getByRole('button', { name: 'Open AI assistant' }).click();
  const assistant = page.getByRole('dialog', { name: 'Ask Steven' });
  await expect(assistant).toBeVisible();

  const box = await assistant.boundingBox();
  expect(box).toBeTruthy();
  if (box) {
    const viewport = page.viewportSize();
    expect(viewport).toBeTruthy();
    if (viewport) {
      expect(box.x).toBeGreaterThanOrEqual(-1);
      expect(box.y).toBeGreaterThanOrEqual(-1);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
    }
  }

  expect(await hasHorizontalOverflow(page)).toBe(false);
});

test('phone project dialog is fully on-screen and readable', async ({ page }) => {
  await page.goto('/');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.locator('#projects button').first().click();

  const dialog = page.getByRole('dialog', { name: /Terraces|Project/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Terraces' })).toBeVisible();

  const box = await dialog.boundingBox();
  expect(box).toBeTruthy();
  if (box) {
    const viewport = page.viewportSize();
    expect(viewport).toBeTruthy();
    if (viewport) {
      expect(box.x).toBeGreaterThanOrEqual(-1);
      expect(box.y).toBeGreaterThanOrEqual(-1);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
    }
  }

  expect(await hasHorizontalOverflow(page)).toBe(false);
});
