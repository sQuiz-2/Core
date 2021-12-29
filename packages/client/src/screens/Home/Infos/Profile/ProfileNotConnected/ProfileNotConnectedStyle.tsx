import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useProfileNotConnectedStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    provider: {
      flexDirection: 'row',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    icon: {
      color: 'white',
      paddingRight: 10,
      paddingLeft: 5,
    },
    loader: {
      backgroundColor: colors.card,
    },
    font: {
      color: 'white',
    },
  });
}
