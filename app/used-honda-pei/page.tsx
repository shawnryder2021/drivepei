import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { makeLandings } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Honda Vehicles in PEI', description: 'Browse current used Honda cars and SUVs in PEI with live prices, kilometres and practical buying tips.', alternates: { canonical: '/used-honda-pei' }, openGraph: { title: 'Used Honda Vehicles in PEI | DrivePEI', url: '/used-honda-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={makeLandings.honda}/>; }
