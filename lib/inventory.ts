import 'server-only';
import { parse } from 'csv-parse/sync';
import snapshot from './inventory-snapshot.json';
import photoPolicy from './photo-policy.json';
import { query } from './store';

import { type Vehicle } from './vehicle';
export { money, number, slugFor, vehicleTitle } from './vehicle';
export type { Vehicle } from './vehicle';
export const FEED_URL =
  'https://docs.google.com/spreadsheets/d/1-idQTKeecBJFvvY9WohEFVQLS4Ger5ukFli38DvFXI8/gviz/tq?tqx=out:csv&sheet=Used%20Inventory';
const numeric = (value: string) =>
  Number(String(value || '').replace(/[^0-9.]/g, '')) || 0;
const clean = (value: string) => String(value || '').trim();
const approvedPhotos = photoPolicy as Record<string, number[]>;
function curatedImage(vin: string, raw: string) {
  const first = approvedPhotos[vin]?.[0];
  return first && raw.includes('/1/') ? raw.replace('/1/', `/${first}/`) : '';
}
export function normalizeRow(row: Record<string, string>): Vehicle | null {
  const make = clean(row.Make);
  const status = clean(row.Status);
  const vin = clean(row.VIN).toUpperCase();
  if (
    make.toLowerCase() === 'volkswagen' ||
    status.toLowerCase() !== 'active' ||
    !/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)
  )
    return null;
  const price = numeric(row.Price);
  if (!price) return null;
  return {
    vin,
    stock: clean(row['Stock Number']),
    year: numeric(row.Year),
    make,
    model: clean(row.Model),
    trim: clean(row.Trim),
    price,
    kilometres: numeric(row.Kilometres),
    body: clean(row['Body Style']),
    drivetrain: clean(row.Drivetrain),
    transmission: clean(row.Transmission),
    fuel: clean(row['Fuel Type']),
    colour: clean(row['Exterior Colour']),
    image: curatedImage(vin, clean(row['First Image URL'])),
    sourceUrl: clean(row['Vehicle URL']),
    status: 'active',
    updatedAt: clean(row['Last Synced']),
  };
}
export function parseInventory(csv: string): Vehicle[] {
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  }) as Record<string, string>[];
  return rows.map(normalizeRow).filter((v): v is Vehicle => Boolean(v));
}
export async function getFeedVehicles(
  allowSnapshot = true,
): Promise<Vehicle[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) throw new Error(`Inventory feed HTTP ${res.status}`);
    const parsed = parseInventory(await res.text());
    if (!parsed.length) throw new Error('Inventory feed had no off-make stock');
    return parsed;
  } catch (error) {
    if (!allowSnapshot) throw error;
    console.error(
      'Inventory feed unavailable, using last known snapshot',
      error,
    );
    return (snapshot as Vehicle[]).map((v) => ({
      ...v,
      image: curatedImage(v.vin, v.image),
    }));
  }
}
export async function getVehicles(): Promise<Vehicle[]> {
  if (process.env.DATABASE_URL) {
    try {
      const result =
        await query<Vehicle>(`select vin, stock, year, make, model, trim, price::float8 as price,
        kilometres, body, drivetrain, transmission, fuel, colour, image, source_url as "sourceUrl",
        status, featured, description, updated_at::text as "updatedAt" from vehicles where status='active' and lower(make) <> 'volkswagen' order by featured desc, updated_at desc`);
      if (result.rows.length) return result.rows;
    } catch (error) {
      console.error('Database inventory unavailable', error);
    }
  }
  return getFeedVehicles();
}
export async function getVehicle(slug: string) {
  const vin = slug.split('-').at(-1)?.toUpperCase();
  return (await getVehicles()).find((v) => v.vin === vin);
}

export async function getVehicleGallery(v: Vehicle): Promise<string[]> {
  const approved = approvedPhotos[v.vin] || [];
  const first = approved[0];
  if (!first || !v.image.includes(`/${first}/`)) return [];
  return approved.map((index) => v.image.replace(`/${first}/`, `/${index}/`));
}
