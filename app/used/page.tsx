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
          <a className="button button-outline inventory-jump" href="#inventory-results">View current vehicles <ArrowUpRight size={17}/></a>
        </div>
      </section>
      <section className="section inventory-section">
        <div className="container">
          <InventoryExplorer vehicles={vehicles} />
        </div>
      </section>
      <section className="section landing-editorial"><div className="container landing-editorial-grid"><div className="landing-copy">
        <span className="eyebrow">SHOP WITH A PLAN</span>
        <section><h2>Find a used vehicle that fits life on PEI.</h2><p>Our current selection brings together off-make cars, SUVs and trucks in one searchable place. Start with your budget and daily use, then compare the exact condition, features and history of each vehicle you shortlist. Availability and pricing can change as inventory moves.</p></section>
        <section><h2>Compare more than the asking price.</h2><p>Think through insurance, fuel, tires, maintenance and any financing cost. Check a vehicle’s kilometres and service information, inspect it in person and take a useful test drive. If you are financing, compare the amount financed and total cost along with the payment.</p></section>
        <section><h2>Choose a route into the inventory.</h2><p>Need family space? Browse <Link href="/used-suvs-pei">used SUVs</Link>. Drive rural routes regularly? Compare <Link href="/used-awd-pei">AWD and 4WD options</Link>. Shopping with a price ceiling? Explore <Link href="/used-cars-under-25000-pei">vehicles under $25,000</Link>. Looking for a particular make? Start with <Link href="/used-honda-pei">Honda</Link>, <Link href="/used-kia-pei">Kia</Link> or <Link href="/used-nissan-pei">Nissan</Link>. Each page uses the current feed, so a make or model may have no match on a given day.</p></section>
      </div><aside className="landing-next"><h2>Plan your next move</h2><Link href="/guides/buying-a-used-car-in-pei">PEI used-car checklist →</Link><Link href="/guides/understanding-used-car-payments">Understand payments →</Link><Link href="/guides">All buying guides →</Link><Link href="/car-finder">Tell us what you need →</Link></aside></div></section>
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
