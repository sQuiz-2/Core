import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Pressable } from 'react-native';
import RNModal from 'react-native-modal';

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
    <RNModal
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}>
      <View style={styles.modalView}>
        <View style={styles.modalCloseButton}>
          <Pressable onPress={() => setVisible(!visible)}>
            <FontAwesome5 name="times" size={18} color={colors.text} />
          </Pressable>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </RNModal>
  );
}
