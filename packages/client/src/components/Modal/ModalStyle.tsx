import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useModalStyle() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      backgroundColor: colors.background,
      borderRadius: 10,
      alignItems: 'flex-end',
    },
    modalCloseButton: {
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
