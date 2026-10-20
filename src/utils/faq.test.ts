import test from 'node:test';
import assert from 'node:assert/strict';
import { filterFaqItems } from './faq.ts';
import type { FAQItem } from '../types/index.ts';

const mockFaqs: FAQItem[] = [
  {
    id: 'f1',
    question: 'Болор солих мэс засал Эрүүл мэндийн даатгалаар хэрхэн хөнгөлөгддөг вэ?',
    answer: 'Мэс заслын зардлын 75 хувийг даатгалаас хөнгөлнө.',
    category: 'insurance',
    categoryLabel: 'ЭМД ба төлбөр',
    highlightTag: '75% хөнгөлөлт',
  },
  {
    id: 'f2',
    question: 'Мэс засал өвдөлттэй юу?',
    answer: 'Нүдэнд тусгай дусаалга дусааж орон нутгийн мэдээ алдуулалт хийдэг тул өвдөлтгүй.',
    category: 'surgery',
    categoryLabel: 'Мэс заслын бэлтгэл',
  },
  {
    id: 'f3',
    question: 'Хүүхдийн нүдийг хэзээ үзүүлэх вэ?',
    answer: '6 сартай, 1 нас, 3 нас болон сургуульд орохын өмнө.',
    category: 'pediatric',
    categoryLabel: 'Хүүхдийн нүд',
  },
];

test('filterFaqItems returns all items when all category and empty query', () => {
  const result = filterFaqItems(mockFaqs, 'all', '');
  assert.equal(result.length, 3);
});

test('filterFaqItems filters by category correctly', () => {
  const insuranceFaqs = filterFaqItems(mockFaqs, 'insurance', '');
  assert.equal(insuranceFaqs.length, 1);
  assert.equal(insuranceFaqs[0].id, 'f1');

  const surgeryFaqs = filterFaqItems(mockFaqs, 'surgery', '');
  assert.equal(surgeryFaqs.length, 1);
  assert.equal(surgeryFaqs[0].id, 'f2');
});

test('filterFaqItems searches by query keyword in question or answer or tag', () => {
  const searchResult = filterFaqItems(mockFaqs, 'all', 'өвдөлт');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'f2');

  const tagSearchResult = filterFaqItems(mockFaqs, 'all', '75%');
  assert.equal(tagSearchResult.length, 1);
  assert.equal(tagSearchResult[0].id, 'f1');
});

test('filterFaqItems handles non-matching queries gracefully', () => {
  const emptyResult = filterFaqItems(mockFaqs, 'all', 'үл_орших_үг');
  assert.equal(emptyResult.length, 0);
});
