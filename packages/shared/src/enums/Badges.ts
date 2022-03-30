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
  Xari = 'eaaf38a3-d949-475c-88da-fe4ddf3a848e',
}

export enum badgeRewardId {
  XariCoin = 'reward-1',
}

export const badgeRewardIdValues = Object.values(badgeRewardId);

export const twitchRewards: TwitchRewardsBadges = [
  {
    id: badgeRewardId.XariCoin,
    broadcasterId: Streamers.Xari,
    rewardId: RewardsId.Xari,
    name: 'Riche',
    description: 'À débloquer sur la chaine de Xari',
  },
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
  Fast = 'special-5',
  April2022 = 'special-6',
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
  {
    id: badgeSpecialId.Fast,
    name: 'Le Fast',
    staff: false,
  },
  {
    id: badgeSpecialId.April2022,
    name: 'Avril 2022',
    staff: false,
  },
];

export const badgeNames = {
  Default: 'Default',
  ...badgeSubId,
  ...badgeRewardId,
  ...badgeSpecialId,
};

export const allBadgesInfos = [...badgesSpecial, ...twitchRewards, ...subBadges];
