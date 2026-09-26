export type Vehicle = {
  vin: string;
  stock: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  kilometres: number;
  body: string;
  drivetrain: string;
  transmission: string;
  fuel: string;
  colour: string;
  image: string;
  sourceUrl: string;
  status: string;
  featured?: boolean;
  description?: string;
  updatedAt?: string;
};
export const money = (n: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
export const number = (n: number) => new Intl.NumberFormat('en-CA').format(n);
export function slugFor(v: Vehicle) {
  return `${v.year}-${v.make}-${v.model}-${v.vin}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}
export const vehicleTitle = (v: Vehicle) =>
  `${v.year} ${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ''}`;

export function imageAtSize(url: string, size: 's8' | 'mb') {
  return url.replace(/^(https:\/\/imagescdn\.d2cmedia\.ca\/)cba([a-z0-9]+\/)/i, `$1${size}$2`);
}

export function drivetrainLabel(value: string) {
  const key = value.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const labels: Record<string, string> = {
    allwheeldrive: 'All-wheel drive',
    fourwheeldrive: 'Four-wheel drive',
    frontwheeldrive: 'Front-wheel drive',
    rearwheeldrive: 'Rear-wheel drive',
  };
  return labels[key] || value || 'Ask us';
}
