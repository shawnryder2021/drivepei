export const COMPARE_KEY = 'drivepei.compare.v1';
export const COMPARE_EVENT = 'drivepei:compare-change';
export const MAX_COMPARE = 3;

export function readCompared(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
    return Array.isArray(value)
      ? value.filter((vin): vin is string => typeof vin === 'string' && /^[A-HJ-NPR-Z0-9]{17}$/.test(vin)).slice(0, MAX_COMPARE)
      : [];
  } catch {
    return [];
  }
}

export function writeCompared(vins: string[]) {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(vins.slice(0, MAX_COMPARE)));
  window.dispatchEvent(new Event(COMPARE_EVENT));
}
