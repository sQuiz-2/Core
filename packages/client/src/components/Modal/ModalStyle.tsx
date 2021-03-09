import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useModalStyle() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 10,
    },
    modalCloseButton: {
      alignSelf: 'flex-end',
      paddingTop: 12,
      paddingRight: 15,
    },
    content: {
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
  });
  return styles;
}
