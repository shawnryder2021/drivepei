import type { MetadataRoute } from 'next';
import { getVehicles, slugFor } from '@/lib/inventory';
import { guides } from '@/lib/guides';
export const revalidate = 900;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepei.ca').replace(/\/$/, '');
  const paths = [
    '/',
    '/used',
    '/finance',
    '/car-finder',
    '/trade',
    '/contact',
    '/alerts',
    '/why-drivepei',
    '/used-suvs-pei',
    '/used-awd-pei',
    '/used-cars-charlottetown',
    '/used-honda-pei',
    '/used-kia-pei',
    '/used-nissan-pei',
    '/guides',
  ];
  const vehicles = await getVehicles();
  return [
    ...paths.map((path) => ({
      url: base + path,
      changeFrequency: path === '/guides' ? 'monthly' as const : 'weekly' as const,
      priority: path === '/' ? 1 : path === '/used' ? 0.9 : 0.7,
    })),
    ...guides.map((guide) => ({
      url: `${base}/guides/${guide.slug}`,
      lastModified: new Date(`${guide.updated}T12:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...vehicles.map((v) => ({
      url: `${base}/vehicles/${slugFor(v)}`,
      ...(v.updatedAt && !Number.isNaN(Date.parse(v.updatedAt)) ? { lastModified: new Date(v.updatedAt) } : {}),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
  ];
}
