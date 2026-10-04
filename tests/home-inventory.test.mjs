import test from 'node:test';
import assert from 'node:assert/strict';
import { selectHomepageHeroes } from '../lib/home-inventory.ts';

const vehicle = (vin, make, model, body = 'SUV', image = 'https://example.com/car.jpg', status = 'active') => ({
  vin, make, model, body, image, status,
});

test('homepage rotation uses active photographed stock with distinct models', () => {
  const stock = [
    vehicle('taos', 'Volkswagen', 'Taos'),
    vehicle('tiguan-a', 'Volkswagen', 'Tiguan'),
    vehicle('tiguan-b', 'Volkswagen', 'Tiguan'),
    vehicle('atlas', 'Volkswagen', 'Atlas'),
    vehicle('truck', 'Honda', 'Ridgeline', 'Trucks'),
    vehicle('sedan', 'Kia', 'Forte', 'Sedan'),
    vehicle('other', 'Nissan', 'Qashqai'),
    vehicle('sold', 'Subaru', 'Outback', 'SUV', 'https://example.com/car.jpg', 'inactive'),
    vehicle('no-photo', 'Audi', 'Q3', 'SUV', ''),
  ];
  const selected = selectHomepageHeroes(stock);
  assert.equal(selected.length, 6);
  assert.deepEqual(selected.map((v) => v.model).slice(0, 4), ['Ridgeline', 'Tiguan', 'Atlas', 'Forte']);
  assert.equal(new Set(selected.map((v) => `${v.make} ${v.model}`)).size, selected.length);
  assert.ok(selected.every((v) => v.status === 'active' && v.image));
});

test('sold models disappear from the next rotation and empty stock gives no hero', () => {
  const tiguan = vehicle('tiguan', 'Volkswagen', 'Tiguan');
  const truck = vehicle('truck', 'Honda', 'Ridgeline', 'Trucks');
  assert.deepEqual(selectHomepageHeroes([tiguan, truck]).map((v) => v.model), ['Ridgeline', 'Tiguan']);
  assert.deepEqual(selectHomepageHeroes([{ ...tiguan, status: 'inactive' }, truck]).map((v) => v.model), ['Ridgeline']);
  assert.deepEqual(selectHomepageHeroes([]), []);
});
