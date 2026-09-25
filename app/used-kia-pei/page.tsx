import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { makeLandings } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Kia Vehicles in PEI', description: 'Browse current used Kia vehicles in PEI. Compare live pricing, kilometres, condition questions and shopping tips.', alternates: { canonical: '/used-kia-pei' }, openGraph: { title: 'Used Kia Vehicles in PEI | DrivePEI', url: '/used-kia-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={makeLandings.kia}/>; }
