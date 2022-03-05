import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useAdminGameButtonStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    buttonContainer: {
      backgroundColor: colors.background,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      shadowRadius: 5,
    },
    text: {
      paddingLeft: 5,
    },
    container: {
      alignItems: 'center',
      marginVertical: 5,
    },
  });
}
