import type { Metadata } from 'next';
import Link from 'next/link';
import { getVehicles } from '@/lib/inventory';
import { CompareVehicles } from '@/components/CompareVehicles';
import { InventoryFreshness } from '@/components/InventoryFreshness';

export const metadata: Metadata = {
  title: 'Compare Used Vehicles in PEI',
  description: 'Compare up to three current used cars, SUVs or trucks in PEI by asking price, kilometres, body style and drivetrain.',
  alternates: { canonical: '/compare' },
  robots: { index: false, follow: true },
};
export const revalidate = 900;

export default async function ComparePage() {
  const vehicles = await getVehicles();
  return (
    <main>
      <section className="page-hero"><div className="container"><span className="eyebrow light">MAKE A CLEARER CHOICE</span><h1>Compare your<br /><em>next drives.</em></h1><p>Shortlist up to three current used vehicles and see their listing details side by side.</p></div></section>
      <section className="section"><div className="container">
        <InventoryFreshness vehicles={vehicles} />
        <CompareVehicles vehicles={vehicles} />
        <p className="fine-print">Your comparison is saved only in this browser. Prices exclude applicable taxes and fees. <Link href="/guides/questions-to-ask-about-used-car-listing-pei">Read questions to ask about a listing →</Link></p>
      </div></section>
    </main>
  );
}
