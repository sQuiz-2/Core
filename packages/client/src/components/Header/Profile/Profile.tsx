import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';

import userState from '../../../global/userState';
import { removeInStore, StorageEnum } from '../../../utils/storage';
import Text from '../../Text';
import styles from './ProfileStyle';

export default function Profile() {
  const { colors } = useTheme();
  const [user, setUser] = useRecoilState(userState);

  const navigation = useNavigation();

  async function disconnect() {
    await removeInStore(StorageEnum.User);
    setUser({
      username: 'player' + Math.floor(Math.random() * Math.floor(999)),
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
