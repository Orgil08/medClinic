import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAppointmentBooking,
  generateAppointmentCode,
  APPOINTMENT_TIME_SLOTS,
  APPOINTMENT_SERVICE_CATEGORIES
} from './appointment.ts';

test('validateAppointmentBooking rejects empty fields', () => {
  const result = validateAppointmentBooking({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.serviceCategory);
  assert.ok(result.errors.preferredDate);
});

test('validateAppointmentBooking validates phone number formats', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 2);
  const dateStr = futureDate.toISOString().split('T')[0];

  const base = {
    fullName: 'Болдбаатар',
    branchId: 'central',
    serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[0],
    preferredDate: dateStr,
    preferredTimeSlot: APPOINTMENT_TIME_SLOTS[0].label
  };

  // Invalid phones
  const r1 = validateAppointmentBooking({ ...base, phone: '12345' });
  assert.equal(r1.isValid, false);
  assert.ok(r1.errors.phone);

  const r2 = validateAppointmentBooking({ ...base, phone: 'abcdefgh' });
  assert.equal(r2.isValid, false);

  // Valid 8-digit phones starting with 8, 9, or 7
  const r3 = validateAppointmentBooking({ ...base, phone: '88112233' });
  assert.equal(r3.isValid, true);
  assert.equal(r3.cleanData?.phone, '88112233');

  const r4 = validateAppointmentBooking({ ...base, phone: '9911-3344' });
  assert.equal(r4.isValid, true);
  assert.equal(r4.cleanData?.phone, '99113344');
});

test('validateAppointmentBooking rejects past dates', () => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 5);
  const pastStr = pastDate.toISOString().split('T')[0];

  const result = validateAppointmentBooking({
    fullName: 'Батцэцэг',
    phone: '88001122',
    branchId: 'ubh',
    serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[1],
    preferredDate: pastStr
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.preferredDate, 'Өнгөрсөн өдөр сонгох боломжгүй.');
});

test('validateAppointmentBooking accepts valid future appointment', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 3);
  const dateStr = futureDate.toISOString().split('T')[0];

  const result = validateAppointmentBooking({
    fullName: 'Амарсайхан',
    phone: '99887766',
    branchId: 'central',
    serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[2],
    preferredDate: dateStr,
    preferredTimeSlot: APPOINTMENT_TIME_SLOTS[1].label,
    notes: 'Шилээ солиулах гэсэн юм'
  });

  assert.equal(result.isValid, true);
  assert.equal(result.cleanData?.fullName, 'Амарсайхан');
  assert.equal(result.cleanData?.phone, '99887766');
  assert.equal(result.cleanData?.notes, 'Шилээ солиулах гэсэн юм');
});

test('generateAppointmentCode produces SLG-XXXX pattern', () => {
  const code = generateAppointmentCode();
  assert.ok(/^SLG-\d{4}$/.test(code));
});

test('validateAppointmentBooking handles email field accurately', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
  const dateStr = futureDate.toISOString().split('T')[0];

  const base = {
    fullName: 'Тэмүүлэн',
    phone: '88001122',
    branchId: 'central',
    serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[0],
    preferredDate: dateStr,
  };

  // Invalid email
  const r1 = validateAppointmentBooking({ ...base, email: 'not-an-email' });
  assert.equal(r1.isValid, false);
  assert.ok(r1.errors.email);

  // Valid email
  const r2 = validateAppointmentBooking({ ...base, email: 'temuulen@gmail.com' });
  assert.equal(r2.isValid, true);
  assert.equal(r2.cleanData?.email, 'temuulen@gmail.com');
});

test('validateAppointmentBooking supports all branches including lasik', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
  const dateStr = futureDate.toISOString().split('T')[0];

  const res = validateAppointmentBooking({
    fullName: 'Цэнгэл',
    phone: '77016699',
    branchId: 'lasik',
    serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[1],
    preferredDate: dateStr,
  });

  assert.equal(res.isValid, true);
  assert.equal(res.cleanData?.branchId, 'lasik');
});

test('validateAppointmentBooking accepts today as valid date', () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const res = validateAppointmentBooking({
    fullName: 'Энхээ',
    phone: '99112233',
    branchId: 'central',
    serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[0],
    preferredDate: todayStr,
  });

  assert.equal(res.isValid, true);
  assert.equal(res.cleanData?.preferredDate, todayStr);
});

