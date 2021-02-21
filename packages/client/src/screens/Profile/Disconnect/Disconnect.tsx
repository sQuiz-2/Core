import { PrimaryButton } from '@Src/components/Buttons';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { removeInStore, StorageEnum } from '@Src/utils/storage';
import { get } from '@Src/utils/wrappedFetch';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useRecoilState } from 'recoil';

import styles from './DisconnectStyle';

export default function DisconnectButton() {
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
      connected: false,
      privateCode: null,
    });
    navigation.navigate('Home');
  }

  return (
    <PrimaryButton onPress={disconnect} style={styles.button}>
      <Text style={styles.text}>Déconnexion</Text>
    </PrimaryButton>
  );
}
