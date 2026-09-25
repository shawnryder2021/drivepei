import type { Metadata } from 'next';
import { getVehicles } from '@/lib/inventory';
import { InventoryExplorer } from '@/components/InventoryExplorer';
export const metadata: Metadata = {
  title: 'Used Cars in Charlottetown, PEI',
  description:
    'Find used cars, SUVs and trucks in the Charlottetown area. Search DrivePEI current off-make inventory.',
  alternates: { canonical: '/used-cars-charlottetown' },
};
export const revalidate = 900;
export default async function Page() {
  return (
    <main>
      <section className="page-hero inventory-hero">
        <div className="container">
          <span className="eyebrow light">CHARLOTTETOWN AND BEYOND</span>
          <h1>
            Used cars
            <br />
            <em>close to home.</em>
          </h1>
          <p>
            Shop current used inventory serving drivers across Charlottetown and
            PEI.
          </p>
        </div>
      </section>
      <section className="section inventory-section">
        <div className="container">
          <InventoryExplorer vehicles={await getVehicles()} />
        </div>
      </section>
    </main>
  );
}
