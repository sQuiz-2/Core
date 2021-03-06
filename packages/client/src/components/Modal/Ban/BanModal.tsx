import { PrimaryButton } from '@Src/components/Buttons';
import Text from '@Src/components/Text';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

import Modal from '../Modal';
import styles from './BanModalStyle';

type BanModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  playerId: number;
};

export default function BanModal({ visible, setVisible }: BanModalProps) {
  function banPlayer() {}

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Text fontFamily="title" fontSize="xl">
        Raison du bannissement :
      </Text>
      <TextInput multiline style={styles.input} />
      <PrimaryButton onPress={banPlayer} style={styles.button}>
        <Text style={styles.text}>Bannir</Text>
      </PrimaryButton>
    </Modal>
  );
}
