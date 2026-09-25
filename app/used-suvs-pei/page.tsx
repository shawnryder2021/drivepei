import type { Metadata } from 'next';
import { getVehicles } from '@/lib/inventory';
import { InventoryExplorer } from '@/components/InventoryExplorer';
export const metadata: Metadata = {
  title: 'Used SUVs in PEI',
  description:
    'Browse current used SUVs from multiple makes in Prince Edward Island. Compare pricing, kilometres and drivetrain.',
  alternates: { canonical: '/used-suvs-pei' },
};
export const revalidate = 900;
export default async function Page() {
  return (
    <main>
      <section className="page-hero inventory-hero">
        <div className="container">
          <span className="eyebrow light">ROOM FOR WHAT’S NEXT</span>
          <h1>
            Used SUVs
            <br />
            <em>on PEI.</em>
          </h1>
          <p>
            Explore space, flexibility and capability across our current SUV
            lineup.
          </p>
        </div>
      </section>
      <section className="section inventory-section">
        <div className="container">
          <InventoryExplorer vehicles={await getVehicles()} initialBody="SUV" />
        </div>
      </section>
    </main>
  );
}
