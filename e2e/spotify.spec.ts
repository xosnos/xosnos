import { expect, test } from '@playwright/test';

test('now playing widget is disabled', async ({ page }) => {
  await page.goto('/');

  // SpotifyPlayer is not mounted in Hero while music integrations are off,
  // so the homepage should not fetch /api/music/now-playing or show the player UI.
  await expect(page.getByText(/Listening on/)).not.toBeVisible();
});
