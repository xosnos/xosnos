import { test, expect } from '@playwright/test';

const mockSkills = [
  {
    title: '⌨️ Languages',
    badges: [
      { src: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript', alt: 'JavaScript' },
      { src: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript', alt: 'TypeScript' },
    ],
  },
  {
    title: '🖥️ Frontend',
    badges: [
      { src: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react', alt: 'React' },
    ],
  },
];

test('GitHub README skills load and display badges', async ({ page }) => {
  await page.route('**/api/skills', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockSkills),
    });
  });

  const responsePromise = page.waitForResponse('**/api/skills');
  await page.goto('/');
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await responsePromise;

  await expect(page.getByText('⌨️ Languages')).toBeVisible();
  await expect(page.getByText('🖥️ Frontend')).toBeVisible();

  const badgeImages = page.locator('#skills img[alt="JavaScript"]');
  await expect(badgeImages.first()).toBeVisible();
});
