import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { guides } from '../lib/guides.ts';
import { guideShoppingLinks } from '../lib/guide-shopping-links.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const supportedFilters = new Set(['q', 'make', 'body', 'drive', 'maxPrice', 'maxKm', 'minYear', 'sort', 'payment']);

test('every guide links from its article body to two working inventory routes', () => {
  assert.deepEqual(Object.keys(guideShoppingLinks).sort(), guides.map((guide) => guide.slug).sort());
  for (const guide of guides) {
    const shopping = guideShoppingLinks[guide.slug];
    assert.ok(shopping.afterSection >= 0 && shopping.afterSection < guide.sections.length, guide.slug);
    assert.equal(shopping.links.length, 2, guide.slug);
    assert.notEqual(shopping.links[0].href, shopping.links[1].href, guide.slug);
    for (const link of shopping.links) {
      const url = new URL(link.href, 'https://drivepei.ca');
      assert.equal(url.origin, 'https://drivepei.ca', `${guide.slug}: external route`);
      assert.ok(existsSync(join(root, 'app', url.pathname, 'page.tsx')), `${guide.slug}: missing ${url.pathname}`);
      for (const key of url.searchParams.keys()) {
        assert.ok(supportedFilters.has(key), `${guide.slug}: unsupported filter ${key}`);
      }
    }
  }
});
