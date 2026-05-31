import { test, expect } from '@playwright/test';

const mockTrack = {
  id: 'mock-track-123',
  name: 'Mock Track Title',
  artist: 'Mock Artist',
  album: 'Mock Album',
  artworkUrl: null,
  url: 'https://open.spotify.com/track/mock',
  previewUrl: null,
  duration: 180000,
  provider: 'spotify',
};

test('Spotify player shows track data from API', async ({ page }) => {
  await page.route('**/api/music/now-playing', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockTrack),
    });
  });

  const responsePromise = page.waitForResponse('**/api/music/now-playing');
  await page.goto('/');
  await responsePromise;

  await expect(page.getByText(/Listening on/)).toBeVisible();
  await expect(page.getByText(mockTrack.name)).toBeVisible();
  await expect(page.getByText(mockTrack.artist)).toBeVisible();
});
