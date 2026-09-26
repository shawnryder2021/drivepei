import type { Vehicle } from './vehicle';

export type AdfLead = {
  id: string;
  created_at: string;
  kind: 'vehicle' | 'car_finder' | 'trade' | 'finance' | 'contact' | 'inventory_alert';
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicle_vin?: string | null;
  details: Record<string, string | number | boolean>;
  utm: Record<string, string>;
  landing_page?: string | null;
};

const xml = (value: unknown) => String(value ?? '')
  .replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu, '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');
const element = (tag: string, value: unknown) => `<${tag}>${xml(value)}</${tag}>`;
const optional = (tag: string, value: unknown) => value ? element(tag, value) : '';
const labelByKind: Record<AdfLead['kind'], string> = {
  vehicle: 'Vehicle inquiry',
  car_finder: 'Car finder request',
  trade: 'Trade-in inquiry',
  finance: 'Financing inquiry',
  contact: 'Contact request',
  inventory_alert: 'Inventory alert request',
};

function vehicleBlock(lead: AdfLead, vehicle?: Vehicle) {
  const trade = lead.kind === 'trade';
  const rawTrade = String(lead.details.tradeVehicle || '').trim();
  const tradeParts = /^(19\d{2}|20\d{2})\s+([^\s]+)\s+(.+)$/.exec(rawTrade);
  const titleParts = /^(19\d{2}|20\d{2})\s+([^\s]+)\s+(.+)$/.exec(String(lead.details.vehicleName || ''));
  const interest = trade ? 'trade-in' : 'buy';
  const year = vehicle?.year || tradeParts?.[1] || titleParts?.[1] || 'Not specified';
  const make = vehicle?.make || tradeParts?.[2] || titleParts?.[2] || 'Not specified';
  const model = vehicle?.model || tradeParts?.[3] || titleParts?.[3] || 'Not specified';
  const kilometres = vehicle?.kilometres || (trade ? Number(String(lead.details.tradeMileage || '').replace(/[^0-9]/g, '')) : 0);
  const vehicleDetails = [
    vehicle?.stock ? `<id source="DrivePEI stock">${xml(vehicle.stock)}</id>` : '',
    element('year', year), element('make', make), element('model', model),
    optional('vin', vehicle?.vin || lead.vehicle_vin),
    optional('stock', vehicle?.stock),
    optional('trim', vehicle?.trim),
    optional('bodystyle', vehicle?.body),
    optional('transmission', vehicle?.transmission),
    kilometres > 0 ? `<odometer units="km">${xml(kilometres)}</odometer>` : '',
    vehicle?.colour ? `<colorcombination>${element('exteriorcolor', vehicle.colour)}${element('preference', 1)}</colorcombination>` : '',
    vehicle?.price ? `<price type="asking" currency="CAD">${xml(vehicle.price)}</price>` : '',
    optional('comments', trade ? rawTrade : lead.details.desiredVehicle || lead.details.vehicleName),
  ].join('');
  return `<vehicle interest="${interest}" status="used">${vehicleDetails}</vehicle>`;
}

export function buildAdf(lead: AdfLead, vehicle?: Vehicle): string {
  const date = new Date(lead.created_at);
  if (Number.isNaN(date.getTime())) throw new Error('Invalid lead date');
  const requestDate = date.toISOString().replace(/\.\d{3}Z$/, '+00:00');
  const notes = [
    `Request type: ${labelByKind[lead.kind]}`,
    lead.message && `Message: ${lead.message}`,
    ...Object.entries(lead.details)
      .filter(([key, value]) => value !== '' && value !== false && key !== 'vehicleName')
      .map(([key, value]) => `${key}: ${value}`),
    lead.landing_page && `Landing page: ${lead.landing_page}`,
    ...Object.entries(lead.utm).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`),
  ].filter(Boolean).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?ADF version="1.0"?>',
    '<adf><prospect status="new">',
    `<id sequence="1" source="DrivePEI">${xml(lead.id)}</id>`,
    element('requestdate', requestDate),
    vehicleBlock(lead, vehicle),
    '<customer><contact>',
    `<name part="full">${xml(lead.name)}</name>`,
    `<email preferredcontact="1">${xml(lead.email)}</email>`,
    `<phone type="voice" preferredcontact="1">${xml(lead.phone)}</phone>`,
    '</contact>',
    element('comments', notes),
    '</customer>',
    '<vendor>',
    element('vendorname', 'DrivePEI'),
    element('url', 'https://drivepei.ca'),
    `<contact><name part="full">DrivePEI</name>${process.env.ADF_VENDOR_EMAIL ? element('email', process.env.ADF_VENDOR_EMAIL) : ''}</contact>`,
    '</vendor>',
    '<provider>',
    `<name part="full">DrivePEI</name>`,
    element('service', labelByKind[lead.kind]),
    element('url', 'https://drivepei.ca'),
    '</provider>',
    '</prospect></adf>',
  ].join('');
}
