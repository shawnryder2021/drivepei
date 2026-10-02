import { Clock3 } from 'lucide-react';
import { inventoryStatus } from '@/lib/inventory-status';
import type { Vehicle } from '@/lib/vehicle';

export function InventoryFreshness({ vehicles }: { vehicles: Vehicle[] }) {
  const status = inventoryStatus(vehicles);
  return (
    <p className={`inventory-freshness${status.fresh ? '' : ' inventory-freshness-delayed'}`} role="status">
      <Clock3 size={16} aria-hidden="true" />
      {status.fresh
        ? `Inventory updated ${status.label}. Listings refresh throughout the day after the daily source sync.`
        : `Inventory update is delayed${status.label ? `; last received ${status.label}` : ''}. Please confirm availability and price before making a trip.`}
    </p>
  );
}
