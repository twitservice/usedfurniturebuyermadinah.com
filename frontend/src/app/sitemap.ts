import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://usedfurniturebuyermadinah.com').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/#services`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#products`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/#how-it-works`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#contact`,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
  ];
}