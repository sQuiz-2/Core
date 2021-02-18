import userBasicInfoState from '@Src/global/userBasicInfos';
import avatars from '@Src/utils/loadAvatars';
import { Avatars as AvatarsExp, computeLevel } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';

import LockedAvatar from '../LockedAvatar';
import styles from './AvatarsStyle';

export default function Avatars() {
  const [userBasicInfos, setUserBasicInfos] = useRecoilState(userBasicInfoState);
  const { level } = computeLevel(userBasicInfos?.experience || 0);

  function onPress(avatar: string) {
    if (!userBasicInfos) return;
    setUserBasicInfos({ ...userBasicInfos, avatar });
  }

  if (!userBasicInfos) return null;

  return (
    <View style={styles.container}>
      {Object.entries(avatars).map(([key, value]) => (
        <View key={key}>
          <LockedAvatar
            onPress={onPress}
            selected={userBasicInfos!.avatar === key}
            image={value}
            name={key}
            lock={level < AvatarsExp[key as keyof typeof Avatars]}
            lockText={'LVL ' + AvatarsExp[key as keyof typeof Avatars]}
          />
        </View>
      ))}
    </View>
  );
}
