import { challengeWin, ChallengeWinIds } from '../enums';

export function checkWinChallenges(win: number | null | undefined): ChallengeWinIds[] {
  if (!win) return [];
  const validated: ChallengeWinIds[] = challengeWin
    .filter(({ requiredWin }) => win >= requiredWin)
    .map(({ id }) => id);
  return validated;
}
