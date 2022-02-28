import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { removeInStore, StorageEnum } from '@Src/utils/storage';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import { useRecoilState } from 'recoil';

import styles from './DisconnectStyle';

export default function DisconnectButton() {
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();
  const { colors } = useTheme();

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
      staff: false,
    });
    navigation.navigate('Home');
  }

  return (
    <Pressable onPress={disconnect} style={styles.container}>
      <FontAwesome5 name="door-open" size={15} color={colors.text} />
      <Text style={styles.text}>Déconnexion</Text>
    </Pressable>
  );
}
