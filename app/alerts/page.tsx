import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';
export const metadata: Metadata = {
  title: 'Used Vehicle Inventory Alerts in PEI',
  description:
    'Tell DrivePEI what used vehicle you are looking for and ask us to reach out when a match appears.',
  alternates: { canonical: '/alerts' },
};
export default function Alerts() {
  return (
    <main>
      <section className="page-hero finder-hero">
        <div className="container">
          <span className="eyebrow light">STAY IN THE LOOP</span>
          <h1>
            Good things
            <br />
            <em>come around.</em>
          </h1>
          <p>
            Tell us what you’re watching for and we’ll contact you when a
            promising match appears.
          </p>
        </div>
      </section>
      <section className="section form-page-section">
        <div className="container form-page-grid">
          <div>
            <span className="eyebrow">INVENTORY ALERTS</span>
            <h2>Let us watch with you.</h2>
            <p>
              Share the make, model, features or price range that matter to you.
              We’ll contact you about a potential match; we do not send
              automated stock notifications.
            </p>
          </div>
          <LeadForm kind="inventory_alert" heading="Set an inventory alert" />
        </div>
      </section>
    </main>
  );
}
