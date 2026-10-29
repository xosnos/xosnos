import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only index existing pages. Section anchors and API routes are not pages.
  return [{ url: SITE_URL }];
}
