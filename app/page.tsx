import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CarFront,
  CreditCard,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { getFeedVehicles, type Vehicle } from '@/lib/inventory';
import { inventoryReadyForHomepage, inventoryStatus } from '@/lib/inventory-status';
import { selectHomepageHeroes } from '@/lib/home-inventory';
import { HomeHeroCarousel } from '@/components/HomeHeroCarousel';
import { VehicleCard } from '@/components/VehicleCard';
import { guides } from '@/lib/guides';
export const revalidate = 900;
export default async function Home() {
  let feedVehicles: Vehicle[] = [];
  try {
    feedVehicles = await getFeedVehicles(false);
  } catch (error) {
    console.error('Homepage inventory feed unavailable', error);
  }
  const inventoryReady = inventoryReadyForHomepage(feedVehicles);
  const vehicles = inventoryReady ? feedVehicles : [];
  const heroVehicles = selectHomepageHeroes(vehicles);
  const byMake = vehicles.filter((vehicle, index) =>
    vehicles.findIndex((candidate) => candidate.make === vehicle.make) === index
  );
  const featuredVehicles = [...byMake, ...vehicles]
    .filter((vehicle, index, all) => all.findIndex((candidate) => candidate.vin === vehicle.vin) === index)
    .slice(0, 3);
  return (
    <main>
      <section className={`hero${heroVehicles.length ? ' hero-inventory' : ''}`}>
        {!heroVehicles.length && <div className="hero-photo" />}
        {!heroVehicles.length && <div className="hero-shade" />}
        <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="kicker-line" /> MADE FOR THE ISLAND. BUILT FOR YOUR
            NEXT MOVE.
          </div>
          <h1>
            Your next drive
            <br />
            <em>starts here.</em>
          </h1>
          <p>
            Great used vehicles. More makes to explore. A simpler path to what’s
            next, right here on PEI.
          </p>
          <div className="hero-actions">
            <Link className="button button-lime" href="/used">
              Shop used vehicles <ArrowUpRight size={18} />
            </Link>
            <Link className="button button-outline" href="/finance">
              {process.env.NEXT_PUBLIC_CREDIT_IFRAME_URL
                ? 'Get pre-approved'
                : 'Explore financing'}{' '}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-caption">
            <MapPin size={15} /> PRINCE EDWARD ISLAND <span /> ALL MAKES. ALL
            POSSIBILITIES.
          </div>
        </div>
        {heroVehicles.length > 0 && <HomeHeroCarousel vehicles={heroVehicles} />}
        </div>
        <div className="hero-side">01 / YOUR DRIVE STARTS HERE</div>
      </section>
      <section className="search-strip">
        <div>
          <span className="eyebrow">FIND YOUR FIT</span>
          <h2>Take a look around.</h2>
        </div>
        <form action="/used" className="quick-search">
          <label>
            <Search size={18} />
            <input
              name="q"
              placeholder="Search make or model"
              aria-label="Search make or model"
            />
          </label>
          <button type="submit">
            Search inventory <ArrowRight size={18} />
          </button>
        </form>
      </section>
      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FRESH FROM THE LOT</span>
            <h2>
              Worth a closer look<span className="accent-dot">.</span>
            </h2>
            <p>{inventoryReady
              ? 'Selected from our latest verified used inventory. Every listing links to its vehicle details.'
              : 'We’re confirming the latest inventory update. Tell us what you’re looking for and we’ll follow up.'}</p>
          </div>
          <Link href="/used" className="text-link">
            View all vehicles <ArrowUpRight size={17} />
          </Link>
        </div>
        {inventoryReady ? (
          <div className="vehicle-grid featured-grid">
            {featuredVehicles.map((v) => (
              <VehicleCard key={v.vin} vehicle={v} />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <h3>Looking for a particular vehicle?</h3>
            <p>Send us your wish list and we’ll help you find a current match.</p>
            <Link href="/car-finder" className="text-link">Try Car Finder <ArrowUpRight size={17} /></Link>
          </div>
        )}
        <div className="inventory-note">
          <span className="pulse" /> {inventoryReady
            ? `Inventory source updated ${inventoryStatus(feedVehicles).label}. Vehicle availability can change.`
            : 'Vehicle spotlights will return after the latest inventory update is verified.'}
        </div>
      </section>
      <section className="path-section">
        <div className="path-intro">
          <span className="eyebrow">HOW DO YOU WANT TO MOVE?</span>
          <h2>
            More than one
            <br />
            <em>way forward.</em>
          </h2>
          <p>
            Wherever you’re starting, we’ll help you find the next step that
            makes sense.
          </p>
        </div>
        <div className="path-cards">
          <Link href="/used" className="path-card">
            <CarFront />
            <span>01 / EXPLORE</span>
            <h3>Find your next vehicle</h3>
            <p>Browse used cars, SUVs and trucks from a range of makes.</p>
            <ArrowUpRight className="path-arrow" />
          </Link>
          <Link href="/finance" className="path-card">
            <CreditCard />
            <span>02 / FINANCE</span>
            <h3>Find a payment path</h3>
            <p>Explore financing with clear next steps and no pressure.</p>
            <ArrowUpRight className="path-arrow" />
          </Link>
          <Link href="/trade" className="path-card">
            <Sparkles />
            <span>03 / TRADE</span>
            <h3>Make room for what’s next</h3>
            <p>
              Tell us about your current vehicle, whether you trade or sell.
            </p>
            <ArrowUpRight className="path-arrow" />
          </Link>
        </div>
      </section>
      <section className="split-feature">
        <div className="split-image" />
        <div className="split-copy">
          <span className="eyebrow">REAL PEOPLE. REAL ISLAND ROADS.</span>
          <h2>
            Not seeing
            <br />
            your <em>perfect fit?</em>
          </h2>
          <p>
            Tell us what you have in mind. We’ll keep an eye out for the make,
            features and budget that work for you.
          </p>
          <Link className="button button-lime" href="/car-finder">
            Try Car Finder <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section trust-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHY DRIVEPEI</span>
            <h2>
              Confidence for the road ahead<span className="accent-dot">.</span>
            </h2>
          </div>
        </div>
        <div className="trust-grid">
          <div>
            <BadgeCheck />
            <h3>Real inventory</h3>
            <p>
              Browse current used vehicles with clear prices, kilometres and
              vehicle details.
            </p>
          </div>
          <div>
            <ShieldCheck />
            <h3>Clear next steps</h3>
            <p>
              Ask about a vehicle, explore financing or tell us what you need.
              We’ll follow up personally.
            </p>
          </div>
          <div>
            <MapPin />
            <h3>Made for PEI</h3>
            <p>
              A local shopping experience for drivers across Charlottetown,
              Summerside and the Island.
            </p>
          </div>
        </div>
      </section>
      <section className="section home-guides"><div className="container"><div className="section-heading"><div><span className="eyebrow">KNOW BEFORE YOU GO</span><h2>PEI buying guides<span className="accent-dot">.</span></h2><p>Clear answers to the questions that come up before you choose a vehicle.</p></div><Link href="/guides" className="text-link">See all guides <ArrowUpRight size={17}/></Link></div><div className="guide-grid">{guides.slice(-3).reverse().map((guide) => <Link className="guide-card" href={`/guides/${guide.slug}`} key={guide.slug}><span className="eyebrow">{guide.category} · {guide.readMinutes} MIN READ</span><h3>{guide.title}</h3><p>{guide.description}</p><span className="guide-card-link">Read guide <ArrowUpRight size={17}/></span></Link>)}</div></div></section>
      <section className="closing-cta">
        <span className="eyebrow">READY WHEN YOU ARE</span>
        <h2>Let’s get you moving.</h2>
        <div>
          <Link href="/used" className="button button-lime">
            Shop used <ArrowUpRight size={18} />
          </Link>
          <Link href="/contact" className="button button-outline">
            Talk to us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
