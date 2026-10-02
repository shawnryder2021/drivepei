import test from 'node:test';
import assert from 'node:assert/strict';
import { inventoryReadyForHomepage, inventoryStatus } from '../lib/inventory-status.ts';

test('inventory freshness uses PEI calendar days across UTC midnight', () => {
  const vehicles = [{ updatedAt: '2026-10-02 06:31' }];
  assert.equal(inventoryStatus(vehicles, new Date('2026-10-03T02:00:00Z')).fresh, true);
  assert.equal(inventoryStatus(vehicles, new Date('2026-10-04T12:00:00Z')).fresh, false);
});

test('missing or invalid sync dates are treated as delayed', () => {
  assert.equal(inventoryStatus([], new Date('2026-10-02T12:00:00Z')).fresh, false);
  assert.equal(inventoryStatus([{ updatedAt: '2026-99-99' }], new Date('2026-10-02T12:00:00Z')).lastSynced, '');
});

test('homepage uses yesterday\'s complete feed only before the morning cutoff', () => {
  const vehicles = [{ updatedAt: '2026-10-02 06:31' }];
  assert.equal(inventoryReadyForHomepage(vehicles, new Date('2026-10-03T11:59:00Z')), true);
  assert.equal(inventoryReadyForHomepage(vehicles, new Date('2026-10-03T12:00:00Z')), false);
  assert.equal(inventoryReadyForHomepage([{ updatedAt: '2026-10-03 06:40' }], new Date('2026-10-03T12:00:00Z')), true);
});

test('homepage rejects incomplete or undated feed updates', () => {
  const now = new Date('2026-10-02T14:00:00Z');
  assert.equal(inventoryReadyForHomepage([], now), false);
  assert.equal(inventoryReadyForHomepage([{ updatedAt: '2026-10-02 06:31' }, { updatedAt: '2026-10-01 06:29' }], now), false);
  assert.equal(inventoryReadyForHomepage([{ updatedAt: '' }], now), false);
});
