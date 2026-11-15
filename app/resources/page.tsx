import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { buyerResources } from '@/lib/buyer-resources';
export const metadata: Metadata = {
  title: 'Free Used-Car Checklists & Worksheets for PEI',
  description: 'Free printable test-drive scorecards, vehicle viewing checklists and comparison worksheets from DrivePEI. Read online, download and share. No signup required.',
  alternates: { canonical: '/resources' },
  openGraph: { title: 'Free Used-Car Buying Resources | DrivePEI', description: 'Practical printable tools for your next vehicle viewing.', url: '/resources' },
};
export default function ResourcesPage() {
  return <main>
    <section className="page-hero editorial-hero"><div className="container">
      <span className="eyebrow light">FREE DRIVEPEI RESOURCES</span>
      <h1>Take a better checklist.<br/><em>Make a clearer choice.</em></h1>
      <p>Practical tools for comparing used vehicles on PEI. Read them online, print a copy or share the link. No email address or signup required.</p>
    </div></section>
    <section className="section"><div className="container">
      <div className="guide-grid">{buyerResources.map(resource => <Link className="guide-card" key={resource.slug} href={`/resources/${resource.slug}`}>
        <span className="eyebrow">FREE · 1-PAGE PDF</span><h2>{resource.title}</h2><p>{resource.description}</p><span className="guide-card-link">Open resource <ArrowUpRight size={17}/></span>
      </Link>)}</div>
      <div className="resource-hub-note"><h2>Useful before, during and after a viewing.</h2><p>Start with the comparison worksheet to shortlist vehicles. Take a scorecard on each test drive, then use the viewing checklist to organize questions for the seller and an independent mechanic. Keep your notes with the written quotes and vehicle records.</p><p>These are DrivePEI planning tools, not government forms or inspection certificates. Schools, community organizations and shoppers are welcome to share the original PDFs with the DrivePEI credit and resource link intact.</p><Link className="text-link" href="/guides">Explore PEI buying guides →</Link></div>
    </div></section>
  </main>;
}
