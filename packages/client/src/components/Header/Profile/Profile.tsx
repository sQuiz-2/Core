import userState from '@Src/global/userState';
import { removeInStore, StorageEnum } from '@Src/utils/storage';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';

import Text from '../../Text';
import styles from './ProfileStyle';

export default function Profile() {
  const { colors } = useTheme();
  const [user, setUser] = useRecoilState(userState);

  const navigation = useNavigation();

  async function disconnect() {
    if (user.token) {
      get({ path: 'logout', token: user.token });
    }
    await removeInStore(StorageEnum.User);
    setUser({
      username: null,
      token: null,
    });
    navigation.navigate('Home');
  }

  if (!user.username || !user.token) return null;

  return (
    <View style={styles.container}>
      <FontAwesome5
        onPress={() => disconnect()}
        name="door-open"
        size={20}
        color={colors.text}
        style={styles.leaveDoor}
      />
      <Text>{user.username}</Text>
    </View>
  );
}
