import { Ranks } from '../enums';
import { badgeSpecialId } from '../enums/Badges';

export type PlayerSpecialBadgeInfos = {
  rank: keyof typeof Ranks;
  /* createdDate: string; */
};

export function isAllowedSpecialBadge(
  badgeName: badgeSpecialId,
  playerInfos: PlayerSpecialBadgeInfos
): boolean {
  const { rank } = playerInfos;
  if (badgeName === badgeSpecialId.VIP && rank === Ranks.VIP) return true;
  if (badgeName === badgeSpecialId.Fondateur && rank === Ranks.Fondateur) return true;
  if (badgeName === badgeSpecialId.Staff && rank === Ranks.Staff) return true;
  if (badgeName === badgeSpecialId.Streamer && rank === Ranks.Streamer) return true;
  return false;
}
