import test from 'node:test';
import assert from 'node:assert/strict';
import { searchHospital, normalizeSearchText } from './search.ts';

test('normalizeSearchText trims and lowers strings', () => {
  assert.equal(normalizeSearchText('  КАТаракт  '), 'катаракт');
  assert.equal(normalizeSearchText(''), '');
});

test('searchHospital returns empty results for empty or whitespace query', () => {
  const result = searchHospital('   ');
  assert.equal(result.totalCount, 0);
  assert.equal(result.doctors.length, 0);
  assert.equal(result.services.length, 0);
  assert.equal(result.news.length, 0);
});

test('searchHospital finds doctors by name or specialty', () => {
  const result = searchHospital('Singh');
  assert.ok(result.totalCount > 0);
  assert.ok(result.doctors.length > 0);
  assert.ok(result.doctors.some((d) => d.title.includes('Singh')));
  assert.equal(result.doctors[0].type, 'doctor');
  assert.ok(result.doctors[0].path.startsWith('/doctors#doc-'));
});

test('searchHospital finds doctors by country БНСУ or education', () => {
  const result = searchHospital('БНСУ');
  assert.ok(result.totalCount > 0);
  assert.ok(result.doctors.length > 0);
});

test('searchHospital finds treatments by title or procedure (катаракт)', () => {
  const result = searchHospital('катаракт');
  assert.ok(result.totalCount > 0);
  assert.ok(result.services.length > 0);
  assert.ok(result.services.some((s) => s.path.startsWith('/services/')));
});

test('searchHospital finds treatments by laser keyword (лазер, хараа тэглэх)', () => {
  const result = searchHospital('лазер');
  assert.ok(result.totalCount > 0);
  assert.ok(result.services.some((s) => s.title.includes('лазер') || s.subtitle.includes('лазер')));
});

test('searchHospital finds news items by keyword', () => {
  const result = searchHospital('хөнгөлөлт');
  assert.ok(result.totalCount > 0);
  assert.ok(result.news.length > 0);
  assert.ok(result.news.some((n) => n.path.startsWith('/news/')));
});
