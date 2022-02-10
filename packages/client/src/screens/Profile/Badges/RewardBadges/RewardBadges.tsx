import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import { get } from '@Src/utils/wrappedFetch';
import { ShowBadges, twitchRewards } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import LockedBadge from '../../LockedBadge/';

type RewardBadgesProps = {
  handlePress: (badgeId: string) => void;
};

export default function RewardBadges({ handlePress }: RewardBadgesProps) {
  const user = useRecoilValue(userState);
  const userBasicInfos = useRecoilValue(userBasicInfoState);
  const [unlockedRewards, setUnlockedRewards] = useState<string[]>([]);

  async function fetchRewardBadges() {
    if (!user.token) return;
    try {
      const badges = await get<ShowBadges>({ path: 'badges/show', token: user.token });
      if (!badges) return;
      setUnlockedRewards(badges.map(({ badgeId }) => badgeId));
    } catch (error) {}
  }

  useEffect(() => {
    fetchRewardBadges();
  }, [user]);

  if (!user || !userBasicInfos) return null;

  return (
    <>
      {twitchRewards.map((reward) => (
        <View key={reward.id}>
          <LockedBadge
            onPress={handlePress}
            selected={userBasicInfos.badge === reward.id}
            name={reward.name}
            id={reward.id}
            lock={!unlockedRewards.includes(reward.id)}
            lockedDescription={reward.description}
          />
        </View>
      ))}
    </>
  );
}
