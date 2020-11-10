import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useProfileConnectedStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    item: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 94,
      width: 94,
    },
  });
}
