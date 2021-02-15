export function computeLevel(experience: number) {
  let exp = 10;
  let level = 0;
  let currentLevelExp = 0;
  for (; exp <= experience; level++, exp += level * 10) {
    currentLevelExp = exp;
  }
  return { level, currentLevelExp, nextLevelExp: exp };
}
