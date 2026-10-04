import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { tiguanLanding } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Volkswagen Tiguan for Sale in PEI', description: 'Shop current used Volkswagen Tiguan SUVs in PEI. Compare live VIN-specific listings by year, trim, price and kilometres.', alternates: { canonical: '/used-volkswagen-tiguan-pei' }, openGraph: { title: 'Used Volkswagen Tiguan in PEI | DrivePEI', url: '/used-volkswagen-tiguan-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={tiguanLanding}/>; }
