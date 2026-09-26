import type { MetadataRoute } from 'next';
import { getVehicleGallery, getVehicles, slugFor } from '@/lib/inventory';
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
    '/used-cars-under-25000-pei',
    '/guides',
  ];
  const vehicles = await getVehicles();
  const vehicleEntries = await Promise.all(vehicles.map(async (vehicle) => ({
    url: `${base}/vehicles/${slugFor(vehicle)}`,
    images: await getVehicleGallery(vehicle),
    ...(vehicle.updatedAt && !Number.isNaN(Date.parse(vehicle.updatedAt)) ? { lastModified: new Date(vehicle.updatedAt) } : {}),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  })));
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
    ...vehicleEntries,
  ];
}
