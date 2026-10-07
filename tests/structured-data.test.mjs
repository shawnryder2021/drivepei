import test from 'node:test';
import assert from 'node:assert/strict';
import { dealerId, dealerSchema, jsonLd, vehicleSchema } from '../lib/structured-data.ts';

const now = new Date('2026-10-07T15:00:00Z');
const vehicle = {
  vin: '3VV2B7AX1PM123456', stock: 'U123', year: 2023, make: 'Volkswagen',
  model: 'Tiguan', trim: 'Comfortline', price: 28995, kilometres: 42110,
  body: 'SUV', drivetrain: 'AWD', transmission: 'Automatic', fuel: 'Gasoline',
  colour: 'Blue', image: '', sourceUrl: '', status: 'active', updatedAt: '2026-10-07 06:31',
};
const photo = 'https://imagescdn.d2cmedia.ca/mb123/1/2/3/photo.jpg';

test('dealer identity is consistent with the public seller address', () => {
  const dealer = dealerSchema();
  assert.equal(dealer['@type'], 'AutoDealer');
  assert.equal(dealer['@id'], dealerId);
  assert.equal(dealer.url, 'https://www.brownsvw.ca/');
  assert.equal(dealer.telephone, '902-892-5381');
  assert.equal(dealer.address.streetAddress, '190 Sherwood Road');
  assert.equal(dealer.address.postalCode, 'C1E 0E4');
});

test('current photographed vehicle has a seller-linked used-car offer', () => {
  const schema = vehicleSchema(vehicle, [photo], [vehicle], now);
  assert.deepEqual(schema['@type'], ['Product', 'Car']);
  assert.equal(schema.vehicleIdentificationNumber, vehicle.vin);
  assert.equal(schema.modelDate, vehicle.year);
  assert.equal(schema.mileageFromOdometer.value, vehicle.kilometres);
  assert.deepEqual(schema.image, [photo]);
  assert.equal(schema.offers.price, vehicle.price);
  assert.equal(schema.offers.priceCurrency, 'CAD');
  assert.equal(schema.offers.itemCondition, 'https://schema.org/UsedCondition');
  assert.equal(schema.offers.seller['@id'], dealerId);
  assert.equal(schema.offers.url, schema.url);
  assert.equal(schema.aggregateRating, undefined);
  assert.equal(schema.review, undefined);
});

test('vehicle without approved photos omits image markup', () => {
  const schema = vehicleSchema(vehicle, [], [vehicle], now);
  assert.equal('image' in schema, false);
  assert.equal(schema.offers.price, vehicle.price);
});

test('stale feed or stale vehicle row omits offer markup', () => {
  const stale = { ...vehicle, updatedAt: '2026-10-04 06:31' };
  assert.equal('offers' in vehicleSchema(stale, [photo], [stale], now), false);
  assert.equal('offers' in vehicleSchema(vehicle, [photo], [stale], now), false);
});

test('unavailable VIN has no product markup', () => {
  assert.equal(vehicleSchema(null, [], [vehicle], now), null);
  assert.equal(vehicleSchema(vehicle, [photo], [], now), null);
  assert.equal(vehicleSchema({ ...vehicle, status: 'sold' }, [photo], [vehicle], now), null);
});

test('JSON-LD escapes markup while remaining parseable', () => {
  const data = JSON.parse(jsonLd({ name: '<script>' }));
  assert.equal(data.name, '<script>');
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(jsonLd({ name: '<script>' }).includes('<script>'), false);
});
