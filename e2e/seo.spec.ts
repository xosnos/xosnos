import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('homepage exposes canonical, sharing metadata, and Person data without JavaScript', async ({
  page,
  request,
}) => {
  await page.goto('/');

  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.xosnos.com',
  );
  for (const path of ['/llms.txt', '/llms-full.txt']) {
    await expect(
      page.locator(`link[rel="alternate"][href="https://www.xosnos.com${path}"]`),
    ).toHaveAttribute('type', 'text/plain');
  }
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://www.xosnos.com',
  );
  for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
    await expect(page.locator(selector)).toHaveAttribute(
      'content',
      'https://www.xosnos.com/assets/og/home.jpg',
    );
  }
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    'content',
    '1200',
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    'content',
    '630',
  );

  const structuredData = page.locator('script[type="application/ld+json"]');
  await expect(structuredData).toHaveCount(1);
  expect(JSON.parse((await structuredData.textContent())!)).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Steven Nguyen',
    alternateName: 'xosnos',
    url: 'https://www.xosnos.com',
    jobTitle: 'Software Engineer',
    sameAs: expect.arrayContaining([
      'https://github.com/xosnos/',
      'https://www.linkedin.com/in/xosnos/',
    ]),
  });

  const image = await request.get('/assets/og/home.jpg');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/jpeg');
  await page.goto('/assets/og/home.jpg');
  await expect(page.locator('img')).toHaveJSProperty('naturalWidth', 1200);
  await expect(page.locator('img')).toHaveJSProperty('naturalHeight', 630);
});

test('sitemap advertises only the canonical homepage', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/xml');
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toEqual(['https://www.xosnos.com']);
  expect(xml).not.toContain('<lastmod>');
});

test('robots allows discovery, excludes APIs, and opts out of named training crawlers', async ({
  request,
}) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/plain');
  const body = await response.text();
  const groups = body.split(/\n\s*\n/).map((group) => group.split('\n'));

  for (const agent of [
    '*',
    'OAI-SearchBot',
    'ChatGPT-User',
    'Claude-User',
    'Claude-SearchBot',
    'PerplexityBot',
  ]) {
    const group = groups.find((lines) => lines.includes(`User-Agent: ${agent}`));
    expect(group, agent).toBeDefined();
    expect(group).toContain('Allow: /');
    expect(group).toContain('Disallow: /api/');
    expect(group).not.toContain('Disallow: /');
  }
  for (const agent of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot']) {
    const group = groups.find((lines) => lines.includes(`User-Agent: ${agent}`));
    expect(group, agent).toBeDefined();
    expect(group).toContain('Disallow: /');
    expect(group).not.toContain('Allow: /');
  }
  expect(body).toContain('Sitemap: https://www.xosnos.com/sitemap.xml');
});
