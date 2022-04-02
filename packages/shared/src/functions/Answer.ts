export default function parseAnswer(answer: string) {
  let result = normalizedValue(answer);
  result = removePrefix(result);
  result = result.replace(/ /g, '');
  return result;
}

export function normalizedValue(str: string): string {
  let value = str.toLowerCase();
  // Remove accents
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Remove hyphens, dot, colon, coma
  value = value.replace(/-|\.|:|\,/g, '');
  // Replace œ
  value = value.replace(/œ/g, 'oe');
  // Remove ending and beginning spaces
  value = value.trim();
  return value;
}

export function removePrefix(str: string): string {
  // special case : l', d', s'
  if (str.startsWith("l'") || str.startsWith("d'") || str.startsWith("s'")) {
    return str.substring(2);
  }
  // basic cases
  const prefix = [
    'le',
    'un',
    'la',
    'une',
    'les',
    'des',
    'de',
    'en',
    'sa',
    'ses',
    'son',
    'leur',
    'leurs',
    'du',
    'sur',
    'pour',
    'au',
    'aux',
    'dans',
    'a',
    'mon',
  ];
  const splitAnswer = str.split(' ');
  if (splitAnswer.length > 1 && prefix.includes(splitAnswer[0])) {
    splitAnswer.shift();
    return removePrefix(splitAnswer.join(' '));
  }
  return str;
}
