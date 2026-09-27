import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { guides, type Guide } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'PEI Used-Car Buying Guides',
  description:
    'Explore DrivePEI guides to choosing, inspecting and financing a used vehicle in Prince Edward Island, including winter readiness, hybrids and PEI MVI.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'PEI Used-Car Buying Guides | DrivePEI',
    description: 'Practical answers for choosing and checking a used vehicle on Prince Edward Island.',
    url: '/guides',
  },
};

const topics: {
  category: Guide['category'];
  id: string;
  heading: string;
  intro: string;
}[] = [
  { category: 'Buying', id: 'buying', heading: 'Buying and inspecting', intro: 'Questions to ask before you visit, on the test drive and before you commit.' },
  { category: 'Vehicle choice', id: 'vehicle-choice', heading: 'Choosing a vehicle', intro: 'Compare body styles, drivetrains and fuel types for your actual Island routine.' },
  { category: 'Financing', id: 'financing', heading: 'Payments and financing', intro: 'Understand the written terms and the whole cost of a used vehicle.' },
  { category: 'Trade-in', id: 'trade-in', heading: 'Selling and trading', intro: 'Prepare your current vehicle and understand how its value affects the next purchase.' },
];

export default function GuidesPage() {
  return (
    <main>
      <section className="page-hero editorial-hero">
        <div className="container">
          <span className="eyebrow light">DRIVEPEI GUIDES</span>
          <h1>Know more.<br /><em>Drive better.</em></h1>
          <p>Practical answers for shopping, financing and trading a used vehicle on Prince Edward Island.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="guide-hub-intro">
            <div><span className="eyebrow">START WITH THE QUESTION YOU HAVE</span><h2>Useful advice for the road ahead.</h2></div>
            <p>Use these guides to plan your budget, narrow your choices and prepare for the next conversation. Then compare the advice with real vehicles in today’s inventory.</p>
          </div>
          <nav className="guide-topic-nav" aria-label="Guide topics">
            {topics.map((topic) => <a href={`#${topic.id}`} key={topic.id}>{topic.heading}</a>)}
          </nav>
          {topics.map((topic) => (
            <section className="guide-topic-section" id={topic.id} key={topic.id}>
              <div className="guide-topic-heading"><div><span className="eyebrow">{topic.category.toUpperCase()}</span><h2>{topic.heading}</h2></div><p>{topic.intro}</p></div>
              <div className="guide-grid">
                {guides.filter((guide) => guide.category === topic.category).sort((a, b) => b.published.localeCompare(a.published)).map((guide) => (
                  <Link className="guide-card" href={`/guides/${guide.slug}`} key={guide.slug}>
                    <span className="eyebrow">{guide.category} · {guide.readMinutes} MIN READ</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <span className="guide-card-link">Read guide <ArrowUpRight size={17} /></span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <section className="finder-bar"><div><span className="eyebrow">READY TO LOOK?</span><h2>Explore what’s available now.</h2></div><Link className="button button-lime" href="/used">Shop used vehicles <ArrowUpRight size={17} /></Link></section>
    </main>
  );
}
