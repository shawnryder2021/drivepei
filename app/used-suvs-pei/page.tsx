import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { suvLanding } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used SUVs for Sale in PEI', description: 'Shop current used SUVs in Prince Edward Island. Compare live pricing, kilometres, drivetrain and practical PEI SUV buying tips.', alternates: { canonical: '/used-suvs-pei' }, openGraph: { title: 'Used SUVs for Sale in PEI | DrivePEI', description: 'Browse current used SUVs and choose the right size and capability for Island driving.', url: '/used-suvs-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={suvLanding}/>; }
