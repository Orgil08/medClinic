import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  validateNewsletterInput,
  NEWSLETTER_TOPICS,
  saveSubscription,
  getStoredSubscription,
  clearSubscription
} from './newsletter.ts';

test('isValidEmail correctly identifies valid email addresses', () => {
  assert.equal(isValidEmail('patient@example.com'), true);
  assert.equal(isValidEmail('user.name+tag@solongohospital.mn'), true);
  assert.equal(isValidEmail('info@mail.co.uk'), true);
});

test('isValidEmail rejects invalid email patterns', () => {
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('   '), false);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('missing@domain'), false);
  assert.equal(isValidEmail('@nodomain.com'), false);
  assert.equal(isValidEmail('spaces in@email.com'), false);
});

test('validateNewsletterInput handles empty email gracefully', () => {
  const result = validateNewsletterInput('');
  assert.equal(result.isValid, false);
  assert.ok(result.error?.includes('оруулна уу'));
});

test('validateNewsletterInput validates and normalizes email casing and trims', () => {
  const result = validateNewsletterInput('  Patient.One@Domain.MN  ');
  assert.equal(result.isValid, true);
  assert.equal(result.cleanEmail, 'patient.one@domain.mn');
  assert.equal(result.cleanTopics.length, NEWSLETTER_TOPICS.length);
});

test('validateNewsletterInput filters invalid topics and defaults to all if empty', () => {
  const withSpecific = validateNewsletterInput('patient@domain.com', ['health-tips', 'non-existent-topic']);
  assert.equal(withSpecific.isValid, true);
  assert.deepEqual(withSpecific.cleanTopics, ['health-tips']);

  const withEmptyTopics = validateNewsletterInput('patient@domain.com', []);
  assert.equal(withEmptyTopics.isValid, true);
  assert.equal(withEmptyTopics.cleanTopics.length, NEWSLETTER_TOPICS.length);
});

test('saveSubscription returns a valid NewsletterSubscription object', () => {
  const sub = saveSubscription('Test@Example.COM', ['health-tips', 'pediatric']);
  assert.equal(sub.email, 'test@example.com');
  assert.deepEqual(sub.topics, ['health-tips', 'pediatric']);
  assert.ok(typeof sub.subscribedAt === 'string');
});
