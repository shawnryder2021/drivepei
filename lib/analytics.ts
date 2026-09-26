'use client';

const attributionKeys = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gclid', 'fbclid',
];
const sourceKey = 'drivepei_traffic_source';
const landingKey = 'drivepei_first_landing';

type AnalyticsEvent = 'generate_lead' | 'credit_application_click';
type AnalyticsParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string | number | undefined>>;
  }
}

export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function captureAttribution() {
  if (typeof window === 'undefined') return {} as Record<string, string>;
  const query = new URLSearchParams(window.location.search);
  const values: Record<string, string> = {};
  try {
    for (const key of attributionKeys) {
      const incoming = query.get(key)?.slice(0, 200);
      if (incoming) sessionStorage.setItem(key, incoming);
      const value = incoming || sessionStorage.getItem(key);
      if (value) values[key] = value;
    }
    if (!sessionStorage.getItem(landingKey)) {
      sessionStorage.setItem(landingKey, window.location.pathname);
    }
    if (!sessionStorage.getItem(sourceKey) || query.get('utm_source')) {
      sessionStorage.setItem(sourceKey, sourceFromReferrer(values.utm_source));
    }
  } catch {
    for (const key of attributionKeys) {
      const value = query.get(key);
      if (value) values[key] = value.slice(0, 200);
    }
  }
  return values;
}

function sourceFromReferrer(utmSource?: string) {
  if (utmSource) return utmSource.slice(0, 80);
  if (!document.referrer) return 'direct';
  try {
    const hostname = new URL(document.referrer).hostname;
    return hostname === window.location.hostname ? 'internal' : hostname.slice(0, 80);
  } catch {
    return 'unknown';
  }
}

export function trafficSource(utmSource?: string) {
  if (typeof window === 'undefined') return 'unknown';
  if (utmSource) return utmSource.slice(0, 80);
  try {
    return sessionStorage.getItem(sourceKey) || sourceFromReferrer();
  } catch {
    return sourceFromReferrer();
  }
}

export function firstLandingPage() {
  if (typeof window === 'undefined') return '/';
  try {
    return sessionStorage.getItem(landingKey) || window.location.pathname;
  } catch {
    return window.location.pathname;
  }
}
