import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { guideBySlug, guides } from '@/lib/guides';

const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepei.ca').replace(/\/$/, '');
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: { title: `${guide.title} | DrivePEI`, description: guide.description, url: path, type: 'article', publishedTime: guide.published, modifiedTime: guide.updated, images: [{ url: '/images/pei-coastal-drive.webp' }] },
  };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const url = `${base}/guides/${guide.slug}`;
  const article = {
    '@context': 'https://schema.org', '@type': 'Article', headline: guide.title,
    description: guide.description, mainEntityOfPage: url, url,
    datePublished: guide.published, dateModified: guide.updated,
    author: { '@type': 'Organization', name: 'DrivePEI', url: base },
    publisher: { '@type': 'Organization', name: 'DrivePEI', url: base },
    image: `${base}/images/pei-coastal-drive.webp`,
  };
  const breadcrumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${base}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: url },
    ],
  };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([article, breadcrumbs]).replace(/</g, '\\u003c') }} />
    <section className="page-hero editorial-hero"><div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{guide.category}</span></nav>
      <span className="eyebrow light">{guide.category.toUpperCase()} · {guide.readMinutes} MIN READ</span>
      <h1>{guide.title}</h1><p>{guide.lead}</p>
    </div></section>
    <div className="container article-layout"><article className="guide-article">
      <p className="article-date">Published {new Date(`${guide.published}T12:00:00Z`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
      {guide.sections.map((section) => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      </section>)}
      {guide.sources && <aside className="guide-sources"><h2>Sources and further reading</h2><ul>{guide.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul><p>Requirements and guidance may change. Confirm current details with the source before making a decision.</p></aside>}
    </article><aside className="article-aside"><div className="article-action"><span className="eyebrow">YOUR NEXT STEP</span><h2>Put the guide to work.</h2><p>Compare real vehicles and ask us about the details that matter to you.</p>{guide.relatedPaths.map((path) => <Link href={path.href} key={path.href}>{path.label}<ArrowUpRight size={16}/></Link>)}</div><div className="article-more"><h2>Related PEI guides</h2>{guides.filter((other) => other.slug !== guide.slug).sort((a, b) => Number(b.category === guide.category) - Number(a.category === guide.category)).slice(0, 3).map((other) => <Link href={`/guides/${other.slug}`} key={other.slug}>{other.title} →</Link>)}<Link href="/guides">View all guides →</Link></div></aside></div>
  </main>;
}
