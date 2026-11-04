import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getFeedVehicles, type Vehicle } from '@/lib/inventory';
import { inventoryReadyForHomepage, inventoryStatus } from '@/lib/inventory-status';
import { guideInventoryConfig, selectGuideVehicles } from '@/lib/guide-inventory';
import { VehicleCard } from './VehicleCard';

export async function GuideInventory({ slug }: { slug: string }) {
  let feed: Vehicle[] = [];
  try {
    feed = await getFeedVehicles(false);
  } catch (error) {
    console.error('Guide inventory feed unavailable', error);
  }
  const ready = inventoryReadyForHomepage(feed);
  const vehicles = selectGuideVehicles(slug, feed, ready);
  const config = guideInventoryConfig(slug);
  const { label } = inventoryStatus(feed);
  return <section className="section guide-inventory" aria-labelledby="guide-inventory-heading">
    <div className="container">
      <div className="section-heading"><div>
        <span className="eyebrow">FROM THE INVENTORY FEED</span>
        <h2 id="guide-inventory-heading">{config.title}</h2>
        <p>{ready ? `Inventory updated ${label}. Confirm availability before travelling.` : 'We’re waiting for a current inventory update. Ask us to confirm availability.'}</p>
      </div><Link className="text-link" href={config.href}>Browse listings <ArrowUpRight size={17}/></Link></div>
      {config.topic === 'tiguan-atlas' && <p><Link className="text-link" href="/used-volkswagen-tiguan-pei">Browse all Tiguans →</Link></p>}
      {vehicles.length ? <>
        <div className="vehicle-grid">{vehicles.map(vehicle => <VehicleCard key={vehicle.vin} vehicle={vehicle}/>)}</div>
        <p className="guide-inventory-note">Prices in CAD, before applicable taxes and fees. Equipment and condition vary by vehicle; review the exact listing.</p>
      </> : <div className="guide-inventory-empty">
        <h3>{ready ? 'No matching vehicles in the current feed.' : 'Current vehicle cards will return after the feed refreshes.'}</h3>
        <p>Tell us your preferred vehicle and budget, and request a follow-up when a match arrives.</p>
        <Link className="button button-lime" href="/alerts">Request an inventory alert <ArrowUpRight size={17}/></Link>
      </div>}
      {vehicles.length > 0 && <p className="guide-inventory-note">Looking for a different fit? <Link href="/alerts">Request an inventory alert.</Link></p>}
    </div>
  </section>;
}
