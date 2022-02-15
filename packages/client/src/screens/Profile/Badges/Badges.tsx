import Text from '@Src/components/Text';
import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import { put } from '@Src/utils/wrappedFetch';
import { badgeSpecialId, badgesSpecial, isAllowedSpecialBadge } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import LockedBadge from '../LockedBadge/LockedBadge';
import styles from './BadgeStyle';
import RewardBadges from './RewardBadges';
import SubBadges from './SubBadges';

export default function Avatars() {
  const [userBasicInfos, setUserBasicInfos] = useRecoilState(userBasicInfoState);
  const user = useRecoilValue(userState);

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
              return (
                <View key={special.id}>
                  <LockedBadge
                    onPress={onPress}
                    selected={userBasicInfos.badge === special.id}
                    name={special.name}
                    id={special.id}
                    lock={
                      !isAllowedSpecialBadge(special.id as badgeSpecialId, {
                        rank: userBasicInfos.rank,
                      })
                    }
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
