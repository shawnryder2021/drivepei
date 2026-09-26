import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { makeLandings } from '@/lib/landing';

export const metadata: Metadata = {
  title: 'Used Volkswagen Vehicles in PEI',
  description: 'Browse current used Volkswagen cars and SUVs in Prince Edward Island. Compare live Tiguan, Taos, Atlas, Jetta and other listings by price, kilometres and equipment.',
  alternates: { canonical: '/used-volkswagen-pei' },
  openGraph: {
    title: 'Used Volkswagen Vehicles in PEI | DrivePEI',
    description: 'Compare current used Volkswagen inventory in PEI, with live prices and vehicle details.',
    url: '/used-volkswagen-pei',
  },
};
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={makeLandings.volkswagen}/>; }
