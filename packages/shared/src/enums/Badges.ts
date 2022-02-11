export enum Streamers {
  Xari = '88301612',
  Domingo = '40063341',
}

export type SubBadge = {
  id: string;
  broadcasterId: string;
  name: string;
};

export type SubBadges = SubBadge[];

export enum badgeSubId {
  Xari = 'sub-1',
}

export const badgeSubIdValues = Object.values(badgeSubId);

export const subBadges: SubBadges = [
  {
    id: badgeSubId.Xari,
    broadcasterId: '88301612',
    name: 'Sub chez Xari',
  },
  /* {
    broadcasterId: '40063341',
    name: 'Domingo',
  }, */
];

export type TwitchRewardsBadge = {
  id: string;
  broadcasterId: Streamers;
  name: string;
  rewardId: RewardsId;
  description: string;
};

export type TwitchRewardsBadges = TwitchRewardsBadge[];

export enum RewardsId {
  Xari = '01ccb2ee-89cc-4e8e-96cf-f30577cffa13',
}

export enum badgeRewardId {
  XariCoin = 'reward-1',
}

export const badgeRewardIdValues = Object.values(badgeRewardId);

export const twitchRewards: TwitchRewardsBadges = [
  /* {
    id: badgeRewardId.XariCoin,
    broadcasterId: Streamers.Xari,
    rewardId: RewardsId.Xari,
    name: 'Team PAX',
    description: 'À débloquer sur la chaine de Xari',
  }, */
];

export type BadgesSpecial = {
  id: string;
  name: string;
  staff: boolean;
};

export enum badgeSpecialId {
  Fondateur = 'special-1',
  Staff = 'special-2',
  Streamer = 'special-3',
  VIP = 'special-4',
}

export const badgeSpecialIdValues = Object.values(badgeSpecialId);

export const badgesSpecial: BadgesSpecial[] = [
  {
    id: badgeSpecialId.Fondateur,
    name: 'Fondateur',
    staff: true,
  },
  {
    id: badgeSpecialId.Staff,
    name: 'Staff',
    staff: true,
  },
  {
    id: badgeSpecialId.Streamer,
    name: 'Streamer',
    staff: true,
  },
  {
    id: badgeSpecialId.VIP,
    name: 'VIP',
    staff: true,
  },
];

export const badgeNames = {
  Default: 'Default',
  ...badgeSubId,
  ...badgeRewardId,
  ...badgeSpecialId,
};

export const allBadgesInfos = [...badgesSpecial, ...twitchRewards, ...subBadges];
