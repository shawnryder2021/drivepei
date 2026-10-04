import type { Vehicle } from './vehicle';

// The caller passes the verified, same-day feed. Keep rotating choices tied to
// active VINs with approved vehicle photography and distinct model names.
export function selectHomepageHeroes(vehicles: Vehicle[], limit = 6): Vehicle[] {
  const seenModels = new Set<string>();
  const candidates = vehicles.filter((vehicle) => {
    if (vehicle.status !== 'active' || !vehicle.image || !vehicle.model) return false;
    const key = `${vehicle.make} ${vehicle.model}`.toLowerCase();
    if (seenModels.has(key)) return false;
    seenModels.add(key);
    return true;
  });
  const selected: Vehicle[] = [];
  const take = (matches: (vehicle: Vehicle) => boolean) => {
    const match = candidates.find((vehicle) => !selected.includes(vehicle) && matches(vehicle));
    if (match && selected.length < limit) selected.push(match);
  };

  // Prioritize useful shopping choices only when that stock is present.
  take((vehicle) => /truck/i.test(vehicle.body));
  take((vehicle) => vehicle.model.toLowerCase() === 'tiguan');
  take((vehicle) => /^atlas(?: cross sport)?$/i.test(vehicle.model));
  take((vehicle) => /sedan|coupe/i.test(vehicle.body) && !selected.some((current) => current.make === vehicle.make));
  take((vehicle) => /sedan|coupe/i.test(vehicle.body));
  while (selected.length < limit) {
    const before = selected.length;
    take((vehicle) => !selected.some((current) => current.make === vehicle.make));
    if (selected.length === before) break;
  }
  for (const candidate of candidates) {
    if (selected.length >= limit) break;
    if (!selected.includes(candidate)) selected.push(candidate);
  }
  return selected;
}
