import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { vehicleContent } from '../lib/vehicle-content.ts';

const snapshot = JSON.parse(readFileSync(new URL('../lib/inventory-snapshot.json', import.meta.url), 'utf8'));
const wordCount = (sections) => sections.flatMap((section) => section.paragraphs).join(' ').trim().split(/\s+/).length;

test('every current snapshot vehicle gets 300+ words of visible editorial copy and a local FAQ', () => {
  assert.ok(snapshot.length > 0);
  for (const vehicle of snapshot) {
    const { sections, faq } = vehicleContent(vehicle);
    assert.ok(wordCount(sections) >= 300, `${vehicle.vin} has ${wordCount(sections)} words`);
    assert.equal(faq.length, 3, vehicle.vin);
    assert.ok(sections[0].paragraphs[0].includes(vehicle.vin) || faq[0].answer.includes(vehicle.vin));
    assert.ok(faq.every((item) => item.question && item.answer), vehicle.vin);
  }
});

test('a new listing with sparse feed fields still gets accurate copy and FAQ', () => {
  const vehicle = {
    vin: '1HGCM82633A004352', stock: '', year: 2020, make: 'Honda', model: 'Civic',
    trim: '', price: 22500, kilometres: 65000, body: '', drivetrain: '',
    transmission: '', fuel: '', colour: '', image: '', sourceUrl: '', status: 'active',
  };
  const { sections, faq } = vehicleContent(vehicle);
  const text = sections.flatMap((section) => section.paragraphs).join(' ');
  assert.ok(wordCount(sections) >= 300);
  assert.match(text, /does not specify a trim/);
  assert.match(text, /should be confirmed/);
  assert.doesNotMatch(text, /has passed an inspection|includes winter tires|has a warranty/i);
  assert.equal(faq.length, 3);
  assert.match(faq[1].answer, /MVI/);
});
