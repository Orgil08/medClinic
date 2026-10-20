import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextTheme } from './theme.ts';

test('getNextTheme toggles between light and dark', () => {
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');
});
