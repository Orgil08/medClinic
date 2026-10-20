import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateWellnessScore, CALCULATOR_QUESTIONS } from './eyeRiskCalculator.ts';

test('CALCULATOR_QUESTIONS has valid structure and 5 questions', () => {
  assert.equal(CALCULATOR_QUESTIONS.length, 5);
  for (const q of CALCULATOR_QUESTIONS) {
    assert.ok(q.id, 'Question has id');
    assert.ok(q.title, 'Question has title');
    assert.ok(q.options.length >= 3, 'Question has at least 3 options');
    for (const opt of q.options) {
      assert.ok(opt.label, 'Option has label');
      assert.ok(typeof opt.points === 'number', 'Option has points');
      assert.ok(opt.tip, 'Option has tip');
    }
  }
});

test('calculateWellnessScore returns high score and low risk for optimal habits', () => {
  // Option 0 for all questions is the highest point option (20 points each = 100)
  const answers: Record<string, number> = {
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
  };
  const result = calculateWellnessScore(answers);
  assert.equal(result.score, 100);
  assert.equal(result.tier, 'low');
  assert.equal(result.tierColor, 'emerald');
  assert.ok(result.tierLabel.includes('Маш сайн'));
});

test('calculateWellnessScore returns moderate risk for medium habits', () => {
  // Moderate answers
  const answers: Record<string, number> = {
    q1: 1, // 15
    q2: 1, // 12
    q3: 1, // 14
    q4: 1, // 12
    q5: 1, // 12
  };
  const result = calculateWellnessScore(answers);
  assert.equal(result.score, 65);
  assert.equal(result.tier, 'moderate');
  assert.equal(result.tierColor, 'amber');
  assert.ok(result.recommendations.length > 0);
});

test('calculateWellnessScore returns high risk tier for poor habits', () => {
  // Low points answers
  const answers: Record<string, number> = {
    q1: 3, // 5
    q2: 2, // 4
    q3: 2, // 5
    q4: 2, // 4
    q5: 2, // 4
  };
  const result = calculateWellnessScore(answers);
  assert.equal(result.score, 22);
  assert.equal(result.tier, 'high');
  assert.equal(result.tierColor, 'rose');
  assert.ok(result.recommendations.length > 0);
});
