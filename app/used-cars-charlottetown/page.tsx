import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { charlottetownLanding } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Cars in Charlottetown, PEI', description: 'Explore current used cars, SUVs and trucks of all makes near Charlottetown, PEI. Filter live inventory and read a local used-car buying checklist.', alternates: { canonical: '/used-cars-charlottetown' }, openGraph: { title: 'Used Cars in Charlottetown, PEI | DrivePEI', description: 'Shop current used inventory serving Charlottetown and PEI.', url: '/used-cars-charlottetown' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={charlottetownLanding}/>; }
