import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { makeLandings } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Nissan Vehicles in PEI', description: 'Explore current used Nissan vehicles in Prince Edward Island with live pricing, mileage and buying advice.', alternates: { canonical: '/used-nissan-pei' }, openGraph: { title: 'Used Nissan Vehicles in PEI | DrivePEI', url: '/used-nissan-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={makeLandings.nissan}/>; }
