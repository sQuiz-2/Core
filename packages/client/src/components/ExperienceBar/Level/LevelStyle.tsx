import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useLevelStyle() {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      position: 'absolute',
      color: colors.notification,
    },
  });
}
