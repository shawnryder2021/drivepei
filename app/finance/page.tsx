import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpRight,
  CheckCircle2,
  LockKeyhole,
  MessageCircle,
} from 'lucide-react';
import { LeadForm } from '@/components/LeadForm';
import { CreditApplication } from '@/components/CreditApplication';
export const metadata: Metadata = {
  title: 'Car Financing in PEI',
  description:
    'Explore flexible used vehicle financing options in Prince Edward Island. Start a secure credit application or ask a question.',
  alternates: { canonical: '/finance' },
};
export default function Finance() {
  const iframe = process.env.NEXT_PUBLIC_CREDIT_IFRAME_URL;
  return (
    <main>
      <section className="page-hero finance-hero">
        <div className="container">
          <span className="eyebrow light">CREDIT WITHOUT THE PRESSURE</span>
          <h1>
            A clearer path
            <br />
            <em>to your next car.</em>
          </h1>
          <p>
            Different credit histories. Different starting points. We’re here to
            help you explore what may work.
          </p>
          <a
            href={iframe ? '#apply' : '#finance-contact'}
            className="button button-lime"
          >
            {iframe ? 'Start your application' : 'Ask about financing'}{' '}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="section finance-steps">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>
                One step at a time<span className="accent-dot">.</span>
              </h2>
            </div>
          </div>
          <div className="steps-grid">
            <div>
              <strong>01</strong>
              <h3>Find your fit</h3>
              <p>
                Explore current used inventory or tell us what kind of vehicle
                you need.
              </p>
            </div>
            <div>
              <strong>02</strong>
              <h3>{iframe ? 'Apply securely' : 'Ask a question'}</h3>
              <p>
                {iframe
                  ? 'Use the secure credit application below. Your financial information stays with the application provider.'
                  : 'Tell us how to reach you and we’ll help you with the next step while the application link is updated.'}
              </p>
            </div>
            <div>
              <strong>03</strong>
              <h3>Talk through options</h3>
              <p>
                Our team will help you understand available next steps after
                your application is reviewed.
              </p>
            </div>
          </div>
          <p className="fine-print">Comparing rates? <Link href="/guides/used-car-financing-rates-pei">Learn how to assess a written used-car financing quote <ArrowUpRight size={14} /></Link>.</p>
        </div>
      </section>
      <section className="section application-section" id="apply">
        <div className="container">
          <div className="application-heading">
            <div>
              <span className="eyebrow">SECURE CREDIT APPLICATION</span>
              <h2>Ready to get started?</h2>
              <p>
                {iframe
                  ? 'Complete the secure application below. Approval and terms depend on lender review.'
                  : 'The secure application link is being updated. You can still ask our team about financing.'}
              </p>
            </div>
            <LockKeyhole size={30} />
          </div>
          {iframe ? (
            <CreditApplication url={iframe} />
          ) : (
            <div className="application-unavailable">
              <h3>We’re updating the secure application link.</h3>
              <p>
                Ask us about financing and we’ll help you with the next step.
              </p>
            </div>
          )}
          <div className="security-note">
            <CheckCircle2 size={19} />
            <span>
              Do not enter your SIN, income or other sensitive financial details
              in the contact form below.
            </span>
          </div>
        </div>
      </section>
      <section className="section contact-panel-section" id="finance-contact">
        <div className="container contact-panel">
          <div>
            <MessageCircle size={32} />
            <span className="eyebrow">HAVE A QUESTION FIRST?</span>
            <h2>Let’s talk it through.</h2>
            <p>
              There’s no need to know exactly where to begin. Send us a note and
              we’ll follow up.
            </p>
            <Link href="/used" className="text-link">
              Browse vehicles <ArrowUpRight size={16} />
            </Link>
          </div>
          <LeadForm kind="finance" heading="Ask a financing question" />
        </div>
      </section>
    </main>
  );
}
