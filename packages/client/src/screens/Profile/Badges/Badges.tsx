import Text from '@Src/components/Text';
import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import { get, put } from '@Src/utils/wrappedFetch';
import { badgeSpecialId, badgesSpecial, isAllowedSpecialBadge, ShowBadges } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import LockedBadge from '../LockedBadge/LockedBadge';
import styles from './BadgeStyle';
import RewardBadges from './RewardBadges';
import SubBadges from './SubBadges';

export default function Avatars() {
  const [userBasicInfos, setUserBasicInfos] = useRecoilState(userBasicInfoState);
  const user = useRecoilValue(userState);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  async function fetchRewardBadges() {
    if (!user.token) return;
    try {
      const badges = await get<ShowBadges>({ path: 'badges/show', token: user.token });
      if (!badges) return;
      setUnlockedBadges(badges.map(({ badgeId }) => badgeId));
    } catch (error) {}
  }

  useEffect(() => {
    fetchRewardBadges();
  }, [user]);

  if (!user || !userBasicInfos) return null;

  function onPress(badge: string) {
    if (!userBasicInfos || !user.token) return;
    setUserBasicInfos({ ...userBasicInfos, badge });
    try {
      put({ path: 'me-edit', token: user.token, body: { badge } });
    } catch (error) {
      console.error(error);
    }
  }

  if (!userBasicInfos) return null;

  // If the user is not in the staff we only display basic special badges
  const allowedBadges = badgesSpecial.filter((special) => {
    if (!special.staff) return true;
    if (special.staff && userBasicInfos.rank !== 'Player') {
      return true;
    }
    return false;
  });

  console.log(unlockedBadges);

  return (
    <>
      <Text fontSize="md">TWITCH</Text>
      <View style={styles.container}>
        <SubBadges handlePress={onPress} />
        <RewardBadges handlePress={onPress} />
      </View>
      {allowedBadges.length > 0 && (
        <>
          <Text fontSize="md">SPÉCIAUX</Text>
          <View style={styles.container}>
            {allowedBadges.map((special) => {
              let isLocked = true;
              if (
                isAllowedSpecialBadge(special.id as badgeSpecialId, { rank: userBasicInfos.rank })
              ) {
                isLocked = false;
              } else if (unlockedBadges.includes(special.id)) {
                isLocked = false;
              }
              return (
                <View key={special.id}>
                  <LockedBadge
                    onPress={onPress}
                    selected={userBasicInfos.badge === special.id}
                    name={special.name}
                    id={special.id}
                    lock={isLocked}
                  />
                </View>
              );
            })}
          </View>
        </>
      )}
    </>
  );
}
