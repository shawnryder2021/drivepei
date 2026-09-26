import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAdf } from '../lib/adf.ts';

const base = {
  id: 'test-123', created_at: '2026-09-26T19:30:00.000Z', kind: 'vehicle',
  name: 'Test & Person', email: 'test@example.invalid', phone: '9025550100',
  message: 'Is it still here? <Please confirm> 🚗', vehicle_vin: '1HGCM82633A004352',
  details: { vehicleName: '2022 Honda Civic EX' },
  utm: { utm_source: 'google' }, landing_page: 'https://drivepei.ca/used',
};
const vehicle = {
  vin: base.vehicle_vin, stock: 'A&B123', year: 2022, make: 'Honda', model: 'Civic',
  trim: 'EX', price: 24995, kilometres: 42000, body: 'Sedan', transmission: 'Automatic',
  colour: 'Blue',
};

test('vehicle inquiry produces escaped ADF with exact inventory details', () => {
  const xml = buildAdf(base, vehicle);
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?><\?ADF version="1\.0"\?><adf>/);
  assert.match(xml, /<prospect status="new"><id sequence="1" source="DrivePEI">test-123<\/id>/);
  assert.match(xml, /<requestdate>2026-09-26T19:30:00\+00:00<\/requestdate>/);
  assert.match(xml, /<year>2022<\/year><make>Honda<\/make><model>Civic<\/model>/);
  assert.match(xml, /<odometer units="km">42000<\/odometer>/);
  assert.match(xml, /<price type="asking" currency="CAD">24995<\/price>/);
  assert.match(xml, /Test &amp; Person/);
  assert.match(xml, /&lt;Please confirm&gt; 🚗/);
  assert.match(xml, /<vendor><vendorname>DrivePEI<\/vendorname>/);
  assert.doesNotMatch(xml, /Brown/i);
});

test('trade inquiry describes the trade without inventing a stock vehicle', () => {
  const xml = buildAdf({ ...base, kind: 'trade', vehicle_vin: null, details: { tradeVehicle: '2018 Toyota Corolla', tradeMileage: '114,000' } });
  assert.match(xml, /<vehicle interest="trade-in" status="used">/);
  assert.match(xml, /<year>2018<\/year><make>Toyota<\/make><model>Corolla<\/model>/);
  assert.match(xml, /<odometer units="km">114000<\/odometer>/);
  assert.doesNotMatch(xml, /<vin>/);
});

test('general requests retain the ADF vehicle block with explicit unknowns', () => {
  const xml = buildAdf({ ...base, kind: 'contact', vehicle_vin: null, details: {} });
  assert.match(xml, /<year>Not specified<\/year><make>Not specified<\/make><model>Not specified<\/model>/);
  assert.match(xml, /Request type: Contact request/);
});
