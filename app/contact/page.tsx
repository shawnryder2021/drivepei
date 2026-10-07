import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';
import { SELLING_DEALER, VIEWING_DIRECTIONS_URL, VIEWING_LOCATION } from '@/lib/location';
import { dealerSchema, jsonLd } from '@/lib/structured-data';
export const metadata: Metadata = {
  title: 'Contact DrivePEI',
  description:
    'Contact DrivePEI about used vehicles, financing or trades. Arrange a vehicle viewing at 190 Sherwood Road, Charlottetown, PE C1E 0E4.',
  alternates: { canonical: '/contact' },
};
export default function Contact() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(dealerSchema()) }} />
      <section className="page-hero contact-hero">
        <div className="container">
          <span className="eyebrow light">WE’RE HERE TO HELP</span>
          <h1>
            Let’s start
            <br />
            <em>a conversation.</em>
          </h1>
          <p>
            Questions about a vehicle, financing or your next move? Tell us how
            to reach you.
          </p>
        </div>
      </section>
      <section className="section form-page-section">
        <div className="container form-page-grid">
          <div>
            <span className="eyebrow">CONTACT DRIVEPEI</span>
            <h2>What’s on your mind?</h2>
            <p>
              Send us a note and we’ll connect you with a real person. We serve
              drivers across Prince Edward Island from Charlottetown.
            </p>
            <div className="contact-viewing-location">
              <h3>Vehicle viewing location</h3>
              <p>Vehicles offered for sale by <a href={SELLING_DEALER.url}>{SELLING_DEALER.name}</a>.</p>
              <address>
                {VIEWING_LOCATION.street}<br />
                {VIEWING_LOCATION.city}, {VIEWING_LOCATION.province} {VIEWING_LOCATION.postalCode}
              </address>
              <p>Dealer phone: <a href={SELLING_DEALER.phoneHref}>{SELLING_DEALER.phone}</a></p>
              <p>DrivePEI is an online shopping site. Please arrange a viewing and confirm the vehicle is available at this address before travelling.</p>
              <a href={VIEWING_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get directions</a>
            </div>
          </div>
          <LeadForm kind="contact" />
        </div>
      </section>
    </main>
  );
}
