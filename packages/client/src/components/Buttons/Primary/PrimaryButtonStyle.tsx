import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function usePrimaryButtonStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    button: {
      borderColor: colors.text,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: colors.background,
      textAlign: 'center',
      padding: 8,
    },
  });
}
