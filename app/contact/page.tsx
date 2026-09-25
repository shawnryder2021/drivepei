import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';
export const metadata: Metadata = {
  title: 'Contact DrivePEI',
  description:
    'Questions about used vehicles, financing or selling your car on PEI? Contact DrivePEI.',
  alternates: { canonical: '/contact' },
};
export default function Contact() {
  return (
    <main>
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
          </div>
          <LeadForm kind="contact" />
        </div>
      </section>
    </main>
  );
}
