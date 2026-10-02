'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { COMPARE_EVENT, readCompared, writeCompared } from '@/lib/compare';
import { drivetrainLabel, imageAtSize, money, number, slugFor, type Vehicle } from '@/lib/vehicle';

export function CompareVehicles({ vehicles }: { vehicles: Vehicle[] }) {
  const [vins, setVins] = useState<string[]>([]);
  useEffect(() => {
    const update = () => setVins(readCompared());
    update();
    window.addEventListener(COMPARE_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(COMPARE_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);
  const picks = vins.map((vin) => vehicles.find((vehicle) => vehicle.vin === vin)).filter((vehicle): vehicle is Vehicle => Boolean(vehicle));
  const unavailable = vins.length - picks.length;
  if (!vins.length) return (
    <div className="empty-results">
      <h2>Start with vehicles you like.</h2>
      <p>Use “Add to compare” on up to three listings. Your picks stay on this device.</p>
      <Link className="button button-dark" href="/used">Browse current inventory →</Link>
    </div>
  );
  return (
    <div>
      {unavailable > 0 && <p className="inventory-freshness inventory-freshness-delayed" role="status">{unavailable} saved vehicle{unavailable === 1 ? ' is' : 's are'} no longer in current inventory. Browse active listings for an alternative.</p>}
      <p className="compare-intro">Compare current asking prices and listing details side by side. Confirm equipment, condition and availability before making a decision.</p>
      <div className="compare-grid">
        {picks.map((v) => (
          <article className="compare-card" key={v.vin}>
            <Link href={`/vehicles/${slugFor(v)}`} className="compare-image">
              {v.image ? <img src={imageAtSize(v.image, 's8')} alt={`Used ${v.year} ${v.make} ${v.model}`} /> : <span>Photos coming soon</span>}
            </Link>
            <div className="compare-card-content">
              <h2>{v.year} {v.make} {v.model}</h2>
              <p>{v.trim || 'Trim: ask us'}</p>
              <dl>
                <div><dt>Asking price</dt><dd>{money(v.price)}</dd></div>
                <div><dt>Kilometres</dt><dd>{number(v.kilometres)} km</dd></div>
                <div><dt>Body style</dt><dd>{v.body || 'Ask us'}</dd></div>
                <div><dt>Drivetrain</dt><dd>{drivetrainLabel(v.drivetrain)}</dd></div>
                <div><dt>Transmission</dt><dd>{v.transmission || 'Ask us'}</dd></div>
                <div><dt>Fuel</dt><dd>{v.fuel || 'Ask us'}</dd></div>
              </dl>
              <Link className="button button-dark" href={`/vehicles/${slugFor(v)}`}>View details and inquire →</Link>
              <button type="button" className="compare-remove" onClick={() => writeCompared(vins.filter((vin) => vin !== v.vin))}>Remove from compare</button>
            </div>
          </article>
        ))}
      </div>
      {unavailable > 0 && <button type="button" className="compare-remove" onClick={() => writeCompared(picks.map((vehicle) => vehicle.vin))}>Remove unavailable picks</button>}
    </div>
  );
}
