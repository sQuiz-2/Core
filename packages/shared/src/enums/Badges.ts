export const badgeNames = {
  Default: 'Default',
  Xari: 'Xari',
  // Domingo: 'Domingo',
};

export type Badge = {
  broadcasterId: string;
  name: keyof typeof badgeNames;
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
