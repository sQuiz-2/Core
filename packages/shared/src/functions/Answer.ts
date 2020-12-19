export default function parseAnswer(answer: string) {
  let result = normalizedValue(answer);
  result = removePrefix(result);
  return result;
}

export function normalizedValue(str: string): string {
  let value = str.toLowerCase();
  // Remove accents
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return value;
}

export function removePrefix(str: string): string {
  // special case : l'
  if (str.startsWith("l'")) {
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
  ];
  const splitAnswer = str.split(' ');
  if (prefix.includes(splitAnswer[0])) {
    splitAnswer.shift();
    return removePrefix(splitAnswer.join(' '));
  }
  return str;
}
