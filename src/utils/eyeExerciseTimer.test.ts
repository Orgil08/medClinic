import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatTimer,
  calculateProgress,
  calculateRemainingFromTarget,
  getNextCycleState,
  WORK_SECONDS,
  REST_SECONDS,
  DEMO_WORK_SECONDS,
} from './eyeExerciseTimer.ts';

test('formatTimer formats mm:ss accurately', () => {
  assert.equal(formatTimer(1200), '20:00');
  assert.equal(formatTimer(1199), '19:59');
  assert.equal(formatTimer(65), '01:05');
  assert.equal(formatTimer(20), '00:20');
  assert.equal(formatTimer(5), '00:05');
  assert.equal(formatTimer(0), '00:00');
  assert.equal(formatTimer(-10), '00:00');
});

test('calculateProgress calculates accurate percentage between 0 and 100', () => {
  assert.equal(calculateProgress(1200, 1200), 0);
  assert.equal(calculateProgress(600, 1200), 50);
  assert.equal(calculateProgress(0, 1200), 100);
  assert.equal(calculateProgress(10, 20), 50);
  assert.equal(calculateProgress(0, 20), 100);
});

test('calculateRemainingFromTarget computes remaining seconds from future timestamp', () => {
  const now = Date.now();
  const target5Sec = now + 5000;
  const rem = calculateRemainingFromTarget(target5Sec);
  assert.ok(rem >= 4 && rem <= 6, `Expected approx 5 seconds, got ${rem}`);

  const targetPast = now - 2000;
  assert.equal(calculateRemainingFromTarget(targetPast), 0);
  assert.equal(calculateRemainingFromTarget(null), 0);
});

test('getNextCycleState transitions from work to rest (20s) and back to work (20m)', () => {
  const fromWork = getNextCycleState('work', false);
  assert.equal(fromWork.nextMode, 'rest');
  assert.equal(fromWork.nextSeconds, REST_SECONDS);

  const fromRest = getNextCycleState('rest', false);
  assert.equal(fromRest.nextMode, 'work');
  assert.equal(fromRest.nextSeconds, WORK_SECONDS);

  // Demo mode
  const fromRestDemo = getNextCycleState('rest', true);
  assert.equal(fromRestDemo.nextMode, 'work');
  assert.equal(fromRestDemo.nextSeconds, DEMO_WORK_SECONDS);
});
