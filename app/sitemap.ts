import type { MetadataRoute } from 'next';
import { getVehicles, slugFor } from '@/lib/inventory';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepei.ca';
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
  ];
  const vehicles = await getVehicles();
  return [
    ...paths.map((path) => ({
      url: base + path,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.7,
    })),
    ...vehicles.map((v) => ({
      url: `${base}/vehicles/${slugFor(v)}`,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
  ];
}
