import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const parser = vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('../scripts/inventory-feed.gs', import.meta.url), 'utf8'), parser);
const url = 'https://www.brownsvw.ca/used/2022-Volkswagen-Taos-id123.html';
const ld = value => `<script type="application/ld+json">${JSON.stringify(value)}</script>`;
const vehicle = {
  '@type': ['Product', 'Vehicle', 'Car'], productID: '123',
  vehicleIdentificationNumber: '3VVAX7B20NM025882', itemCondition: 'https://schema.org/UsedCondition',
  name: '2022 Volkswagen Taos', brand: { name: 'Volkswagen' }, model: 'Taos',
  offers: { price: 15955 }, mileageFromOdometer: { value: 189782 },
};

test('discovers graph ItemList URLs, deduplicates and rejects other hosts/new inventory', () => {
  const html = ld({ '@graph': [{ '@type': 'ItemList', itemListElement: [
    { url }, { url }, { url: url.replace('www.brownsvw.ca', 'example.com') },
    { url: url.replace('/used/', '/new/') },
  ] }] });
  const result = parser.parseSearchPage_(html);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '123');
});

test('retains legacy standalone Vehicle discovery', () => {
  const result = parser.parseSearchPage_(ld({ '@type': 'Vehicle', offers: { url, itemCondition: 'UsedCondition' }, image: 'https://images.example/car photo.jpg' }));
  assert.equal(result[0].url, url);
  assert.equal(result[0].image, 'https://images.example/car_photo.jpg');
});

test('reads graph vehicle identity and price with detail-image fallback', () => {
  const html = ld({ '@graph': [vehicle] }) + '<script>window.__vdpJSON = {"sn":"TEST","image":"https://images.example/car.jpg"};</script>';
  const result = parser.parseVehicle_(html, { id: '123', url, image: '' });
  assert.equal(result.price, 15955);
  assert.equal(result.km, 189782);
  assert.equal(result.vin, vehicle.vehicleIdentificationNumber);
  assert.equal(result.image, 'https://images.example/car.jpg');
});

test('does not invent a price for call-for-pricing vehicles', () => {
  const result = parser.parseVehicle_(ld({ '@graph': [{ ...vehicle, offers: undefined }] }), { id: '123', url });
  assert.equal(result.price, 0);
});

test('fails closed for missing identity, wrong detail page or new condition', () => {
  for (const changed of [{ ...vehicle, vehicleIdentificationNumber: '' }, { ...vehicle, productID: '456' }, { ...vehicle, itemCondition: 'NewCondition' }]) {
    assert.throws(() => parser.parseVehicle_(ld({ '@graph': [changed] }), { id: '123', url }), /Missing used vehicle data/);
  }
});
