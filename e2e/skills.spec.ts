import { expect, test } from '@playwright/test';

test('skills strip shows curated tools instead of a badge wall', async ({ page }) => {
  await page.goto('/');
  const skills = page.locator('#skills');
  await skills.scrollIntoViewIfNeeded();

  await expect(skills.getByRole('heading', { name: 'Tools I ship with' })).toBeVisible();
  await expect(
    skills.getByRole('listitem').filter({ hasText: 'TypeScript' }),
  ).toBeVisible();
  await expect(
    skills.getByRole('listitem').filter({ hasText: 'Supabase' }),
  ).toBeVisible();
  await expect(skills.getByText('Full-Stack Web & Mobile Development')).toBeVisible();

  await expect(skills.getByText('⌨️ Languages')).not.toBeVisible();
  await expect(skills.locator('img[alt="Python"]')).toHaveCount(0);
});
