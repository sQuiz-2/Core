import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Modal as RNModal, Pressable } from 'react-native';

import useModalStyle from './ModalStyle';

type ModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
};

export default function Modal({ visible, setVisible, children }: ModalProps) {
  const { colors } = useTheme();
  const styles = useModalStyle();

  return (
    <RNModal transparent visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalCloseButton}>
            <Pressable onPress={() => setVisible(!visible)}>
              <FontAwesome5 name="times" size={18} color={colors.text} />
            </Pressable>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
}
