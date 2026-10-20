import test from 'node:test';
import assert from 'node:assert/strict';
import { getRevealClassName, computeTransitionDelay } from './scrollAnimation.ts';

test('getRevealClassName outputs base reveal class when not revealed', () => {
  const cls = getRevealClassName(false);
  assert.equal(cls, 'reveal-on-scroll');
  assert.ok(!cls.includes('is-revealed'));
});

test('getRevealClassName outputs is-revealed class when visible', () => {
  const cls = getRevealClassName(true, 'max-w-7xl mx-auto');
  assert.ok(cls.includes('reveal-on-scroll'));
  assert.ok(cls.includes('is-revealed'));
  assert.ok(cls.includes('max-w-7xl mx-auto'));
});

test('computeTransitionDelay calculates progressive delay', () => {
  assert.equal(computeTransitionDelay(0), 0);
  assert.equal(computeTransitionDelay(1, 150), 150);
  assert.equal(computeTransitionDelay(2, 150), 300);
  assert.equal(computeTransitionDelay(-1), 0);
});
