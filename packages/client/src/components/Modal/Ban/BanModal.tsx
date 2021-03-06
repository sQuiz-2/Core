import { PrimaryButton } from '@Src/components/Buttons';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { put } from '@Src/utils/wrappedFetch';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useRecoilValue } from 'recoil';

import Modal from '../Modal';
import styles from './BanModalStyle';

type BanModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  playerId: number;
};

export default function BanModal({ visible, setVisible, playerId }: BanModalProps) {
  const [banReason, setBanReason] = useState('');
  const user = useRecoilValue(userState);

  function banPlayer() {
    if (!user.token) return;
    try {
      put({ path: 'users/ban/' + playerId, body: { reason: banReason }, token: user.token });
    } catch (error) {
      console.error(error);
    }
    setVisible(false);
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Text fontFamily="title" fontSize="xl">
        Raison du bannissement :
      </Text>
      <TextInput
        value={banReason}
        onChangeText={(text) => setBanReason(text)}
        multiline
        style={styles.input}
      />
      <PrimaryButton onPress={banPlayer} style={styles.button}>
        <Text style={styles.text}>Bannir</Text>
      </PrimaryButton>
    </Modal>
  );
}
