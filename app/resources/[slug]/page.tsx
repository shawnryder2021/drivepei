import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buyerResources, resourceBySlug } from '@/lib/buyer-resources';
import { ResourceActions } from '@/components/ResourceActions';
import { jsonLd } from '@/lib/structured-data';
const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepei.ca').replace(/\/$/, '');
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => buyerResources.map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = resourceBySlug((await params).slug);
  if (!resource) return {};
  return { title: `${resource.title} | Free printable`, description: resource.description, alternates: { canonical: `/resources/${resource.slug}` }, openGraph: { title: `${resource.title} | DrivePEI`, description: resource.description, url: `/resources/${resource.slug}`, type: 'website' } };
}
export default async function ResourcePage({ params }: Props) {
  const resource = resourceBySlug((await params).slug);
  if (!resource) notFound();
  const url = `${base}/resources/${resource.slug}`;
  return <main className="resource-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: resource.title, description: resource.description, dateModified: resource.updated, publisher: { '@type': 'Organization', name: 'DrivePEI', url: base }, hasPart: { '@type': 'DigitalDocument', name: resource.title, encodingFormat: 'application/pdf', url: `${url}.pdf` } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: base }, { '@type': 'ListItem', position: 2, name: 'Free resources', item: `${base}/resources` }, { '@type': 'ListItem', position: 3, name: resource.title, item: url }] },
    ] }) }} />
    <section className="page-hero editorial-hero"><div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/resources">Free resources</Link></nav>
      <span className="eyebrow light">DRIVEPEI · FREE PRINTABLE</span><h1>{resource.title}</h1><p>{resource.lead}</p>
    </div></section>
    <div className="container resource-content">
      <ResourceActions slug={resource.slug}/>
      <p className="resource-format-note">Free one-page PDF · Print or download to fill in · No signup required</p>
      <section className="resource-instructions"><h2>How to use this sheet</h2><ol>{resource.howTo.map(text => <li key={text}>{text}</li>)}</ol></section>
      <section className="resource-sheet" aria-labelledby="worksheet-heading">
        <h2 id="worksheet-heading">{resource.format === 'comparison' ? 'Your three-vehicle shortlist' : 'Your viewing notes'}</h2>
        <p className="resource-blank">{resource.format === 'comparison' ? 'My budget / must-have features' : 'Vehicle / VIN or stock number / viewing date'}: ____________________________________</p>
        {resource.format === 'scorecard' && <p>Score 1–5 for your personal fit, or mark N/A. There is no mechanical pass score.</p>}
        <div className="resource-table-wrap" tabIndex={0} role="region" aria-label="Printable worksheet table"><table className="resource-table">
          <thead><tr><th scope="col">What to compare or check</th>{resource.format === 'comparison' ? ['Vehicle A', 'Vehicle B', 'Vehicle C'].map(label => <th scope="col" key={label}>{label}</th>) : <><th scope="col">{resource.format === 'scorecard' ? 'Score / N/A' : 'Reviewed'}</th><th scope="col">Notes / questions</th></>}</tr></thead>
          <tbody>{resource.rows.map(([label, prompt]) => <tr key={label}><th scope="row">{label}<small>{prompt}</small></th>{resource.format === 'comparison' ? [0,1,2].map(i => <td key={i}><span className="resource-write-line" aria-label="Space for written notes"/></td>) : <><td>{resource.format === 'scorecard' ? '____' : <span className="resource-check-box" aria-label="Checkbox for printed copy"/>}</td><td><span className="resource-write-line" aria-label="Space for written notes"/></td></>}</tr>)}</tbody>
        </table></div>
        <p className="resource-caution">{resource.note}</p>
        <p className="resource-blank">My next step / questions to resolve: __________________________________________________</p>
        <p className="resource-print-credit">DrivePEI · drivepei.ca/resources/{resource.slug}</p>
      </section>
      <section className="resource-next"><h2>Turn your notes into a next step</h2><p>{resource.next}</p><div className="resource-related">{resource.related.map(link => <Link key={link.href} href={link.href}>{link.label} →</Link>)}</div></section>
      <aside className="guide-sources resource-sources"><h2>Further guidance</h2><ul>{resource.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul><p>Prepared by DrivePEI. Share the original PDF with its credit and resource link intact. <Link href="/resources">See all free resources.</Link></p></aside>
    </div>
  </main>;
}
