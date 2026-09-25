import type { Metadata } from 'next';
import { getVehicles } from '@/lib/inventory';
import { InventoryExplorer } from '@/components/InventoryExplorer';
export const metadata: Metadata = {
  title: 'Used AWD Vehicles in PEI',
  description:
    'Explore used AWD and 4WD vehicles in Prince Edward Island, with current pricing and kilometres.',
  alternates: { canonical: '/used-awd-pei' },
};
export const revalidate = 900;
export default async function Page() {
  return (
    <main>
      <section className="page-hero inventory-hero">
        <div className="container">
          <span className="eyebrow light">CONFIDENCE IN EVERY SEASON</span>
          <h1>
            Used AWD
            <br />
            <em>on PEI.</em>
          </h1>
          <p>
            See the all-wheel and four-wheel drive vehicles in our current
            inventory.
          </p>
        </div>
      </section>
      <section className="section inventory-section">
        <div className="container">
          <InventoryExplorer
            vehicles={await getVehicles()}
            initialDrive="awd"
          />
        </div>
      </section>
    </main>
  );
}
