import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useCheckBoxStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    button: {
      height: 18,
      width: 18,
      borderWidth: 2,
      borderColor: colors.text,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    buttonCenter: {
      height: 10,
      width: 10,
      backgroundColor: colors.text,
    },
  });
}
