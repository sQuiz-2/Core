import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useRadioStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      height: 18,
      width: 18,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.text,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    buttonCenter: {
      height: 8,
      width: 8,
      borderRadius: 6,
      backgroundColor: colors.text,
    },
  });
}
