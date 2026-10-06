import Link from 'next/link';
import type { Vehicle } from '@/lib/vehicle';
import { vehicleContent } from '@/lib/vehicle-content';

export function VehicleBuyingNotes({ vehicle }: { vehicle: Vehicle }) {
  const { sections, faq } = vehicleContent(vehicle);
  return <>
    <section className="vdp-buying-notes" aria-labelledby="vehicle-overview-heading">
      <span className="eyebrow">ABOUT THIS EXACT VEHICLE</span>
      <h2 id="vehicle-overview-heading">A closer look at this {vehicle.year} {vehicle.make} {vehicle.model}.</h2>
      <p className="vdp-content-disclosure">Based on the current inventory feed and practical PEI buying questions. Condition, equipment and inspection details should be confirmed on the vehicle.</p>
      <div className="vdp-editorial-sections">
        {sections.map((section) => <section key={section.heading}>
          <h3>{section.heading}</h3>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}
      </div>
      {vehicle.description && <div className="vdp-staff-notes"><h3>Vehicle notes</h3><p>{vehicle.description}</p></div>}
      <p className="vdp-note-link">Keep researching with our <Link href="/guides/used-car-test-drive-checklist-pei">PEI test-drive checklist</Link>, <Link href="/guides/read-a-vehicle-history-report">vehicle-history guide</Link>, and <Link href="/guides/pei-mvi-vs-prepurchase-inspection">MVI and pre-purchase inspection guide</Link>.</p>
    </section>
    <section className="vdp-local-faq" aria-labelledby="vehicle-faq-heading">
      <span className="eyebrow">LOCAL QUESTIONS</span>
      <h2 id="vehicle-faq-heading">PEI questions about this {vehicle.make} {vehicle.model}.</h2>
      <div className="vdp-faq-list">
        {faq.map((item) => <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>)}
      </div>
    </section>
  </>;
}
