import test from 'node:test';
import assert from 'node:assert/strict';
import { inventoryStatus } from '../lib/inventory-status.ts';

test('inventory freshness uses PEI calendar days across UTC midnight', () => {
  const vehicles = [{ updatedAt: '2026-10-02 06:31' }];
  assert.equal(inventoryStatus(vehicles, new Date('2026-10-03T02:00:00Z')).fresh, true);
  assert.equal(inventoryStatus(vehicles, new Date('2026-10-04T12:00:00Z')).fresh, false);
});

test('missing or invalid sync dates are treated as delayed', () => {
  assert.equal(inventoryStatus([], new Date('2026-10-02T12:00:00Z')).fresh, false);
  assert.equal(inventoryStatus([{ updatedAt: '2026-99-99' }], new Date('2026-10-02T12:00:00Z')).lastSynced, '');
});
