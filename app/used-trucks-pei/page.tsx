import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { truckLanding } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Trucks for Sale in PEI', description: 'Compare current used pickups in Prince Edward Island by price, kilometres, cab and equipment. See live truck listings and practical buying questions.', alternates: { canonical: '/used-trucks-pei' }, openGraph: { title: 'Used Trucks for Sale in PEI | DrivePEI', url: '/used-trucks-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={truckLanding}/>; }
