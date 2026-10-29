import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
        ],
        allow: '/',
        // Specific groups do not inherit the wildcard group's exclusions.
        disallow: '/api/',
      },
      {
        // Opt out of training while allowing search and user-requested discovery.
        // robots.txt is advisory, not a security boundary for private resources.
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot'],
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
