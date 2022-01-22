export const badgeNames = {
  Default: 'Default',
  Fondateur: 'Fondateur',
  Staff: 'Staff',
  Streamer: 'Streamer',
  VIP: 'VIP',
  Xari: 'Xari',
  // Domingo: 'Domingo',
};

export type Badge = {
  broadcasterId: string;
  name: keyof typeof badgeNames;
};

export type BadgesSpecial = {
  name: keyof typeof badgeNames;
  staff: boolean;
};

export type Badges = Badge[];

export const badges: Badges = [
  {
    broadcasterId: '88301612',
    name: 'Xari',
  },
  /* {
    broadcasterId: '40063341',
    name: 'Domingo',
  }, */
];

export const badgesSpecial: BadgesSpecial[] = [
  {
    name: 'Fondateur',
    staff: true,
  },
  {
    name: 'Staff',
    staff: true,
  },
  {
    name: 'Streamer',
    staff: true,
  },
  {
    name: 'VIP',
    staff: true,
  },
];
