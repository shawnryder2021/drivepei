import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CarFront,
  Fuel,
  Gauge,
  MapPin,
  Settings2,
} from 'lucide-react';
import {
  getVehicle,
  getVehicleGallery,
  getVehicles,
  money,
  number,
  slugFor,
  vehicleTitle,
} from '@/lib/inventory';
import { LeadForm } from '@/components/LeadForm';
import { PaymentEstimator } from '@/components/PaymentEstimator';
import { VehicleCard } from '@/components/VehicleCard';
import { VehicleGallery } from '@/components/VehicleGallery';
import { VehicleBuyingNotes } from '@/components/VehicleBuyingNotes';
import { CompareButton } from '@/components/CompareButton';
import { InventoryFreshness } from '@/components/InventoryFreshness';
import { inventoryStatus } from '@/lib/inventory-status';
import { drivetrainLabel } from '@/lib/vehicle';
export const revalidate = 900;
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v)
    return { title: 'Vehicle no longer available', robots: { index: false } };
  return {
    title: `Used ${vehicleTitle(v)} in PEI`,
    description: `Explore this used ${vehicleTitle(v)} in PEI. ${number(v.kilometres)} km, ${money(v.price)}. Ask DrivePEI about availability.`,
    alternates: { canonical: `/vehicles/${slugFor(v)}` },
    openGraph: {
      title: `Used ${vehicleTitle(v)} in PEI | DrivePEI`,
      description: `${number(v.kilometres)} km. Asking price ${money(v.price)}. Ask about availability.`,
      url: `/vehicles/${slugFor(v)}`,
      ...(v.image ? { images: [{ url: v.image, alt: vehicleTitle(v) }] } : {}),
    },
  };
}
export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) {
    const others = (await getVehicles()).slice(0, 3);
    return (
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow light">VEHICLE UPDATE</span>
            <h1>
              This one may have
              <br />
              <em>driven on.</em>
            </h1>
            <p>
              Explore current inventory or tell us what you’re hoping to find.
            </p>
            <Link className="button button-lime" href="/used">
              Shop current vehicles <ArrowRight size={18} />
            </Link>
          </div>
        </section>
        <section className="section">
          <div className="container vehicle-grid">
            {others.map((x) => (
              <VehicleCard key={x.vin} vehicle={x} />
            ))}
          </div>
        </section>
      </main>
    );
  }
  const [all, gallery] = await Promise.all([
    getVehicles(),
    getVehicleGallery(v),
  ]);
  const similar = all
    .filter((x) => x.vin !== v.vin && (x.body === v.body || x.make === v.make))
    .slice(0, 3);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepei.ca'}/vehicles/${slugFor(v)}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: vehicleTitle(v),
    vehicleIdentificationNumber: v.vin,
    modelDate: v.year,
    brand: { '@type': 'Brand', name: v.make },
    model: v.model,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: v.kilometres,
      unitCode: 'KMT',
    },
    image: gallery.length ? gallery : undefined,
    offers: {
      '@type': 'Offer',
      price: v.price,
      priceCurrency: 'CAD',
      ...(inventoryStatus(all).fresh ? { availability: 'https://schema.org/InStock' } : {}),
      url,
    },
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <section className="vdp-top">
        <div className="container">
          <Link className="back-link" href="/used">
            <ArrowLeft size={16} /> Back to inventory
          </Link>
          <div className="vdp-heading">
            <div>
              <span className="eyebrow">
                USED • {v.make.toUpperCase()} • PEI
              </span>
              <h1>
                {v.year} {v.make} {v.model}
              </h1>
              <p>{v.trim}</p>
            </div>
            <div className="vdp-price">
              <span>Asking price</span>
              <strong>{money(v.price)}</strong>
              <small>Plus applicable taxes and fees</small>
            </div>
          </div>
        </div>
      </section>
      <section className="vdp-main container">
        <div>
          <InventoryFreshness vehicles={all} />
          <CompareButton vin={v.vin} />
          <VehicleGallery images={gallery} title={vehicleTitle(v)} />
          <div className="vdp-stats">
            <div>
              <Gauge />
              <span>Kilometres</span>
              <strong>{number(v.kilometres)} km</strong>
            </div>
            <div>
              <CarFront />
              <span>Body style</span>
              <strong>{v.body || 'Ask us'}</strong>
            </div>
            <div>
              <Settings2 />
              <span>Drivetrain</span>
              <strong>{drivetrainLabel(v.drivetrain)}</strong>
            </div>
            <div>
              <Fuel />
              <span>Fuel</span>
              <strong>{v.fuel || 'Ask us'}</strong>
            </div>
          </div>
          <div className="vdp-details">
            <span className="eyebrow">THE DETAILS</span>
            <h2>Get to know this drive.</h2>
            <dl>
              <div>
                <dt>Year</dt>
                <dd>{v.year}</dd>
              </div>
              <div>
                <dt>Make</dt>
                <dd>{v.make}</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>{v.model}</dd>
              </div>
              <div>
                <dt>Trim</dt>
                <dd>{v.trim || '—'}</dd>
              </div>
              <div>
                <dt>Transmission</dt>
                <dd>{v.transmission || '—'}</dd>
              </div>
              <div>
                <dt>Exterior colour</dt>
                <dd>{v.colour || '—'}</dd>
              </div>
              <div>
                <dt>Stock #</dt>
                <dd>{v.stock || '—'}</dd>
              </div>
              <div>
                <dt>VIN</dt>
                <dd>{v.vin}</dd>
              </div>
            </dl>
            <p className="fine-print">
              Please confirm all vehicle details and availability with our team
              before making a purchase decision.
            </p>
          </div>
          <VehicleBuyingNotes vehicle={v} />
          <nav className="vdp-research" aria-label="Research this purchase">
            <span className="eyebrow">RESEARCH THIS PURCHASE</span>
            <h2>Questions worth asking about this vehicle.</h2>
            <div>
              <Link href="/guides/questions-to-ask-about-used-car-listing-pei">Before you visit: questions for this listing <ArrowUpRight size={16}/></Link>
              <Link href="/guides/read-a-vehicle-history-report">How to read its history report <ArrowUpRight size={16}/></Link>
              {v.make.toLowerCase() === 'volkswagen' && <Link href="/guides/used-volkswagen-checklist-pei">Used Volkswagen checklist <ArrowUpRight size={16}/></Link>}
              {v.price <= 25000 && <Link href="/used-cars-under-25000-pei">Compare vehicles under $25,000 <ArrowUpRight size={16}/></Link>}
              <Link href="/guides/compare-used-car-financing-offers">Compare written finance offers <ArrowUpRight size={16}/></Link>
            </div>
          </nav>
          <PaymentEstimator price={v.price} />
        </div>
        <aside className="vdp-aside">
          <div className="vdp-actions">
            <span className="eyebrow">YOUR NEXT STEP</span>
            <h2>Like what you see?</h2>
            <p>Ask about availability or arrange a closer look.</p>
            <a href="#vehicle-inquiry" className="button button-lime">
              Check availability <ArrowRight size={16} />
            </a>
            <Link href="/finance" className="button button-soft">
              {process.env.NEXT_PUBLIC_CREDIT_IFRAME_URL
                ? 'Get pre-approved'
                : 'Explore financing'}{' '}
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/trade" className="text-link">
              Value my trade <ArrowUpRight size={16} />
            </Link>
          </div>
          <div id="vehicle-inquiry">
            <LeadForm
              kind="vehicle"
              vehicleVin={v.vin}
              vehicleName={vehicleTitle(v)}
              heading="Ask about this vehicle"
            />
          </div>
        </aside>
      </section>
      {similar.length > 0 && (
        <section className="section similar-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">KEEP EXPLORING</span>
                <h2>
                  More to consider<span className="accent-dot">.</span>
                </h2>
              </div>
              <Link href="/used" className="text-link">
                All inventory <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="vehicle-grid">
              {similar.map((x) => (
                <VehicleCard key={x.vin} vehicle={x} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="finder-bar">
        <div>
          <span className="eyebrow">NOT QUITE THE ONE?</span>
          <h2>Tell us what you’re after.</h2>
        </div>
        <Link href="/car-finder" className="button button-lime">
          Use Car Finder <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
