import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import avatars from '@Src/utils/loadAvatars';
import { put } from '@Src/utils/wrappedFetch';
import { Avatars as AvatarsExp, computeLevel } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import LockedAvatar from '../LockedAvatar';
import styles from './AvatarsStyle';

export default function Avatars() {
  const [userBasicInfos, setUserBasicInfos] = useRecoilState(userBasicInfoState);
  const user = useRecoilValue(userState);
  const { level } = computeLevel(userBasicInfos?.experience || 0);

  function onPress(avatar: string) {
    if (!userBasicInfos || !user.token) return;
    setUserBasicInfos({ ...userBasicInfos, avatar });
    try {
      put({ path: 'me-edit', token: user.token, body: { avatar } });
    } catch (error) {
      console.error(error);
    }
  }

  if (!userBasicInfos) return null;

  return (
    <View style={styles.container}>
      {Object.entries(avatars).map(([key, value]) => {
        if (key === '0') return null;
        return (
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
        );
      })}
    </View>
  );
}
