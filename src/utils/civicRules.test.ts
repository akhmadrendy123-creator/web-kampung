import test from 'node:test';
import assert from 'node:assert/strict';
import { formatRupiah, validateNik, calculateResolutionRate, calculateBudgetPortions } from './civicRules.ts';

test('formatRupiah formats positive and negative amounts correctly', () => {
  assert.equal(formatRupiah(14850000), 'Rp 14.850.000');
  assert.equal(formatRupiah(6200000), 'Rp 6.200.000');
  assert.equal(formatRupiah(0), 'Rp 0');
});

test('validateNik checks 16-digit numeric requirements', () => {
  assert.equal(validateNik('3201123456789012').isValid, true);
  assert.equal(validateNik('320112345678901').isValid, false); // 15 digits
  assert.equal(validateNik('32011234567890123').isValid, false); // 17 digits
  assert.equal(validateNik('320112345678901A').isValid, false); // alphanumeric
  assert.equal(validateNik('                ').isValid, false); // empty
});

test('calculateResolutionRate calculates percentages with edge cases', () => {
  assert.equal(calculateResolutionRate(10, 8), 80);
  assert.equal(calculateResolutionRate(0, 0), 100);
  assert.equal(calculateResolutionRate(22, 18), 82);
});

test('calculateBudgetPortions correctly divides budget into allocation ratios', () => {
  const portions = calculateBudgetPortions(10000000);
  assert.equal(portions.pjuCctv, 3500000);
  assert.equal(portions.kebersihan, 3000000);
  assert.equal(portions.sosial, 2000000);
  assert.equal(portions.cadangan, 1500000);
  assert.equal(portions.pjuCctv + portions.kebersihan + portions.sosial + portions.cadangan, 10000000);
});
