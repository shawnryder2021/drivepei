import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getVehicles } from '@/lib/inventory';
import { InventoryExplorer } from '@/components/InventoryExplorer';

export const metadata: Metadata = {
  title: 'Used Cars Under $25,000 in PEI',
  description: 'Browse current used vehicles priced at $25,000 or less in Prince Edward Island. Compare live prices, kilometres and body styles, then ask about availability.',
  alternates: { canonical: '/used-cars-under-25000-pei' },
  openGraph: {
    title: 'Used Cars Under $25,000 in PEI | DrivePEI',
    description: 'Current PEI used cars, SUVs and trucks priced at $25,000 or less.',
    url: '/used-cars-under-25000-pei',
  },
};
export const revalidate = 900;
export default async function Page() {
  const vehicles = await getVehicles();
  const matching = vehicles.filter((vehicle) => vehicle.price <= 25000);
  return <main>
    <section className="page-hero inventory-hero"><div className="container">
      <span className="eyebrow light">A BUDGET YOU CAN SEARCH</span>
      <h1>Used vehicles<br/><em>under $25,000 in PEI.</em></h1>
      <p>See the current DrivePEI selection with asking prices at or below $25,000. Compare actual listings and ask us to confirm availability before visiting.</p>
      <a className="button button-outline inventory-jump" href="#inventory-results">See current matches <ArrowUpRight size={17}/></a>
    </div></section>
    <section className="section inventory-section"><div className="container">
      <p className="inventory-count-intro">{matching.length} active {matching.length === 1 ? 'vehicle is' : 'vehicles are'} currently listed at $25,000 or less. Asking prices exclude applicable taxes and fees.</p>
      <InventoryExplorer vehicles={matching} initialMaxPrice="25000" priceCeiling={25000} emptyHref="/alerts" emptyLabel="Request an inventory alert" />
    </div></section>
    <section className="section landing-editorial"><div className="container landing-editorial-grid"><div className="landing-copy">
      <span className="eyebrow">BUY WITH THE WHOLE BUDGET IN MIND</span>
      <section><h2>What does “under $25,000” include?</h2><p>The vehicles above have current asking prices of $25,000 or less in the inventory feed. The final amount you pay can also include applicable taxes, registration, fees and optional products. If you plan to finance, the total borrowing cost depends on the rate, term and amount financed. Set a total budget before focusing on a payment.</p></section>
      <section><h2>Compare vehicles beyond the price.</h2><p>A lower price can come with a different age, mileage, body style or set of features. Open each listing to check its VIN and details, ask for service and inspection information, and test drive the vehicles that fit your daily needs. Budget for insurance, tires and maintenance too.</p><ul><li>Use the filters to narrow the current selection by make, kilometres and year.</li><li>Ask about any feature or condition detail that is not confirmed in the listing.</li><li>Confirm the vehicle is still available before making a trip.</li></ul></section>
      <section><h2>If nothing fits today</h2><p>Inventory changes. Tell us the price range, body style and must-have features you are watching for. Our <Link href="/alerts">inventory alerts</Link> let the team follow up personally if a promising match appears.</p></section>
    </div><aside className="landing-next"><h2>Keep exploring</h2><Link href="/guides/buying-a-used-car-in-pei">PEI used-car checklist <ArrowUpRight size={16}/></Link><Link href="/guides/questions-to-ask-about-used-car-listing-pei">Questions to ask before visiting <ArrowUpRight size={16}/></Link><Link href="/guides/understanding-used-car-payments">Understand payments <ArrowUpRight size={16}/></Link><Link href="/used">Shop all used vehicles <ArrowUpRight size={16}/></Link><Link href="/alerts">Request an inventory alert <ArrowUpRight size={16}/></Link></aside></div></section>
  </main>;
}
