import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { atlasLanding } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Volkswagen Atlas and Atlas Cross Sport in PEI', description: 'Compare current used Atlas and Atlas Cross Sport listings in PEI, including live prices, kilometres and vehicle-specific details.', alternates: { canonical: '/used-volkswagen-atlas-pei' }, openGraph: { title: 'Used Atlas SUVs in PEI | DrivePEI', url: '/used-volkswagen-atlas-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={atlasLanding}/>; }
