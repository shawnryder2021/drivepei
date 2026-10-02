import test from 'node:test';
import assert from 'node:assert/strict';
import { pickHomepageHero } from '../lib/home-inventory.ts';

const vehicle = (vin, make, image = 'https://example.com/car.jpg', status = 'active') => ({
  vin, make, image, status,
});

test('preferred vehicle appears only while active and photographed', () => {
  const subaru = vehicle('4S4BSDGC7K3267790', 'Subaru');
  const kia = vehicle('3KPF34AD6NE445481', 'Kia');
  assert.equal(pickHomepageHero([subaru, kia])?.vin, subaru.vin);
  assert.equal(pickHomepageHero([subaru, kia], 'kia')?.vin, kia.vin);
  assert.equal(pickHomepageHero([vehicle(subaru.vin, 'Subaru', '', 'inactive'), kia])?.vin, kia.vin);
});

test('hero chooses another active photo when preferred vehicles leave inventory', () => {
  const volkswagen = vehicle('3VVLX7B27NM070424', 'Volkswagen', '', 'inactive');
  const honda = vehicle('1HGCM82633A004352', 'Honda');
  assert.equal(pickHomepageHero([volkswagen, honda])?.vin, honda.vin);
  assert.equal(pickHomepageHero([volkswagen]), undefined);
});
