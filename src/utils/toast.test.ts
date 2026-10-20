import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createToast,
  addToastToList,
  removeToastFromList,
  isToastExpired,
  getToastAriaAttributes,
  generateToastId
} from './toast.ts';

test('createToast creates valid toast with default values', () => {
  const toast = createToast('success', 'Амжилттай бүртгэгдлээ');
  assert.equal(toast.type, 'success');
  assert.equal(toast.title, 'Амжилттай бүртгэгдлээ');
  assert.equal(toast.duration, 4500);
  assert.ok(toast.id.startsWith('toast-'));
  assert.ok(toast.createdAt > 0);
});

test('createToast supports custom options and message', () => {
  const customAction = { label: 'Буцах', onClick: () => {} };
  const toast = createToast('info', 'Шинэ мэдээлэл', {
    message: 'Цагийн хуваарь шинэчлэгдлээ',
    duration: 3000,
    action: customAction
  });

  assert.equal(toast.type, 'info');
  assert.equal(toast.title, 'Шинэ мэдээлэл');
  assert.equal(toast.message, 'Цагийн хуваарь шинэчлэгдлээ');
  assert.equal(toast.duration, 3000);
  assert.equal(toast.action?.label, 'Буцах');
});

test('createToast assigns longer default duration to errors', () => {
  const toast = createToast('error', 'Алдаа гарлаа');
  assert.equal(toast.duration, 6000);
});

test('addToastToList appends new toast and enforces max limit', () => {
  const t1 = createToast('info', 'Toast 1');
  const t2 = createToast('info', 'Toast 2');
  const t3 = createToast('info', 'Toast 3');
  const t4 = createToast('info', 'Toast 4');
  const t5 = createToast('info', 'Toast 5');

  let list = addToastToList([], t1, 3);
  assert.equal(list.length, 1);
  assert.equal(list[0].id, t1.id);

  list = addToastToList(list, t2, 3);
  list = addToastToList(list, t3, 3);
  assert.equal(list.length, 3);
  assert.equal(list[0].id, t3.id);

  // Exceed max 3
  list = addToastToList(list, t4, 3);
  assert.equal(list.length, 3);
  assert.equal(list[0].id, t4.id);
  assert.equal(list[1].id, t3.id);
  assert.equal(list[2].id, t2.id);
});

test('removeToastFromList removes correct item by id', () => {
  const t1 = createToast('info', 'Toast 1');
  const t2 = createToast('info', 'Toast 2');
  const list = [t1, t2];

  const updated = removeToastFromList(list, t1.id);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].id, t2.id);
});

test('isToastExpired accurately evaluates elapsed time', () => {
  const toast = createToast('success', 'Тест', { duration: 2000 });
  const start = toast.createdAt;

  assert.equal(isToastExpired(toast, start + 1000), false);
  assert.equal(isToastExpired(toast, start + 2000), true);
  assert.equal(isToastExpired(toast, start + 3000), true);

  // Persistent toast (duration 0)
  const sticky = createToast('warning', 'Анхааруулга', { duration: 0 });
  assert.equal(isToastExpired(sticky, start + 99999), false);
});

test('getToastAriaAttributes sets correct accessibility attributes', () => {
  const errorAttrs = getToastAriaAttributes('error');
  assert.equal(errorAttrs.role, 'alert');
  assert.equal(errorAttrs['aria-live'], 'assertive');

  const successAttrs = getToastAriaAttributes('success');
  assert.equal(successAttrs.role, 'status');
  assert.equal(successAttrs['aria-live'], 'polite');
});
