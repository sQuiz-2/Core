const badgesTwitch = {
  'sub-1': require('@Assets/images/badges/sub-1.png'),
  // Domingo: require('@Assets/images/badges/Domingo.png'),
};

export default badgesTwitch;

export const badgesTwitchReward = {
  'reward-1': require('@Assets/images/badges/reward-1.png'),
};

export const badgesSpecial = {
  'special-1': require('@Assets/images/badges/special-1.png'),
  'special-2': require('@Assets/images/badges/special-2.png'),
  'special-3': require('@Assets/images/badges/special-3.png'),
  'special-4': require('@Assets/images/badges/special-4.png'),
  'special-5': {
    static: require('@Assets/images/badges/special-5-static.png'),
    animated: require('@Assets/images/badges/special-5.gif'),
  },
};

export const badges = { ...badgesTwitch, ...badgesSpecial, ...badgesTwitchReward };
