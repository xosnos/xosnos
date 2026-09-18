import { expect, test } from '@playwright/test';

test('skills section shows primary stack, domains, and the full badge list', async ({
  page,
}) => {
  await page.goto('/');
  const skills = page.locator('#skills');
  await skills.scrollIntoViewIfNeeded();

  await expect(skills.getByRole('heading', { name: 'Tools I ship with' })).toBeVisible();
  await expect(
    skills.getByRole('listitem').filter({ hasText: 'TypeScript/JavaScript' }),
  ).toBeVisible();
  await expect(skills.getByRole('listitem').filter({ hasText: 'FastAPI' })).toBeVisible();
  await expect(skills.getByText('Full-Stack Development')).toBeVisible();

  await expect(skills.getByRole('heading', { name: /Languages/ })).toBeVisible();
  await expect(skills.getByRole('heading', { name: /Design/ })).toHaveCount(0);
  await expect(skills.locator('img[alt="Python"]')).toBeVisible();
  await expect(skills.locator('img[alt="Supabase"]')).toBeVisible();
  await expect(skills.locator('img[alt="Figma"]')).toHaveCount(0);
});
