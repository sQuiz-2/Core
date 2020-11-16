import test from 'japa';

import { parseAnswer, normalizedValue, removePrefix } from '../src/functions/Answer';

test('Parse answer', (assert) => {
  assert.equal(parseAnswer('le vélo'), 'velo');
  assert.equal(parseAnswer('DescriPTION'), 'description');
  assert.equal(parseAnswer('Guerre de cent ans'), 'guerre de cent ans');
  assert.equal(parseAnswer('Lécythiophilie'), 'lecythiophilie');
});

test('Normalized value', (assert) => {
  assert.equal(normalizedValue('FULLMAJ'), 'fullmaj');
  assert.equal(normalizedValue('nomaj'), 'nomaj');
  assert.equal(normalizedValue('êëéçè'), 'eeece');
  assert.equal(normalizedValue('ÊËÉÇÈ'), 'eeece');
});

test('Remove prefix', (assert) => {
  assert.equal(removePrefix('leedsichthys'), 'leedsichthys');
  assert.equal(removePrefix('abaissable'), 'abaissable');
  assert.equal(removePrefix('des réponses'), 'réponses');
});
