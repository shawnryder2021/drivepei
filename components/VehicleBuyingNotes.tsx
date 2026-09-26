import Link from 'next/link';
import type { Vehicle } from '@/lib/vehicle';
import { number } from '@/lib/vehicle';

function useCase(body: string) {
  const style = body.toLowerCase();
  if (style.includes('suv')) return 'Bring the people and gear you carry regularly. Check rear-seat access, visibility and the usable cargo space with passengers aboard.';
  if (style.includes('minivan')) return 'Try access to every seating row and bring a child seat, stroller or other bulky gear to confirm the cabin works for your routine.';
  if (style.includes('truck')) return 'Confirm the bed dimensions, payload and towing details for this exact trim before deciding whether it suits your work or recreation.';
  return 'Test the seating position, parking visibility, luggage space and comfort on the routes you drive most often.';
}

export function VehicleBuyingNotes({ vehicle }: { vehicle: Vehicle }) {
  const awd = /all|four|4|awd/i.test(vehicle.drivetrain);
  return <section className="vdp-buying-notes">
    <span className="eyebrow">MAKE AN INFORMED CHOICE</span>
    <h2>Questions for this {vehicle.make} {vehicle.model}.</h2>
    <div className="vdp-note-grid">
      <div><h3>Everyday fit</h3><p>{useCase(vehicle.body)}</p></div>
      <div><h3>Condition and records</h3><p>With {number(vehicle.kilometres)} km listed, ask about service records, the current inspection, tires and any upcoming maintenance. Consider an independent inspection before purchase.</p></div>
      <div><h3>Confirm the equipment</h3><p>{awd ? `The feed lists ${vehicle.drivetrain}. Ask us to confirm the tires and how this vehicle’s drivetrain works.` : 'Check the features you need on this exact vehicle and ask which equipment is included.'} Verify any feature that matters to you during a viewing.</p></div>
    </div>
    {vehicle.description && <div className="vdp-staff-notes"><h3>Vehicle notes</h3><p>{vehicle.description}</p></div>}
    <p className="vdp-note-link">For a fuller checklist, see our <Link href="/guides/used-car-test-drive-checklist-pei">PEI test-drive guide</Link> or <Link href="/guides/read-a-vehicle-history-report">history-report guide</Link>.</p>
  </section>;
}
