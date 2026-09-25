import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { guides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'PEI Used-Car Buying Guides',
  description: 'Practical DrivePEI guides to buying a used car, choosing an SUV or AWD vehicle, comparing payments and understanding trade-in equity.',
  alternates: { canonical: '/guides' },
  openGraph: { title: 'PEI Used-Car Buying Guides | DrivePEI', description: 'Straightforward help for your next used-car purchase on Prince Edward Island.', url: '/guides' },
};
export default function GuidesPage() {
  return <main>
    <section className="page-hero editorial-hero"><div className="container">
      <span className="eyebrow light">DRIVEPEI GUIDES</span>
      <h1>Know more.<br /><em>Drive better.</em></h1>
      <p>Practical answers for shopping, financing and trading a used vehicle on Prince Edward Island.</p>
    </div></section>
    <section className="section"><div className="container">
      <div className="guide-hub-intro"><div><span className="eyebrow">START WITH THE QUESTION YOU HAVE</span><h2>Useful advice for the road ahead.</h2></div><p>Use these guides to plan your budget, narrow your vehicle choices and prepare for the next conversation. Then compare the advice with real vehicles in today’s inventory.</p></div>
      <div className="guide-grid">{guides.map((guide) => <Link className="guide-card" href={`/guides/${guide.slug}`} key={guide.slug}>
        <span className="eyebrow">{guide.category} · {guide.readMinutes} MIN READ</span>
        <h2>{guide.title}</h2><p>{guide.description}</p><span className="guide-card-link">Read guide <ArrowUpRight size={17}/></span>
      </Link>)}</div>
    </div></section>
    <section className="finder-bar"><div><span className="eyebrow">READY TO LOOK?</span><h2>Explore what’s available now.</h2></div><Link className="button button-lime" href="/used">Shop used vehicles <ArrowUpRight size={17}/></Link></section>
  </main>;
}
