import type { Metadata } from 'next';
import { InventoryLanding } from '@/components/InventoryLanding';
import { awdLanding } from '@/lib/landing';
export const metadata: Metadata = { title: 'Used AWD & 4WD Vehicles in PEI', description: 'Shop current used AWD and 4WD vehicles in PEI. Compare price, kilometres, tires, drivetrain and total ownership costs.', alternates: { canonical: '/used-awd-pei' }, openGraph: { title: 'Used AWD & 4WD Vehicles in PEI | DrivePEI', description: 'Explore live AWD and 4WD inventory for Prince Edward Island roads.', url: '/used-awd-pei' } };
export const revalidate = 900;
export default function Page() { return <InventoryLanding content={awdLanding}/>; }
