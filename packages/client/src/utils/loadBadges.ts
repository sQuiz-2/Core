const badgesTwitch = {
  Xari: require('@Assets/images/badges/Xari.png'),
  // Domingo: require('@Assets/images/badges/Domingo.png'),
};

export default badgesTwitch;

export const badgesSpecial = {
  Fondateur: require('@Assets/images/badges/Fondateur.png'),
  Staff: require('@Assets/images/badges/Staff.png'),
  Streamer: require('@Assets/images/badges/Streamer.png'),
  VIP: require('@Assets/images/badges/VIP.png'),
};

export const badges = { ...badgesTwitch, ...badgesSpecial };
