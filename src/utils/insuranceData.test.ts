import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INSURANCE_PARTNERS,
  BILLING_STEPS,
  INSURANCE_METRICS
} from './insuranceData.ts';

test('INSURANCE_PARTNERS contains valid providers with necessary fields', () => {
  assert.ok(INSURANCE_PARTNERS.length >= 5, 'Should have at least 5 insurance partners');

  for (const partner of INSURANCE_PARTNERS) {
    assert.ok(partner.id, 'Partner must have an id');
    assert.ok(partner.name, 'Partner must have a full name');
    assert.ok(partner.shortName, 'Partner must have a shortName');
    assert.ok(partner.coverageServices.length > 0, `${partner.id} must have coverage services`);
    assert.ok(partner.requiredDocuments.length > 0, `${partner.id} must have required documents`);
    assert.ok(['national', 'private', 'international'].includes(partner.type), 'Valid type required');
    assert.ok(['direct', 'reimbursement', 'both'].includes(partner.billingMethod), 'Valid billingMethod required');
  }
});

test('National EMD partner is present and has 75% coverage benefit', () => {
  const emd = INSURANCE_PARTNERS.find((p) => p.id === 'emd');
  assert.ok(emd, 'EMD must be present');
  assert.equal(emd?.type, 'national');
  assert.ok(emd?.badgeText.includes('75%'), 'EMD must highlight 75% discount');
});

test('BILLING_STEPS has sequential 4-step workflow', () => {
  assert.equal(BILLING_STEPS.length, 4, 'Should have 4 sequential billing steps');
  for (let i = 0; i < BILLING_STEPS.length; i++) {
    assert.equal(BILLING_STEPS[i].step, i + 1, `Step ${i + 1} numbering matches`);
    assert.ok(BILLING_STEPS[i].title, `Step ${i + 1} must have title`);
    assert.ok(BILLING_STEPS[i].description, `Step ${i + 1} must have description`);
    assert.ok(BILLING_STEPS[i].requiredDocs.length > 0, `Step ${i + 1} must have requiredDocs`);
  }
});

test('INSURANCE_METRICS has key metrics defined', () => {
  assert.ok(INSURANCE_METRICS.length >= 4, 'Must have at least 4 metrics');
  for (const metric of INSURANCE_METRICS) {
    assert.ok(metric.label, 'Metric must have label');
    assert.ok(metric.value, 'Metric must have value');
  }
});
