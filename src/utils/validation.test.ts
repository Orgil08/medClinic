import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidPhoneOrEmail, validateContactForm, formatPhoneNumber } from './validation.ts';

test('validates Mongolian phone numbers correctly', () => {
  assert.equal(isValidPhoneOrEmail('77056699'), true);
  assert.equal(isValidPhoneOrEmail('7705-6699'), true);
  assert.equal(isValidPhoneOrEmail('99112233'), true);
  assert.equal(isValidPhoneOrEmail('+976 9911 2233'), true);
  assert.equal(isValidPhoneOrEmail('12345'), false);
  assert.equal(isValidPhoneOrEmail(''), false);
});

test('validates email addresses correctly', () => {
  assert.equal(isValidPhoneOrEmail('contact@solongohospital.mn'), true);
  assert.equal(isValidPhoneOrEmail('patient@example.com'), true);
  assert.equal(isValidPhoneOrEmail('invalid-email@'), false);
  assert.equal(isValidPhoneOrEmail('plainaddress'), false);
});

test('validates contact form with complete valid data', () => {
  const result = validateContactForm({
    fullName: 'Болдбаатар',
    contact: '77056699',
    category: 'Санал хүсэлт',
    message: 'Үйлчилгээний талаар асуух тодруулга байна.',
    consent: true,
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('detects invalid fields in contact form', () => {
  const result = validateContactForm({
    fullName: '',
    contact: '123',
    category: 'Санал хүсэлт',
    message: 'Богино',
    consent: false,
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.contact);
  assert.ok(result.errors.message);
  assert.ok(result.errors.consent);
});

test('formats phone number for tel links', () => {
  assert.equal(formatPhoneNumber('7705-6699'), '77056699');
  assert.equal(formatPhoneNumber('+976 7705 6699'), '+97677056699');
});
