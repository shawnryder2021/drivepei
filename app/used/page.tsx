import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getVehicles } from '@/lib/inventory';
import { InventoryExplorer } from '@/components/InventoryExplorer';
export const metadata: Metadata = {
  title: 'Used Cars for Sale in PEI',
  description:
    'Shop current off-make used cars, SUVs and trucks in Prince Edward Island. Filter by make, body style, price, kilometres and more.',
  alternates: { canonical: '/used' },
};
export const revalidate = 900;
export default async function Used() {
  const vehicles = await getVehicles();
  return (
    <main>
      <section className="page-hero inventory-hero">
        <div className="container">
          <span className="eyebrow light">YOUR NEXT DRIVE IS OUT THERE</span>
          <h1>
            Used cars.
            <br />
            <em>New possibilities.</em>
          </h1>
          <p>
            Explore a changing lineup of off-make used vehicles available on
            PEI.
          </p>
        </div>
      </section>
      <section className="section inventory-section">
        <div className="container">
          <InventoryExplorer vehicles={vehicles} />
        </div>
      </section>
      <section className="finder-bar">
        <div>
          <span className="eyebrow">LOOKING FOR SOMETHING SPECIFIC?</span>
          <h2>Let us find the right fit.</h2>
        </div>
        <Link className="button button-lime" href="/car-finder">
          Tell us what you need <ArrowUpRight size={17} />
        </Link>
      </section>
    </main>
  );
}
