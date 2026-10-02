import type { Vehicle } from './vehicle';

function peiDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Halifax',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value || '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function inventoryStatus(vehicles: Vehicle[], now = new Date()) {
  const dates = vehicles
    .map((vehicle) => vehicle.updatedAt?.match(/^\d{4}-\d{2}-\d{2}/)?.[0])
    .filter((date): date is string => {
      if (!date) return false;
      const parsed = new Date(`${date}T12:00:00Z`);
      return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
    });
  const lastSynced = dates.sort().at(-1) || '';
  const today = peiDate(now);
  const daysOld = lastSynced
    ? Math.floor((Date.parse(`${today}T12:00:00Z`) - Date.parse(`${lastSynced}T12:00:00Z`)) / 86400000)
    : Infinity;
  return {
    lastSynced,
    fresh: daysOld >= 0 && daysOld <= 1,
    label: lastSynced
      ? new Intl.DateTimeFormat('en-CA', {
          timeZone: 'UTC',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(`${lastSynced}T12:00:00Z`))
      : '',
  };
}
