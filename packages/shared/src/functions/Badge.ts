import { badgeNames, Ranks } from '../enums';

export type PlayerSpecialBadgeInfos = {
  rank: keyof typeof Ranks;
  createdDate: string;
};

export function isAllowedSpecialBadge(
  badgeName: keyof typeof badgeNames,
  playerInfos: PlayerSpecialBadgeInfos
): boolean {
  const { rank } = playerInfos;
  if (badgeName === 'VIP' && rank === Ranks.VIP) return true;
  if (badgeName === 'Fondateur' && rank === Ranks.Fondateur) return true;
  if (badgeName === 'Staff' && rank === Ranks.Staff) return true;
  if (badgeName === 'Streamer' && rank === Ranks.Streamer) return true;
  return false;
}
