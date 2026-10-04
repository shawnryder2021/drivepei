import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getVehicles } from '@/lib/inventory';
import { InventoryExplorer } from '@/components/InventoryExplorer';
import { InventoryFreshness } from '@/components/InventoryFreshness';

type Section = { heading: string; paragraphs: string[]; bullets?: string[] };
export type LandingContent = {
  eyebrow: string;
  heading: string;
  accent: string;
  intro: string;
  body?: string;
  drive?: string;
  make?: string;
  models?: string[];
  sections: Section[];
  guideLinks: { label: string; href: string }[];
};
export async function InventoryLanding({ content }: { content: LandingContent }) {
  const allVehicles = await getVehicles();
  // Keep category pages scoped even when a visitor resets the explorer filters.
  const vehicles = allVehicles.filter((vehicle) =>
    (!content.body || vehicle.body.toLowerCase().includes(content.body.toLowerCase())) &&
    (!content.drive || /all|four|4|awd/i.test(vehicle.drivetrain)) &&
    (!content.make || vehicle.make.toLowerCase() === content.make.toLowerCase()) &&
    (!content.models || content.models.some((model) => model.toLowerCase() === vehicle.model.toLowerCase()))
  );
  return <main>
    <section className="page-hero inventory-hero"><div className="container">
      <span className="eyebrow light">{content.eyebrow}</span>
      <h1>{content.heading}<br/><em>{content.accent}</em></h1>
      <p>{content.intro}</p>
      <a className="button button-outline inventory-jump" href="#inventory-results">View current vehicles <ArrowUpRight size={17}/></a>
    </div></section>
    <section className="section inventory-section"><div className="container">
      <InventoryFreshness vehicles={allVehicles} />
      <p className="inventory-freshness">{vehicles.length} {vehicles.length === 1 ? 'vehicle' : 'vehicles'} matching this page in the latest inventory feed. Ask us to confirm a specific vehicle before travelling.</p>
      <InventoryExplorer vehicles={vehicles} initialBody={content.body} initialDrive={content.drive} initialMake={content.make}/>
    </div></section>
    <section className="section landing-editorial"><div className="container landing-editorial-grid"><div className="landing-copy">
      <span className="eyebrow">MAKE A MORE INFORMED CHOICE</span>
      {content.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((p) => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}</section>)}
    </div><aside className="landing-next"><h2>Keep exploring</h2>{content.guideLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}<ArrowUpRight size={16}/></Link>)}<Link href="/guides">All PEI buying guides<ArrowUpRight size={16}/></Link></aside></div></section>
    <section className="finder-bar"><div><span className="eyebrow">LOOKING FOR SOMETHING SPECIFIC?</span><h2>Let us find the right fit.</h2></div><Link className="button button-lime" href="/car-finder">Tell us what you need <ArrowUpRight size={17}/></Link></section>
  </main>;
}
