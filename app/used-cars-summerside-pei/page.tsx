import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { summersideLanding } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used Cars for Summerside, PEI Shoppers', description: 'Browse current PEI used cars, SUVs and trucks from Summerside. Compare live inventory and plan a vehicle viewing before travelling.', alternates: { canonical: '/used-cars-summerside-pei' }, openGraph: { title: 'Used Cars for Summerside Shoppers | DrivePEI', url: '/used-cars-summerside-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={summersideLanding}/>; }
