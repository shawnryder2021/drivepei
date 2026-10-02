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

// The source sync is scheduled for 6–7 a.m. Atlantic. Give the feed two hours
// to publish, then stop featuring vehicles until today's complete update arrives.
export function inventoryReadyForHomepage(vehicles: Vehicle[], now = new Date()) {
  if (!vehicles.length) return false;
  const { lastSynced } = inventoryStatus(vehicles, now);
  if (!lastSynced || vehicles.some((vehicle) => !vehicle.updatedAt?.startsWith(lastSynced))) {
    return false;
  }
  const today = peiDate(now);
  if (lastSynced === today) return true;
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Halifax',
    hour: '2-digit',
    hourCycle: 'h23',
  }).format(now));
  const yesterday = new Date(`${today}T12:00:00Z`);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return hour < 9 && lastSynced === yesterday.toISOString().slice(0, 10);
}
