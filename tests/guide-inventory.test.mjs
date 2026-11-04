import test from 'node:test';
import assert from 'node:assert/strict';
import { selectGuideVehicles } from '../lib/guide-inventory.ts';

const vehicle = (vin, model, overrides = {}) => ({ vin, model, make: 'Volkswagen', body: 'SUV', price: 20000, status: 'active', image: 'https://example.com/photo.jpg', ...overrides });
const stock = [vehicle('t1', 'Tiguan'), vehicle('t2', 'Tiguan'), vehicle('a', 'Atlas'), vehicle('c', 'Atlas Cross Sport'), vehicle('x', 'Taos')];

test('comparison cards cover different matching models and exclude unrelated stock', () => {
  assert.deepEqual(selectGuideVehicles('used-tiguan-vs-atlas-pei', stock, true).map(v => v.model), ['Tiguan', 'Atlas', 'Atlas Cross Sport']);
});

test('sold stock disappears and stale feeds never produce guide cards', () => {
  assert.deepEqual(selectGuideVehicles('used-tiguan-vs-atlas-pei', stock, false), []);
  const result = selectGuideVehicles('used-tiguan-vs-atlas-pei', stock.map(v => ({...v, status: v.model === 'Atlas' ? 'sold' : v.status})), true);
  assert.ok(result.every(v => v.model !== 'Atlas'));
  assert.equal(new Set(result.map(v => v.vin)).size, result.length);
});

test('topic-specific empty states do not substitute unrelated stock', () => {
  assert.deepEqual(selectGuideVehicles('used-truck-inspection-checklist-pei', stock, true), []);
  assert.deepEqual(selectGuideVehicles('used-subaru-buying-checklist-pei', stock, true), []);
  assert.deepEqual(selectGuideVehicles('buying-a-used-hybrid-in-pei', stock, true), []);
  const truck = vehicle('truck', 'Canyon', {make: 'GMC', body: 'Trucks'});
  assert.deepEqual(selectGuideVehicles('used-truck-inspection-checklist-pei', [...stock, truck], true), [truck]);
});

test('budget guides respect price limits and prefer photographed options', () => {
  const cars = [vehicle('photo', 'Jetta'), vehicle('none', 'Golf', {image: ''}), vehicle('expensive', 'Atlas', {price: 30000})];
  assert.deepEqual(selectGuideVehicles('used-car-financing-rates-pei', cars, true).map(v => v.vin), ['photo', 'none']);
});
