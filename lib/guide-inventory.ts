import type { Vehicle } from './vehicle';

// Keep topic-specific guides scoped even when their matching inventory sells out.
export const guideInventoryTopics: Record<string, string> = {
  'used-truck-inspection-checklist-pei': 'trucks',
  'used-tiguan-vs-atlas-pei': 'tiguan-atlas',
  'used-suv-buying-guide-pei': 'suvs',
  'awd-vs-fwd-pei': 'awd',
  'used-car-winter-readiness-pei': 'awd',
  'winter-tires-pei-used-car': 'awd',
  'used-volkswagen-checklist-pei': 'volkswagen',
  'used-subaru-buying-checklist-pei': 'subaru',
  'buying-a-used-hybrid-in-pei': 'hybrid',
  'used-sedan-vs-compact-suv-pei': 'sedan-suv',
  'high-kilometre-used-car-pei': 'budget',
  'understanding-used-car-payments': 'budget',
  'financing-a-used-car-with-credit-challenges': 'budget',
  'compare-used-car-financing-offers': 'budget',
  'used-car-financing-rates-pei': 'budget',
};

export function guideInventoryConfig(slug: string) {
  const topic = guideInventoryTopics[slug] || 'all';
  const configs: Record<string, { title: string; href: string; matches: (v: Vehicle) => boolean }> = {
    all: { title: 'Explore current used vehicles', href: '/used', matches: () => true },
    trucks: { title: 'Put the checklist to work on these trucks', href: '/used-trucks-pei', matches: v => /truck|pickup/i.test(v.body) },
    'tiguan-atlas': { title: 'Compare current Tiguan and Atlas-family SUVs', href: '/used-volkswagen-atlas-pei', matches: v => v.make === 'Volkswagen' && ['Tiguan', 'Atlas', 'Atlas Cross Sport'].includes(v.model) },
    suvs: { title: 'Explore current used SUVs', href: '/used-suvs-pei', matches: v => /suv/i.test(v.body) },
    awd: { title: 'Explore current AWD and 4WD vehicles', href: '/used-awd-pei', matches: v => /all|four|4|awd/i.test(v.drivetrain) },
    volkswagen: { title: 'Explore current used Volkswagens', href: '/used-volkswagen-pei', matches: v => v.make === 'Volkswagen' },
    subaru: { title: 'Explore current used Subarus', href: '/used?make=Subaru', matches: v => v.make === 'Subaru' },
    hybrid: { title: 'Explore current used hybrids', href: '/used?q=Hybrid', matches: v => /hybrid/i.test(`${v.model} ${v.trim} ${v.fuel}`) },
    'sedan-suv': { title: 'Compare current sedans and SUVs', href: '/used', matches: v => /sedan|suv/i.test(v.body) },
    budget: { title: 'Explore current vehicles under $25,000', href: '/used-cars-under-25000-pei', matches: v => v.price < 25000 },
  };
  return { ...configs[topic], topic };
}

export function selectGuideVehicles(slug: string, vehicles: Vehicle[], ready: boolean) {
  if (!ready) return [];
  const { matches } = guideInventoryConfig(slug);
  const candidates = vehicles.filter(v => v.status === 'active' && v.price > 0 && matches(v))
    .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)) || a.price - b.price);
  // Show different models first; comparisons should not be three copies of one model.
  const distinct = candidates.filter((v, i) => candidates.findIndex(other =>
    other.make === v.make && other.model === v.model) === i);
  return [...distinct, ...candidates].filter((v, i, all) => all.findIndex(other => other.vin === v.vin) === i).slice(0, 3);
}
