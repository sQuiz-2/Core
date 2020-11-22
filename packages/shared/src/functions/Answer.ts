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
  const prefix = ['le', 'un', 'la', 'une', 'les', 'des', 'de'];
  const splitAnswer = str.split(' ');
  if (prefix.includes(splitAnswer[0])) {
    splitAnswer.shift();
    return removePrefix(splitAnswer.join(' '));
  }
  return str;
}
