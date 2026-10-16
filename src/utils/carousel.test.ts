import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextIndex, getPrevIndex, clampIndex } from './carousel.ts';

test('getNextIndex wraps correctly', () => {
  assert.equal(getNextIndex(0, 5), 1);
  assert.equal(getNextIndex(3, 5), 4);
  assert.equal(getNextIndex(4, 5), 0); // wrap around
});

test('getPrevIndex wraps correctly', () => {
  assert.equal(getPrevIndex(4, 5), 3);
  assert.equal(getPrevIndex(1, 5), 0);
  assert.equal(getPrevIndex(0, 5), 4); // wrap around
});

test('handles edge case for empty or single item', () => {
  assert.equal(getNextIndex(0, 1), 0);
  assert.equal(getPrevIndex(0, 1), 0);
  assert.equal(getNextIndex(0, 0), 0);
});

test('clampIndex keeps index in range', () => {
  assert.equal(clampIndex(-2, 5), 0);
  assert.equal(clampIndex(2, 5), 2);
  assert.equal(clampIndex(10, 5), 4);
});
