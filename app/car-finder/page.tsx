import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';
export const metadata: Metadata = {
  title: 'Car Finder PEI',
  description:
    'Cannot find your ideal used vehicle in PEI? Tell DrivePEI your preferred make, features and budget, and we will look for a match.',
  alternates: { canonical: '/car-finder' },
};
export default function Finder() {
  return (
    <main>
      <section className="page-hero finder-hero">
        <div className="container">
          <span className="eyebrow light">
            THE RIGHT CAR IS WORTH THE SEARCH
          </span>
          <h1>
            Tell us your
            <br />
            <em>kind of drive.</em>
          </h1>
          <p>
            Looking for a certain make, size, feature or price? Send us your
            wish list.
          </p>
        </div>
      </section>
      <section className="section form-page-section">
        <div className="container form-page-grid">
          <div>
            <span className="eyebrow">CAR FINDER</span>
            <h2>We’ll keep an eye out.</h2>
            <p>
              Tell us what matters most, from AWD to extra seats to your target
              budget. We’ll contact you if we find a potential match.
            </p>
            <div className="help-list">
              <p>
                <strong>Need an SUV?</strong> Tell us your must-have features.
              </p>
              <p>
                <strong>Shopping by payment?</strong> Share a target and we’ll
                discuss options.
              </p>
              <p>
                <strong>Open to a few makes?</strong> That gives us more ways to
                help.
              </p>
            </div>
          </div>
          <LeadForm kind="car_finder" />
        </div>
      </section>
    </main>
  );
}
