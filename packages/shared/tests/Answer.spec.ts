import test from 'japa';
import { Assert } from 'japa/build/src/Assert';

import parseAnswer, { normalizedValue, removePrefix } from '../src/functions/Answer';

test('Parse answer', (assert: Assert) => {
  assert.equal(parseAnswer('le vélo'), 'velo');
  assert.equal(parseAnswer('DescriPTION'), 'description');
  assert.equal(parseAnswer('Guerre de cent ans'), 'guerre de cent ans');
  assert.equal(parseAnswer('Lécythiophilie'), 'lecythiophilie');
  assert.equal(parseAnswer('De La Viande'), 'viande');
});

test('Normalized value', (assert: Assert) => {
  assert.equal(normalizedValue('FULLMAJ'), 'fullmaj');
  assert.equal(normalizedValue('nomaj'), 'nomaj');
  assert.equal(normalizedValue('êëéçè'), 'eeece');
  assert.equal(normalizedValue('ÊËÉÇÈ'), 'eeece');
});

test('Remove prefix', (assert: Assert) => {
  assert.equal(removePrefix('leedsichthys'), 'leedsichthys');
  assert.equal(removePrefix('abaissable'), 'abaissable');
  assert.equal(removePrefix('des réponses'), 'réponses');
  assert.equal(removePrefix('de la viande'), 'viande');
  assert.equal(removePrefix("l'ultimatum"), 'ultimatum');
  assert.equal(removePrefix(''), '');
});
