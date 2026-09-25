import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';
export const metadata: Metadata = {
  title: 'Sell or Trade Your Vehicle in PEI',
  description:
    'Tell DrivePEI about your current vehicle and explore selling or trading it in Prince Edward Island.',
  alternates: { canonical: '/trade' },
};
export default function Trade() {
  return (
    <main>
      <section className="page-hero trade-hero">
        <div className="container">
          <span className="eyebrow light">
            A NEW CHAPTER FOR YOUR CURRENT CAR
          </span>
          <h1>
            Trade it. Sell it.
            <br />
            <em>Move forward.</em>
          </h1>
          <p>
            Share a few details about your vehicle and we’ll talk about the next
            step.
          </p>
        </div>
      </section>
      <section className="section form-page-section">
        <div className="container form-page-grid">
          <div>
            <span className="eyebrow">SELL / TRADE</span>
            <h2>Your vehicle has a next chapter too.</h2>
            <p>
              Tell us the basics and we’ll get in touch about a possible trade
              or purchase. No instant estimate or offer is implied by this
              request.
            </p>
            <div className="help-list">
              <p>
                <strong>Have the basics handy:</strong> year, make, model and
                approximate kilometres.
              </p>
              <p>
                <strong>Know the condition?</strong> Mention any details you
                think matter.
              </p>
              <p>
                <strong>Still making payments?</strong> Let us know in general
                terms and we can discuss the process.
              </p>
            </div>
          </div>
          <LeadForm kind="trade" />
        </div>
      </section>
    </main>
  );
}
