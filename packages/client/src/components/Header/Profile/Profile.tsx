import { Level } from '@Src/components/ExperienceBar';
import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import avatars from '@Src/utils/loadAvatars';
import { removeInStore, StorageEnum } from '@Src/utils/storage';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import Text from '../../Text';
import SoundVolume from '../soundVolume';
import styles from './ProfileStyle';

export default function Profile() {
  const { colors } = useTheme();
  const [user, setUser] = useRecoilState(userState);
  const userBasicInfos = useRecoilValue(userBasicInfoState);

  const navigation = useNavigation();

  async function disconnect() {
    if (user.token) {
      get({ path: 'logout', token: user.token });
    }
    await removeInStore(StorageEnum.User);
    setUser({
      username: null,
      token: null,
      connected: false,
      privateCode: null,
    });
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <SoundVolume />
      {user.connected && (
        <>
          <FontAwesome5
            onPress={() => disconnect()}
            name="door-open"
            size={20}
            color={colors.text}
            style={styles.leaveDoor}
          />
          {userBasicInfos && (
            <>
              <View style={styles.level}>
                <Level experience={userBasicInfos.experience} />
              </View>
              <Image
                source={avatars[userBasicInfos.avatar as keyof typeof avatars]}
                style={styles.avatar}
              />
            </>
          )}
          <Text>{user.username}</Text>
        </>
      )}
    </View>
  );
}
