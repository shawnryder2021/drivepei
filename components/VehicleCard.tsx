import Link from 'next/link';
import { ArrowUpRight, CarFront, Gauge, MapPin } from 'lucide-react';
import { type Vehicle, imageAtSize, money, number, slugFor } from '@/lib/vehicle';
import { CompareButton } from './CompareButton';
export function VehicleCard({ vehicle: v }: { vehicle: Vehicle }) {
  return (
    <article className="vehicle-card">
      <Link href={`/vehicles/${slugFor(v)}`} className="vehicle-image">
        {v.image ? (
          <img
            src={imageAtSize(v.image, 's8')}
            alt={`Used ${v.year} ${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ''} in PEI`}
            loading="lazy"
          />
        ) : (
          <div className="image-fallback" role="img" aria-label="Vehicle photos coming soon"><CarFront aria-hidden="true" /><span>Photos coming soon</span></div>
        )}
        <span className="image-pill">USED • {v.make.toUpperCase()}</span>
      </Link>
      <div className="vehicle-card-body">
        <div className="vehicle-title-row">
          <div>
            <small>
              {v.year} • {v.body || 'PRE-OWNED'}
            </small>
            <h3>
              <Link href={`/vehicles/${slugFor(v)}`}>
                {v.make} {v.model}
              </Link>
            </h3>
            <p>{v.trim}</p>
          </div>
          <ArrowUpRight size={19} />
        </div>
        <div className="vehicle-meta">
          <span>
            <Gauge size={15} />
            {number(v.kilometres)} km
          </span>
          <span>
            <MapPin size={15} />
            PEI
          </span>
        </div>
        <div className="vehicle-card-bottom">
          <strong>{money(v.price)}</strong>
          <Link href={`/vehicles/${slugFor(v)}`}>
            View details <ArrowUpRight size={15} />
          </Link>
        </div>
        <CompareButton vin={v.vin} />
      </div>
    </article>
  );
}
