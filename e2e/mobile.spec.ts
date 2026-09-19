import { expect, type Page, test } from '@playwright/test';

async function hasHorizontalOverflow(page: {
  evaluate: (fn: () => boolean) => Promise<boolean>;
}) {
  return page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > root.clientWidth + 1;
  });
}

async function getFullBox(locator: {
  evaluate: <T>(fn: (el: HTMLElement) => T) => Promise<T>;
}) {
  return locator.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  });
}

function boxesOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

async function expectContactActionsClear(page: Page) {
  const contact = page.getByRole('link', { name: 'Get in touch' });
  const resume = page.getByRole('button', { name: 'View resume' });
  const assistant = page.getByRole('button', { name: 'Open AI assistant' });

  await expect(contact).toBeInViewport({ ratio: 1 });
  await expect(resume).toBeInViewport({ ratio: 1 });

  const contactBox = await getFullBox(contact);
  const resumeBox = await getFullBox(resume);
  const assistantBox = await getFullBox(assistant);

  expect(boxesOverlap(contactBox, assistantBox), 'chat covers Get in touch').toBe(false);
  expect(boxesOverlap(resumeBox, assistantBox), 'chat covers View resume').toBe(false);
}

function expectCentered(
  box: { x: number; width: number },
  viewportWidth: number,
  label: string,
) {
  const center = box.x + box.width / 2;
  expect(Math.abs(center - viewportWidth / 2), label).toBeLessThan(16);
}

test('phone homepage keeps contact actions on the first screen', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Steven Nguyen' })).toBeVisible();
  await expectContactActionsClear(page);
  expect(await hasHorizontalOverflow(page)).toBe(false);
});

test('phone hero identity stays centered under the photo', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const viewport = page.viewportSize();
  expect(viewport).toBeTruthy();
  if (!viewport) return;

  const hero = page.locator('#page-top');
  const photo = hero.getByRole('img', { name: 'Steven Nguyen' });
  const name = hero.getByRole('heading', { name: 'Steven Nguyen' });
  const greeting = hero.getByText("Hello Universe, I'm ...");
  const longRole = hero.getByText('Non-Profit Technology Director');

  await expect(photo).toBeVisible();
  await expect(name).toBeVisible();
  await expect(greeting).toBeVisible();
  await expect.poll(async () => (await getFullBox(photo)).width).toBeGreaterThan(50);

  expectCentered(await getFullBox(photo), viewport.width, 'photo');
  expectCentered(await getFullBox(name), viewport.width, 'name');
  expectCentered(await getFullBox(greeting), viewport.width, 'greeting');

  await expect(longRole).toBeVisible({ timeout: 12_000 });
  expectCentered(await getFullBox(longRole), viewport.width, 'long role');
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

test.describe('short phone', () => {
  test.use({
    viewport: { width: 320, height: 568 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  test('keeps contact actions on the first screen', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Steven Nguyen' })).toBeVisible();
    await expectContactActionsClear(page);
    expect(await hasHorizontalOverflow(page)).toBe(false);
  });
});
