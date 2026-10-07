import { VIEWING_LOCATION, SELLING_DEALER } from './location.ts';
import { inventoryStatus } from './inventory-status.ts';
import { slugFor, vehicleTitle, type Vehicle } from './vehicle.ts';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepei.ca').replace(/\/$/, '');
export const dealerId = `${siteUrl}/#selling-dealer`;

export function dealerSchema() {
  return {
    '@type': 'AutoDealer',
    '@id': dealerId,
    name: SELLING_DEALER.name,
    url: SELLING_DEALER.url,
    telephone: SELLING_DEALER.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: VIEWING_LOCATION.street,
      addressLocality: VIEWING_LOCATION.city,
      addressRegion: VIEWING_LOCATION.province,
      postalCode: VIEWING_LOCATION.postalCode,
      addressCountry: 'CA',
    },
  };
}

export function vehicleSchema(
  vehicle: Vehicle | null,
  images: string[],
  allVehicles: Vehicle[],
  now = new Date(),
) {
  if (!vehicle || vehicle.status !== 'active' || !allVehicles.some((item) => item.vin === vehicle.vin)) return null;
  const url = `${siteUrl}/vehicles/${slugFor(vehicle)}`;
  const feedFresh = inventoryStatus(allVehicles, now).fresh;
  const vehicleFresh = inventoryStatus([vehicle], now).fresh;
  return {
    '@type': ['Product', 'Car'],
    '@id': `${url}#vehicle`,
    url,
    name: vehicleTitle(vehicle),
    description: `Used ${vehicleTitle(vehicle)} in PEI with ${vehicle.kilometres.toLocaleString('en-CA')} km.`,
    vehicleIdentificationNumber: vehicle.vin,
    modelDate: vehicle.year,
    brand: { '@type': 'Brand', name: vehicle.make },
    model: vehicle.model,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.kilometres,
      unitCode: 'KMT',
    },
    ...(images.length ? { image: images } : {}),
    ...(feedFresh && vehicleFresh && vehicle.price > 0
      ? {
          offers: {
            '@type': 'Offer',
            price: vehicle.price,
            priceCurrency: 'CAD',
            itemCondition: 'https://schema.org/UsedCondition',
            availability: 'https://schema.org/InStock',
            url,
            seller: { '@id': dealerId },
          },
        }
      : {}),
  };
}

export function jsonLd(data: object) {
  return JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c');
}
